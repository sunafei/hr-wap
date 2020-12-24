<template>
  <van-form>
    <div class="van-nav">
      <div class="van-nav-title">应聘人员登记表</div>
    </div>
    <van-empty
      class="custom-image"
      image="https://img.yzcdn.cn/vant/custom-empty-image.png"
      description="登记成功，请等待面试官!"
    />
  </van-form>
</template>
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
</style>
