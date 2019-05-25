<template>
  <v-list-group no-action prepend-icon="account_circle">
    <template v-slot:activator>
      <v-list-tile>
        <v-list-tile-title>Settings</v-list-tile-title>
      </v-list-tile>
    </template>

    <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router>
      <v-list-tile-title v-text="item.title"></v-list-tile-title>
      <v-list-tile-action>
        <v-icon v-text="item.icon"></v-icon>
      </v-list-tile-action>
    </v-list-tile>
  </v-list-group>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          icon: 'people_outline',
          title: 'Deductions',
          to: '/settings/deductions'
        },
        {
          icon: 'people_outline',
          title: 'Schedules',
          to: '/settings/schedules'
        },
        {
          icon: 'people_outline',
          title: 'Locales',
          to: '/settings/daily-gross-pay'
        }
      ]
    }
  }
}
</script>
