<template>
  <div class="app-container">
    <h1>评论</h1>
    <el-card class="box-card">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        border
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="40"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="内容"
        >
        </el-table-column>
        <el-table-column
          prop="commentators"
          label="评论人"
        >
        </el-table-column>
        <el-table-column
          prop="fromArticle"
          label="来自文章"
        >
          <template v-slot="scope">
            <span>{{ scope.row.fromArticle }}</span>
            <el-button type="danger">按IP删除</el-button>
          </template>

        </el-table-column>

        <el-table-column
          prop="releaseTime"
          label="发布时间"
        >
        </el-table-column>
        <el-table-column
          prop="operation"
          label="操作"
        >
          <el-button type="danger">回复评论</el-button>
          <el-button type="danger">按IP删除</el-button>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 10px">
        <el-button type="primary">置顶</el-button>
        <el-button type="success">取消置顶</el-button>
        <el-button type="info">隐藏</el-button>
        <el-button type="warning">审核</el-button>
        <el-button type="danger">删除</el-button>
      </el-row>
      <span style="text-align: center;display:block;">(有 {{ tableData.length }} 条评论)</span>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  data() {
    return {
      tableData: [
        {
          content: '内容1',
          commentators: '评论人1',
          fromArticle: '来自文章1',
          releaseTime: '2016-05-03'
        },
        {
          content: '内容1',
          commentators: '评论人1',
          fromArticle: '来自文章1',
          releaseTime: '2016-05-03'
        },
        {
          content: '内容1',
          commentators: '评论人1',
          fromArticle: '来自文章1',
          releaseTime: '2016-05-03'
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
    }
  }
}
</script>

<style scoped>

</style>
