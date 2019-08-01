<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-container fluid grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex>
            <v-avatar :size="100" color="grey lighten-4">
              <img
                src="https://cdn1.iconfinder.com/data/icons/avatar-vol-9/512/1-512.png"
                alt="avatar"
              />
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-container>

      <v-list>
        <div v-for="(item, i) in items" :key="i">
          <template v-if="!item.list_group">
            <v-list-tile :to="item.to" router>
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <template v-else-if="item.list_group">
            <v-list-group no-action :prepend-icon="item.icon">
              <template v-slot:activator>
                <v-list-tile>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </template>

              <v-list-tile
                v-for="(children, x) in item.childrens"
                :key="x"
                :to="children.to"
                router
              >
                <v-list-tile-title v-text="children.title"></v-list-tile-title>
                <v-list-tile-action>
                  <v-icon v-text="children.icon"></v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list-group>
          </template>
        </div>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon
        v-if="authenticated"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer />
      <template v-if="authenticated">
        <v-toolbar-title class="mr-3">{{ user.name }}</v-toolbar-title>
        <v-icon large @click.prevent="sodVisibility = true">exit_to_app</v-icon>
      </template>
      <template v-if="!authenticated">
        <div>
          <v-list-tile :to="{ name: 'auth-signin' }">Sign In</v-list-tile>
        </div>
      </template>
    </v-toolbar>
    <v-content>
      <nuxt />
    </v-content>
    <SignOutDialog v-model="sodVisibility" />
  </v-app>
</template>

<script>
import SignOutDialog from '@/components/globals/SignOutDialog'
export default {
  components: {
    SignOutDialog
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [],
      miniVariant: false,
      title: 'Payroll Management System',
      sodVisibility: false
    }
  },
  created() {
    this.getSideBarMenu()
  },
  methods: {
    async getSideBarMenu() {
      try {
        const response = await this.$axios.$get(`/sidebar/menu/${this.user.id}`)
        this.items = response.data
      } catch (error) {}
    }
  }
}
</script>
