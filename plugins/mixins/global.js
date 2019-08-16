import Vue from 'vue'

const Globals = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        now() {
          const d = new Date()
          return (
            d.getFullYear() +
            '-' +
            ('0' + (d.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + d.getDate()).slice(-2)
          )
        }
      }
    })
  }
}

Vue.use(Globals)
