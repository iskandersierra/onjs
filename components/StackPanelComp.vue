<template>
  <div
    :class="['stack-panel-component', classes]">
    <DynamicComp
      v-for="(child, index) in children"
      :key="index"
      :layouts="layouts"
      :content="child"/>
  </div>
</template>

<script>
import xpath from '~/services/xpath'
import { layoutComp } from './component-mixin'

export default {
  mixins: [layoutComp],

  computed: {
    classes() {
      return {
        [this.attributes.orientation]: true
      }
    },
    attributes() {
      return {
        orientation: this.attrs.orientation || 'vertical'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.stack-panel-component
  height 100%
  display flex
  flex-direction column
  justify-content start
  align-items stretch
  @.horizontal
    flex-direction row
</style>
