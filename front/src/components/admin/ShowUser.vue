<template>
  <div id="usershow">
      <div id="userimg">
      </div>
      <div id="userinfo">
          <ul>
              <li>用户名：{{user.username}}</li>
              <li>创建者:{{user.creater}}</li>
              <li>上次登录时间:{{user.createtime}}</li>
              <li>权限:{{user.permission}}</li>
              <li>已上传资源:{{user.sourcenum}}</li>
          </ul>       
      </div>
  </div>
</template>

<script>
export default {
name:'ShowUser',
data() {
    return {
        user:{
            username:'白夜挽歌',
            creater:'Admin',
            createtime:'2021-12-15',
            permission:'5',
            sourcenum:'100'
        }
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
        border-radius: 50%;
        background-image: url('../../assets/images/de-img.jpg');
        background-size: cover;
        border: 2px solid lightgray;
    }
    #userinfo{
        float: left;

        height: 100%;
        text-align: left;
        font-size: 30px;
        margin-left: 100px;
        li{
            margin: 20px 0;
        }
    }
    
}
</style>