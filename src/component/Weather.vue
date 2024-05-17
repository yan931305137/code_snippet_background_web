<template>
  <el-card>
    <div>
      <div id="line-chart" style="width: 100%; height: 350px;"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";

export default {
  name: 'Echarts',
  mounted() {
    // 从 JSON 中提取数据
    axios.get('https://restapi.amap.com/v3/weather/weatherInfo?city=110101&extensions=all&key=897e71a6af0e4aed7a3599247b398386')
        .then((res) => {
          console.log(res.data.forecasts[0].casts[0])
          const forecasts = [
            { date: res.data.forecasts[0].casts[0].date, daytemp: res.data.forecasts[0].casts[0].daytemp, nighttemp:  res.data.forecasts[0].casts[0].nighttemp },
            { date: res.data.forecasts[0].casts[1].date, daytemp: res.data.forecasts[0].casts[1].daytemp, nighttemp:  res.data.forecasts[0].casts[1].nighttemp },
            { date: res.data.forecasts[0].casts[2].date, daytemp: res.data.forecasts[0].casts[2].daytemp, nighttemp:  res.data.forecasts[0].casts[2].nighttemp },
            { date: res.data.forecasts[0].casts[3].date, daytemp: res.data.forecasts[0].casts[3].daytemp, nighttemp:  res.data.forecasts[0].casts[3].nighttemp },
          ];
          // 提取日期和温度
          const dates = forecasts.map(item => item.date);
          const dayTemps = forecasts.map(item => parseInt(item.daytemp));
          const nightTemps = forecasts.map(item => parseInt(item.nighttemp));

          // 初始化 ECharts
          const myChart = echarts.init(document.getElementById('line-chart'));

          // 折线图的配置
          const option = {
            title: {
              text: '温度预报',
              subtext: '每日最高和最低温度'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['白天温度', '夜间温度']
            },
            xAxis: {
              type: 'category',
              data: dates
            },
            yAxis: {
              type: 'value',
              axisLabel: {
                formatter: '{value} °C'
              }
            },
            series: [
              {
                name: '白天温度',
                type: 'line',
                data: dayTemps
              },
              {
                name: '夜间温度',
                type: 'line',
                data: nightTemps
              }
            ]
          };
          // 设置配置并渲染图表
          myChart.setOption(option);
        })
  }
}
</script>

<style>
/* 在这里可以添加样式 */
</style>
