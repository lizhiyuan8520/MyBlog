<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/Admin/ShowUser">查看用户信息</el-menu-item>
          <el-menu-item index="/Admin/SetUser">修改用户信息</el-menu-item>
          <el-menu-item index="/Admin/DelUser">删除用户</el-menu-item>
          <el-menu-item index="/Admin/AddUser">增加用户</el-menu-item>
        </el-menu-item-group>
        <!-- <el-submenu index="1-4">
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
path:'',

}
</script>

<style lang="less" >
.el-submenu__title{
  font-size: 25px !important;
  color: #fff;
}
.el-submenu [class^=el-icon-]{
  font-size: 25px !important;
  color: #fff;
}
.el-menu-item-group__title{
  font-size: 20px !important;
  color: #fff;
}
.el-menu-item{
  font-size: 20px !important;
  color: #fff;
}
</style>


