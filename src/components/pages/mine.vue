<template>
  <div class="mine">
    <div class="mineTop">个人中心</div>
    <div class="mineDi">
      <div class="mineName">
        <div class="mineNameleft">
          <van-image round width="5rem" height="5rem" src="../../assets/mine/head.png"/>
        </div>
        <div class="mineNameright">
              {{name}}
        </div>

      </div>
      <div class="mineNu">
        <div class="minuN">
          <div class="dem" @click="toOrder">
            <div ><img src="../../assets/mine/order.png" ><span style="padding-left: 0.5rem;">我的订单</span></div>
            <div ><img src="../../assets/mine/jiantou.png" ></div>
          </div>
          <div class="dem1">
            <div @click="topass()"><img src="../../assets/mine/editpassword.png" ><span style="padding-left: 0.5rem;">修改密码</span></div>
            <div ><img src="../../assets/mine/jiantou.png" ></div>
          </div>
          <div class="dem1">
            <div @click="toYao()"><img src="../../assets/mine/invitation.png" ><span style="padding-left: 0.5rem;">修改店铺邀请码</span></div>
            <div ><img src="../../assets/mine/jiantou.png" ></div>
          </div>
          <div class="dem2" >
            <div @click="toLogin()"><img src="../../assets/mine/login.png" ><span style="padding-left: 0.5rem;">退出登录</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name:"",
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },

  methods:{
 
    getDate(){
         var pp={}
        this.$axios.post("systemuser/finduserny", pp).then(res => {
          console.log(res)
          if(200==res.data.code){
            this.name=res.data.data.nickName
          }
        })
    },
    toLogin(){
       this.$router.push({
       path:'/'
     })
    },
    toYao(){
        this.$router.push({
        path:'/yao'
     })
    },
    topass(){
       this.$router.push({
        path:'/password'
     })
    },
    toOrder(){
      this.$router.push({
        path:'/myOrder'
     })
    }
  }
};
</script>

<style scoped>
.mine {
  height: 100%;
  width: 100%;
}
.mineTop {
  height: 4rem;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: #b9986c;
}
.mineDi {
  height: calc(100% - 10rem);
  width: 100%;
  background: #f2f2f2f2;
}
.mineName {
  width: 100%;
  height: 9rem;
}
.mineNameleft{
  float: left;
  height: 9rem;
  width: 37%;
  line-height: 9rem;
  text-align: right;
}
.mineNameright{
   float: right;
   width: 63%;
   color: black;
   height: 9rem;
   font-size: 1.8rem;
   line-height: 9rem;
}
.van-image--round{
    position: relative;
    top: 2rem;
    right: 1.5rem;
}
.mineNu{
  height: 16rem;
  width: 100%;
}  
.minuN{
  height: 17.2rem;
  width: 96%; 
  background: #fff; 
  margin-left: 2%;
  border-radius: 1rem;
}
.dem{
    overflow: hidden;
    font-size: 1.5rem;
    padding-top: 1.6rem;
}
.dem div:first-child img{
    height: 1.8rem;
    line-height: 1.8rem;
    position: relative;
    top:0.2rem;
}
.dem div:last-child img{
    height: 1.3rem;
    position: relative;
    right: 0.8rem;
}
.dem div:first-child{
    float: left;
    width: 40%;
    margin-left: 1.5rem;
}
.dem div:last-child{
    float: right;
}
.dem1{
    overflow: hidden;
    font-size: 1.5rem;
    padding-top: 1.5rem;
}
.dem1 div:first-child img{
    height: 1.8rem;
    line-height: 1.8rem;
    position: relative;
    top:0.2rem;
}
.dem1 div:last-child img{
    height: 1.3rem;
    position: relative;
    right: 0.8rem;
}
.dem1 div:first-child{
    float: left;
    width: 45%;
    margin-left: 1.5rem;
}
.dem1 div:last-child{
    float: right;
}
.dem2{
    overflow: hidden;
    font-size: 1.5rem;
    padding-top: 1.5rem;
}
.dem2 div:first-child img{
    height: 1.8rem;
    line-height: 1.8rem;
    position: relative;
    top:0.2rem;
}
.dem2 div:first-child{
    float: left;
    width: 45%;
    margin-left: 1.5rem;
}
</style>
