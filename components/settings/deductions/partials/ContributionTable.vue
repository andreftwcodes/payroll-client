<template>
  <v-data-table :headers="headers" :items="contributions" class="elevation-1">
    <template v-slot:items="props">
      <td>{{ props.index + 1 }}</td>
      <td>{{ props.item.title }}</td>
      <td>{{ props.item.status }}</td>
      <td>Edit | Show</td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    contributions: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          value: 'number'
        },
        {
          text: 'Title',
          align: 'left',
          value: 'from'
        },
        {
          text: 'Status',
          align: 'left',
          value: 'to'
        },
        {
          text: 'Actions',
          align: 'left',
          value: ''
        }
      ]
    }
  }
}
</script>

<style></style>
