<template>
<div id="container">
    
    <div id="adminheader">
        <Header></Header>
        <h1>SourceManage</h1>

    </div>
    

<div id="main">
    
    <aside>
    <AsideMenu></AsideMenu>
    </aside>
    

<div id="content">
    <router-view></router-view>
</div>

</div>



</div>



        

</template>

<script>
import AsideMenu from '../components/admin/AsideMenu'
import Header from '../components/Header.vue'
export default {
    name:'Admin',
    components:{
        AsideMenu,
        Header,
    }

}
</script>

<style lang="less" scoped>
.el-menu{
    text-align: left;
    border-right: none;
}
#container{
    #adminheader{
        position: relative;
        top:0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: black; 
        border-bottom: 1px solid orange; 
        h1{
            float: left;
            margin: 5px 5px;
            font-size: 40px;
        } 
    }
    #main{
            
            display: flex;
            width: 100%;
            height: 100%;
        aside{
            flex:0 1 400px;
            background-color: rgb(84, 92, 100);
        }
        #content{
            flex:1 1 auto;
            // background: #000;
        }
    }

    

}


</style>