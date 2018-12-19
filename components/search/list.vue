<template>
  <div class="m-list">
    <dl class="m-list-title">
      <dt>有格调</dt>
      <dd
        v-for="(item,index) in list"
        :key="index"
        :data-type="item.type"
        :class="type === item.type ? 'active' : ''"
        @mouseenter="enter"
      >
        {{ item.name }}
      </dd>
    </dl>
    <div class="m-list-container">
      <template
        v-for="(item,idex) in currentList.child">
        <div :key="idex" >
          <img :src="item.imgUrl">
          <h4 
            :title="item.title"
            class="title">
            {{ item.title }}
          </h4>
          <h5
            :title="item.subTitle"
            class="sub-title">
            {{ item.subTitle }}
          </h5>
          <p>
            <span class="currentPrice">¥{{ item.currentPrice }}</span>
            <span class="oldPrice">门市价¥{{ item.oldPrice }}</span>
            <span class="address">{{ item.address }}</span>
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
      data(){
        return{
          type:'All',
          list:[
            {
              type:'All',
              name:'全部',
              child:[
                {
                  imgUrl:"https://p0.meituan.net/tdchotel/a53631eb79ef17adf9b7858615203e3550530.jpg@368w_208h_1e_1c",
                  title:'chicken now韩式炸鸡啤酒（新北直营店）',
                  subTitle:"韩式火锅+炸鸡，建议2人使用",
                  currentPrice:105.8,
                  oldPrice:120,
                  address:'常发广场'
                },
                {
                  imgUrl:"https://p1.meituan.net/deal/4bd5af0b36424dbc1e881b9391482954104721.jpg@368w_208h_1e_1c",
                  title:'恒记饭店（丽华店）',
                  subTitle:"精品大桌菜1份，提供免费WiFi",
                  currentPrice:988,
                  oldPrice:1235,
                  address:'天宁区'
                }
              ]
            },
            {
              type:"yhjc",
              name:'约会聚餐',
              child:[
                {
                  imgUrl:"https://p1.meituan.net/deal/4bd5af0b36424dbc1e881b9391482954104721.jpg@368w_208h_1e_1c",
                  title:'chicken now韩式炸鸡啤酒（新北直营店）',
                  subTitle:"韩式火锅+炸鸡，建议2人使用",
                  currentPrice:105.8,
                  oldPrice:120,
                  address:'常发广场'
                },
                {
                  imgUrl:"https://p1.meituan.net/deal/4bd5af0b36424dbc1e881b9391482954104721.jpg@368w_208h_1e_1c",
                  title:'恒记饭店（丽华店）',
                  subTitle:"精品大桌菜1份，提供免费WiFi",
                  currentPrice:988,
                  oldPrice:1235,
                  address:'天宁区'
                }
              ]
            },
            {
              type:'lrspa',
              name:'丽人SPA',
              child:[
                {
                  imgUrl:"https://p0.meituan.net/merchantpic/19f82b0f514efbf1de31680615f60b7248270.jpg@240w_180h_1e_1c_1l%7Cwatermark=1&&r=2&p=9&x=2&y=2&relative=1&o=20%7C368w_208h_1e_1c",
                  title:'chicken now韩式炸鸡啤酒（新北直营店）',
                  subTitle:"韩式火锅+炸鸡，建议2人使用",
                  currentPrice:105.8,
                  oldPrice:120,
                  address:'常发广场'
                },
                {
                  imgUrl:"https://p1.meituan.net/deal/3acce19e41ea1d53c0acfc5ca7c4215680162.jpg@368w_208h_1e_1c",
                  title:'恒记饭店（丽华店）',
                  subTitle:"精品大桌菜1份，提供免费WiFi",
                  currentPrice:988,
                  oldPrice:1235,
                  address:'天宁区'
                }
              ]
            },
            {
              type:'film',
              name:'电影演出',
              child:[
                {
                  imgUrl:"https://p1.meituan.net/deal/3acce19e41ea1d53c0acfc5ca7c4215680162.jpg@368w_208h_1e_1c",
                  title:'chicken now韩式炸鸡啤酒（新北直营店）',
                  subTitle:"韩式火锅+炸鸡，建议2人使用",
                  currentPrice:105.8,
                  oldPrice:120,
                  address:'常发广场'
                },
                {
                  imgUrl:"https://p1.meituan.net/deal/4bd5af0b36424dbc1e881b9391482954104721.jpg@368w_208h_1e_1c",
                  title:'恒记饭店（丽华店）',
                  subTitle:"精品大桌菜1份，提供免费WiFi",
                  currentPrice:988,
                  oldPrice:1235,
                  address:'天宁区'
                }
              ]
            },
            {
              type:'travel',
              name:'品质出游',
              child:[
                {
                  imgUrl:"https://p1.meituan.net/tdchotel/ef387129ee1c46b1ec911189d8160d512113628.jpg@368w_208h_1e_1c",
                  title:'chicken now韩式炸鸡啤酒（新北直营店）',
                  subTitle:"韩式火锅+炸鸡，建议2人使用",
                  currentPrice:105.8,
                  oldPrice:120,
                  address:'常发广场'
                },
                {
                  imgUrl:"https://p1.meituan.net/deal/4bd5af0b36424dbc1e881b9391482954104721.jpg@368w_208h_1e_1c",
                  title:'恒记饭店（丽华店）',
                  subTitle:"精品大桌菜1份，提供免费WiFi",
                  currentPrice:988,
                  oldPrice:1235,
                  address:'天宁区'
                }
              ]
            }
          ]
        }
      },
      computed:{
        currentList:function(){
          console.log(this.list.filter((item) => item.type == this.type)[0])
          return this.list.filter((item) => item.type == this.type)[0]
        }
      },
      methods:{
        enter:function(e){
          this.type = e.target.getAttribute("data-type");
        }
      }


  }
</script>

<style lang="scss">
  @import '@/assets/css/search/menu.scss';
</style>
