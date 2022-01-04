<template>
  <div id="app">
    
     <transition name="animate__animated animate__bounce"
      enter-active-class="animate__zoomIn animate_faster"
      leave-active-class="animate__zoomOut animate_faster"
      mode="out-in"
     >
      <router-view style="animation-duration: 600ms"></router-view>
       </transition>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
li{
  list-style: none;
}
body{
    color:#fff;
    text-align:center;
    text-shadow:0 0 10px hsl(193, 81%, 49%);
    font-weight: 800;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}


.el-message-box__title .el-message-box__content{
  text-shadow: none !important;
}
a:hover, a:visited, a:link, a:active {
    text-decoration:none;
    color: none;
}
/* body{
    overflow-y:hidden;
} */
</style>
