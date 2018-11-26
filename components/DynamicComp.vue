<template>
  <component 
    :is="componentType"
    :layouts="layouts"
    :content="content">
    <div class="dynamic-component">
      <div class="notification">
        <h5 class="subtitle">Dynamic: {{ componentType }}</h5>
      </div>
    </div>
  </component>
</template>

<script>
import xpath from '~/services/xpath'
const sufix = '-comp'

export default {
  components: {
    ['layouts' + sufix]: () => import('./LayoutsComp'),
    ['window' + sufix]: () => import('./WindowComp'),
    ['stack-panel' + sufix]: () => import('./StackPanelComp'),
    ['header' + sufix]: () => import('./HeaderComp'),
    ['para' + sufix]: () => import('./ParaComp'),
    ['image' + sufix]: () => import('./ImageComp')
  },

  props: {
    layouts: {
      type: Object,
      default: null
    },
    content: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      componentType: null
    }
  },

  watch: {
    layouts() {
      this.loadContent()
    },
    content() {
      this.loadContent()
    }
  },

  mounted() {
    this.loadContent()
  },

  methods: {
    loadContent() {
      if (this.layouts && this.content) {
        let componentType = xpath(this.content, 'name()')[0]
        if (componentType) componentType = componentType + sufix
        this.componentType = componentType
      } else {
        this.componentType = null
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.dynamic-component
  height 100%
  display flex
  justify-content center
  align-items center
</style>
