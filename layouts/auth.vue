<template>
  <div>
    <span
      class="bg-payroll"
      :style="{ backgroundImage: 'url(' + system_theme.background + ')' }"
    ></span>
    <v-app id="inspire">
      <v-toolbar
        class="elevation-0"
        style="background-color:unset"
        color="white--text"
      >
        <v-toolbar-title>{{ system_theme.title }}</v-toolbar-title>
      </v-toolbar>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <nuxt></nuxt>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {}
</script>
