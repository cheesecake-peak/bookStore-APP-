<template>
  <div class="register">
    <div class="top">
      <div class="jian" @click="back"><img src="../../assets/register/jian.png"></div>
      <span class="ok">注册</span>
    </div>
   <div class="topImg">
     <img src="../../assets/register/01登陆.png" >
   </div>
   <div class="sex">
     <div class="sex1" @click="toto()" >
       <div :class="{color:1==ppid}" ><img src="../../assets/register/男.png"></div>
       <div :class="{color1:1==ppid}" >男</div>
     </div>
     <div class="sex2" @click="toto2()">
       <div :class="{color2:2==ppid}" ><img src="../../assets/register/女.png"></div>
       <div :class="{color3:2==ppid}">女</div>
     </div>
   </div>
   <div class="body1">
     <img src="../../assets/register/name.png">
     <input type="text" v-model="registerDate.userName" placeholder="请输入用户名" >
   </div>
   <div class="body1">
     <img src="../../assets/register/pass.png">
     <input type="password" v-model="registerDate.password" placeholder="请输入密码">
   </div>
   <div class="body1">
     <img src="../../assets/register/确认密码.png">
     <input type="password" v-model="registerDate.passsure" placeholder="请确认密码">
   </div>
   <div class="body1">
     <img src="../../assets/register/手机号.png">
     <input type="text" v-model="registerDate.phone" placeholder="请输入手机号">
   </div>
   <div class="body1">
     <img src="../../assets/register/姓名.png">
     <input type="text" v-model="registerDate.userRealname" placeholder="请输入姓名">
   </div>
  <div class="body1">
     <img src="../../assets/register/身份证号.png">
     <input type="text" v-model="registerDate.idCard" placeholder="请输入身份证号">
   </div>
   <div class="body1">
     <img src="../../assets/register/身份证号.png">
     <input type="text" v-model="registerDate.nickName" placeholder="昵称">
   </div>
     <div class="body1">
     <img src="../../assets/register/身份证号.png">
     <input type="text" v-model="registerDate.yqmCode" placeholder="邀请码">
   </div>
      <div class="butt" @click="zhuce">注册</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ppid:1,
      registerDate:{
        userName:"",
        phone:"",
        nickName:"",
        userRealname:"",
        idCard:"",
        password:"",
        passsure:"",
        sex:"",
        role:"",
      }
    }
  },
  methods:{
    toto(){
      this.ppid=1;
    },
    toto2(){
      this.ppid=2;
    },
    back(){
      this.$router.push({
        path:'/'
      })
    },
    zhuce(){
      if(''==this.registerDate.userName){
      alert('请输入用户名')
      return;
     }
     if(''==this.registerDate.password){
       alert('请输入密码')
       return;
     }
      if(''==this.registerDate.passsure){
       alert('请输入确认密码')
       return;
     }
      if(this.registerDate.password!=this.registerDate.passsure){
       alert('两个输入的密码不一致')
       return;
     }
      if(''==this.registerDate.phone){
       alert('请输入手机号')
       return;
     }
      if(''==this.registerDate.userRealname){
       alert('请输入姓名')
       return;
     }
      if(''==this.registerDate.idCard){
       alert('请输入身份证号')
       return;
     }
    
     if(this.ppid==2){
       this.registerDate.sex="0"
     }else{
       this.registerDate.sex="1"
     }
     this.registerDate.role="3"
     console.log(this.registerDate)
       this.$axios.post("systemuser/adduser",this.registerDate).then(res => {
            if(200==res.data.code){
              this.$router.push({
                 path:'/'
           })
            }else{
              this.$message.error(res.data.msg)
            }
          })
      // 
    }
  }
 
}
</script>

<style scoped>
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
  margin-top: 2rem;
}
input::-webkit-input-placeholder {
  color: #ccc;
}
.body1{
  width: 60%;
  border-bottom:1px solid #dfdfdf;
  margin-left: 20%;
  margin-top:1rem;
}
.body1 img{
  height: 1.6rem;
  width: 1.6rem;
}
.body1 input{
  height: 2rem;
  border: 0;
  margin-left: 1rem;
  margin-bottom: 0.3rem;
}
.color{
  background: rgb(203,161,108) !important;
}
.color1{
  color:rgb(203,161,108);
}
.color2{
  background: rgb(203,161,108) !important;
}
.color3{
  color:rgb(203,161,108);
}
.sex{
  height: 5.5rem;
  width: 48%;
  text-align: center;
  margin-left: 26%;
  margin-top: 3rem;
}
.sex1{
  float:left;
  height: 5.5rem;
  width: 50%;
}
.sex1 div:first-child{
  height: 3.5rem;
  line-height: 3.5rem;
  background: rgb(204,204,204);
}
.sex1 div:first-child img{
  padding-top: 0.7rem;
  height: 2rem;
}
.sex1 div:last-child{
  padding-top: 0.2rem;
  font-size:1.3rem;
}
.sex2{
  float:left;
  height: 5.5rem;
  width: 50%;
}
.sex2 div:first-child{
   height: 3.5rem;
  background: rgb(204,204,204);
}
.sex2 div:first-child img{
  padding-top: 0.7rem;
  height: 2rem;
}
.sex2 div:last-child{
    padding-top: 0.2rem;
    font-size:1.3rem;
}
.register{
  height: 100%;
}
.top{
  height: 4rem;
  text-align: center;
  overflow: hidden;
  line-height: 4rem;
}
.jian{
  float: left;
  padding-left:1rem;
  margin-top:0.4rem;
}
.ok{
  font-weight: 700;
  font-size: 1.8rem;
  color: rgb(203,161,108);
  margin-left:-2rem;
}
.topImg{
  height: 5rem;
  text-align: center;
  padding-top:5rem;
}
.topImg img{
  height: 5rem;

}
</style>
