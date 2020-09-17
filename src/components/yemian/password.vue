<template>
  <div class="password">
    <div class="yaoTop">
      <div @click="toBack()">
        <img src="../../assets/jian.png">
      </div>
      修改店铺邀请码
    </div>
    <div class="yaoK">
      <div class="yaokk"> 
          <div class="text">原密码</div>
          <input class="in2" type="password" v-model="oldPasssword" placeholder="请输入原密码">    
      </div>
       <div class="yaokk2"> 
          <div class="text">新密码</div>
          <input class="in2" type="password" v-model="newPasssword" placeholder="请输入新密码">    
      </div>
       <div class="yaokk2"> 
          <div class="text">确认新密码</div>
          <input class="in1" type="password" v-model="surenewPasssword" placeholder="请再次输入新密码">    
      </div>
    </div>

    <div class="butt" @click="toYes">确认</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldPasssword:"",
      newPasssword:"",
      surenewPasssword:"",
    };
  },
  methods:{
    
    toBack(){
        this.$router.push({
        path:'/mine'
     })
    },
    toYes(){
      if(this.oldPasssword==''){
          this.$toast.fail("请填写密码")
      }else if( this.newPasssword==''){
        this.$toast.fail("请填写新密码")

      }else if( this.surenewPasssword==''){
        this.$toast.fail("请再一次填写新密码")
        
      }else if(this.newPasssword!=this.surenewPasssword){
           this.$toast.fail("两次密码不相同")
      }
      else{
        var parm={
          oldPassword:this.oldPasssword,
          newPassword:this.newPasssword,
        }
         this.$axios.post("systemuser/setpassword", parm).then(res => {
           if(200==res.data.code){
              this.$router.push({
              path:'/'
              })
           }
         })
       
      }
     //返回数据
    }
  }
};
</script>

<style scoped>
.password {
  height: 100%;
  width: 100%;
  background: #f2f2f2;
}
.yaoTop{
  height: 4rem;
  line-height: 4rem;
  color: #b9986c;
  font-size: 1.6rem;
  width: 100%;
  background: #fff;
  text-align: center;
}
.yaoTop div:first-child{
  position: absolute;
  left: 1rem;
  top:0.2rem;
}
.yaoTop div:first-child img{
  height: 1.5rem;
}
.yaoK{
  height: 15rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
  font-size: 1.4rem;
}
.yaokk{
  height: 3rem;
  line-height: 3rem;
  padding-top: 1.5rem;
}
.yaokk2{
  height: 3rem;
  line-height: 3rem;
  padding-top: 1rem;
}
.in1{
  height: 3rem;
  width: 12rem;
  border:0;
  margin-left: 2.3rem;
}
.in2{
  height: 3rem;
  width: 12rem;
  border:0;
  margin-left: 5.2rem;
}
.text{
  margin-left: 10%;
  float: left;
}
input::-webkit-input-placeholder {
  color: #aab2bd;
  font-size: 1.3rem;
}
.butt{
  width:60%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  margin-left: 20%;
  color: #fff;
  font-size: 1.5rem ;
  background: rgb(203,161,108);
  border-radius: 1rem;
  margin-top: 1rem;
  position: fixed;
  bottom:2rem ;
}
</style>
