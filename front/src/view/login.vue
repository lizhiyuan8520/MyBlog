<template>
  <div id="login">
      <el-input type="text" 
      v-model="username"
      placeholder="请输入用户名"
      autofocus
      ></el-input>
      <el-input  
      v-model="password"
      placeholder="请输入密码"
      ></el-input>
  </div>
</template>

<script>
export default {
data() {
    return {
        username:'',
        password:''
    }
},
}
</script>

<style lang="less" scoped>
#login{
    position: fixed;
    top:50%;
    transform: translateY(-50%);
    margin: 0 auto;
    width: 50%;
    height: 500px;
    background-image: url('../assets/images/loginbackground.jpg');
    background-size: contain;
}
</style>


