import Vue from 'vue'
import { mapGetters } from 'vuex'

const SystemTheme = {
  install(Vue, options) {
    Vue.mixin({
      computed: {
        ...mapGetters({
          system_theme: 'system_theme'
        })
      }
    })
  }
}

Vue.use(SystemTheme)
