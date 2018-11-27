<template>
  <section class="index-container">
    <div
      :class="inputPanelClass">
      <h3 class="title">Input</h3>
      <h3 class="subtitle">Enter an XML specification</h3>
      <div class="field can-grow">
        <textarea
          v-model="inputText"
          class="textarea"
          placeholder="XML specification"/>
      </div>
      <div class="field">
        <button
          class="button is-primary"
          @click="createLayout">Create Layout</button>
      </div>
    </div>
    <div
      :class="windowPanelClass"
      @click="layoutClick">
      <DynamicComp
        :layouts="layouts"
        :content="layouts"/>
    </div>
  </section>
</template>

<script>
import { xml2js } from 'xml-js'
import xpath from '~/services/xpath'
import DynamicComp from '~/components/DynamicComp'

export default {
  components: {
    DynamicComp
  },
  data() {
    return {
      showInput: true,
      layouts: null,
      mainWindow: null,
      inputText: `<layouts defaultWindow="main">
  <windows>
    <window name="main">
      <stack-panel orientation="vertical">
        <header size="3">Title of the window</header>
        <para>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore impedit corrupti laboriosam molestiae ab ipsa enim, error ullam. Labore asperiores tempore illo animi distinctio recusandae quae pariatur illum voluptas!
        </para>
        <para>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore impedit corrupti laboriosam molestiae ab ipsa enim, error ullam. Labore asperiores tempore illo animi distinctio recusandae quae pariatur illum voluptas!
        </para>
        <image src="http://placeimg.com/480/640/any" width="480" height="640"/>
      </stack-panel>
    </window>
  </windows>
</layouts>`
    }
  },
  computed: {
    inputPanelClass() {
      return {
        'main-panel': true,
        'input-panel': true,
        hidden: !!this.layouts
      }
    },
    windowPanelClass() {
      return {
        'main-panel': true,
        'window-panel': true,
        hidden: !this.layouts
      }
    }
  },
  methods: {
    createLayout() {
      const xml = xml2js(this.inputText, { compact: false })
      this.layouts = xpath(xml, 'layouts')[0]
    },
    layoutClick() {
      this.layouts = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.index-container
  min-height 100vh
  position relative
  perspective 200vmax

.main-panel
  min-height 100vh
  position absolute
  left 0
  top 0
  right 0
  display flex
  flex-direction column
  justify-content space-between
  align-items stretch
  transition transform .5s ease
  backface-visibility hidden
  transform-style preserve-3d
  > *
    flex-grow 0

.input-panel
  padding 1rem
  background-color #c8fff4
  transform rotateY(0deg)
  &.hidden
    transform rotateY(180deg)

.window-panel
  background-color #dbb2ff
  transform rotateY(360deg)
  &.hidden
    transform rotateY(180deg)

.textarea
  height 100%
  font-family Consolas, 'Courier New', Courier, monospace
  white-space pre
  color #253

.can-grow
  flex-grow 1

</style>
