<template>
  <div id="setuser">
      <el-divider content-position="left">上传用户头像</el-divider>
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8008/upload/userimg"
        :show-file-list="false"
        ref="upload"
        name='userimg'
        :data="{id:this.userInfo.id}"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :multiple="false"
        >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
         <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
</el-upload>
 <el-divider content-position="left">修改用户名</el-divider>
 <el-input 
 style="width:50%;text-align:left;"
 prefix-icon="el-icon-user-solid"
 maxlength="10"
 show-word-limit
 v-model="newusername"
 placeholder="新用户名"
 @blur="setUserName"
 ></el-input>
  </div>
</template>

<script>
export default {
    data() {
      return {
        imageUrl: '',
        newusername:'',
      };
    },
    computed:{
        userInfo(){
            return JSON.parse(sessionStorage.getItem('userInfo'))
        }
    },
    methods: {
    setUserName(){
        console.log('@@@');
        this.$axios({
            method: 'post',
            url:'/user/setUserName',
            data:{
                id:this.userInfo.id,
                username:this.newusername,
            }
        }).then(val=>{
            if(val.data.code==200)
            {
                this.$message.info('更改用户名成功');
                this.userInfo.username=this.newusername;
                sessionStorage.setItem('userInfo',JSON.stringify(this.userInfo));
                this.newusername='';        
            }
            else{
                this.$message.error(val.data.msg);
            }
        })
        },
      handleAvatarSuccess(res, file) {
        if(res.code==200)
        {
            this.$message.info("上传成功");
            this.imageUrl = res.img_url;
            this.userInfo.userimg=res.img_url;
            sessionStorage.setItem("userInfo",JSON.stringify(this.userInfo) ); 
        }
        else
            this.$message.info("上传失败，请稍后再试");
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type==='image/png';
        const isLt2M = file.size / 1024 / 1024 < 4;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 4MB!');
        }
        return isJPG && isLt2M;
      },
    }
}
</script>

<style lang="less" >
*{
    text-shadow: none;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px !important;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>