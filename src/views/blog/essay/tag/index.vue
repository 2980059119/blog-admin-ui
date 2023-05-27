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

        <el-button type="success">搜索</el-button>
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
            <a>{{ tag.name }}</a><br/>
            <span>（文章：{{ tag.articleNumber }}）</span>
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
      <el-button type="danger" style="margin-left: 15px" @click="remove">删除</el-button>
    </el-card>

  </div>
</template>

<script>
export default {
  name: 'Tag',
  data() {
    return {
      tags: [
        {
          id: 1,
          name: '标签',
          articleNumber: 1
        }, {
          id: 2,
          name: '标签2',
          articleNumber: 1
        }, {
          id: 3,
          name: '标签3',
          articleNumber: 1
        }
      ],
      checkedTag: [],
      search: '',
      // 是否全选
      checkAll: false,
      // 设置 indeterminate 状态，只负责样式控制
      isIndeterminate: false
    }
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
    remove() {
      console.log(this.checkedTag)
    }
  }

}
</script>

<style scoped>

</style>
