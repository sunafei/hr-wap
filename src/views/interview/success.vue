<template>
  <van-form>
    <div class="van-nav">
      <div class="van-nav-title">应聘人员登记表</div>
    </div>
    <div style="">
      <van-empty
        class="custom-image"
        :image="img_success"
        description="登记成功,请等待面试官!"
      />
    </div>
  </van-form>
</template>
<script>
  import img_success from '@/assets/success.png'
  export default {
    data() {
      return {
        img_success
      }
    }
  }
</script>
<style>
  .van-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 56px;
    background-color: #fff;
  }
  .van-nav-title {
    font-weight: 600;
    font-size: 17px;
    text-transform: capitalize;
  }
  .van-empty__description {
    margin-top: 16px;
    padding: 0 60px;
    color: #000000;
    font-size: 16px;
    line-height: 20px;
    font-weight: bolder;
  }
  .van-empty__image img {
    width: 100%;
    height: 110%;
  }
</style>
