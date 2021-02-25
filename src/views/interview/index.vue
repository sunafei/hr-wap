<template>
  <div class="app-container">
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
      }
    },
    mounted() {
      if (this._isMobile()) {
        this.$router.replace('/ephr_m')
      } else {
        this.$router.replace('/ephr_pc')
      }
    },
    methods: {
      _isMobile() {
        return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      }
    }
  }
</script>
