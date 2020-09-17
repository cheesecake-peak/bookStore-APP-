<template>
  <div class="home">
    <div class="top">首页</div>
    <div class="img">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" style="height:180px;width:96%;border-radius:10px;margin-left:2%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="text">热门商品</div>
    <div class="shangP" v-for="x in shap" :key="x.id">
      <div class="imp">
        <img :src="x.picUrl" @click="tiao(x.skuNo)" />
      </div>
      <div class="impp">{{x.skuName}}</div>
      <div class="imppp">
        <span>{{x.sellingPrice}}</span>
        <span>{{x.fixPrice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
      ],
      shap: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getDate();
    });
  },
  methods: {
    tiao(val){
      this.$router.push({
       path:'/goodsDetail',
       query:{
         skuNo:val,
       }
     })
    },
    getDate() {
      var parm = {};
      this.$axios.post("homebanner/selecthomebanner", parm).then(res => {
        console.log(res);
        if (200 == res.data.code) {
          for (var i = 0; i < res.data.rows.length; i++) {
            this.images.push(res.data.rows[i].filePath);
          }
        }
      });
      this.$axios.post("goods/findGoodsApp", parm).then(res => {
        if (200 == res.data.code) {
            for(var i = 0; i < res.data.data.length; i++){
                  this.shap.push({
                   picUrl: res.data.data[i].picUrl,
                   skuName: res.data.data[i].skuName,
                   sellingPrice:res.data.data[i].sellingPrice,
                   fixPrice:res.data.data[i].fixPrice,
                   skuNo:res.data.data[i].skuNo,
                })
            }
        }
      });
      console.log(this.shap)
      console.log(1)
    }
  }
};
</script>

<style scoped>
.home {
  height: calc(100% - 6rem);
  width: 100%;
  background: #f2f2f2f2;
  overflow: auto;
}
.top {
  height: 4rem;
  line-height: 4rem;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  color: #b9986c;
  background: #fff;
}
.img {
  width: 96%;
  margin-left: 2%;
  border-radius: 2rem;
}
.text {
  height: 4rem;
  line-height: 4rem;
  width: 96%;
  font-size: 1.4rem;
  padding-left: 4%;
  color: #b9986c;
}
.shangP {
  width: 47%;
  height: 200px;
  float: left;
  border-radius: .8rem;
  background: #ffffff;
  margin: 1rem 0 0 2%;
}
.imp img {
  width: 8rem;
  padding-left: 5rem;
  padding-top: 1rem;
}
.impp {
  height: 2.2rem;
  padding-top: 1rem;
  font-size: 1.6rem;
  padding-left: 0.7rem;
}
.imppp span:first-child {
  color: red;
  font-size: 1.4rem;
  font-weight: 700;
  padding-left: 0.7rem;
}
.imppp span:last-child {
  color: #bdbdbd;
  font-size: 1.2rem;
  text-decoration: line-through;
}
</style>
<style>
.van-swipe {
  border-radius: 1rem;
}
</style>