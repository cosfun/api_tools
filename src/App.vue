<template>
  <div id="app">
    <NavMenu></NavMenu>
    <Container></Container>
  </div>
</template>

<script>
  import NavMenu from './components/commons/NavMenu.vue'
  import Container from './components/commons/Container.vue'
export default {
  name: 'app',
  components:{
    NavMenu,
    Container
  }
}
</script>

<style>
#app {

}
</style>
