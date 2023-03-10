<template>
  <div class="dashboard-container">
    <one></one>
    <two></two>
    <three></three>
  </div>
</template>

<script>
import one from './one/index.vue'
import two from './two/index.vue'
import three from './three/index.vue'
export default {
  name: 'Dashboard',
  components:{
    one,
    two,
    three,
  },
  mounted(){
    this.$store.dispatch('mockre')
  },
  computed: {
    
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
    
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
