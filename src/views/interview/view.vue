<template>
 <div></div>
</template>
<script>
  export default {
    data() {
      return {
        id: undefined
      }
    },
    mounted() {
      this.id = this.$route.params.id
      if (this._isMobile()) {
        this.$router.push('/interview/view_m/' + this.id)
      } else {
        this.$router.push('/interview/view_pc/' + this.id)
      }
    },
    methods: {
      _isMobile() {
        return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      }
    }
  }
</script>
