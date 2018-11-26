<template>
  <div class="layouts-component">
    <DynamicComp
      :layouts="layouts"
      :content="window"/>
  </div>
</template>

<script>
import xpath from '~/services/xpath'
import comp from './component-mixin'

export default {
  mixins: [comp],

  data() {
    return {
      defaultWindow: null,
      window: null
    }
  },

  methods: {
    loadContent() {
      if (this.layouts) {
        this.defaultWindow = xpath(this.layouts, '@defaultWindow')[0] || 'main'

        const isDefault = w =>
          xpath(w, '@name')[0] === this.defaultWindow ? [w] : []

        this.window = xpath(this.layouts, 'windows', 'window', isDefault)[0]
      } else {
        this.defaultWindow = null
        this.window = null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.layouts-component
  height 100%
</style>
