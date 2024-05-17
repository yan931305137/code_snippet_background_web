<template>
  <div class="common-layout">
    <el-container class="box">
      <!-- 左侧菜单栏 -->
      <el-aside class="el-aside">
        <h1 class="logoBox">Code_Snippet</h1>
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
          :router="true"
        >
          <template v-for="item in asideMenu">
            <!-- 两级菜单 -->
            <template v-if="item.subs">
              <el-sub-menu :index="item.title" :key="item.title">
                <!-- 一级菜单标题 -->
                <template #title>
                  <el-icon><document /></el-icon>
                  <span>{{ item.title }}</span>
                </template>
                <!-- 二级菜单标题 -->
                <template v-for="subItem in item.subs" :key="subItem.index">
                  <el-menu-item
                    :index="subItem.index"
                    @click="() => handleMenuItem(subItem)"
                    >{{ subItem.title }}</el-menu-item
                  >
                </template>
              </el-sub-menu>
            </template>

            <!-- 一级菜单 -->
            <template v-else>
              <el-menu-item
                :index="item.index"
                :key="item.title"
                @click="() => handleMenuItem(item)"
              >
                <el-icon><document /></el-icon>
                <span>{{ item.title }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- header头部菜单 -->
        <el-header class="header">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-menu-item index="1" class="fr">管理员:{{ this.roleName }}</el-menu-item>
            <el-sub-menu index="2" class="fr">
              <template #title class="fr">我的工作台</template>
              <el-menu-item index="2-1">我的消息</el-menu-item>
              <el-menu-item index="2-2">设置</el-menu-item>
              <el-menu-item index="2-3" @click="exitLogin"
                >退出登陆</el-menu-item
              >
            </el-sub-menu>
          </el-menu>
        </el-header>

        <!-- 主体模块：标签页 + 当前路由内容 -->
        <el-main class="el-main" >
          <el-tabs
            type="border-card"
            v-model="activeTabName"
            class="demo-tabs"
            @tab-remove="handleRemove"
            @tab-click="handleSwitchRoute"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.index"
              :label="item.title"
              :name="item.index"
              :closable="handleisClose(item)"
            >
              <router-view />
            </el-tab-pane>
          </el-tabs>
        </el-main>
        <el-footer style="background-color: #e9eef3;height: 15px;text-align: center;border-top:0.5px #aaaaaa solid;">
          <div >
            <div >Code_Snippet后台管理系统</div>
          </div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";
export default {
  name: "MainLayout",
  mounted() {
    const indexTab = localStorage.getItem('activeTabName');
    if (indexTab) {
      this.activeTabName = indexTab;
    }

    const storedTabs = localStorage.getItem('editableTabs');
    if (storedTabs) {
      this.editableTabs = JSON.parse(storedTabs);
    }

    if (localStorage.getItem('token') !== null && localStorage.getItem('information') === null) {
      this.getInformation()
    }
    const information = JSON.parse(localStorage.getItem('information'))
    if (information) {
      this.roleName = information.rolename
      this.avatar = information.avatar
      this.email = information.email
      this.phone = information.phone
      this.address = information.address
      this.birthday = information.birthday
      this.gender = information.gender
      this.status = information.status
    }
  },
  data() {
    return {
      roleName:"",
      //当前选项卡
      activeTabName: "home",
      //需要显示的标签数组
      editableTabs: [
        {
          title: "首页",
          index: "home",
        },
      ],
      //左侧菜单选项配置
      asideMenu: [
        {
          title: "首页",
          index: "home",
        },
        {
          title: "用户管理",
          index: "user",
        },
        {
          title: "代码管理",
          index: "code",
        },
        {
          title: "网站管理",
          subs: [
            {
              title: "排行榜管理",
              index: "top",
            },
            {
              title: "网站设置",
              index: "info",
            },
          ],
        },
        {
          title: "角色管理",
          index: "role",
        },
        {
          title: "日志管理",
          index: "log",
        },
        {
          title: "系统设置",
          index: "setting",
        },
      ],
    };
  },
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
  },
  watch: {
    activeTabName: function () {
      console.log("高亮的index值", this.activeTabName);
    },
  },
  methods: {
    async getInformation () {
      try {
        const res = await this.$api.GetInformation() // 发送GET请求至后端接口
        if (res.data.code === 0) {
          this.roleName=res.data.data.RoleName
          const information = {
            rolename: res.data.data.RoleName,
            avatar: res.data.data.Avatar,
            phone: res.data.data.Mobile,
            gender: res.data.data.Gender,
            email: res.data.data.Email,
            birthday: res.data.data.Birthday,
            place: res.data.data.CityName,
            address: res.data.data.Address,
            status: res.data.data.Status
          }
          localStorage.setItem('information', JSON.stringify(information))
        } else {
          ElMessage.error(res.data.msg)
        }
      } catch (error) {
        ElMessage.error('获取用户名失败') // 打印错误信息到控制台
      }
    },
    handleisClose(item) {
      return item.index !== "home";
    },
    //点击二级菜单标题 和 没有下一级菜单的标题
    //添加显示的标签
    handleMenuItem(obj) {
      //高亮设置
      this.activeTabName = obj.index;
      let result = this.editableTabs.findIndex((item) => {
        return item.index === obj.index;
      });
      if (result !== -1) {
        return;
      }
      this.editableTabs.push(obj);
      localStorage.setItem('editableTabs', JSON.stringify(this.editableTabs))
      localStorage.setItem('activeTabName', this.activeTabName)
    },

    //点击切换tab标签，切换组件
    handleSwitchRoute(tabsPaneContext) {
      let tabPaneName = tabsPaneContext.paneName;
      //处理一个特殊情况，首页的index 为 '' ，这里取得值为0
      if (tabPaneName === 0) {
        tabPaneName = "";
      }
      this.$router.push("/" + tabPaneName);
      this.activeTabName = tabPaneName
      localStorage.setItem('activeTabName', this.activeTabName)
    },

    //(1)移除标签，（2）返回前一个路由
    //删除: 需要当前索引 ，设置路由和高亮，上一个对象的index
    handleRemove(tabPaneName) {
      let tempArr = this.editableTabs;
      let eleIndex = this.editableTabs.findIndex((item) => {
        return item.index === tabPaneName;
      });
      //上一个路由的index
      let routeIndex;
      for (let p in tempArr) {
        if (tempArr[p].index === tabPaneName) {
          routeIndex = tempArr[p - 1].index;
        }
      }
      //高亮和退到前一个路由
      this.activeTabName = routeIndex;
      this.$router.push("/" + routeIndex);
      //删除当前关闭的路由标签
      this.editableTabs.splice(eleIndex, 1);
      localStorage.setItem('editableTabs', JSON.stringify(this.editableTabs))
      localStorage.setItem('activeTabName', this.activeTabName)
    },

    //退出登陆
    exitLogin() {
      ElMessageBox.confirm("真的要退出登陆吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          localStorage.clear()
          this.$router.push("/login");
        })
        .catch(() => {
          //取消：就不做任何提示了
        });
    },
  },
};
</script>

<style scoped>
.logoBox {
  position: absolute;
  top: 18px;
  left: 30px;
  font-size: 24px;
  color: #fff;
}

.box {
  width: 100vw;
  height: 100vh;
}
.header {
  padding: 0;
  height: 58px;
}

.el-menu--horizontal {
  justify-content: flex-end;
}

.el-header .el-menu {
  border-bottom: none;
}
.el-aside .el-menu {
  border-right: none;
}

.el-main {
  background-color: #e9eef3;
}

.el-aside {
  width: 240px;
  background: #545c64;
  padding-top: 58px;
}
.el-tabs--border-card .el-tabs__content {
  padding: 0;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
.el-main .el-tabs__content {
  padding: 0 !important;
}
.demo-tabs > .el-tabs__content {
  background-color: brown;
  padding: 0 !important;
}
</style>
