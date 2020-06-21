<template>
  <div id="app">
    <!-- <img src="../static/images/ava.jpg" alt=""> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  
  }
}
</script>

<style>
 html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    background-color: black;
  }
 #app {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
</style>
