<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <p>Dashboard</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'auth'
}
</script>
