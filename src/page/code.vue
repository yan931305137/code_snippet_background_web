<template>
  <div class="manage">
    <el-dialog
        v-model="dialogVisible"
        :before-close="handleClose"
        class="role-dialog"
        :title="this.title"
    >
      <el-form
          ref="form"
          :model="form"
          :rules="rules"
          label-width="80px"
      >
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" class="form-input" placeholder="请输入所属用户ID"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" class="form-input" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="content">
          <el-input v-model="form.content" class="form-input" placeholder="请输入代码"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="authority">
          <el-select v-model="form.authority" class="form-input" placeholder="请选择">
            <el-option label="公开" value="1"></el-option>
            <el-option label="私人" value="2"></el-option>
            <el-option label="加密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="form.description" class="form-input" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-input v-model="form.category" class="form-input" placeholder="请输入类别"></el-input>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <el-input v-model="form.tags" class="form-input" placeholder="请输入标签"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true;this.option = 1; this.title ='新增代码';this.form={}">
        + 新增
      </el-button>
      <el-button type="danger" @click="handleDelete"> - 批量删除</el-button>
    </div>
  </div>
  <el-table :data="tableData" style="width: 100%"  @selection-change="setSelectRows">
    <el-table-column show-overflow-tooltip type="selection" />
    <el-table-column label="用户ID" prop="UserID" />
    <el-table-column label="标题" prop="Title" />
    <el-table-column label="代码片段" prop="Content" />
    <el-table-column label="权限" prop="Authority" />
    <el-table-column label="描述" prop="Description" />
    <el-table-column label="类别" prop="Category" />
    <el-table-column label="标签" prop="Tags" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索一下" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="this.form={};this.option = 2;handleEdit(scope.row)">
          编辑
        </el-button>
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-row style="float:right;margin-top: 20px">
    <el-col style="text-align:right">
      <el-pagination
          background
          :current-page="num"
          layout="total, sizes, prev, pager, next, jumper"
          :page-size="size"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
      />
    </el-col>
  </el-row>
</template>

<script>
import {ElMessage, ElMessageBox} from "element-plus";

export default {
  name: "Code",
  mounted() {
    this.getInformationList()
  },
  data() {
    return {
      selectRows:'',
      option: 1,
      size: 10,
      num: 1,
      total: 0,
      tableData: [],
      deleteId: 0,
      title: "",
      // 是否显示该弹框
      dialogVisible: false,
      form: {
        id:"",
        userId:"",
        title: "",
        content: "",
        description: "",
        authority: "",
        category: "",
        tags: ""
      },
      rules: {
        userId: [{required: true, message: "请输入所属用户ID"}],
        title: [{required: true, message: "请输入标题"}],
        content: [{required: true, message: "请输入代码"}],
        authority: [{required: true, message: "请输入权限类别"}],
      },
    };
  },
  methods: {
    setSelectRows(val) {
      this.selectRows = val
    },
    handleSizeChange(size) {
      this.size = size
      this.getInformationList()
    },
    handleCurrentChange(num) {
      this.num = num
      this.getInformationList()
    },
    async getInformationList() {
      try {
        const res = await this.$api.GetCodeInformationList(this.size, this.num) // 发送GET请求至后端接口
        if (res.data.code === 0) {
          this.tableData = res.data.data;
          this.total = res.data.count
        } else {
          ElMessage.error(res.data.msg)
        }
      } catch (error) {
        ElMessage.error('获取标题失败') // 打印错误信息到控制台
      }
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.form.id = row.Id
      this.form.userId = row.UserID
      this.form.title = row.Title
      this.form.content = row.Content
      this.form.authority = row.Authority
      this.form.description = row.Description
      this.form.category = row.Category
      this.form.tags = row.Tags
      this.title = '编辑代码信息';
    },
    handleClose() {
      this.dialogVisible = false
    },
    async submit() {
      if (this.option === 1) {
        try {
          const res = await this.$api.AddCodeInformation(
              this.form.userId,
              this.form.title,
              this.form.content,
              parseInt(this.form.authority),
              this.form.description,
              this.form.category,
              this.form.tags
          )
          if (res.data.code === 0) {
            ElMessage.success(res.data.msg)
          } else {
            ElMessage.error(res.data.msg)
          }
        } catch (error) {
          ElMessage.error('添加代码片段信息失败!')
        }
      } else if (this.option === 2) {
        try {
          const res = await this.$api.PutCodeInformation(
              this.form.id,
              this.form.userId,
              this.form.title,
              this.form.content,
              parseInt(this.form.authority),
              this.form.description,
              this.form.category,
              this.form.tags,
          )
          if (res.data.code === 0) {
            ElMessage.success(res.data.msg)
          } else {
            ElMessage.error(res.data.msg)
          }
        } catch (error) {
          ElMessage.error('修改代码片段信息失败!')
        }
      } else {
        ElMessage.error("操作失败,请重新尝试一下!")
      }
      await this.getInformationList()
      this.dialogVisible = false
    },
    handleDelete(row) {
      if (row.Id) {
        ElMessageBox.confirm('你确定要删除当前项吗')
            .then(async () => {
              const res = await this.$api.DeleteCodeInfo([row.Id])
              if (res.data.code === 0) {
                await this.getInformationList()
                ElMessage.success(res.data.msg)
              } else {
                ElMessage.error(res.data.msg)
              }
            })
      } else {
        if (this.selectRows.length > 0) {
          const id = this.selectRows.map(item => parseInt(item.Id))
          ElMessageBox.confirm('你确定要删除选中项吗')
           .then(async () => {
            const res = await this.$api.DeleteCodeInfo(id)
             if (res.data.code === 0) {
               await this.getInformationList()
               ElMessage.success(res.data.msg)
             } else {
               ElMessage.error(res.data.msg)
             }
          })
        }else {
          ElMessage.error('未选中任何行')
          return false
        }
      }
    }
  },
}
</script>
<style>
.role-dialog {
  padding: 30px -30px;
  width: 650px;
  height: 500px;
}

.form-input {
  width: 500px;
}

.dialog-footer {
  float: right;
}

</style>
