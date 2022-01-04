<template>
  <div id="deluser">
      <div id="searchuser">
 <el-input placeholder="请输入内容" v-model="input3">
    <el-select v-model="select" slot="prepend" placeholder="请选择条件" label="请选择条件"  class="input-with-select">
      <el-option label="按用户名查询" value="1"></el-option>
      <el-option label="按用户id查询" value="2"></el-option>
      <el-option label="按创建者查询" value="3"></el-option>
    </el-select>
    <el-button slot="append"  @click="judgeList" icon="el-icon-search"></el-button>
  </el-input>

      </div>
      
   <el-table
      :data="currentList"
      style="width: 70%;margin:0 auto"
      ref="table"
      max-height="500"
      >
      <el-table-column
        prop="id"
        label="用户Id"
        width="180"
        stripe>
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="creater"
        label="创建者">
      </el-table-column>
      <el-table-column type="selection" width="50">
      </el-table-column>
    </el-table>
    <el-button type="danger" style="margin-top:30px;" @click="deluser">删除选中用户</el-button>
    <el-button type="pirmary" style="margin-top:30px;" @click="toggleSelection">取消用户选择</el-button>
  </div>
  
</template>

<script>
export default {
    data() {
        return {
            tableData:[],
            input3:'',
            currentList:[],
            select:'请选择条件',
            
        }
    },
    created() {
        this.getUser();
    },
    computed:{
        listTotal(){

    }
    },
    methods: {
        judgeList(){//过滤此时table显示的数据
            
            if(this.input3)
            {
                if(this.select==1){
                    this.currentList=this.tableData.filter((t)=>{
                        return t.username.indexOf(this.input3)!=-1
                    })
                }
                else if(this.select==2){
                     this.currentList=this.tableData.filter((t)=>{
                        return t.id.indexOf(this.input3)!=-1
                    })
                }
                else if(this.select==3){
                    this.currentList=this.tableData.filter((t)=>{
                        return t.creater.indexOf(this.input3)!=-1
                    })
                }
                else
                {
                    this.currentList=this.tableData;
                }
            }
            else
            this.currentList=this.tableData;
        },
        getUser(){
            this.$axios({
            method:'get',
            url:'/user/getUser'
        }).then(val=>{
            console.log('获取数据成功');
            if(val.data.code==200){
                this.tableData=val.data.result;
                this.currentList=this.tableData;
            }
        })
        },
        deluser(){
            if(this.$refs.table.selection.length==0){
                  this.$alert('请选择要删除的用户！', '错误提示', {
                confirmButtonText: '确认',
                });
                return
            }
            let idstr='';
            this.$refs.table.selection.forEach(element => {
                idstr+="'"+element.id+"'"+',';
            });
            
            idstr = idstr.substr(0, idstr.length - 1);
            // console.log('idstr',idstr);
            this.$axios({
                method:'post',
                url:'/user/delUser',
                data:{
                    idstr
                }
            }).then(val=>{
                if(val.data.code==200)
                {
                     this.$alert('移除用户成功！', '提示', {
                    confirmButtonText: '确认',
                });
                    this.getUser();//重新获取用户数据
                }
                else{
                     this.$alert(val.data.msg, '错误提示', {
                confirmButtonText: '移除用户失败,请稍后再试！',
                });
                }

            })
        },
    toggleSelection(rows) {
          this.$refs.table.clearSelection();
      },
    },
}
</script>

<style lang="less" scoped>
*{
    text-shadow: none !important;
}
#deluser{
    width: 100%;
    height: 100vh;
    background-color: #f5f5f5;
    overflow: hidden;
    #searchuser{
        width: 50%;
        height: 50px;
        margin: 30px auto;
    }
}
.el-select .el-input {
    width: 200px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .input-with-select
  {
      min-width: 150px !important;
  }
 
</style>