<template>
   
  <div  id="hello" v-show="bgShow" ref="bg" >
       <Header></Header>
    <div id="clock">
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
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Header from '../components/Header.vue';
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
      console.log('day',dayjs());
      this.bgShow=true;
      this.clockTimer=setInterval(()=>{
        this.updateTime();
      },1000);  
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
    height: 1200px;
    background-image: url('../assets/images/background2.jpg');
    background-size: 100% 100%;
    /* background-attachment:fixed; */
    font-family: "BebasNeueRegular","Times New Roman",Arial, Helvetica, sans-serif;
    font-size: 120px;
    color:#fff;
    text-align:center;
    text-shadow:0 0 10px hsl(193, 81%, 49%);
    font-weight: 800;
    #clock{
      width: 500px;
      height: 300px;
      margin: 0 auto;
      transform: translateY(300px);
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
  .hello-enter-active {
  transition: all 2s;
}
#weather{
  display: block;
  position: relative;
  margin: 0 auto;
  width: 200px;
  height: 50px;
  padding: 0 10px;
  font-size:34px !important;
}
.between {
  padding-left: 10px;
  padding-right: 10px;
}

.hello-enter,.hello-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(1.25);
  opacity: 0;
}
.hello-enter-to,.hello-leave{
transform: scale(1);
  opacity: 1;
}
</style>