<template>
  <div class="evaluate">
    <div class="yaoTop">
      <div @click="toBack()">
        <img src="../../assets/jian.png">
      </div>
      评价
    </div>
     <div class="yaoK">
       <div class="pic">
            <img :src="list.surPicUrl" class="ipp" />
       </div>
       <div class="xing">
          <van-rate v-model="value" />
       </div>
    </div>
    <div class="rile">
      <span >分享您的使用体验吧</span>
    </div>
    <div class="yaoKk">
     <van-field
         v-model="message"
          rows="6"
          autosize
          type="textarea"
          maxlength="150"
          placeholder="请输入留言"
          show-word-limit
      />
    </div>
   <div class="butt" @click="toGo">提交</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 3,
      message:"",
      list:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods:{
    getDate(){
      var pp={
        skuNo:this.$route.query.skuNo
      }
      console.log(this.$route.query.skuNo)
         this.$axios.post("goods/findGoodsBannerOne", pp).then(res =>{
          if(200==res.data.code){
            this.list=res.data.data[0]
          }
         })
    },
    toBack(){
       this.$router.push({
        path:'/myOrder'
      })
    },
    toGo(){
      console.log(this.message)
      console.log(this.value)
      console.log(this.$route.query.skuNo)
      var parm={
        assessText:this.message,
        starLevel:this.value,
        skuNo:this.$route.query.skuNo,
        orderDetailCode:this.$route.query.orderDetailCode
      }
       this.$axios.post("evaluate/addEvaluate", parm).then(res =>{
          if(200==res.data.code){
           this.$router.push({
           path:'/myOrder'
         })
         this.$toast.success("评价成功")
          }
       })
    }
 }
};

</script>

<style scoped>
.evaluate {
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
  margin-top: 3rem;
  bottom:2rem ;
}
.yaoTop div:first-child img{
  height: 1.5rem;
}
.yaoK{
  height: 13rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
  font-size: 1.4rem;
}
.yaoKk{
  height: 17rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
  font-size: 1.4rem;
}
.in1{
  height: 3rem;
  width: 90%;
  border:0;
  margin-left: 1.5rem;
}
.pic{
  height: 12rem;
  width: 46%;
  float: left;
  padding-top:1rem;
}
.ipp{
      margin-left: 1rem;
    height: 10rem;
    width: 17rem;
}
.xing{
  text-align: center;
  height: 12rem;
  float: left;
  width: 45%;
  line-height: 12rem;
}
.rile{
  font-size: 1.5rem;
  padding:0.5rem 0 0rem 0.9rem;
}
</style>
