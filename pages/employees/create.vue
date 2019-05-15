<template>
  <WizardForm :disabled="false" />
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
