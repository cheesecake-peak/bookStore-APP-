<template>
  <div class="buttom">
        <div class="home" @click="chooseOne('home')" :class="{yanse:'home'==newnew}">
            <div><img src="../../assets/shouye.png" ></div>
            <div>首页</div>
        </div>
        <div class="home" @click="chooseOne('kinds')" :class="{yanse:'kinds'==newnew}">
            <div><img src="../../assets/icon--.png" ></div>
            <div>分类</div>
        </div>
        <div class="home" @click="chooseOne('car')" :class="{yanse:'car'==newnew}">
            <div><img src="../../assets/gouwuche.png" ></div>
            <div>购物车</div>
        </div>
        <div class="home" @click="chooseOne('mine')" :class="{yanse:'mine'==newnew}">
            <div><img src="../../assets/tubiao-.png" ></div>
            <div>我的</div>
        </div>

    </div>
</template>

<script>
export default {
  data () {
    return {
      newnew:''
    }
  },
  mounted(){
      this.newnew=this.$route.name
  },
  methods:{
      chooseOne(val){
          this.newnew=val
          this.$router.push({
              path:val,
          })
      }
  }
}
</script>

<style scoped>
.buttom{
    height: 6rem;
    width: 100%;
    overflow: hidden;
}
.buttom>div{
    height: 6rem;
    width: 25%;
    float: left;
    text-align: center;
}
.home div:first-child{
    height: 3rem;
    margin-top: .5rem;
}
.home div:last-child{
    height: 2rem;
    line-height: 2rem;
    margin-top: .4rem;
}
.yanse{
     color: #b9986c;
}
</style>
