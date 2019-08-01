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
        <td>
          {{ props.item.status_display }}
        </td>
        <td>
          <v-icon class="pr-2" color="blue darken-2" @click="onEdit(props.item)"
            >edit</v-icon
          >
          <v-icon color="blue darken-2" @click="onView(props.item)"
            >view_module</v-icon
          >
        </td>
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
import { mapActions } from 'vuex'
import DialogForm from '@/components/settings/contributions/partials/DialogForm'
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
          text: '',
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
    ...mapActions({
      setRanges: 'contributions/setRanges'
    }),
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
    },
    async onView(contribution) {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$get(
          `contribution-ranges/${contribution.id}`
        )
        loading.hide()
        this.setRanges(response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
