<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>Sign In</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field
          v-model="form.email"
          :error-messages="errors.email ? errors.email[0] : ''"
          prepend-icon="person"
          label="Username"
          type="text"
        ></v-text-field>
        <v-text-field
          v-model="form.password"
          prepend-icon="lock"
          label="Password"
          type="password"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn block color="primary" type="submit">Login</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  middleware: 'guest',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async submit() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form
        })
      } catch (error) {}
    }
  }
}
</script>
