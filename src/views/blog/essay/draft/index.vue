<template>
  <div class="app-container">
    <h1>草稿箱</h1>
    <el-card class="box-card">
      <el-select v-model="sort" style="display: inline-block;width: 150px" placeholder="请选择">
        <el-option
          v-for="item in categories"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div style="display: inline-block;">
        <el-input
          v-model.lazy="search"
          style="display: inline-block;width: 150px"
          placeholder="请输入内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-button type="success" @click="submitSearch">搜索</el-button>
      </div>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%;margin:25px 0"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
        >
        </el-table-column>
        <el-table-column
          label="评论"
        >
          <template v-slot="scope">
            <el-button type="primary">{{ scope.row.comment }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="浏览"
        >
          <template v-slot="scope">
            <el-button type="info">{{ scope.row.browse }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
        >
        </el-table-column>
        <el-table-column
          prop="categories"
          label="分类"
        >
        </el-table-column>
        <el-table-column
          prop="time"
          label="时间"
          width="120"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作"
        >
          <template v-slot="scope">
            <el-button type="danger" @click="remove(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="display: inline-block">
        <el-select v-model="top" style="width: 150px" placeholder="请选择">
          <el-option
            v-for="item in topList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-select v-model="sort" style="width: 150px" placeholder="请选择">
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div style="margin-bottom: 30px;display: inline-block">
        <el-button type="primary" @click="release">发布</el-button>
        <el-button type="danger" @click="remove(undefined)">删除</el-button>
      </div>

      <span style="text-align: center;display:block;">(有 {{ tableData.length }} 篇文章)</span>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Draft',
  data() {
    return {
      // 分类列表
      categories: [
        {
          value: '1',
          label: '按分类查看'
        },
        {
          value: '2',
          label: '未分类'
        }
      ],
      // 搜索
      search: '',
      // 排序
      sort: '',
      // 置顶
      top: '',
      // 表格数据
      tableData: [
        {
          id: '1',
          title: '标题1',
          comment: '12',
          browse: '1',
          author: '作者1',
          categories: '分类1',
          time: '2016-05-03'
        },
        {
          id: '2',
          title: '标题1',
          comment: '1',
          browse: '1',
          author: '作者1',
          categories: '分类1',
          time: '2016-05-03'
        },
        {
          id: '3',
          title: '标题1',
          comment: '1',
          browse: '1',
          author: '作者1',
          categories: '分类1',
          time: '2016-05-03'
        }
      ],
      // 多个选择
      multipleSelection: [],
      // 置顶列表
      topList: [
        {
          label: '置顶',
          value: '1'
        },
        {
          label: '首页置顶',
          value: '2'
        },
        {
          label: '分类置顶',
          value: '3'
        },
        {
          label: '取消置顶',
          value: '4'
        }
      ]
    }
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(function(item) {
        return item.id
      })
    },
    // 提交搜索
    submitSearch() {
      console.log(this.search)
    },
    // 发布
    release() {
      console.log('发布')
    },
    // 删除
    remove(id) {
      if (id !== undefined) {
        console.log('删除id')
      } else {
        console.log('批量删除')
        console.log(this.multipleSelection)
      }
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
</style>
