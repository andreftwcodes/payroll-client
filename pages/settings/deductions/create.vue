<template>
  <DetailForm @sumbit-deduction="submit">
    <template v-slot:buttons>
      <v-btn color="primary" nuxt :to="{ name: 'settings-deductions' }"
        >Back</v-btn
      >
      <v-btn color="primary" type="submit">Save</v-btn>
    </template>
  </DetailForm>
</template>

<script>
import { mapMutations } from 'vuex'
import DetailForm from '@/components/settings/deductions/DetailForm'
export default {
  middleware: 'auth',
  components: {
    DetailForm
  },
  computed: {},
  created() {
    this.setDisabled(false)
  },
  methods: {
    async submit(deduction) {
      try {
        await this.$axios.$post('deductions', deduction)
        this.$router.push({
          path: '/settings/deductions'
        })
      } catch (error) {}
    },
    ...mapMutations({
      setDisabled: 'SET_DISABLED'
    })
  }
}
</script>

<style></style>
