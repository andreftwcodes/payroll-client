import Vue from 'vue'

const Globals = {
  install(Vue, options) {
    Vue.mixin({
      methods: {
        _now(flag) {
          const date = new Date()
          let d

          if (flag === 'first-month') {
            d = new Date(date.getFullYear(), date.getMonth(), 1)
          } else {
            d = date
          }

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
