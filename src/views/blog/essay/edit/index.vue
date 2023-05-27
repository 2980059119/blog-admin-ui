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
              v-for="item in categories"
              :key="item.name"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <span class="title">标签：(也用于文章页关键词， 多个用英文逗号分隔)</span>
        <el-input
          v-model.lazy="form.label"
          placeholder="标签"
          clearable
        >
        </el-input>
        <div class="block">
          <span class="demonstration">发布时间：（当设置未来的时间点时，文章将在该时间点后定时发布）</span>
          <el-date-picker
            v-model="form.time"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <el-switch
          v-model="form.allowComments"
          active-text="允许评论"
        >
        </el-switch>

      </el-card>
      <h3>文章摘要:</h3>
      <div class="app-editor" style="padding-top: 0;">
        <mavon-editor
          v-model="form.abstract"
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
        <mavon-editor v-model="form.postsContent" :style="'height:' + height" @imgAdd="imgAdd"/>
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

export default {
  name: 'Edit',
  data() {
    return {
      input10: '',
      height: document.documentElement.clientHeight - 350 + 'px',
      // 分类列表
      categories: [
        {
          name: 'test',
          id: 1
        },
        {
          name: 'test1',
          id: 2
        }
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      // 发布文章加载
      publish: false,
      // 保存草稿加载
      save: false,
      form: {
        // 文章标题
        title: '',
        // 分类列表
        categoriesList: [],
        // 标签
        label: '',
        time: '',
        allowComments: true,
        abstract: '',
        postsContent: ''
      }
    }
  },
  mounted() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 350 + 'px'
    }
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
    publishArticle() {
      this.publish = true
      console.log(this.form)
    },
    saveDraft() {
      this.save = true
      console.log(this.form)
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
</style>
