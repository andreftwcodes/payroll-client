<template>
  <div class="text-xs-center">
    <v-dialog v-model="show" persistent width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"
          >Confirmation</v-card-title
        >

        <v-card-text class="subheading"
          >Do you really want to sign out ?</v-card-text
        >

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="disabled"
            :loading="loading_continue_btn"
            @click="onSignOut"
            color="primary"
            flat
            >Continue</v-btn
          >
          <v-btn :disabled="disabled" @click="show = false" color="primary" flat
            >Cancel</v-btn
          >
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
    return {
      disabled: false,
      loading_continue_btn: false
    }
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
    async onSignOut() {
      try {
        this.disabled = true
        this.loading_continue_btn = true
        await this.$auth.logout()
      } catch (error) {
        this.show = false
        this.disabled = false
        this.loading_continue_btn = false
      }
    }
  }
}
</script>
