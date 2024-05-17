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
        <el-form-item label="API" prop="request_uri">
          <el-input v-model="form.request_uri" class="form-input" placeholder="请输入Api"></el-input>
        </el-form-item>
        <el-form-item label="方法" prop="method">
          <el-input v-model="form.method" class="form-input" placeholder="请输入方法类型"></el-input>
        </el-form-item>
        <el-form-item label="结果" prop="response_code">
          <el-input v-model="form.response_code" class="form-input" placeholder="请输入结果"></el-input>
        </el-form-item>
        <el-form-item label="返回信息" prop="response_msg">
          <el-input v-model="form.response_msg" class="form-input" placeholder="请输入结果"></el-input>
        </el-form-item>
        <el-form-item class="form-input" label="时间" prop="time">
          <el-date-picker
              v-model="form.time"
              placeholder="选择时间"
              type="date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="级别" prop="level">
          <el-input v-model="form.level" class="form-input" placeholder="请输入级别"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true;this.option = 1; this.title ='新增日志';this.form={}">
        + 新增
      </el-button>
      <el-button type="danger" @click="handleDelete"> - 批量删除</el-button>
    </div>
  </div>
  <el-table :data="tableData" style="width: 100%" @selection-change="setSelectRows">
    <el-table-column show-overflow-tooltip type="selection" />
    <el-table-column label="Api" prop="RequestURI" />
    <el-table-column label="方法" prop="Method" />
    <el-table-column label="IP" prop="ClientIP" />
    <el-table-column label="结果" prop="ResponseCode" />
    <el-table-column label="返回信息" prop="ResponseMsg" />
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
  name: "Log",
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
      title: "",
      dialogVisible: false,
      form: {
        id:"",
        request_uri: "",
        method: "",
        client_ip:"",
        response_code:"",
        response_msg:"",
        time:""
      },
      rules: {
        request_uri: [{required: true, message: "请输入Api"}],
        method: [{required: true, message: "请输入方法"}],
        response_code: [{required: true, message: "请输入结果"}],
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
        const res = await this.$api.GetLogInformationList(this.size, this.num) // 发送GET请求至后端接口
        if (res.data.code === 0) {
          this.tableData = res.data.data.logList;
          this.total = res.data.data.total;
        } else {
          ElMessage.error(res.data.msg)
        }
      } catch (error) {
        ElMessage.error('获取日志列表失败')
      }
    },
    handleEdit(row){
      this.dialogVisible = true;
      this.form.id = row.Id
      this.form.request_uri=row.RequestURI
      this.form.method=row.Method
      this.form.response_code=row.ResponseCode
      this.form.response_msg=row.ResponseMsg
      this.form.time=row.Time
      this.form.level=row.Level
      this.title ='编辑日志';
    },
    handleClose() {
      this.dialogVisible = false
    },
    async submit() {
      if (this.option === 1) {
        try {
          const res = await this.$api.AddLogInformation(
          this.form.request_uri,
          this.form.method,
          parseInt(this.form.response_code),
          this.form.response_msg,
          this.form.time,
          this.form.level,
          )
          if (res.data.code === 0) {
            ElMessage.success(res.data.msg)
          } else {
            ElMessage.error(res.data.msg)
          }
        } catch (error) {
          ElMessage.error('添加角色信息失败!')
        }
      } else if (this.option === 2) {
        try {
          const res = await this.$api.PutLogInformation(
              parseInt(this.form.id),
              this.form.request_uri,
              this.form.method,
              parseInt(this.form.response_code),
              this.form.response_msg,
              this.form.time,
              this.form.level,
          )
          if (res.data.code === 0) {
            ElMessage.success(res.data.msg)
          } else {
            ElMessage.error(res.data.msg)
          }
        } catch (error) {
          ElMessage.error('修改角色信息失败!')
        }
      } else {
        ElMessage.error("操作失败,请重新尝试一下!")
      }
      await this.getInformationList()
      this.dialogVisible = false
    },
    handleDelete(row){
      if (row.Id) {
        ElMessageBox.confirm('你确定要删除当前项吗')
            .then(async () => {
              const res = await this.$api.DeleteLogInfo([row.Id])
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
                const res = await this.$api.DeleteRoleInfo(id)
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
.delete-dialog{
  height: 140px;
}
</style>
