<template>
  <div class="kinds">
    <div class="top">分类</div>
    <div class="contentStyle">
      <div class="leftStyle">
        <div
          v-for="(x, index) in menuList"
          :key="index"
          :id="x.id"
          @click="chooseOneMenu(x.id)"
          :class="{has:x.id==nowid}"
        >
          <span></span>
          <div>{{x.cateName}}</div>
        </div>
      </div>
      <div class="rightStyle">
        <div>
          <div class="ig">
            <img src="../../assets/top.jpg" />
          </div>
          <div class="zi" v-for="x in goodsList.goods" :key="x.id">
            <div class="zi1">{{x.cateName}}</div>
            <div class="tu" v-for="y in x.pi" :key="y.id" @click="chooseOneGood(y.skuNo)">
              <div>
                <img :src="y.picUrl" alt />
              </div>
              <div>{{y.skuName}}</div>
            </div>
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
      menuList: [],
      nowid: "",
      goodsList: {},
      cateCodeParent:0
    };
  },
  beforeMount() {
    this.$nextTick(() => {
       this.getDate();
     });
    //调一个查询商品接口
    this.getGoodList(this.nowid);
  },
  methods: {
    getDate() {
      this.meunList=[]
      this.$axios.post("goodscate/getgoodscateone").then(res => {
        if (200 == res.data.code) {
          this.menuList = res.data.data;
          for (var i = 0; i < this.menuList.length; i++) {
            this.menuList[i].id = i + 1 + "";
          }
          this.cateCodeParent=this.menuList[0].cateCode
           this.nowid = "1";
          console.log(this.menuList[0])
          var pp={}
            this.$axios.post("goodscate/getgoodscatetwo",{cateCodeParent:this.cateCodeParent}).then(res => {
              console.log(res)
                if(200==res.data.code){
                  this.goodsList.goods=res.data.data
                  console.log(this.goodsList.goods)
                }
          })
        }
      });
    },
    chooseOneMenu(val) {
      this.nowid = val;
      this.getGoodListp(val);
    },
    chooseOneGood(val) {
       this.$router.push({
       path:'/goodsDetail',
       query:{
         skuNo:val,
       }
     })
    },
    //查询商品
    getGoodListp(val){
      console.log(val)
        this.$axios.post("goodscate/getgoodscatetwo",{cateCodeParent:this.menuList[val-1].cateCode}).then(res => {
              console.log(res)
                if(200==res.data.code){
                  this.goodsList.goods=res.data.data
                  console.log(this.goodsList.goods)
                }
          })
    },
    getGoodList(val) {
      console.log(val);
      // console.log(this.menuList[val].cateCode)
      this.goodsList = {
        topimg: {
          imgSrc: require("../../assets/imag1.png"),
          id: "001"
        },
        goods: [
          {
            title: "休闲食品",
            id: "01",
            goodsArr: [

            ]
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.topStyle {
  height: 4rem;
  width: 100%;
  line-height: 4rem;
  position: fixed;
  top: 0;
}
.topStyle > div {
  float: left;
}
.top {
  height: 4rem;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: #b9986c;
  background: #e9e5e5;
}
.ok {
  float: left;
  position: relative;
  top: 0;
  width: 1.2rem;
  left: 63%;
  height: 1.2rem;
  font-size: 9px;
  line-height: 1.5rem;
  border-radius: 10rem;
  background: red;
}
.topStyle img {
  height: 2rem;
}
.topStyle div:nth-child(1) {
  width: 10%;
  text-align: center;
  margin-top: 0.6rem;
}
.topStyle div:nth-child(2) img {
  position: absolute;
  top: 1rem;
  left: 12%;
}
.topStyle div:nth-child(3) {
  width: 80%;
}
.topStyle div:nth-child(3) input {
  width: 90%;
  height: 2.5rem;
  background: #f2f2f2;
  border: 0;
  border-radius: 30px;
  padding-left: 10%;
}
.topStyle div:nth-child(4) {
  position: absolute;
  top: 0.7rem;
  right: 13%;
}
.topStyle div:nth-child(5) {
  width: 10%;
  text-align: center;
  margin-top: 0.6rem;
}

.contentStyle {
  height: calc(100% - 10rem);
  width: 100%;
  position: fixed;
  top: 4rem;
  overflow: hidden;
}
.leftStyle {
  width: 30%;
  height: 100%;
  background: #f2f2f2;
  float: left;
  overflow: auto;
}
.leftStyle > div {
  height: 5rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  background: #f2f2f2;
}
.has {
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  background: #fff !important;
}
.has > span {
  margin-top: 1rem;
  height: 2.6rem;
  width: 0.3rem;
  background: #b9986c;
  float: left;
}
.rightStyle {
  width: 70%;
  height: 100%;
  overflow: auto;
  float: left;
}
.rightStyle > div {
  height: 100%;
  width: 92%;
  margin-left: 4%;
}
.ig img {
  height: 14rem;
  width: 100%;
}
.ig {
  height: 14rem;
}
.zi1 {
  height: 3rem;
  line-height: 3rem;
  text-align: left;
}
.zi {
  overflow: hidden;
}
.tu {
  width: 35%;
  float: left;
  height: 9rem;
  text-align: center;
  margin: 1rem 7%;
}
.tu img {
  height: 7rem;
  width: 8rem;
}
.tu div:last-child {
  height: 3rem;
  line-height: 3rem;
}
</style>
