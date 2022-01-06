<template>
  <div id="nf">
      <div id="tips">
        <h1>404</h1>
        <h2>This Page Not Found!</h2>
        <router-link to='/Main'>Click here back to Home</router-link>
      </div>
    
  </div>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>

#nf{
    width: 100%;
    height: 1240px;
    background-image: url('../assets/images/404.jpeg') ;
    background-size: 100% 100%;
    position: relative;
    #tips{
        position: absolute;
        top:60px;
        left:70px;
        text-shadow: 0 0 10px rgba(223, 14, 14, 0.89);
    h1{
        font-size: 200px;
        font-weight: 800;
        margin-bottom: 10px;
        
    }
    h2 {
        font-size: 50px;
        margin-bottom: 20px;
    }
    a {
        text-decoration: none;
        color: #fff;
        font-size: 25px;
        font-weight: 800;
        text-shadow: 0 0 10px rgba(14, 164, 223, 0.932);
    }
    }

}
</style>