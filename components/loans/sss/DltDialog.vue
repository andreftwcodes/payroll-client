<template>
  <v-dialog v-model="show" persistent width="500">
    <v-card>
      <v-card-title class="headline grey lighten-2">
        Confirmation
      </v-card-title>
      <v-card-text class="subheading">
        Do you really want to delete loan #{{ loan.loan_no }} ?
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="onConfirm">
          Confirm
        </v-btn>
        <v-btn color="primary" flat @click="onCancel">
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
    return {}
  },
  computed: {
    ...mapGetters({
      loan: 'sss-loan/loan'
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
      clearLoan: 'sss-loan/clearLoan'
    }),
    async onConfirm() {
      this.show = false
      try {
        await this.$axios.$delete(`sss-loan/resource/${this.loan.id}`)
        this.$emit('loan-deleted', this.loan.id)
      } catch (error) {}
    },
    onCancel() {
      this.show = false
      this.clearLoan()
    }
  }
}
</script>

<style></style>
