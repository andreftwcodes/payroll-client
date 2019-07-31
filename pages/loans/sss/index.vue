<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <Index v-show="false" />
        <Show />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Index from '@/components/loans/sss/Index'
import Show from '@/components/loans/sss/Show'
export default {
  middleware: 'auth',
  components: {
    Index,
    Show
  },
  data() {
    return {}
  },
  methods: {}
}
</script>
