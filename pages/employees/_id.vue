<template>
  <WizardForm :disabled="false" :profile="profile" :extras="extras" />
</template>

<script>
import WizardForm from '@/components/employees/WizardForm'
export default {
  components: {
    WizardForm
  },
  data() {
    return {}
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`employees/${params.id}`)
    return {
      profile: response.data.profile,
      extras: response.data.extras
    }
  }
}
</script>
