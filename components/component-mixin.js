export default {
  components: {
    DynamicComp: () => import('./DynamicComp')
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
    loadContent() {}
  }
}
