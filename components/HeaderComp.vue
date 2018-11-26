<template>
  <h1
    v-if="attributes.size === 1"
    class="header-component title is-1">
    {{ text }}
  </h1>
  <h2
    v-else-if="attributes.size === 2"
    class="header-component title is-2">
    {{ text }}
  </h2>
  <h3
    v-else-if="attributes.size === 3"
    class="header-component title is-3">
    {{ text }}
  </h3>
  <h4
    v-else-if="attributes.size === 4"
    class="header-component title is-4">
    {{ text }}
  </h4>
  <h5
    v-else-if="attributes.size === 5"
    class="header-component title is-5">
    {{ text }}
  </h5>
  <h6
    v-else
    class="header-component title is-6">
    {{ text }}
  </h6>
</template>

<script>
import xpath from '~/services/xpath'
import { textComp } from './component-mixin'

export default {
  mixins: [textComp],

  computed: {
    attributes() {
      return {
        size: Math.max(1, Math.min(6, Math.round(Number(this.attrs.size) || 1)))
      }
    }
  }
}
</script>
