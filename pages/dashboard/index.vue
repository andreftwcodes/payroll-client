<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-text>
            <h1 class="display-3 text-md-center">Dashboard Coming Soon.</h1>
          </v-card-text>
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
