<template>
  <v-card>
    <v-card-title>
      <h2 class="text-md-center">{{ ranges.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn small color="error" @click="onBack">Back</v-btn>
      <FileUploader />
    </v-card-title>
    <v-data-table :headers="headers" :items="ranges.table" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td>{{ props.item.from }}</td>
        <td>{{ props.item.to }}</td>
        <td>{{ props.item.er }}</td>
        <td>{{ props.item.ee }}</td>
        <td>{{ props.item.status }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FileUploader from '@/components/settings/deductions/partials/FileUploader'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    FileUploader
  },
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Lower Bound',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Upper Bound',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Employer Share',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Employee Share',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Status',
          align: 'left',
          sortable: false,
          value: 'name'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      ranges: 'contributions/ranges'
    })
  },
  methods: {
    ...mapActions({
      setRanges: 'contributions/setRanges'
    }),
    onBack() {
      this.setRanges(null)
    }
  }
}
</script>

<style></style>
