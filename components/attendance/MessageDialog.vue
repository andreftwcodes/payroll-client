<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Error
        </v-card-title>

        <v-card-text class="subheading">
          {{ errors.employee ? errors.employee[0] : '' }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="onClose" color="primary" flat>
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    onClose() {
      this.show = false
      this.$emit('msg-dialog:closed')
    }
  }
}
</script>
