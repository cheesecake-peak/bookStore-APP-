<template>
  <div class="orderDetails">
    <div class="yaoTop">
      <div @click="toBack()">
        <img src="../../assets/jian.png">
      </div>
      订单详情
    </div>
    <div class="yaoK">
      <div class="top">
        <div class="map">
          <img src="../../assets/car.png" ><span>{{list.faStoreName}}</span>
          
        </div>
        <div class="map">
          <img src="../../assets/position.png" ><span>{{list.storeName}}</span>
        </div>
      </div>
      <div class="bodyArr" >
        <div class="goodsImg"><img :src="listp.picUrl" class="img"></div>
        <div class="goodsName">
          <div class="goodsOp">{{listp.skuName}}</div>
          <div class="goodOop">{{listp.detail}}</div>
          <div class="inputName">
            <div class="price">￥{{listp.sellingPrice}}<span> ×{{this.$route.query.goodsCnt}}</span></div>
          </div>
        </div>
        <div class="tt">
          <span>共{{this.$route.query.goodsCnt}}件商品，合计￥</span>
          <span>{{listp.sellingPrice*this.$route.query.goodsCnt}}</span>
        </div>
      </div>
    </div>
    <div class="yaoQ">
      <div>订单信息</div>
      <div>订单编号：<span>{{this.$route.query.orderDetailCode}}</span></div>
      <div>创建时间：<span>{{list.payTime}}</span></div>
      <div>订单状态：<span>{{list.orderStatus==0?'已付款':list.orderStatus==3?'待取货':list.orderStatus==6?'已完成':''}}</span> </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     list:[],
     listp:[]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods:{
    getDate(){
        var pam={
          orderDetailCode:this.$route.query.orderDetailCode,
          orderNo:this.$route.query.orderNo,
          skuNo:this.$route.query.skuNo
        }
          this.$axios.post("order/selectOrderMaste", pam).then(res => {
            if(200==res.data.code){
              this.list=res.data.data
            }
          })
            this.$axios.post("order/selectOrderMasteAll", pam).then(res => {
              console.log(res)
            if(200==res.data.code){
              this.listp=res.data.data
            }
          })

    },
     toBack(){
        this.$router.push({
        path:'myOrder'
     })
    }, 
  }
};
</script>

<style scoped>
.orderDetails {
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
.tt{
  float: right;
}
.tt span:first-child{
  font-size: 1.2rem;
}
.bodyArr{
  height: 12rem;
  overflow: hidden;
  background: #fff;
  margin: 1rem 1rem 1rem 2rem;
  border-radius: 1rem;
}
.yaoK{
  height: 24rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
  font-size: 1.4rem;
}
.yaoQ{
  height: 11rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
}
.yaoQ div:nth-child(1){
  height: 2rem;
  line-height: 2rem;
  font-size: 1.3rem;
  font-weight: 700;
  padding-left: 2rem;
  padding-top: 1.5rem;
}
.yaoQ div:nth-child(2){
  font-size: 1.2rem;
  padding-left: 2rem;
  padding-top: 0.5rem;
}
.yaoQ div:nth-child(2) span{
  font-size: 1.2rem;
  margin-left: 3rem;
}
.yaoQ div:nth-child(3){
  font-size: 1.2rem;
  padding-left: 2rem;
  padding-top: 0.5rem;
}
.yaoQ div:nth-child(3) span{
  font-size: 1.2rem;
  margin-left: 3rem;
}
.yaoQ div:nth-child(4){
  font-size: 1.2rem;
  padding-left: 2rem;
  padding-top: 0.5rem;
}
.yaoQ div:nth-child(4) span{
  font-size: 1.2rem;
  margin-left: 3rem;
  color: #b9986c;
}
.map{
  width: 100%;
  height: 3.2rem;
  padding-top: 0.8rem;
  line-height: 4rem;
  font-size: 1.3rem;
}
.map span{
  padding-left: 0.8rem;
}
.map img{
  position: relative;
  top:0.3rem;
}
.inputName span:last-child{
  font-size: 1.2rem;
  color: #bdbdbd;
  padding-left: 0.5rem;
}
.top{
   width: 92%;
   margin-left: 5%;
   border-bottom: 1px solid #DEDEDE;
   height: 10rem;
}
.goodsOp{
  height: 3rem;
  line-height: 1.5rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goodOop{
  height: 2rem;
  line-height: 2rem;
  font-size: 1rem;
  color: rgb(173, 173, 173);
}
.inputName{
  overflow: hidden;
  height: 3rem;
}
.price{
  float: right;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.4rem;
    color: red;
}
.goodsName{
  float: left;
  width: 70%;
  margin-left: 4%;
}
.goodsImg{
  height: 10rem;
  width: 25%;
  float: left;
  text-align: center;
}
.goodsImg img{
   height: 9rem;
  width: 8rem;
  margin-top:1rem;
}
</style>
