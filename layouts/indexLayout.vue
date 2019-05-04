<template>
  <v-app light>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <template v-if="authenticated">
        <v-toolbar-title>{{ user.name }}</v-toolbar-title>
        <v-btn color="error" @click.prevent="logout">Logout</v-btn>
      </template>
      <template v-if="!authenticated">
        <div>
          <v-btn color="success" :nuxt="true" :to="{ name: 'auth-signin' }"
            >SignIn</v-btn
          >
        </div>
      </template>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      title: 'Payroll System'
    }
  }
}
</script>
