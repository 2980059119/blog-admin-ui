<template>
  <div class="app-container">
    <h1>文章分类</h1>
    <el-button type="success" icon="el-icon-edit" style="margin-bottom: 15px" @click="()=>{show = true}">添加分类</el-button>
    <el-card class="box-card">

      <el-table
        :data="categoriesList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          label="排序"
        >
          <template v-slot="scope">
            <input :value="scope.row.taxis">
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
    <div :class="show ? 'mask' : ''" />
    <el-card v-show="show" v-loading="loading" class="box-card" style="width: 500px;position: fixed;top: 100px;left: 0;right: 0;margin:0 auto;z-index: 1001;">
      <div slot="header" class="clearfix">
        <h3>新建分类</h3>
      </div>
      <el-form label-width="80px" :model="formCategories">
        <el-form-item label="分类名">
          <el-input v-model="formCategories.name" />
        </el-form-item>
        <el-form-item label="别名">
          <el-input v-model="formCategories.alias" />
          <span>用于URL的友好显示，可不填</span>
        </el-form-item>

        <el-form-item label="父分类">
          <el-select
            v-model="formCategories.pid"
            style="width: 100%"
            placeholder="不选择默认顶级类"
            clearable
          >
            <el-option
              v-for="item in categoriesList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="分类描述">
          <el-input
            v-model="formCategories.description"
            type="textarea"
            :rows="3"
          />
        </el-form-item>
        <el-divider />
        <div size="large" style="text-align: center;">
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="()=>{show = false, Object.keys(formCategories).forEach(key => (formCategories[key] = ''))}">取消</el-button>
        </div>
      </el-form>

    </el-card>
  </div>
</template>

<script>
import categories from '@/api/blog/categories'
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
      ],
      formCategories: {
        // 分类名字
        name: '',
        // 别名
        alias: '',
        // 父分类id 0 默认顶级
        pid: '',
        // 备注
        description: ''
      },
      show: false,
      // 表格数据
      categoriesList: [],
      loading: false
    }
  },
  mounted() {
    const that = this
    window.onresize = function temp() {
      that.height = document.documentElement.clientHeight - 350 + 'px'
    }
  },
  created() {
    // eslint-disable-next-line no-undef
    this.selectCategories()
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
    onSubmit() {
      this.loading = true
      if (this.formCategories.pid.length === 0) {
        this.formCategories.pid = 0
      }
      categories.insert(this.formCategories).then((data) => {
        this.$message({
          message: data,
          type: 'success'
        })
        this.selectCategories()
      }, (err) => {
        this.$message.error(err)
      })
      this.show = false
      Object.keys(this.formCategories).forEach(key => (this.formCategories[key] = ''))
      this.loading = false
    },
    selectCategories() {
      categories.selectAll().then((data) => {
        this.categoriesList = data.records
      }, (err) => {
        console.log(err)
        this.$message.error('获取分类列表失败')
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
.mask{
  z-index: 1001;
  position:fixed;
  top     : 0;
  left    : 0;
  bottom  : 0;
  right   : 0;
  background-color: rgba(109, 101, 101, 0.5);
}

</style>
