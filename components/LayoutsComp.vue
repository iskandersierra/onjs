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
      window: null
    }
  },

  computed: {
    attributes() {
      return {
        defaultWindow: this.attrs.defaultWindow || 'main'
      }
    }
  },

  methods: {
    createContent() {
      this.createComp()
      const defaultWindow = this.attributes.defaultWindow
      const isDefault = w => (xpath(w, '@name')[0] === defaultWindow ? [w] : [])
      this.window = xpath(this.layouts, 'windows', 'window', isDefault)[0]
    },
    removeContent() {
      this.window = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.layouts-component {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;
}
</style>
