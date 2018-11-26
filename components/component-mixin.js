import xpath from '~/services/xpath'

export const comp = {
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

  data() {
    return {
      attrs: {}
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
      this.defaultLoadContent()
    },

    defaultLoadContent() {
      if (this.layouts && this.content) {
        this.createContent()
      } else {
        this.removeContent()
      }
    },
    createContent() {
      this.createComp()
    },
    removeContent() {
      this.removeComp()
    },
    createComp() {
      this.attrs = this.content.attributes || {}
    },
    removeComp() {
      this.attrs = {}
    }
  }
}

export const textComp = {
  mixins: [comp],

  data() {
    return {
      text: null
    }
  },

  methods: {
    createContent() {
      this.createText()
    },
    removeContent() {
      this.removeText()
    },
    createText() {
      this.createComp()
      this.text = xpath(this.content, 'text()')[0]
    },
    removeText() {
      this.removeComp()
      this.text = null
    }
  }
}

export const layoutComp = {
  mixins: [comp],

  data() {
    return {
      children: []
    }
  },

  methods: {
    createContent() {
      this.createLayout()
    },
    removeContent() {
      this.removeLayout()
    },
    createLayout() {
      this.createComp()
      this.children = xpath(this.content, '*')
    },
    removeLayout() {
      this.removeComp()
      this.children = []
    }
  }
}

export default comp
