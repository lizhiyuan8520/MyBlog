<template>
<transition name="hello">
  <div id="pageChange">
    <router-view></router-view>
  </div>
</transition>

</template>

<script>
export default {
  name: 'HelloWorld',
 mounted() {
   this.$router.replace({
     path:'/Main'
   })
 },
}






</script>

