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

export default {
  components: {
    layouts: () => import('./LayoutsComp'),
    window: () => import('./WindowComp'),
    'stack-panel': () => import('./StackPanelComp')
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
        this.componentType = xpath(this.content, 'name()')[0]
      } else {
        this.componentType = null
      }
      console.log('Loading content to ', this.componentType)
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
