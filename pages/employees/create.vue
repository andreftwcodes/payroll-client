<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <WizardForm :disabled="false" />
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
  }
}
</script>
