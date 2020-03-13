<template>
  <v-card>
    <v-card-title>
      <h2 class="text-md-center">{{ ranges.title }}</h2>
      <v-spacer></v-spacer>
      <v-btn @click="onBack" small>Back</v-btn>
      <FileUploader />
    </v-card-title>
    <v-flex xs12>
      <v-alert
        v-if="errors.file"
        :value="true"
        class="pt-2 pb-2"
        color="error"
        icon="warning"
        outline
      >
        {{ errors.file[0] }}
      </v-alert>
    </v-flex>
    <v-data-table
      :headers="headers"
      :items="ranges.table"
      hide-actions
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td>
          <v-icon :color="props.item.status ? 'green darken-2' : 'red'">{{
            props.item.status ? 'check' : 'cancel'
          }}</v-icon>
        </td>
        <td>{{ props.item.from_display }}</td>
        <td>{{ props.item.to_display }}</td>
        <td>{{ props.item.er_display }}</td>
        <td>{{ props.item.ee_display }}</td>
        <td>
          <span
            :class="{
              'red--text': props.item.message !== null,
              'font-weight-black': true
            }"
            >{{ props.item.message }}</span
          >
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import FileUploader from '@/components/settings/contributions/partials/FileUploader'
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
          text: 'Status',
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
          text: '',
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
