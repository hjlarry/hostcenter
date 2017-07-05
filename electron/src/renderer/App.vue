<template>
  <div id="app">
    <app-head></app-head>
    <transition name="slide" mode="out-in">
    <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import appHead from './components/Header.vue'
export default {
  name  : 'app',
  components: {
    appHead: appHead
  },
  created(){

  }
}
</script>

<style>
  @import "assets/bootstrap.min.css";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 15px;
  margin-right: auto;
  margin-left: auto;
  padding-left: 15px;
  padding-right: 15px;
}

.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}
.el-col {
  border-radius: 4px;
}
.slide-enter-active{
  animation: slide-in 200ms ease-out forwards;
}
.slide-leave-active{
  animation: slide-out 200ms ease-out forwards;
}
@keyframes slide-in {
  from{
    transform: translateY(-30px);
    opacity : 0;
  }
  to{
    transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-out {
  from{
    transform: translateY(0);
    opacity: 1;
  }
  to{
    transform: translateY(-30px);
    opacity: 0;
  }
}
  .box{
    width: 40%;
    margin: 0 auto;
  }
</style>
