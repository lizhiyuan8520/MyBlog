<template>
<transition name="hello">
  <!-- <div id="pageChange"> -->
    <router-view></router-view>
  <!-- </div> -->
</transition>

</template>

<script>
export default {
  name: 'HelloWorld',
 mounted() {
  //  this.$router.replace({
  //    path:'/Main'
  //  })
 },
}






</script>
<style scoped>
  .hello-enter-active,.hello-leave-active {
  transition: all .8s;
}
.hello-enter,.hello-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scale(1.25);
  opacity: 0;
}
.hello-enter-to,.hello-leave{
transform: scale(1);
  opacity: 1;
}
</style>

