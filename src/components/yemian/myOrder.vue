<template>
  <div class="myOrders">
    <div class="myOrdersTop">
      <span @click="backToMine">&lt;</span>
      <span>我的订单</span>
    </div>
    <div class="contentStyle">
      <div class="contentTitle">
        <van-tabs v-model="active" @click="change">
          <van-tab title="全部订单">
            <div class="contentMid" v-for="x in order" :key="x.id">
              <div class="contentMidTop">
                <div class="contentMidTopLeft">
                  <img src="../../assets/order.png" />
                  <span>{{x.orderNo}}</span>
                </div>
                <div
                  class="contentMidTopRight"
                >{{x.orderStatus==0?'已付款':x.orderStatus==1?'已发货':x.orderStatus==3?'待取货':x.orderStatus==6?'已完成':''}}</div>
              </div>
              <div v-for="y in x.pp" :key="y.id" class="pq">
                <div class="orderImg">
                  <img :src="y.picUrl" @click="ToOrderDetail(y.orderDetailCode,x.orderNo,y.skuNo,x.orderMoney,y.goodsPrice,y.goodsCnt)" />
                </div>
                <div class="orderNameArea">
                  <div class="orderName">{{y.goodsName}}</div>
                  <div class="orderDec">{{y.detail}}</div>
                </div>

                <div class="orderPrice">
                  {{y.goodsPrice}}
                  <span>×{{y.goodsCnt}}</span>
                  <div class="orderCommmen" @click="ToEva(y.skuNo,y.orderDetailCode)" v-if="x.orderStatus==6  && y.isEva==0">评价</div>
                </div>
              </div>
              <div class="orderCommen" v-if="x.orderStatus==3" @click="ToSure(x.orderNo)">确认取货</div>
              <div class="orderPriceSum">
                共{{x.num}}件商品，合计¥
                <span>{{x.orderMoney}}</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="已付款" >
            <div class="contentMid" v-for="x in order1" :key="x.id">
              <div class="contentMidTop">
                <div class="contentMidTopLeft">
                  <img src="../../assets/order.png" />
                  <span>{{x.orderNo}}</span>
                </div>
                <div
                  class="contentMidTopRight"
                >{{x.orderStatus==0?'已付款':x.orderStatus==3?'待取货':x.orderStatus==6?'已完成':''}}</div>
              </div>
              <div v-for="y in x.pp" :key="y.id" class="pq">
                <div class="orderImg">
                  <img :src="y.picUrl" @click="ToOrderDetail(y.orderDetailCode,x.orderNo,y.skuNo,x.orderMoney,y.goodsPrice,y.goodsCnt)" />
                </div>
                <div class="orderNameArea">
                  <div class="orderName">{{y.goodsName}}</div>
                  <div class="orderDec">{{y.detail}}</div>
                </div>

                <div class="orderPrice">
                  {{y.goodsPrice}}
                  <span>×{{y.goodsCnt}}</span>
                 
                </div>
              </div>
              <div class="orderPriceSum">
                共一件商品，合计¥
                <span>{{x.orderMoney}}</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="待取货" >
            <div class="contentMid" v-for="x in order2" :key="x.id">
              <div class="contentMidTop">
                <div class="contentMidTopLeft">
                  <img src="../../assets/order.png" />
                  <span>{{x.orderNo}}</span>
                </div>
                <div class="contentMidTopRight">
                  {{x.orderStatus==0?'已付款':x.orderStatus==3?'待取货':x.orderStatus==6?'已完成':''}}</div>
                </div>
              <div v-for="y in x.pp" :key="y.id" class="pq">
                <div class="orderImg">
                  <img :src="y.picUrl" @click="ToOrderDetail(y.orderDetailCode,x.orderNo,y.skuNo,x.orderMoney,y.goodsPrice,y.goodsCnt)" />
                </div>
                <div class="orderNameArea">
                  <div class="orderName">{{y.goodsName}}</div>
                  <div class="orderDec">{{y.detail}}</div>
                </div>

                <div class="orderPrice">
                  {{y.goodsPrice}}
                  <span>×{{y.goodsCnt}}</span>
                  <div class="orderCommen" v-if="x.orderStatus==3" @click="ToSure(x.orderNo)">确认取货</div>
                </div>
              </div>
              <div class="orderPriceSum">
                共一件商品，合计¥
                <span>{{x.orderMoney}}</span>
              </div>
            </div>
          </van-tab>
          <van-tab title="已完成">
            <div class="contentMid"  v-for="x in order3" :key="x.id">
              <div class="contentMidTop">
                <div class="contentMidTopLeft">
                  <img src="../../assets/order.png" />
                  <span>{{x.orderNo}}</span>
                </div>
                <div
                  class="contentMidTopRight"
                >{{x.orderStatus==0?'已付款':x.orderStatus==3?'待取货':x.orderStatus==6?'已完成':''}}</div>
              </div>
              <div v-for="y in x.pp" :key="y.id" class="pq">
                <div class="orderImg">
                  <img :src="y.picUrl" @click="ToOrderDetail(y.orderDetailCode,x.orderNo,y.skuNo,x.orderMoney,y.goodsPrice,y.goodsCnt)"  />
                </div>
                <div class="orderNameArea">
                  <div class="orderName">{{y.goodsName}}</div>
                  <div class="orderDec">{{y.detail}}</div>
                </div>

                <div class="orderPrice">
                 
                  {{y.goodsPrice}}
                  <span>×{{y.goodsCnt}}</span>
                   <div class="orderCommmen"  @click="ToEva(y.skuNo)" v-if=" y.isEva==0">评价</div>
                </div>
              </div>
              <div class="orderPriceSum">
                共1件商品，合计¥
                <span>{{x.orderMoney}}</span>
              </div>
            
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myOrders",
  data() {
    return {
      active: 0,
      order: [],
      order1: [],
      order2: [],
      order3: [],
      editForm:{},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    ToEva(val,vall){
  
       this.$router.push({
        path: "/evaluate",
        query:{
        skuNo:val,
        orderDetailCode:vall,
       }
       
      });
    },
    ToSure(val){
      this.editForm = {
          orderNo:val,
        };
      console.log(this.editForm.orderNo)
      this.$axios.post("order/sureOrder", this.editForm).then(res => {
          if (200 == res.data.code) {
               this.getDate();
           }
        });
    },
    change(title) {
      var orderStatus = "";
      if (title == 0) {
        orderStatus = 9999;
      } else if (title == 1) {
        orderStatus = 0;
      } else if (title == 2) {
        orderStatus = 3;
      } else {
        orderStatus = 6;
      }
      console.log(orderStatus)
      this.$axios.post("order/selectOrderAllApp", { orderStatus: orderStatus }).then(res => {
          if (200 == res.data.code) {
            if (title == 0) {
              this.order = res.data.data;
            } else if (title == 1) {
              this.order1 = res.data.data;
            } else if (title == 2) {
              this.order2 = res.data.data;
            } else {
              this.order3 = res.data.data;
            }
          }else {
             if (title == 0) {
              this.order =[]
            } else if (title == 1) {
              this.order1 =[]
            } else if (title == 2) {
              this.order2 =[]
            } else {
              this.order3 =[]
            }
          }
        });
    },
    getDate() {
      var parm = {};
      this.$axios.post("order/selectOrderAllApp",  parm ).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.order = res.data.data;
        }
        console.log(this.order);
      });
    },
    backToMine() {
      this.$router.push({
        path: "/mine"
      });
    },
    ToOrderDetail(val ,vall,valll,val1,val2,val3) {
      this.$router.push({
        path: "/orderDetails",
        query:{
        orderDetailCode:val,
        orderNo:vall,
        skuNo:valll,
        orderMoney:val1,
        goodsPrice:val2,
        goodsCnt:val3,
       }
      });
    },
    backToCommen() {
      this.$router.push({
        path: "/evaluate"
      });
    }
  }
};
</script>

<style scoped>
.myOrders {
  height: 100%;
}
.pq {
  height: 11rem;
}
.myOrdersTop {
  height: 5rem;
  line-height: 5rem;
  width: 100%;
  text-align: center;
  font-size: 2rem;
  font-weight: 500;
  color: #c39761;
}
.myOrdersTop :first-child {
  float: left;
  font-size: 2rem;
  color: black;
  margin-left: 1rem;
}
.myOrdersTop :nth-child(2) {
  font-size: 2rem;
}
.contentStyle {
  background: #f2f2f2;
  height: calc(100% - 5rem);
}
.contentTitle {
  width: 100%;
  height: 5rem;
  background: #f2f2f2;
  padding-top: 1rem;
}
.contentMid {
  background: #fff;

  margin: 1rem;
  border-radius: 1rem;
  overflow: hidden;
}
.contentMidTop {
  height: 3rem;
  padding: 1.5rem;
  overflow: hidden;
}
.contentMidTopLeft {
  height: 3rem;
  line-height: 3rem;
  float: left;
}
.contentMidTopLeft img {
  height: 1.2rem;
  width: 1.2rem;
}
.contentMidTopLeft span {
  font-size: 1.5rem;
  margin-left: 0.5rem;
}
.contentMidTopRight {
  height: 3rem;
  line-height: 3rem;
  text-align: right;
  color: #c39761;
  float: right;
}
.orderImg {
  height: 10rem;
  width: 25%;
  float: left;
  text-align: center;
  background: #f2f2f2;
  margin-left: 3rem;
}
.orderImg img {
  height: 9rem;
  width: 8rem;
  margin-top: 0.5rem;
}
.orderNameArea {
  float: left;
  width: 54%;
  margin-left: 4%;
}
.orderName {
  height: 2rem;
  line-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-top: 0.5rem;
}
.orderDec {
  height: 2rem;
  line-height: 2rem;
  color: #c0bdbd;
}
.orderPrice {
  float: right;
  height: 3rem;
  line-height: 3rem;
  color: red;
  font-size: 1.6rem;
  margin: 2rem 1rem 0 0;
}
.orderPrice span {
  color: #c0bdbd;
  font-size: 1.4rem;
  margin-left: 0.5rem;
}
.orderPriceSum {
  float: right;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.4rem;
  margin: 0.4rem 1.2rem 0 0;
}
.orderPriceSum span {
  font-size: 2rem;
}
.orderCommmen {
  border: 0.2rem solid #c39761;
  border-radius: 2rem;
  color: #c39761;
  height: 2rem;
  width: 5rem;
  line-height: 2rem;
  margin-top: 0.3rem;
  margin-right: 0.3rem;
  text-align: center;
}
.orderCommen{
  border: 0.2rem solid #c39761;
  border-radius: 2rem;
  color: #c39761;
  height: 2rem;
  width: 8rem;
  line-height: 2rem;
  margin-top: 0.3rem;
  margin-right: 0.3rem;
  float: right;
  text-align: center;
}
</style>
<style>
.myOrders .van-tab {
  background: #f2f2f2;
  border-color: #f2f2f2 !important;
}
.myOrders .van-tab--active {
  color: #c39761;
  font-size: 1.8rem;
}
.myOrders .van-tabs__line {
  display: none;
}
</style>
