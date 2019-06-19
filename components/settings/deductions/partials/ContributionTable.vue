<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="success" depressed small @click="addNew">Add New</v-btn>
    </v-card-title>
    <v-data-table :headers="headers" :items="contributions" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.index + 1 }}</td>
        <td>{{ props.item.title }}</td>
        <td>{{ props.item.status_display }}</td>
        <td><v-btn @click="onEdit(props.item)">Edit</v-btn> | Show</td>
      </template>
    </v-data-table>
    <DialogForm
      v-model="dialogForm"
      :title="tabs"
      :contribution="contribution"
    />
  </v-card>
</template>

<script>
import _ from 'lodash'
import DialogForm from '@/components/settings/deductions/partials/DialogForm'
export default {
  components: {
    DialogForm
  },
  props: {
    contributions: {
      type: Array,
      default: () => {
        return []
      }
    },
    tabs: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dialogForm: false,
      search: '',
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
      ],
      contribution: {
        id: null,
        flag: null,
        title: null,
        status: true
      }
    }
  },
  methods: {
    addNew() {
      this.dialogForm = true
      this.contribution = {
        id: null,
        flag: null,
        title: null,
        status: true
      }
    },
    onEdit(contribution) {
      this.dialogForm = true
      this.contribution = _.clone(contribution)
    }
  }
}
</script>

<style></style>
