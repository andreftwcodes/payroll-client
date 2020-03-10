<template>
  <div>
    <span
      :style="{ backgroundImage: 'url(' + system_theme.background + ')' }"
      class="bg-payroll"
    ></span>
    <v-app light>
      <v-toolbar
        class="elevation-0"
        style="background-color:unset"
        color="white--text"
      >
        <v-toolbar-title>{{ system_theme.title }}</v-toolbar-title>
        <v-spacer />
        <div>
          <v-list-tile :to="{ name: 'auth-signin' }">Sign In</v-list-tile>
        </div>
      </v-toolbar>
      <v-content>
        <v-container>
          <nuxt />
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>
