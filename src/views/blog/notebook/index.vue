<template>
  <div class="app-container">
    <h1>卡片笔记</h1>
    <h5>快速记录想法，帮你方便的捕捉灵感，积累知识的复利</h5>
    <el-input
      v-model="textarea"
      type="textarea"
      :rows="4"
      placeholder="请输入内容"
    >
    </el-input>
    <el-button type="success" style="margin: 20px 0" @click="insert">保存笔记</el-button>
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col v-for="(notebook) in notebookList" :key="notebook.id" :span="6">
        <el-card class="box-card">
          <p>{{ notebook.notebook }}</p>
          <el-footer>
            <span>{{ notebook.createTime }}</span>
            <el-divider direction="vertical"></el-divider>
            <span>{{ notebook.createBy }}</span>
            <el-button icon="el-icon-delete" circle @click="remove(notebook.id)"></el-button>
          </el-footer>
        </el-card>
      </el-col>
    </el-row>

    <span style="text-align: center;display:block; margin-top: 30px;">(有{{ notebookList.length }}条笔记)</span>

  </div>
</template>

<script>
import notebook from '@/api/blog/notebook'
export default {
  name: 'Notebook',
  data() {
    return {
      textarea: '',
      notebookList: []
    }
  },
  created() {
    this.selectAll()
  },
  methods: {
    remove(id) {
      notebook.remove([id]).then((response) => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.selectAll()
      }, (err) => {
        this.$message.error(err)
      })
      this.textarea = ''
    },
    selectAll() {
      notebook.selectAll().then((response) => {
        this.notebookList = response.records
      }, (err) => {
        this.$message.error(err)
      })
    },
    insert() {
      notebook.insert({ notebook: this.textarea }).then((response) => {
        this.$message({
          message: response,
          type: 'success'
        })
        this.selectAll()
      }, (err) => {
        this.$message.error(err)
      })
      this.textarea = ''
    }
  }
}
</script>

<style lang="less">
.el-row {
  flex-wrap: wrap-reverse;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  padding: 5px;
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
