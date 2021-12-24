<template>
  <header>
      <ul>
          <li> <router-link to="/ToDoList">菜单一</router-link></li>
          <li><router-link to="/SourceShow">菜单一</router-link></li>
          <li>菜单一</li>
          <li>菜单一</li>
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
        justify-content: flex-end;
        
        li{
            position: relative;
            top: 50%; /*偏移*/
            transform: translateY(50%);
            width: 100px;
            font-size: 30px;
            margin-right: 10px;
            &:hover{
                background-color: rgba(0, 0, 0, 0.8);
                text-shadow:10px 10px 10px hsl(46, 90%, 61%);
            }
             a{
                display: block;
                width: 100%;
                height: 100%;
                font-size: 30px;
                color:white;
            }
        }

    }

}

</style>