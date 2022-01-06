<template>
   
  <div  id="hello" v-show="bgShow" ref="bg" >
       <Header></Header>
       <transition name="clock">
    <div id="clock" v-show="this.time.year">
      <ul>
        <li>{{time.hour | addZore}} </li>
        <li class="between">:</li>
        <li> {{time.minute | addZore}}</li>
        <li class="between">:</li>
        <li >{{time.second |addZore}}</li>
      </ul>
      <p>{{date}}</p>
      <div id="weather">
      <div id="he-plugin-simple"></div>
    </div>
    </div>  
    </transition>     
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Header from '@/components/Header.vue';
export default {
  name:'Main',
  components:{
    Header,
  },
  data() {
    return {
      bgShow:false,
      secondShow:false,
      time:{
        year:'',
        month:'',
        date:'',
        day:'',
        hour:'',
        minute:'',
        second:'',
      }
    }
  },
  created(){
    this.$dayjs=dayjs();
    
      this.clockTimer=setInterval(()=>{
        this.updateTime();
      },1000);  
  },
  methods:{
    updateTime(){
    this.time.hour=dayjs().hour();
    this.time.minute=dayjs().minute();
    this.time.second=dayjs().second();
    this.time.year=dayjs().year();
    this.time.month=dayjs().month();
    this.time.day=dayjs().day(); 
    this.time.date=dayjs().date(); 
  },
  },
  filters:{
    addZore(val){
      return parseInt(val)<10?'0'+val:val;
    },
  },

  mounted() {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0';
    document.body.appendChild(s);//引入和风天气组件
    this.bgShow=true;

  },
  beforeDestroy() {
     clearInterval(this.clockTimer);
  },

  
  computed:
   {
     date(){
       const xq=['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
     return  this.time.year+'年'+this.time.month+'月'+this.time.date+'日'+'   '+xq[this.time.day];
     }
  }
}
</script>

<style scoped lang="less">
  #hello{
    width: 100%;
    height: 1500px;
    position: relative;
    left: 0;
    top:0;
    background-image: url('../../assets/images/background2.jpg');
    background-size: 100% 100%;
    /* background-attachment:fixed; */
    font-family: "BebasNeueRegular","Times New Roman",Arial, Helvetica, sans-serif;
    font-size: 150px;
    color:#fff;
    text-align:center;
    text-shadow:0 0 10px hsl(193, 81%, 49%);
    font-weight: 800;
    #clock{
      width: 60%;
      height: 300px;
      margin: 0 auto; 
      position: relative;
      top:30%;
      transform: translateY(-50%);
      ul{
        display: flex;
        justify-content: center;
        li{ 
          text-shadow:0 0 10px hsl(193, 81%, 49%);
          font-weight: 800;
        }
      }
      p{
        font-size: 34px;
        font-family: "微软雅黑";
      }
    }


  }

#weather{
  display: block;
  position: relative;
  margin: 0 auto;
  // left: 50%;
  // transform: translateX(-50%);
  width: 300px;
  height: 70px;
  padding: 0 10px;
  font-size:40px !important;
}
.between {
  padding-left: 10px;
  padding-right: 10px;
}
.clock-enter-active{
  transition: all 0.8s;
}
.clock-enter-to,.clock-leave{
  opacity: 1;
}
.clock-enter,.clock-leave-to{
  opacity: 0;
}


</style>