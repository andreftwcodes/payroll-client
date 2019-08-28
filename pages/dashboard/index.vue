<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-text>
            <h1 class="display-3 text-md-center">Dashboard Coming Soon.</h1>
            <v-datetime-picker
              v-model="datetime"
              :min="'2019-08-28'"
              :max="'2019-08-30'"
              :error-messages="''"
              label="Time In"
              placeholder="Placeholder"
              append-icon="access_time"
            >
            </v-datetime-picker>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  middleware: 'auth',
  data() {
    return {
      datetime: new Date()
    }
  }
}
</script>
