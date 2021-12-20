<template>
  <div id="app">
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
li{
  list-style: none;
}
body{
    color:#fff;
    text-align:center;
    text-shadow:0 0 10px hsl(193, 81%, 49%);
    font-weight: 800;
    font-family: "BebasNeueRegular","Times New Roman",Arial, Helvetica, sans-serif;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  
}
a:hover, a:visited, a:link, a:active {
    text-decoration:none;
    color: none;
}
body{
    overflow-y:hidden;
}
</style>
