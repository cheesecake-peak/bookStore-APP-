<template>
  <div class="homePage">
    <div class="luyou">
      <router-view></router-view>
    </div>
    <div class="buttomStyle">
      <buttom></buttom>
    </div>

  </div>
</template>

<script>
import buttom from '../components/layui/buttom'
export default {
  components:{buttom},
  data () {
    return {
      
    }
  }
}
</script>

<style scoped>
.homePage{
  height: 100%;
}
.luyou{
  height: 100%;
}
.buttomStyle{
  position: fixed;
  bottom:0;
  width: 100%;
}
</style>
