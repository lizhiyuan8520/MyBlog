<template>
<div id="bg" @keydown.enter="loginsubmit" >
 <div id="login" >
     <h3>管理系统登录</h3>
      <el-input type="text" 
      v-model="username"
      placeholder="用户名"
      autofocus
      class="input firstinput"
      @blur="buttonfoucs"
      ref="userinput"
      ></el-input>
      <el-input
      type="password"  
      v-model="password"
      placeholder="密码"
      class="input"
     @blur="buttonfoucs"
      ></el-input>
      <el-button type="primary" round ref="submitbutton" :autofocus="buttonflag" class="input" :loading="loginstate" @click="loginsubmit" >登录</el-button>
      <el-button type="text" style="display:block;margin:20px auto;" @click="gobackhome">返回首页</el-button>
  </div>
</div>
 
</template>

<script>
export default {
    name:'Login',
data() {
    return {
        username:'',
        password:'',
        loginstate:false,
        buttonflag:false,
    }
},
// components:{
//     Header,
// },
mounted() {
    this.$refs.userinput.focus();
},
methods: {
    gobackhome(){
        this.$router.replace('/Main');
    },
    buttonfoucs(){
        this.buttonflag=true;
    },
    loginsubmit(){
        
        if(!this.username||!this.password)
        {
        this.$alert('用户名或密码不能为空', '错误提示', {
          confirmButtonText: '确定',
        });     
        }
        else{
            this.loginstate=true;
this.$axios({
            method:'post',
            url:'/user/loginVerify',
            data:{
                username:this.username,
                password:this.password
            }
        }).then((val)=>{
            console.log('val',val);
            if(val.data.code!=200)
            {
            this.loginstate=false;
             this.$alert('用户名或密码错误', '错误提示', {
             confirmButtonText: '确定',
            });
            }
            else{
                console.log('val',val);
                this.loginstate=false;
                sessionStorage.setItem("Token", val.data.token);//将token存在localStorage中
                sessionStorage.setItem("userInfo",JSON.stringify(val.data.result[0]));
                // this.$store.commit('setUserInfo',val.data.result);//将用户信息存到Vuex中
                this.$router.replace({
                    path:'/Admin'
                });
            }
            
        })
    }
        }
        
},
}
</script>

<style lang="less" scoped>
#bg{
    min-width: 100%;
    height: 100vh;
    background-image: url('../../assets/images/loginbackground.jpg');
    background-size: 100% 100%;
    #login{
    position: fixed;
    top:50%;
    left:50%;
    transform:  translateX(-50%) translateY(-50%);
    width: 40%;
    max-width:700px;
    max-height: 500px;
    background-color: rgba(0, 0, 0, 0.3);
    border: 2px solid #fff;
    h3{
        margin-top: 60px;
        font-size: 40px;
    }
  
}

.input  {
    margin-top: 50px !important;
    width: 70% !important;
}
.firstinput {
    margin-top: 80px !important;
}


}

</style>


