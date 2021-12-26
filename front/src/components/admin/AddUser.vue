<template>
  <div id="adduser">
      <el-form :model="FormData" status-icon 
      :rules="rules" ref="Form" 
      label-width="100px" 
      >
     <el-form-item label="用户名" prop="username">
         <el-input type="text" v-model="FormData.username" autocomplete="off"></el-input>
     </el-form-item>
      <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="FormData.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="FormData.checkPass" autocomplete="off"></el-input>
  </el-form-item>
    <el-form-item label="权限分配" prop="permission">
            <el-select v-model="FormData.permission" placeholder="权限授予">

      <el-option label=" " value="0"></el-option>
      <el-option label="一等权限" value="1"></el-option>
      <el-option label="二等权限" value="2"></el-option>
    </el-select>
    </el-form-item>
  <el-form-item class="submit">
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>
  
</el-form>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
export default {
    data() {
        return {
            FormData:{
            username:'',
            password:'',
            checkPass:'',            
            },
            rules:{
                username:[
                    {
                        required:true,
                        message:"请输入用户名",
                        trigger:'blur'
                    },
                
                ],
                password:[
                      {
                        required:true,
                        message:"请输入密码",
                        trigger:'blur'
                    },
                    {
                        pattern:/^^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$$/,
                        message:'长度在6-12位之间，只能包含字母、数字和下划线',
                        trigger:'blur',
                    },
                    {
                        validator:(rule,value,callback)=>{
                                if (this.FormData.checkPass !== '') {
                                     this.$refs.Form.validateField('checkPass');//再次校验二次密码
                                    }
                                callback();
                        },
                        trigger:'blur'
                    }
                ],
                checkPass:[
                     {
                        required:true,
                        message:"不能为空",
                        trigger:'blur'
                    },
                    {
                        validator:(rule,value,callback)=>{
                            console.log('value',value);
                            console.log('2',this.FormData.checkPass);
                            if(value!==this.FormData.password)
                            {
                                callback(new Error('两次输入密码不一致!'))
                            }
                            else
                                callback();
                        },
                        trigger:'blur'
                    }
                ]

                


    }
        }
    },
    methods: {
         submitForm() {
        this.$refs.Form.validate((valid) => {
          if (valid) {
            this.$axios({
                method: 'post', 
                url:"/user/addUser",
                data:{
                    username:this.FormData.username,
                    password:this.FormData.password,
                    permission:this.FormData.permission,
                    createtime:dayjs('YYYY-MM-DD'),
                    creater:'白夜挽歌',
                    id:nanoid().slice(0,14),
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.Form.resetFields();
      }
    }
    }


</script>

<style lang="less" scoped>
#adduser {
    width: 40%;
    margin: 30px auto;
    height: 100%;
    text-shadow: none;
    // text-align: left;
    font-size: 30px;
}
.submit {
    text-align: center;
    margin-top: 40px;
}
.el-select .el-input__inner{
    text-align: left !important;
}
.el-select-dropdown__item{
    text-shadow: none;
}


</style>