<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div>
          <!-- 首页user信息 -->
          <el-card shadow="hover" class="userCard">
            <div style="text-align: center;flex: 1">
              <el-avatar :src="avatar" class="userAvatar"></el-avatar>
            </div>
              <p class="important-font"><el-tag class="secondary-font">管理员:</el-tag>{{ this.information.rolename }}</p>
            <div class="login-info">
              <hr/>
              <p>上次登录时间: 2022/07/06 18:16</p>
            </div>
          </el-card>
            <el-col class="tableInfo">
              <el-card class="card" shadow="never">
                <div slot="header">
                  <div><span style="height: 30px;font-size:18px;font-weight: bold">更新日志</span></div>
                </div>
                <el-timeline style="margin-top: 10px;height: 340px;width: 360px;overflow-y: auto">
                  <el-timeline-item style="line-height: 25px" v-for="(activity, index) in activities" :key="index" :color="activity.color"  :timestamp="activity.timestamp">
                    {{ activity.content }}
                  </el-timeline-item>
                </el-timeline>
              </el-card>
            </el-col>
        </div>
      </el-col>
      <el-col :span="16">
          <el-card style="height: 310px;width: 550px;display: inline-block">
            <div style="height:310px;width: 550px;display: flex" ref="barEcharts">{{initBarEcharts()}}</div>
          </el-card>
          <div class= "num graph">
            <el-card  class="pieChart">
              <div style="width: 280px;height: 280px;display: flex" ref="pieEcharts">{{initPieEcharts()}}</div>
            </el-card>
        </div>
        <Echarts style="margin-top:20px;height: 350px;width: 870px; border: #e9eef3 0.5px solid"/>
        <el-row>
          <el-col v-for="(item, index) in iconList" :key="index" :lg="4">
            <router-link target="_blank" :to="item.link">
              <el-card class="icon-panel" shadow="never" :style="{ background: item.color }">
                <div style="text-align: center;margin:-10px 0 0 15px;width: 50px;">
                  <component :is="item.icon" style="width: 20px; height: 20px;text-align: center"></component>
                  <p>{{ item.title }}</p>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Echarts from '../component/Weather.vue'
import  "@element-plus/icons-vue";
import {DataBoard, DocumentCopy, MagicStick, Monitor, Notebook} from "@element-plus/icons";
import {SwitchFilled} from "@element-plus/icons-vue";
export default {
  name: 'main',
  components:{
    DocumentCopy,
    Monitor,
    Notebook,
    DataBoard,
    MagicStick,
    SwitchFilled,
    Echarts
  },
  mounted() {
    this.information = localStorage.getItem('information')
    this.information = JSON.parse(this.information)
  },
  data() {
    return {
      information:[],
      avatar: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      activities: [
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(76,212,107,0.51)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
        { timestamp: '2016-05-03', content: '王小虎' ,color: 'rgba(221,221,221,0.53)'},
      ],
      iconList: [
        {
          icon: 'DocumentCopy',
          title: '表格',
          link: '/#',
          color: 'rgba(92,219,211,0.2)',
        },
        {
          icon: 'Monitor',
          title: '源码',
          link: '/#',
          color: 'rgba(179,127,235,0.2)',
        },
        {
          icon: 'Notebook',
          title: '书籍',
          link: '/#',
          color: 'rgba(105,192,255,0.2)',
        },
        {
          icon: 'DataBoard',
          title: '公告',
          link: '/#',
          color: 'rgba(255,133,192,0.2)',
        },
        {
          icon: 'MagicStick',
          title: '礼物',
          link: '/#',
          color: 'rgba(255,214,102,0.2)',
        },
        {
          icon: 'SwitchFilled',
          title: '休息一下',
          link: '/#',
          color: 'rgba(149,222,100,0.2)',
        },
      ],
    }
  },
  methods: {
//柱状图
    initBarEcharts() {
      let p = new Promise((resolve) => { resolve() })
      p.then(() => {
        let myChart = echarts.init(this.$refs.barEcharts)
        let option = {
          title: { text: '访问量折线图' },
          xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'] },
          yAxis: { type: 'value' },
          series: [{ data: [120, 200, 150, 80, 70, 110, 130], type: 'line', smooth: true }]
        }
        myChart.setOption(option);
      })
    },
    //饼图
    initPieEcharts() {
      let p = new Promise((resolve) => { resolve() })
      p.then(() => {
        let myChart = echarts.init(this.$refs.pieEcharts);
        let option= {
          title: { text: '代码类型占比' },
          tooltip: { trigger: 'item' },
          legend: { top: '85%', left: 'left' },
          series: [
            {
              name: '代码库类型占比',
              type: 'pie',
              radius: ['20%', '65%'],
              avoidLabelOverlap: false,
              label: { show: false, position: 'left' },
              labelLine: { show: false },
              data: [
                { value: 1048, name: 'Go' },
                { value: 735, name: 'Python' },
                { value: 580, name: 'Text' },
                { value: 484, name: 'Java' },
                { value: 300, name: 'Json' }
              ]
            }
          ]
        }
        myChart.setOption(option);
      })
    }
  }
}
</script>

<style>
.el-card__body{
  width: 100%;
}
.userAvatar{
  width: 100px;
  height: 100px;
}

.userCard {
  box-shadow: var(--el-box-shadow-light);
  display: flex;
  margin-top: 15px;
  width: 410px;
  height: 310px;
  border-radius: 2px;
}

.userInfo>*{
  display: inline-block;
}

.important-font {
  margin-top: 20px;
  text-align: center;
  margin-left: -50px;
  font-weight: 900;
  font-size: 25px;
}
.secondary-font {
  height: 26px;
  line-height: 18px;
  color: #909399;
}

.login-info {
  margin-top: 100px;
  height: 40px;
  text-align: left;
  color: #909399;
}

.tableInfo {
  box-shadow: var(--el-box-shadow-light);
  width: 410px;
  height: 410px;
  padding: 10px;
  margin: 22px 0 20px 0;
  border-radius: 2px;
}

.card{
  height: 390px;
  width: 390px;
}

.pieChart {
  width: 300px;
  height: 310px;
  margin-right: 1%;
  display: inline-block;
}

.num {
  display: flex;
  flex-wrap: wrap;
}
.graph {
  display: inline-block;
  margin: 15px 0 0 20px;
}

.icon-panel {
  margin: 20px 0 0 0;
  height: 50px;
  width: 120px;
  text-align: center;
  cursor: pointer;

  svg {
    font-size: 40px;
  }
}

</style>
