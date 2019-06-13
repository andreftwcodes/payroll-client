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
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>

        <Reports />
        <Settings />
        <UserManagement />
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
        <v-toolbar-title>{{ user.name }}</v-toolbar-title>
        <v-btn color="error" @click.prevent="logout">Logout</v-btn>
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
  </v-app>
</template>

<script>
import UserManagement from '@/components/menus/UserManagement'
import Settings from '@/components/menus/Settings'
import Reports from '@/components/menus/Reports'
export default {
  components: {
    UserManagement,
    Settings,
    Reports
  },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'dashboard',
          title: 'Dashboard',
          to: '/dashboard'
        },
        {
          icon: 'group',
          title: 'Employees',
          to: '/employees'
        },
        {
          icon: 'group_add',
          title: 'Attendance',
          to: '/attendance'
        }
      ],
      miniVariant: false,
      title: 'Payroll Management System'
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
    }
  }
}
</script>
