<template>
  <div class="login">
   <div class="top">
     <div class="topImg">
      <img src="../../assets/login/01登陆.png"> 
     </div>
   </div>
   <div class="body1">
     <img src="../../assets/login/name.png">
     <input type="text" v-model="userName" placeholder="用户名">
   </div>
   <div class="body2">
      <img src="../../assets/login/pass.png">
      <input type="password" v-model="passWord" placeholder="密码">
   </div>
   <div class="butt" @click="toLogin">登陆</div>
   <div class="di" @click="toRegist">注册</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName:'',
      passWord:'',
    }
  },
  methods:{
    toLogin(){
      if(''==this.userName){
      alert('请输入用户')
      return;
     }
     if(''==this.passWord){
       alert('请输入密码')
       return;
     }
      //掉接口
      var param = {
        username: this.userName,
        password: this.passWord
      };
      this.$axios.post("common/login", param).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          localStorage.setItem("userName", this.userName);
          localStorage.setItem("token", res.data.token);
          // this.$message.success(res.data.msg);
          this.$router.push({
            path: "/home"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
   },
   toRegist(){
     this.$router.push({
       path:'register'
     })
   }
  }
}
</script>

<style scoped>
.login{
  height: 100%;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
.topImg{
  text-align: center;
  height: 5rem;
  padding-top:10rem;
}
.topImg img{
  height: 7rem;
}
.body1{
  width: 60%;
  text-align: center;
  border-bottom:1px solid #dfdfdf;
  margin-left: 20%;
  margin-top:18rem;
}
.body1 input{
  border: 0;
}

.body2{
   width: 60%;
  text-align: center;
  border-bottom:1px solid #dfdfdf;
  margin-left: 20%;
  margin-top:4rem;
}
.body2 input{
  border: 0;
  margin-bottom: 1px;
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
  margin-top: 8rem;
}
.di{
  margin-top: 1rem;
  text-align: right;
  padding-right: 7rem;
  font-size: 1.2rem;
}
</style>
