<template>
  <div style="background:#f0f2f5;margin-top: -20px;">
    <!-- 通用错误 -->
    <van-empty image="error" :description="message" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      message: '这个页面走丢了...'
    }
  }
}
</script>
