<template>
  <p class="para-component">
    {{ text }}
  </p>
</template>

<script>
import xpath from '~/services/xpath'
import { textComp } from './component-mixin'

export default {
  mixins: [textComp]
}
</script>
