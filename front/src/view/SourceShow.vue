<template>
  <div id="SourceShow">
      <Header/>
      <div id="header">
          <h1>SourceSearch</h1>
          <div id="search">
                <el-input v-model="keyword" id="searchinput"  
                size="large" 
                placeholder="请输入内容"
                >
                 <el-button slot="append" icon="el-icon-search" type="primary">搜索</el-button>
                </el-input>
          </div>
         
      </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
export default {
    name:'SourceShow',
    data() {
        return {
            keyword:'',
        }
    },
    components:{
        Header,
    }

}
</script>

<style lang="less" scoped>
#SourceShow {
    #header{
        width: 100%;
        height: 500px;
        background-image: url('../assets/images/oceanbackground.jpg');
        background-size: 100% 100%;
        overflow: hidden;
        h1{
            font-size: 60px;
            margin-top: 60px;
            
        }
        #search{
            width: 50%;
            height: 50px;
            margin: 0 auto;
        }
    }
    
}
</style>

