<template>
<div id="listHeader">
<h1 id="title">ToDoList</h1>
<div id="search">
 <input type="text" ref="input" v-model="thingText" @keydown.enter="addThing()" placeholder="请输入今日待办事项" 
  maxlength="25"
  class="thing"
  >
  <span id="textlengh" v-show="this.textLengh">{{this.textLengh+'/25'}}</span>
    <el-tooltip class="item" effect="dark" content="增加待办事项" placement="top-start">
      <span class="el-icon-circle-plus-outline add" ref="addButton" @click="addThing()">  </span>
    </el-tooltip>
    
</div>
<el-divider class="line"></el-divider>

</div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
    name:"ListHeader",
    data() {
        return {
           thingText:'', 
        }
    },
    computed:{
      textLengh(){
         return this.thingText.length
      }
    },
    // watch:{
    //   thingText(){
    //     
    //   }
    // },
    methods: {
    addThing(){
        if(!this.thingText)
        {
            alert('请输入正确的代办事项...')
        }
        else
        {
          if(this.thingText.length>25)
            this.thingText=this.thingText.slice(0,24);
            console.log('textLengh',this.thingText);
            this.$bus.$emit('addThing',{url:'/things/addThing',method:'post',data:{text:this.thingText,id:nanoid().slice(1,10)}})
            this.thingText='';//请求发出后清空输入
        }
        
    },
    },
    
    
}
</script>

<style scope lang="less">
#listHeader{
  height: 110px;
}
#title {
  position: relative;
  left:0px;
  top:0px;
  width: 300px;
  height: 70px;
  margin: 0 ;
  font-size: 60px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  font-style:oblique;
  transition: all .4s;
}
#title:hover{
  transform: scale(1.1);
}
#search{
position: relative;
 height: 40px;

}
#search .thing {
  width: 55%;
  height: 40px;
  margin: 0 auto;
  border: none;
  outline:none;
  padding-left: 5px;
  font-size: 15px;
  border-radius: 10px;
}
#search .thing:focus {
  border: 2px solid skyblue;
}
#textlengh {
  position: absolute;
  @media screen and (max-width: 768px) {
 font-size: 16px;
 left:68%;
 }
  left: 70%;
  top:30%;
  color: black;
  font-size: 18px;
}
.add {
  width: 25px;
  height: 25px;
  margin-left: 12px;
  font-size: 25px !important;
  transition:all .5s;
}

.add:hover {
  transform: scale(1.5);
}
.line{
  size: 2px;
  color: #fff;
}
</style>