<template>
  <header>
      <ul>
          <li> <router-link to="/ToDoList">ToDoList</router-link></li>
          <li><router-link to="/SourceShow">Source</router-link></li>
          <li><router-link to="/Admin">Admin</router-link></li>
          <li><router-link to="/Main">Home</router-link></li>
          
      </ul>
  </header>
</template>

<script>
export default {
    name:"Header",

}
</script>

<style lang="less" scoped>
header{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 60px;
    margin: 0 auto;
    opacity: 0;
    background-color: transparent;
    transition: all 0.5s;
    &:hover{
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.7);    
    }
    
    ul{
        display: flex;
        justify-content: center;
        
        li{
            height: 60px;
            line-height: 60px;
            font-size: 30px;
            margin-left: 50px;
            flex: 0 1 auto;
            &:hover{
                background-color: rgba(0, 0, 0, 0.8);
                
            }
             a{
                display: block;
                width: 100%;
                height: 100%;
                font-size: 30px;
                color:white;
                &:hover{
                    color: orange ;
                }
            }
        }

    }

}

</style>