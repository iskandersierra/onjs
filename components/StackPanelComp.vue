<template>
  <div
    :class="['stack-panel-component', classes]">
    <DynamicComp
      v-for="(child, index) in children"
      :key="index"
      :layouts="layouts"
      :content="child"/>
    <component :is="'hr'"/>
  </div>
</template>

<script>
import xpath from '~/services/xpath'
import comp from './component-mixin'

export default {
  mixins: [comp],

  data() {
    return {
      children: [],
      orientation: null
    }
  },

  computed: {
    classes() {
      return {
        [this.orientation || 'vertical']: true
      }
    }
  },

  methods: {
    loadContent() {
      if (this.content) {
        this.children = xpath(this.content, '*')
        this.orientation = xpath(this.content, '@orientation')[0]
      } else {
        this.children = []
        this.orientation = null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.stack-panel
  height 100%
</style>
