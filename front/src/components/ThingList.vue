<template>

<div id="list">

 <ul >
   <transition-group name="animate__animated animate__bounce" enter-active-class="animate__backInLeft animate__faster" leave-active-class="animate__backOutRight animate__faster" appear>

   <li v-for="(t,index) in currentList" :class="t.impClass" :key="t.id"  
   @dblclick="showInput(index,t.id)"
   ref="Li"   >
   {{t.text}}
     <span :class="t.impClass" class="iconfont thingImportant"></span>
     <input type="text" v-show="showFlag[index]" ref="Input" :inputId="'input'+t.id" :value="t.text" @keydown.enter="docClick(t.id)" @blur="setThing($event,t.id)" >
      
     <div id="skill"> 
       <el-tooltip class="item" effect="dark" content="删除待办事项" placement="top-start"> 
       <span class="el-icon-remove-outline del " 
       :thingId="t.id" 
       @click="delThing(index,t.id)">
     </span> 
     </el-tooltip>
     <el-tooltip class="item" effect="dark" content="编辑待办事项" placement="top-start"> 
     <span class="el-icon-edit-outline set" @click="showInput(index)">
       </span>
     </el-tooltip>
     <el-tooltip class="item" effect="dark" content="事件重要程度" placement="top-start"> 
       <div id="menu" class="el-icon-menu options" @click="listOptions(index)" >
         <span class="el-icon-star-on icon_option" style="color:red" :class="{ani1:aniFlag[index]}" @click="setImportant(t.id,3)">
           </span >
           <span class="el-icon-star-on icon_option" style="color:yellow" :class="{ani2:aniFlag[index]}"   @click="setImportant(t.id,2)"></span>
           <span class="el-icon-star-on icon_option" :class="{ani3:aniFlag[index]}" style="color:green" @click="setImportant(t.id,1)"></span>
       </div>
     </el-tooltip>
       </div>
    
        </li>


        </transition-group>
 </ul>
  <el-pagination
  background
  layout="prev, pager, next,jumper"
  :current-page="this.currentpage"
  :total="this.listTotal"
  @current-change="handleCurrentChange"
  >
</el-pagination>
</div>
 
</template>

<script>
import 'animate.css'
export default {
  name:"ThingList",
  data() {
    return {
      thingList:[],
      showFlag:[],
      aniFlag:[],
      currentpage:1,
    }
  },
  methods: {

    delThing(i,id){
      // setTimeout(()=>{
        this.renderList('/things/delThing','post',{id});    
      // },600);          
    },
    setThing(e,id){
        this.renderList('/things/setThing','post',{id,text:e.target.value});
    },
    showInput(index,id){
      this.showFlag.splice(index,1,true);//显示input获取用户输入
      this.$nextTick(()=>{//dom更新之后的回调函数
        console.log('this',this);
          this.$refs.Input.forEach(element => {//ref只是dom集的引用，所以此处不能Input[index]来找到对应的dom元素
              if(element.getAttribute('inputId')=='input'+id)
              {
                  element.focus();
              }
          
       });
      
      },0)//此时input元素没有渲染完毕，所以需要用定时器来延时执行获取焦点   
    },
    docClick(id){
      //去触发失去焦点事件，防止发两次请求。
      this.$refs.Input.forEach(element => {
         if(element.getAttribute('inputId')=='input'+id)
         element.blur();
       });
      
    },
    listOptions(i){//显示菜单

      for(let t=0;t<this.aniFlag.length;t++)
      {
        if(t==i)
            this.aniFlag.splice(t,1,!this.aniFlag[i]);
          else
              this.aniFlag.splice(t,1,false);
          
          
      }
    },
    handleCurrentChange(currentpage){
      this.currentpage=currentpage;//页标改变回调函数
    },
    setImportant(id,imp){
      this.renderList('/things/setImportant','post',{id,imp});
    },
    renderList(url,method,val) {//发送ajax请求并获取最新数据
        this.$axios({
         url,
         method,
         data:val
    }).then(val=>{
      this.thingText='';
      this.thingList=val.data.result;
    },reason=>{
      console.log('error',reason);
    });
    },
  },
  computed:{
    currentList(){
      //列表分页
      let p =this.currentpage;
      let end=0;
      p*10-this.listTotal<0?end=p*10:end=this.listTotal
      // console.log('p',p,'end',end);
      return this.sortThingList.slice((p-1)*10,end);
    },
    listTotal(){
      return this.thingList.length
    },
    sortThingList:{
      get(){
        return this.thingList.slice(0).sort((x,y)=>{
        return y.important-x.important;
      })
      }
   
    }
  },
  watch:
  {
    thingList:{
      handler(newval){
        this.aniFlag=[];
        this.showFlag=[];//初始化显示数组与动画数组
        for(let i=0;i<newval.length;i++)
            {
              this.showFlag[i]=false;
              this.aniFlag[i]=false;
              if(newval[i].important==1)//根据事情的重要程度来添加不同的类，显示相应图形
              {
                newval[i].impClass='important1'
              }
              else if(this.thingList[i].important==2)
              {
                newval[i].impClass='important2'
              }
              else
              {
                newval[i].impClass='important3'
              }
           }
           
      }

    }
  }     
  ,

  created() {
   
    this.renderList('/things/getAllThing','get',{'text':this.$data.thingText});
  },
  mounted() {
    console.log('bus',this);
      this.$bus.$on('addThing',({url,method,data})=>{
      this.renderList(url,method,data);//绑定自定义回调事件
    });
  },
}
</script>

<style lang="less" scoped>
#list{
  width: 100%;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}
#list ul {
position: relative;
 margin-top: 50px;
 display: flex;
 flex-direction: column;
 justify-content: space-around;
 list-style-type: none;
 li{
  width: 55%;
  height: 20%;
  max-height: 25%;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  line-height: 40px;
  margin-bottom: 10px;
  border-radius: 10px;
  background-color: transparent;
  color: #fff;
  border: 1px solid lightgray;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  font-size: 20px;
  input {
  position:absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40px;
  border: none;
  z-index: 999;
  border-radius: 10px;
  &:focus{
    outline: 2px solid skyblue;
  }
}
}
}
#skill {
  position: absolute;
  height: 40px;
  right: -110px;
  top:0px;
}
#menu {
  position: relative;
  top:0;
  left:0;
  z-index: 999;
  height: 40px;
  color:#fff;
   &:hover{
    transform: scale(1.2);
  }
}
.important1{
  text-shadow: 0 0 10px  rgb(6, 151, 6) ;
}
.important2{
  text-shadow: 0 0 10px  rgb(182, 179, 7) ;
}
.important3{
  text-shadow: 0 0 10px rgb(173, 5, 13) ;
}
.icon_option{
  font-size: 15px !important;
  position: absolute;
  top:0;
  left:5px;
  z-index: -1;
  opacity: 0;
  transition: all 0.8s;
}
.thingImportant{
  font-size: 25px !important;
  position: absolute;
  left: 10px;
}
.del {
  font-size: 25px !important;
  color:#fff;
  margin-right: 10px;
  &:hover{
  transform: scale(1.2);
  }

}
.set{
  font-size: 25px !important;
  color:#fff;
  
 &:hover{
  transform: scale(1.2);
  }
}
.options {
  font-size: 25px !important;
  margin-left: 10px;
  color:white;
  font-weight: 800;
}
.ani1{
  opacity: 1;
  transform: translateX(30px);
}
.ani2{
  opacity: 1;
  transform: translateX(50px);
}
.ani3{
  opacity: 1;
  transform: translateX(70px);
}



</style>