<template>
  <div class="app-container">
    <h1>文章标签</h1>
    <el-card class="box-card">
      <span>总标签数 ({{ tags.length }})</span>
      <div style="display: inline-block;">
        <el-input
          v-model="search"
          style="display: inline-block;width: 150px"
          placeholder="请输入内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>

        <el-button type="success" @click="select">搜索</el-button>
      </div>
      <el-divider></el-divider>
      <el-checkbox-group v-model="checkedTag" @change="handleCheckedCitiesChange">
        <el-card
          v-for="(tag) in tags"
          :key="tag.id"
          class="box-card"
          style="width: auto;margin: 5px;display: inline-block"
        >
          <el-checkbox :key="tag.id" :label="tag.id">
            <a>{{ tag.tagName }}</a><br />
            <span>（文章：{{ tag.articleNum }}）</span>
          </el-checkbox>
        </el-card>

      </el-checkbox-group>
      <el-checkbox
        v-model="checkAll"
        :indeterminate="isIndeterminate"
        @change="handleCheckAllChange"
        style="margin-top: 15px"
      >全选

      </el-checkbox>
      <el-button type="danger" style="margin-left: 15px" @click="remove(checkedTag)">删除</el-button>
    </el-card>

  </div>
</template>

<script>
import tag from '@/api/blog/tag'
export default {
  name: 'Tag',
  data() {
    return {
      tags: [],
      // 被选中的标签
      checkedTag: [],
      // 搜索标签
      search: '',
      // 是否全选
      checkAll: false,
      // 设置 indeterminate 状态，只负责样式控制
      isIndeterminate: false
    }
  },
  created() {
    this.selectAll()
  },
  methods: {
    handleCheckAllChange(val) {
      console.log(val)
      this.checkedTag = val ? this.tags.map(function(value) {
        return value.id
      }) : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.tags.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.tags.length
    },
    remove(data) {
      tag.remove(data).then((response) => {
        this.$message({
          message: response,
          type: 'success'
        })
      }, (err) => {
        this.$message.error(err)
      })
      this.selectAll()
    },
    selectAll(data) {
      tag.selectAll(data).then((response) => {
        this.tags = response.records
      }, (err) => {
        this.$message.error(err)
      })
    },
    select() {
      this.selectAll({ tagName: this.search })
    }
  }
}
</script>

<style scoped>

</style>
