<template>
  <div class="app-container">
    <h1>文章分类</h1>
    <el-button type="success" style="margin-bottom: 15px" icon="el-icon-edit">添加分类</el-button>
    <el-card class="box-card">

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="排序"
        >
          <template v-slot="scope">
            <input :value="scope.row.sort">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
        >
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="分类ID"
        >
        </el-table-column>
        <el-table-column
          prop="alias"
          label="别名"
        >
        </el-table-column>
        <el-table-column
          label="查看"
        >
          <template v-slot="scope">
            <svg-icon icon-class="cat"/>
          </template>
        </el-table-column>
        <el-table-column
          prop="articleNumber"
          label="文章"
        >
        </el-table-column>
        <el-table-column
          label="操作"
        >
          <template v-slot="scope">
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-bottom: 30px;display: inline-block">
        <el-button type="primary">改变排序</el-button>
      </div>

    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      input10: '',
      height: document.documentElement.clientHeight - 350 + 'px',
      // 表格数据
      tableData: [
        {
          id: '1',
          sort: 1,
          name: 'iKun',
          description: '我是iKun',
          alias: 'IKun',
          articleNumber: 3
        },
        {
          id: '2',
          sort: 2,
          name: 'iKun',
          description: '我是iKun',
          alias: 'IKun',
          articleNumber: 3
        },
        {
          id: '3',
          sort: '3',
          name: 'iKun',
          description: '我是iKun',
          alias: 'IKun',
          articleNumber: 3
        },
        {
          id: '4',
          sort: 4,
          name: 'iKun',
          description: '我是iKun',
          alias: 'IKun',
          articleNumber: 3
        }
      ]
    }
  },
  mounted() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 350 + 'px'
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
