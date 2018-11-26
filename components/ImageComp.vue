<template>
  <img
    :src="attributes.src"
    :width="attributes.width"
    :height="attributes.height"
    class="image-component">
</template>

<script>
import xpath from '~/services/xpath'
import comp from './component-mixin'

export default {
  mixins: [comp],

  computed: {
    attributes() {
      return {
        src: this.attrs.src,
        width: this.attrs.width || 'auto',
        height: this.attrs.height || 'auto'
      }
    }
  }
}
</script>
