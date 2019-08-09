<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Error
        </v-card-title>

        <v-card-text class="subheading">
          <span class="font-weight-black">{{ data.fullname }}</span> has
          attended this following date
          <span class="font-weight-black">{{ data.attended_at }}</span
          >.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="onClose">
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
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
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
