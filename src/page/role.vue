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
        <el-form-item label="角色名" prop="rolename">
          <el-input v-model="form.rolename" class="form-input" placeholder="请输入角色名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" class="form-input" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="authority">
          <el-input v-model="form.authority" class="form-input" placeholder="请输入权限类别"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" class="form-input" placeholder="请选择">
            <el-option label="男" value="1"></el-option>
            <el-option label="女" value="2"></el-option>
            <el-option label="保密" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="form-input" label="出生日期" prop="birth">
          <el-date-picker
              v-model="form.birth"
              placeholder="选择日期"
              type="date"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="form.mobile" class="form-input" placeholder="请输入电话号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="emile">
          <el-input v-model="form.email" class="form-input" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address" class="form-input" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="dialogVisible = true;this.option = 1; this.title ='新增角色';this.form={}">
        + 新增
      </el-button>
      <el-button type="danger" @click="handleDelete"> - 批量删除</el-button>
    </div>
  </div>
  <el-table :data="tableData" style="width: 100%" @selection-change="setSelectRows">
    <el-table-column show-overflow-tooltip type="selection" />
    <el-table-column label="角色名" prop="RoleName" />
    <el-table-column label="权限" prop="Authority" />
    <el-table-column label="电话号" prop="Mobile" />
    <el-table-column label="邮箱" prop="Email" />
    <el-table-column label="地址" prop="Address" />
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
  name: "Role",
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
        rolename: "",
        password: "",
        authority: "",
        age: "",
        sex: "",
        birth: "",
        address: "",
        mobile: "",
        email: ""
      },
      rules: {
        rolename: [{required: true, message: "请输入角色名"}],
        password: [{required: true, message: "请输入密码"}],
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
        const res = await this.$api.GetRoleInformationList(this.size, this.num) // 发送GET请求至后端接口
        if (res.data.code === 0) {
          this.tableData = res.data.data;
          this.total = this.tableData.length
        } else {
          ElMessage.error(res.data.msg)
        }
      } catch (error) {
        ElMessage.error('获取角色名失败')
      }
    },
    handleEdit(row){
      this.dialogVisible = true;
      this.form.rolename=row.RoleName
      this.form.password=row.Password
      this.form.authority=row.Authority
      switch (row.Gender){
        case 1:this.form.sex="男";break
        case 2:this.form.sex="女";break
        case 3:this.form.sex="保密";break
      }
      this.form.birth=row.Birthday
      this.form.mobile=row.Mobile
      this.form.email=row.Email
      this.form.address=row.Address
      this.title ='编辑角色';
    },
    handleClose() {
      this.dialogVisible = false
    },
    async submit() {
      if (this.option === 1) {
        try {
          const res = await this.$api.AddRoleInformation(
              this.form.rolename,
              this.form.password,
              parseInt(this.form.authority),
              parseInt(this.form.sex),
              this.form.age,
              this.form.birth,
              this.form.address,
              this.form.mobile,
              this.form.email
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
          let sex
          switch (this.form.sex){
            case "男":sex=1;break
            case "女":sex=2;break
            case "保密":sex=3;break
            default :sex=this.form.sex;break
          }
          const res = await this.$api.PutRoleInformation(
              this.form.rolename,
              this.form.password,
              parseInt(this.form.authority),
              parseInt(sex),
              this.form.age,
              this.form.birth,
              this.form.address,
              this.form.mobile,
              this.form.email
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
              const res = await this.$api.DeleteRoleInfo([row.Id])
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
