<template>
  <div class="app-container">
    <el-form ref="form">
      <el-card class="box-card">
        <span class="title">分类：</span>
        <el-form-item style="margin-bottom: 0;">
          <el-select
            v-model="form.categoriesList"
            style="width: 100%"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoriesList"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <span class="title">标签：(也用于文章页关键词， 多个用英文逗号分隔)</span><br/>
        <el-tag
          :key="tag"
          v-for="tag in form.tagList"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>

        <div class="block">
          <span class="demonstration">发布时间：（当设置未来的时间点时，文章将在该时间点后定时发布）</span>
          <el-date-picker
            v-model="form.date"
            type="datetime"
            placeholder="选择日期时间"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <el-switch
          v-model="form.allowRemark"
          active-text="允许评论"
        >
        </el-switch>
        <el-switch
          v-model="form.top"
          active-text="是否置顶"
        >
        </el-switch>

      </el-card>
      <h3>文章摘要:</h3>
      <div class="app-editor" style="padding-top: 0;">
        <mavon-editor
          v-model="form.excerpt"
          :subfield="false"
          default-open="edit"
          placeholder="如果留空，则使用文章内容作为摘要..."
          @imgAdd="imgAdd"
        />
      </div>
      <h1>写文章</h1>
      <el-input
        v-model="form.title"
        placeholder="文章标题"
        clearable
      >
      </el-input>
      <div class="app-editor">
        <mavon-editor v-model="form.content" :style="'height:' + height" @imgAdd="imgAdd"/>
      </div>
      <div class="button">
        <el-button
          type="primary"
          round
          :loading="publish"
          :disabled="save"
          @click="publishArticle"
        >发布文章
        </el-button>
        <el-button
          type="success"
          round
          :loading="save"
          :disabled="publish"
          @click="saveDraft"
        >保存草稿
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { upload } from '@/utils/upload'
import article from '@/api/blog/article'
import categories from '@/api/blog/categories'

export default {
  name: 'Edit',
  data() {
    return {
      input10: '',
      height: document.documentElement.clientHeight - 350 + 'px',
      // 分类列表
      categoriesList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '明天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '后天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周后',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      // 发布文章加载
      publish: false,
      // 保存草稿加载
      save: false,
      form: {
        // 文章id
        id: '',
        // 文章标题
        title: '',
        // 选中的分类列表
        categoriesList: [],
        // 时间
        date: '',
        // 允许评论(1true/0fales)
        allowRemark: true,
        // 摘要
        excerpt: '',
        // 文章
        content: '',
        // 文章字数
        wordCount: 0,
        // 草稿(1true/0fales)
        hide: false,
        // 置顶(1true/0fales)
        top: true,
        // 标签列表
        tagList: []
      },
      inputVisible: false,
      inputValue: '',
      Id: ''
    }
  },
  watch: {
    Id: {
      handler: function(newVal, oldVal) {
        if (newVal) {
          if (newVal.length > 0) {
            article.selectOne(newVal).then((response) => {
              this.form = response
              this.form.categoriesList = Object.keys(response.categoriesList)
              if (response.tagList == null) {
                this.form.tagList = []
              } else {
                this.form.tagList = Object.values(response.tagList)
              }
            }, (err) => {
              console.log(err)
              this.$message.error('获取分类列表失败')
            })
          }
        }
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 350 + 'px'
    }
  },
  created() {
    this.selectCategories()
    this.Id = this.$route.query.Id
  },
  methods: {
    // 上传图片
    imgAdd(pos, $file) {
      upload(this.imagesUploadApi, $file).then(res => {
        const data = res.data
        const url = this.baseApi + '/file/' + data.type + '/' + data.realName
        this.$refs.md.$img2Url(pos, url)
      })
    },
    // 发布文章
    async publishArticle() {
      // 获取文章字数
      this.form.wordCount = this.contentWordCount(this.form.content)
      // 将按钮设置成不可点击
      this.publish = true
      // 提交
      this.submit(this.form)
      this.publish = false
    },
    // 保存到草稿礼
    saveDraft() {
      // 获取文章字数
      this.form.wordCount = this.contentWordCount(this.form.content)
      // 将文章设置成草稿
      this.form.hide = true
      // 将按钮设置成不可点击
      this.save = true
      this.submit(this.form)
      this.save = false
    },
    // 修改或者提交按钮
    submit(form) {
      if (!(form.tagList instanceof Array)) {
        form.tagList = []
      }
      if (!(form.categoriesList instanceof Array)) {
        form.categoriesList = []
      }
      if (!form.date || form.date.trim().length === 0) {
        form.date = null
      }
      form.alias = null
      article.insertOrUpdate(form).then((response) => {
        this.$message({
          message: response,
          type: 'success'
        })
        delete this.$route.id
        Object.keys(this.form).forEach(key => (this.form[key] = ''))
      }, (err) => {
        this.$message.error(err)
      })
    },
    contentWordCount(content) {
      console.log(content)
      // 定义要去除的特殊字符
      const specialChars = /[*#+~=^:>.`|-]/g
      const hljsLeft = /hljsleft/g
      const hljsCenter = /hljscenter/g
      const hljsRight = /hljsright/g
      const lineBreaks = /[\r\n]/g
      const spaces = / /g
      // 定义要处理的字符串
      let stringLength = content
      // 将特殊字符全部替换为空字符
      // 计算去除特殊字符和hljsleft后字符串长度
      stringLength = stringLength.replace(specialChars, '').replace(lineBreaks, '').replace(spaces, '').replace(hljsLeft, '').replace(hljsCenter, '').replace(hljsRight, '')
      return stringLength.length
    },
    selectCategories() {
      categories.selectAll().then((data) => {
        this.categoriesList = data.records
      }, (err) => {
        console.log(err)
      })
    },
    handleClose(tag) {
      this.form.tagList.splice(this.form.tagList.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        if (this.form.tagList.indexOf(inputValue) < 0) {
          this.form.tagList.push(inputValue)
        } else {
          this.$message.error('请不要重复添加')
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style scoped>
.app-editor {
  padding: 20px 0;
  position: sticky;
}

.v-note-wrapper.shadow {
  /*z-index: -1;*/
}

.title {
  line-height: 3;
}

.block {
  padding: 10px 0;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button button {
  margin: 0 15px;
}

.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
<style>
.el-picker-panel__footer .el-picker-panel__link-btn.el-button--text {
  display: none;
}
</style>