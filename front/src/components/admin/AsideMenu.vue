<template>
  <el-menu
      default-active="/Admin/ShowUser"
      class="elmenu"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span style="text-shadow:0 0 10px hsl(193, 81%, 49%)">用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Admin/ShowUser">查看用户信息</el-menu-item>
          <el-menu-item index="/Admin/SetUser">修改用户信息</el-menu-item>
          <el-menu-item index="/Admin/DelUser" v-show="showFlag" >删除用户</el-menu-item>
          <el-menu-item index="/Admin/AddUser" v-show="showFlag">增加用户</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
<el-submenu index="2">
         <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span style="text-shadow:0 0 10px hsl(193, 81%, 49%)">资源管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Admin/SourceUpload">资源上传</el-menu-item>
          <el-menu-item index="/Admin/SetUser">修改用户信息</el-menu-item>
          <el-menu-item index="/Admin/DelUser" v-show="showFlag" >删除用户</el-menu-item>
          <el-menu-item index="/Admin/AddUser" v-show="showFlag">增加用户</el-menu-item>
        </el-menu-item-group>
</el-submenu>
  </el-menu>
</template>

<script>
export default {
data() {
  return {
    showFlag:JSON.parse(sessionStorage.getItem('userInfo')).permission
  }
},


}
</script>

<style lang="less" >
.elmenu{
  width: 100%;
  height: 100%;
}
  

.el-submenu__title{
  font-size: 25px !important;
  color: #fff;
  text-shadow:0 0 10px hsl(193, 81%, 49%) !important;
}
.el-submenu [class^=el-icon-]{
  font-size: 25px !important;
  color: #fff;
  text-shadow:0 0 10px hsl(193, 81%, 49%) !important;
}
.el-menu-item-group__title{
  font-size: 20px !important;
  color: #fff;
  text-shadow:0 0 10px hsl(193, 81%, 49%) !important;
}
.el-menu-item{
  font-size: 20px !important;
  color: #fff;
  text-shadow:0 0 10px hsl(193, 81%, 49%) !important;
}
</style>


