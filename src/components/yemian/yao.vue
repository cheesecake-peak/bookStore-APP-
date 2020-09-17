<template>
  <div class="yao">
    <div class="yaoTop">
      <div @click="toBack()">
        <img src="../../assets/jian.png" />
      </div>修改店铺邀请码
    </div>
    <div class="yaoK">
      <div>新邀请码</div>
      <input type="number" v-model="yaoqing" placeholder="请输入邀请码" />
    </div>
    <div class="butt" @click="toYes">确认</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yaoqing: ""
    };
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.getDate();
  //   });
  // },
  methods: {
    toBack() {
      this.$router.push({
        path: "/mine"
      });
    },
    toYes() {
      //如果没有填写邀请码
      if (this.yaoqing == "") {
        this.$toast.fail("请填写邀请码")
      } else {
        this.$axios
          .post("store/editStoreN", { yqmCode: this.yaoqing })
          .then(res => {
            if (200 == res.data.code) {
              this.$router.push({
                path: "/mine"
              });
            }
          });
      }

      //返回数据
    }
  }
};
</script>

<style scoped>
.yao {
  height: 100%;
  width: 100%;
  background: #f2f2f2;
}
.yaoTop {
  height: 4rem;
  line-height: 4rem;
  color: #b9986c;
  font-size: 1.6rem;
  width: 100%;
  background: #fff;
  text-align: center;
}
.yaoTop div:first-child {
  position: absolute;
  left: 1rem;
  top: 0.2rem;
}
.yaoTop div:first-child img {
  height: 1.5rem;
}
.yaoK {
  height: 6rem;
  line-height: 6rem;
  width: 96%;
  margin-left: 2%;
  margin-top: 0.9rem;
  background: #fff;
  border-radius: 0.7rem;
  font-size: 1.4rem;
}
.yaoK input {
  height: 3rem;
  width: 12rem;
  border: 0;
  margin-left: 2.3rem;
}
.yaoK div:first-child {
  margin-left: 10%;
  float: left;
}
input::-webkit-input-placeholder {
  color: #aab2bd;
  font-size: 1.3rem;
}
.butt {
  width: 60%;
  height: 4rem;
  line-height: 4rem;
  text-align: center;
  margin-left: 20%;
  color: #fff;
  font-size: 1.5rem;
  background: rgb(203, 161, 108);
  border-radius: 1rem;
  margin-top: 1rem;
  position: fixed;
  bottom: 2rem;
}
</style>
