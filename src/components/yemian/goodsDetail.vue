<template>
  <div class="goodsDetail">
    <div class="contentStyle">
      <div class="topStyle">
        <van-tabs v-model="active" >
          <div class="back" @click="backTo">&lt;</div>
          <van-tab title="首页">
            <div class="bodyMid">
              <div class="bodyImg">
                <van-swipe :autoplay="3000">
                  <van-swipe-item v-for="(image, index) in images" :key="index">
                    <img :src="image" />
                  </van-swipe-item>
                </van-swipe>
              </div>
              <div class="shopDetail">
                <div class="shopPrice">
                  <span>¥</span>
                  <span>{{goods.sellingPrice}}</span>
                  <del>{{goods.fixPrice}}</del>
                </div>
              </div>
              <div class="shopDec">{{goods.detail}}</div>
              <div class="shopSum">
                <div class="shopSumLeft">数量</div>
                <div class="shopSumRight">
                  <div class="min" @click="min">+</div>
                  <div class="num">
                    <input type="number" v-model="this.num" />
                  </div>
                  <div class="plus" @click="plus">-</div>
                </div>
              </div>
              <div class="shopAddress">
                <span>送至</span>
                <img src="../../assets/location1.png" />
                <span>{{goods.storeName}}</span>
              </div>
              <div class="buttomStyle">
                <div class="buttomImg" @click="backToCar">
                  <img src="../../assets/emptyCar.png" />
                </div>
                <div class="buttomImgDec" @click="backToCar">购物车</div>
                <div class="joinCar" @click="addToCar">加入购物车</div>
                <div class="nowBuy" @click="backToMyOrders">立即购买</div>
              </div>
            </div>
          </van-tab>
          <van-tab title="评价">
            <div class="commenStyle">
              <van-tabs v-model="active1" @click="change">
                <van-tab title="全部评价" >
                  <div class="commenStyleMid">
                    <div v-for="x in eva" :key="x.id">
                      <div class="commenTop">
                        <img src="../../assets/1.1.png" />
                        <div class="commenFirst">{{x.createBy}}</div>
                        <div class="commenSecond">{{x.createTime}}</div>
                        <div class="grade">
                          <van-rate v-model="x.starLevel"   readonly  />
                        </div>
                      </div>
                      <div class="commenDec">{{x.assessText}}</div>
                    </div>
                  </div>
                </van-tab>
                <van-tab title="好评" >
                  <div class="commenStyleMid">
                    <div v-for="x in goodeva" :key="x.id">
                      <div class="commenTop">
                        <img src="../../assets/1.1.png" />
                        <div class="commenFirst">{{x.createBy}}</div>
                        <div class="commenSecond">{{x.createTime}}</div>
                        <div class="grade">
                          <van-rate v-model="x.starLevel" :count="x.starLevel" />
                        </div>
                      </div>
                      <div class="commenDec">{{x.assessText}}</div>
                    </div>
                  </div>
                </van-tab>
                <van-tab title="中评" >
                  <div class="commenStyleMid">
                    <div v-for="x in middleva" :key="x.id">
                      <div class="commenTop">
                        <img src="../../assets/1.1.png" />
                        <div class="commenFirst">{{x.createTime}}</div>
                        <div class="commenSecond">2020-02-11 11-54-01</div>
                        <div class="grade" style="position:relative;left:27rem">
                          <van-rate v-model="x.starLevel" :count="x.starLevel" />
                        </div>
                      </div>
                      <div class="commenDec">{{x.assessText}}</div>
                    </div>
                  </div>
                </van-tab>
                <van-tab title="差评">
                  <div class="commenStyleMid">
                    <div v-for="x in badeva" :key="x.id">
                      <div class="commenTop">
                        <img src="../../assets/1.1.png" />
                        <div class="commenFirst">{{x.createBy}}</div>
                        <div class="commenSecond">{{x.createTime}}</div>
                        <div class="grade" style="position:relative;left:31rem">
                          <van-rate v-model="x.starLevel" :count="x.starLevel"/>
                        </div>
                      </div>
                      <div class="commenDec">
                        {{x.assessText}}
                      </div>
                    </div>
                  </div>
                </van-tab>
              </van-tabs>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsDetail",
  data() {
    return {
      active: 0,
      active1: 0,
      value1: 5,
      value2: 4,
      value3: 2,
      value4: 2,
      value5: 5,
      value6: 3,
      value7: 1,
      goods: {
        detail: "",
        sellingPrice: "",
        fixPrice: "",
        storeName: ""
      },
      eva: [],
      goodeva: [],
      middleva: [],
      badeva: [],
      images: [
        // require("../../assets/book.png"),
        // require("../../assets/book.png"),
        // require("../../assets/book.png"),
        // require("../../assets/book.png")
      ],
      num: "1"
    };
  },
  mounted() {
    console.log(this.$route.query.skuNo);
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    change(title) {
      var po;
      var parm = {
        skuNo: this.$route.query.skuNo,
        status: title
      };
      console.log(parm)
      this.$axios.post("evaluate/selectEvaluate", parm).then(res =>{
        if (200 == res.data.code) {
          if(title==0){
            this.eva=res.data.data
          }else if(title==1){
             this.goodeva=res.data.data
          }
          else if(title==2){
             this.middleva=res.data.data
          }
          else {
             this.badeva=res.data.data
          }
        }
      });
    },
    getDate() {
      var parm = {
        skuNo: this.$route.query.skuNo
      };
      this.$axios.post("goods/findGoodsBanner", parm).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.images.push(res.data.data[i].surPicUrl);
          }
        }
      });
      this.$axios
        .post("goods/seletGoods", { skuNo: this.$route.query.skuNo })
        .then(res => {
          console.log(res);
          if (200 == res.data.code) {
            (this.goods.detail = res.data.rows[0].detail),
              (this.goods.sellingPrice = res.data.rows[0].sellingPrice),
              (this.goods.fixPrice = res.data.rows[0].fixPrice);
          }
        });
      var pa = {};
      this.$axios.post("store/findStore", pa).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.goods.storeName = res.data.data[0].storeName;
        }
      });
      var pt = {
        skuNo: this.$route.query.skuNo,
        status: 0
      };
      this.$axios.post("evaluate/selectEvaluate", pt).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          this.eva = res.data.data;
          console.log(this.eva);
        }
      });
      // console.log(this.goods);
    },
    backTo() {
      this.$router.back(-1)
    },
    backToCar(){
      this.$router.push({
        path:'/car'
      })
    },
    backToMyOrders() {
      var pp = {
        skuNo: this.$route.query.skuNo,
        goodsCnt: this.num
      };
      var ok = [];
      ok.push(pp);
      this.$axios.post("order/addOrder", ok).then(res => {
        if (200 == res.data.code) {
          this.$router.push({
            path: "/myOrder"
          });
        }
      });
    },
    addToCar() {
      var list = {
        cntNumber: this.num,
        skuNo: this.$route.query.skuNo
      };
      this.$axios.post("shopcar/addShopCar", list).then(res => {
        if (200 == res.data.code) {
          this.$router.push({
            query: {
              goodsCnt: this.num
            }
          });
          this.$toast.success("加入购物车成功")
        }
      });
    },
    min() {
      this.num++;
    },
    plus() {
      if (1 == this.num) {
        alert("数量至少为1");
      } else {
        this.num--;
      }
    },
  }
};
</script>

<style scoped>
/* .commenStyle{
  height: 100%;
} */
.goodsDetail {
  height: 100%;
  background: #f2f2f2;
}
.topStyle {
  width: 100%;
  height: 4.4rem;
}
.bodyMid {
  height: calc(100% - 4.4rem);
}
.back {
  float: left;
  font-size: 2rem;
  color: black;
  margin: 1rem 0 0 1rem;
  position: absolute;
  top: -0.3rem;
  left: 2rem;
}
.contentStyle {
  background: #f2f2f2;
  height: calc(100% - 5.5rem);
}
.bodyImg {
  background: #fff;
  margin: 1rem;
  border-radius: 1rem;
}
.bodyImg img {
  display: block;
  height: 31rem;
  width: 60%;
  margin: 0 auto;
  padding: 2rem;
}
.shopDetail {
  height: 18rem;
  width: 94%;
  background: #fff;
  margin: 1rem;
  border-radius: 1rem;
}
.shopPrice {
  height: 5rem;
  line-height: 5rem;
}
.shopPrice :first-child {
  color: red;
  height: 1rem;
  line-height: 1rem;
  font-size: 1.5rem;
  position: relative;
  top: 1.5rem;
  margin-left: 1.3rem;
}
.shopPrice :nth-child(2) {
  color: red;
  margin-left: 0.2rem;
  font-size: 2rem;
  position: relative;
  top: 1.5rem;
}
.shopPrice del {
  position: relative;
  top: 1.5rem;
  left: 0.5rem;
  color: #adadad;
}
.shopDec {
  height: 4.2rem;
  width: 89%;
  line-height: 1.5rem;
  position: relative;
  bottom: 13rem;
  font-size: 1.3rem;
  color: #5a5a5a;
  margin: 0 2rem 0 2rem;
  border-bottom: 1px solid #f2f2f2;
  font-weight: 600;
}
.shopSum {
  height: 3rem;
  width: 90%;
  line-height: 3rem;
  position: relative;
  bottom: 12.5rem;
  margin: 0 2rem 0 2rem;
  overflow: hidden;
}
.shopSumLeft {
  float: left;
  height: 3rem;
  width: 45%;
  color: #5a5a5a;
  font-size: 1.4rem;
}
.shopSumRight {
  float: right;
  height: 3rem;
  width: 45%;
}
.num,
.min,
.plus {
  float: right;
  margin-top: 0.5rem;
}
.min,
.plus {
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  border: 1px solid #eee;
  background: #fff;
}
.num input {
  width: 4rem;
  height: 2rem;
  background: #fff;
  border: 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  text-align: center;
  padding: 0;
  position: relative;
  top: -0.4rem;
}
.min {
  margin-right: 1rem;
}
.shopAddress {
  height: 3rem;
  width: 90%;
  line-height: 3rem;
  position: relative;
  bottom: 12.5rem;
  margin-left: 2rem;
}
.shopAddress span {
  color: #5a5a5a;
  font-size: 1.4rem;
}
.shopAddress img {
  height: 1.8rem;
  position: relative;
  top: 0.3rem;
  margin-left: 1.5rem;
}
.shopAddress :last-child {
  color: #adadad;
  margin-left: 0.5rem;
}
.buttomStyle {
  width: 100%;
  height: 5.5rem;
  position: fixed;
  bottom: 0;
  background: #fff;
}
.buttomImg {
  height: 2rem;
  width: 3rem;
}
.buttomImg img {
  height: 2rem;
  width: 2.5rem;
  position: relative;
  top: 0.7rem;
  left: 11.5rem;
}
.buttomImgDec {
  height: 2rem;
  width: 4rem;
  position: relative;
  left: 11.5rem;
  top: 0.7rem;
}
.joinCar {
  float: right;
  height: 3rem;
  width: 26%;
  line-height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  border: 0.2rem solid #c39761;
  border-radius: 1rem;
  color: #c39761;
  position: relative;
  bottom: 4rem;
  margin-top: 1rem;
  right: 12rem;
}
.nowBuy {
 float: right;
    height: 3.5rem;
    width: 21%;
    line-height: 3.5rem;
    font-size: 1.6rem;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
    position: relative;
    bottom: 4rem;
    left: 9rem;
    background: #c39761;
    margin-top: 1rem;
}
.commenStyleMid {
  height: 52rem;
  width: 96%;
  background: #fff;
  margin-top: 1rem;
  margin-left:2%;
  border-radius: 1rem;
  overflow: auto;
}
.commenTop {
  height: 8rem;
  width: 100%;
}
.commenTop img {
  height: 4rem;
  width: 4rem;
  padding: 2.5rem 0 0 1rem;
}
.commenFirst {
  height: 2rem;
  width: 50%;
  position: relative;
  bottom: 4rem;
  left: 6rem;
  font-size: 1.4rem;
}
.commenSecond {
  height: 2rem;
  width: 13rem;
  position: relative;
  bottom: 4rem;
  left: 6rem;
  color: #adadad;
}
.grade {
  position: relative;
  left: 22rem;
  bottom: 7rem;
  width: 14%;
}
.commenDec {
  height: 15rem;
  width: 80%;
  font-size: 1.4rem;
  position: relative;
  bottom: 0.5rem;
  margin-left: 6rem;
}
</style>
<style>
.goodsDetail .van-tabs__line {
  display: none;
}
.goodsDetail .van-tab--active {
  color: #c39761;
  font-size: 1.8rem;
}
.commenStyle .van-tab {
  background: #f2f2f2;
}
</style>
