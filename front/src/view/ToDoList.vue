<template>
  <div id="ToDoList">
    <Header></Header>
    <ListHeader></ListHeader>
    <ThingList></ThingList>
  </div>
</template>

<script>
import ListHeader from '@/components/ListHeader.vue'
import ThingList from '@/components/ThingList.vue';
import Header from '@/components/Header.vue';
export default {
  name:"ToDoList",
  components:{
    ListHeader,ThingList,Header
  }
}
</script>

<style>
  #ToDoList{
    width: 100%;
    height: 1500px;
    background-image: url('../assets/images/background.jpeg');
    background-size: 100% 100%;

  }
</style>