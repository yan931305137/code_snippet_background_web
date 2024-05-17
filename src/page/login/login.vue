<template>
  <div>
    <div class="login-box">
      <h2 style="font-size: 20px; color: #03e9f4">Code_Snippet后台管理</h2>
      <form>
        <el-row class="user-box">
          <input v-model="username" name="" required="" type="text">
          <label>账 号</label>
        </el-row>
        <el-row class="user-box">
          <input v-model="password" name="" required="" type="password">
          <label>密 码</label>
        </el-row>
        <el-row class="user-box">
          <el-col :span="15">
            <input v-model="captchaInput" name="" required="" type="text">
            <label>验证码</label>
          </el-col>
          <el-col :span="6">
            <img :src="captchaImage" alt="验证码" class="captcha-img" @click="refreshCaptcha" style="width: 120px;height: 40px;">
          </el-col>
        </el-row>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a style="width: 200px ;background-color: rgba(238,238,238,0.2);text-align: center;cursor: pointer"
           @click="login">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
      </form>
    </div>
  </div>
</template>

<script>
//导入
import {ElMessage} from "element-plus";
import api from '../../api/index'

export default {
  data() {
    return {
      username: '',
      password: '',
      captchaInput: '',
      captchaImage: '',
      captchaIdKey: ''
    }
  },
  mounted() {
    this.refreshCaptcha()
  },
  methods: {

    async refreshCaptcha() {
      this.captchaInput = '';
      try {
        const res = await api.captcha();
        if (res.data.code === 0) {
          this.captchaIdKey = res.data.idkey;
          this.captchaImage = res.data.data;
        } else {
          ElMessage.error(res.data.msg);
        }
      } catch (error) {
        console.log(error);
        ElMessage.error('验证码获取失败，请稍后重试');
      }
    },
    async login () {
      try {
        if (this.captchaInput.trim() !== '' && this.username.trim() !== '' && this.password.trim() !== '') {
          let res = await this.$api.login(this.username, this.password, this.captchaInput, this.captchaIdKey)
          if (res.data.code === 0) {
            ElMessage.success('登录成功')
            // 存储token到浏览器
            localStorage.setItem('token', res.data.token)
            this.$router.replace("/home");
            // await this.$parent.getInformation()
          } else {
            ElMessage.error(res.data.msg)
            await this.refreshCaptcha()
          }
        } else {
          ElMessage.error('请将登录表格填写完整!')
          await this.refreshCaptcha()
        }
      } catch (error) {
        ElMessage.error('登录失败，请稍后重试')
        await this.refreshCaptcha()
      }
    },
  }
}
</script>

<style>
body {
  background-color: #e9eef3;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0 -50px;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, .5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #e9eef3;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #e9eef3;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #e9eef3;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #e9eef3,
  0 0 25px #e9eef3,
  0 0 50px #e9eef3,
  0 0 100px #e9eef3;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #e9eef3);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #ffffff);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #e9eef3);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}
</style>
