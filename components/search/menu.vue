<template>
  <div class="menu-panel">
    <dl @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd
        v-for="(item, index) in menu"
        :key="index"
        @mouseenter="enter"
      >
        <i>{{ item.type }}</i>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <div
      v-if="kind"
      class="detail-Container">
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.childs"
          :key="v"
        >{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
          kind:'',
          menu:[
            {
              type: 'food',
              name: '美食',
              child:[
                {
                  title: '美食',
                  childs: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐']
                }
              ]
            },
            {
              type:"takeout",
              name:"外卖",
              child:[
                {
                  title:'外卖',
                  childs:['美团外卖']
                }
              ]
            },
            {
              type:"hotel",
              name:'酒店',
              child:[
                {
                  title:'酒店星级',
                  childs:['经济型','舒适/三星','高档/四星','豪华/五星']
                }
              ]
            },
            {
              type:"ms",
              name:'榛果民宿',
              child:[
                {
                  title:'酒店星级',
                  childs:['经济型','舒适/三星','高档/四星','豪华/五星']
                }
              ]
            }
          ],
      }
    },
    computed:{
      curdetail:function(){
        console.log(this.menu.filter((item) => item.type === this.kind)[0])
        return this.menu.filter((item) => item.type === this.kind)[0];
      }
    },
    methods:{
      mouseleave:function(){
        let self = this;
        self.timer = setTimeout(function(){
          self.kind = ""
        },150)
      },
      enter:function(e){
        this.kind = e.target.querySelector("i").innerHTML
      },
      sover:function(){
        clearTimeout(this.timer);
      },
      sout:function(){
        this.kind = ""
      }
    }
  }
</script>

<style lang="scss">
  @import '@/assets/css/search/menu.scss';
</style>
