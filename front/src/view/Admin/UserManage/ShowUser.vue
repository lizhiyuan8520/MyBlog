<template>
  <div id="usershow">
      <div id="userimg">
          <img :src="userInfo.userimg" alt="">
      </div>
      <div id="userinfo">
          <ul>
              <li>用户名：{{userInfo.username}}</li>
              <li>创建者:{{userInfo.creater}}</li>
              <li>上次登录时间:{{userInfo.createtime}}</li>
              <li>权限:{{userInfo.permission}}</li>
              <li>已上传资源:{{userInfo.sourcenum}}</li>
          </ul>    
          <el-button type="info" @click="relogin">退出登录</el-button>   
      </div>
       
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
name:'ShowUser',
data() {
    return {
    }
},
computed:{
    // ...mapState(['userInfo']),
    userInfo(){    
        return JSON.parse(sessionStorage.getItem('userInfo'));
    }
},
methods: {
    relogin(){
        this.$router.replace("/login");
        sessionStorage.setItem("Token",'');
    }
},
}
</script>

<style lang="less" scoped>
#usershow{
    height: 100%;
    // color: black;
    // text-shadow: none;
    background-color: #f5f5f5;
    #userimg{
        float: left;
        width: 200px;
        height: 200px;
        margin-left: 200px;
        margin-top:10px;
        
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            min-width: 100%;
            max-width: 100%;
        }
        // border: 2px solid lightgray;
    }
    #userinfo{
        float: left;
        height: 100%;
        text-align: left;
        font-size: 30px;
        margin-left: 100px;
        li{
            margin: 20px 0;
            // color: orange;
            text-shadow:0 0 10px hsl(193, 81%, 49%);
        }
    }
    
}
</style>