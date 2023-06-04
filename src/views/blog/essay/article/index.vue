<template>
  <div class="app-container">
    <h1>文章</h1>
    <el-card class="box-card">
      <!-- 按分类查看 -->
      <el-select v-model="view" clearable style="display: inline-block;width: 150px" placeholder="按分类查看">
        <el-option
          v-for="item in categoriesList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <!-- 搜索框 -->
      <div style="display: inline-block;">
        <el-input
          v-model.lazy="search"
          style="display: inline-block;width: 150px"
          placeholder="请输入内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search" />
        </el-input>

        <el-button type="success" @click="submitSearch">搜索</el-button>
      </div>
      <!-- 文章列表 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        :stripe="true"
        :border="true"
        style="width: 100%;margin:25px 0"
        @selection-change="handleSelectionChange"
      >
        <!-- 标题 -->
        <el-table-column
          type="selection"
          width="40"
        />
        <!-- 标题 -->
        <el-table-column
          prop="title"
          label="标题"
        />
        <!-- 评论 -->
        <el-table-column
          label="评论"
        >
          <template v-slot="scope">
            <el-button type="primary">{{ scope.row.commentNumber }}</el-button>
          </template>
        </el-table-column>
        <!-- 浏览 -->
        <el-table-column
          label="浏览"
        >
          <template v-slot="scope">
            <el-button type="info">{{ scope.row.views }}</el-button>
          </template>
        </el-table-column>
        <!-- 作者 -->
        <el-table-column
          prop="createBy"
          label="作者"
        />
        <!-- 分类 -->
        <el-table-column
          prop="categories"
          label="分类"
        >
          <template v-slot="scope">
            <el-tag v-for="(value,key) in scope.row.categoriesList" :key="key" size="mini" class="categories">{{ value }}
            </el-tag>
          </template>
        </el-table-column>
        <!-- 时间 -->
        <el-table-column
          prop="createTime"
          label="时间"
        />
        <!-- 操作 -->
        <el-table-column
          prop="id"
          label="操作"
        >
          <template v-slot="scope">
            <el-button type="success" @click="update(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="remove([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 移动分类 -->
      <div style="display: inline-block">
        <el-select v-model="changeCategories" clearable style="width: 150px" placeholder="移动到分类">
          <el-option
            v-for="item in categoriesList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </div>
      <!-- 操作 -->
      <div style="margin-bottom: 30px;display: inline-block">
        <el-button type="primary" @click="updateArticleTopOrHide(true,true)">置顶</el-button>
        <el-button type="info" @click="updateArticleTopOrHide(true,true)">取消置顶</el-button>
        <el-button type="warning" @click="updateArticleTopOrHide(true,false)">放入草稿箱</el-button>
        <el-button type="danger" @click="remove(multipleSelection)">删除</el-button>
      </div>

      <span style="text-align: center;display:block;">(有 {{ total }} 篇文章)</span>

    </el-card>
  </div>
</template>

<script>
import article from '@/api/blog/article'
import categories from '@/api/blog/categories'

export default {
  name: 'Article',
  data() {
    return {
      // 分类列表
      categoriesList: [],
      // 搜索
      search: '',
      // 修改 文章 分类
      changeCategories: '',
      // 查看
      view: '',
      // 表格数据
      tableData: [],
      // 多个选择
      multipleSelection: [],
      // 是否显示修改
      isUpdate: false,
      // 总共多少条数据
      total: 0
    }
  },
  watch: {
    view: {
      handler(a, b) {
        this.submitCategories()
      }
    },
    // 文章分类
    changeCategories: {
      handler(a, b) {
        if (this.changeCategories.length > 0) {
          this.updateCategories()
        }
      }
    }
  },
  created() {
    // 获取不是草稿的文章
    this.selectArticle({ 'hide': false })
    // 获取分类列表
    this.selectCategories()
  },
  methods: {
    // 表格选中
    handleSelectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
    },
    // 修改 文章 分类
    updateCategories() {
      if (this.multipleSelection.length > 0) {
        const data = '{"' + this.changeCategories + '":' + JSON.stringify(this.multipleSelection) + '}'
        categories.updateCategories(JSON.parse(data)).then((response) => {
          this.$message({
            message: response,
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
        Object.keys(this.$data).forEach(key => (this.$data[key] = ''))
        this.selectArticle({ 'hide': false })
        this.selectCategories()
      } else {
        this.changeCategories = ''
        this.$message.error('请选择要操作的文章!')
      }
    },
    // 提交搜索
    submitSearch() {
      if (this.search.length > 0) {
        this.selectArticle({ title: this.search, 'hide': false, categoriesList: this.view })
      } else {
        this.$message.error('请输入要搜索的字段')
      }
    },
    // 按分类查找文章
    submitCategories() {
      this.selectArticle({ title: this.search, 'hide': false, categoriesList: this.view })
    },
    // 发布 和 置顶
    updateArticleTopOrHide(Boolean, isTop) {
      if (this.multipleSelection.length > 0) {
        const data = '{"' + Boolean + '":' + JSON.stringify(this.multipleSelection) + '}'
        article.updateArticleTopOrHide(JSON.parse(data), isTop).then((response) => {
          this.$message({
            message: response,
            type: 'success'
          })
        }, (err) => {
          this.$message.error(err)
        })
        Object.keys(this.$data).forEach(key => (this.$data[key] = ''))
        this.selectArticle({ 'hide': false })
      } else {
        this.changeCategories = ''
        this.$message.error('请选择要操作的文章!')
      }
    },
    // 删除
    remove(id) {
      article.removeIdList(id).then((response) => {
        this.$message({
          message: response,
          type: 'success'
        })
        Object.keys(this.$data).forEach(key => (this.$data[key] = ''))
        this.selectArticle({ 'hide': false })
      }, (err) => {
        this.$message.error(err)
      })
    },
    // 获取 文章
    selectArticle(data) {
      article.selectAll(data).then((response) => {
        this.tableData = response.records
        this.total = response.total
      }, (err) => {
        this.$message.error(err)
      })
    },
    // 获取全部分类
    selectCategories() {
      categories.selectAll().then((response) => {
        this.categoriesList = response.records
      }, (err) => {
        console.log(err)
        this.$message.error('获取分类列表失败')
      })
    },
    // 更新文章
    update(data) {
      this.$router.push({
        path: '/blog/essay/edit', query: {
          id: data
        }
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}

.el-icon-arrow-down {
  font-size: 12px;
}

.categories {
  margin: 0 2px;
}
</style>
