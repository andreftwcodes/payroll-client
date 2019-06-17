<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <WizardForm :disabled="false" :profile="profile" :extras="extras" />
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import WizardForm from '@/components/employees/WizardForm'
export default {
  middleware: 'auth',
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
