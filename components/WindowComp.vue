<template>
  <div class="window-component">
    <DynamicComp
      :layouts="layouts"
      :content="child"/>
  </div>
</template>

<script>
import xpath from '~/services/xpath'
import comp from './component-mixin'

export default {
  mixins: [comp],

  data() {
    return {
      child: null
    }
  },

  methods: {
    loadContent() {
      if (this.content) {
        this.child = xpath(this.content, 0)[0]
      } else {
        this.child = null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.window-component
  height 100%
</style>
