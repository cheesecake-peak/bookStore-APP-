<template>
  <div class="car">
    <div class="topStlye">
      购物车
      <span v-if="hasChoose" @click="delet">删除</span>
    </div>
    <div class="content">
      <div class="bodyArr" v-for="x in list" :key="x.id">
        <div class="checkBox">
          <input type="checkbox" v-model="x.ischecked" @change="chage(x.ischecked)" />
        </div>
        <div class="goodsImg" @click="toback(x.skuNo)">
          <img :src="x.picUrl" />
        </div>
        <div class="goodsName" @click="toback(x.skuNo)">
          <div class="goodsOp">{{x.skuName}}</div>
          <div class="goodOop">{{x.dec}}</div>
          <div class="inputName">
            <div class="price">￥{{x.price}}</div>
            <div class="jisuan">
              <div class="min" @click="min(x.id)">-</div>
              <div class="num">
                <input type="text" v-model="x.num" />
              </div>
              <div class="plus" @click="plus(x.id)">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sumNum">
      <div>
        <input type="checkbox" v-model="chageall" @change="chageall1" />全选
      </div>
      <div>
        <span @click="toBuy">结算({{hasChoose}})</span>
      </div>
      <div>
        合计:
        <span>{{sumPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// .toFixed(2)
export default {
  data() {
    return {
      list: [],
      hasChoose: 0,
      sumPrice: 0,
      chageall: false
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    //获取页面数据
    getData() {
      this.list = [];
      var parm = {};
      this.$axios.post("shopcar/selectShopCar", parm).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          for (var i = 0; i < res.data.data.length; i++) {
            this.list.push({
              picUrl: res.data.data[i].picUrl,
              num: res.data.data[i].cntNumber,
              skuName: res.data.data[i].skuName,
              dec: res.data.data[i].detail,
              price: res.data.data[i].sellingPrice,
              skuNo: res.data.data[i].skuNo,
              id: i,
              ischecked: false
            });
          }
          this.chageall = false;
        }
      });
      this.getSumPrice();
    },
    getSumPrice() {
      this.sumPrice = 0;
      this.hasChoose = 0;
      for (var i = 0; i < this.list.length; i++) {
        if (true == this.list[i].ischecked) {
          this.sumPrice =
            (((Number(this.list[i].num) *
              100 *
              (Number(this.list[i].price) * 100)) /
              10000) *
              100 +
              this.sumPrice * 100) /
            100;
          this.hasChoose++;
        }
      }
      if (this.hasChoose == this.list.length) {
        this.chageall = true;
      } else {
        this.chageall = false;
      }
    },
    toback(val) {
      this.$router.push({
        path: "/goodsDetail",
        query: {
          skuNo: val
        }
      });
    },
    plus(val) {
      for (var i = 0; i < this.list.length; i++) {
        if (val == this.list[i].id) {
          this.list[i].num++;
          var pp = {
            change: 1,
            skuNo: this.list[i].skuNo
          };
          this.$axios.post("shopcar/changeShopCar", pp).then(res => {});
        }
      }
      this.getSumPrice();
    },
    min(val) {
      for (var i = 0; i < this.list.length; i++) {
        if (val == this.list[i].id) {
          if (1 == this.list[i].num) {
            alert("商品数量最低为1");
          } else {
            this.list[i].num--;
          }
        }
      }
      this.getSumPrice();
    },
    chage(val) {
      this.getSumPrice();
    },
    chageall1() {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].ischecked = this.chageall;
      }
      this.getSumPrice();
    },
    toBuy() {
      var list = [];
      for (var i = 0; i < this.list.length; i++) {
        if (true == this.list[i].ischecked) {
          list.push({
            skuNo: this.list[i].skuNo,
            goodsCnt: this.list[i].num
          });
        }
      }
      console.log(list);
      this.$axios.post("order/addOrder", list).then(res => {
        if (200 == res.data.code) {
          this.$axios.post("shopcar/delShopCar", list).then(res => {
            if (200 == res.data.code) {
              this.list = [];
              this.$router.push({ 
                
                path: "/myOrder"
              });
            }
          });
        }
      });
    },
    delet() {
      var list = [];
      for (var i = 0; i < this.list.length; i++) {
        if (true == this.list[i].ischecked) {
          list.push({
            skuNo: this.list[i].skuNo
          });
        }
      }
      this.$axios.post("shopcar/delShopCar", list).then(res => {
        if (200 == res.data.code) {
          this.getData();
        }
      });
      console.log(list);
    }
  }
};
</script>

<style scoped>
.sumNum {
  overflow: hidden;
  height: 5rem;
  line-height: 5rem;
}
.sumNum div:first-child {
  float: left;
  width: 20%;
  text-align: center;
}
.sumNum div:nth-child(2),
.sumNum div:nth-child(3) {
  float: right;
  width: 30%;
}
.sumNum div:nth-child(2) {
  text-align: center;
}
.sumNum div:nth-child(2) > span {
  text-align: center;
  background: #b9986c;
  color: #fff;
  padding: 1rem 3rem;
  border-radius: 0.7rem;
}
.sumNum div:nth-child(3) > span {
  color: red;
  font-size: 1.4rem;
  padding-left: 1rem;
}
.goodsOp {
  height: 3rem;
  line-height: 1.5rem;
  margin-top: 1rem;
  font-size: 1.3rem;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}
.goodOop {
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
  color: rgb(173, 173, 173);
  width: 200px;/*指定宽度*/
  white-space: nowrap;/*强制不换行*/
  text-overflow: ellipsis;/*溢出部分用省略号替代*/
  overflow: hidden;/*溢出隐藏*/
}
.inputName {
  overflow: hidden;
  height: 3rem;
}
.price {
  float: left;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.6rem;
  color: red;
}
.jisuan {
  overflow: hidden;
  float: right;
  height: 4rem;
}
.num,
.min,
.plus {
  float: left;
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
  width: 5rem;
  height: 2rem;
  background: #fff;
  border: 0;
  text-align: center;
  padding: 0;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.goodsName {
  float: left;
  width: 54%;
  margin-left: 4%;
}
.goodsImg {
  height: 10rem;
  width: 25%;
  float: left;
  text-align: center;
}
.goodsImg img {
  height: 8rem;
  margin-top: 1rem;
  width: 8rem;
}
.checkBox {
  width: 15%;
  text-align: center;
  height: 10rem;
  line-height: 10rem;
  float: left;
}
.car {
  height: 100%;
}
.topStlye {
  height: 4rem;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: #b9986c;
}
.topStlye > span {
  position: absolute;
  right: 1rem;
  font-size: 1.2rem;
}
.content {
  height: calc(100% - 15rem);
  overflow: auto;
  background: #f2f2f2;
}
.bodyArr {
  height: 10rem;
  overflow: hidden;
  background: #fff;
  margin: 1rem;
  border-radius: 1rem;
}
</style>
