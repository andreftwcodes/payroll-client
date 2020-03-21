<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        Do you really want to delete loan #{{ loan.ref_no }} ?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="disabled"
          :loading="loading_confirm_btn"
          @click.prevent="onConfirm"
          color="primary"
          flat
        >
          Confirm
        </v-btn>
        <v-btn :disabled="disabled" @click="onCancel" color="primary" flat>
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    child: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      disabled: false,
      loading_confirm_btn: false
    }
  },
  computed: {
    ...mapGetters({
      loan: 'government-loans/loan'
    }),
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
    ...mapActions({
      clearLoan: 'government-loans/clearLoan'
    }),
    async onConfirm() {
      try {
        this.disabled = true
        this.loading_confirm_btn = true
        await this.$axios.$delete(`loans/government/${this.loan.id}`)
        this.show = false
        this.disabled = false
        this.loading_confirm_btn = false
        this.$emit('loan-deleted', this.loan.id)
      } catch (error) {
        this.disabled = false
        this.loading_confirm_btn = false
      }
    },
    onCancel() {
      this.show = false
      this.clearLoan()
    }
  }
}
</script>

<style></style>
