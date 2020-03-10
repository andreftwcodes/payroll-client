<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <v-card-title class="headline pb-2">
            <v-flex>
              {{ parent.employee.fullname }}
            </v-flex>
            <v-spacer></v-spacer>

            <v-icon @click.prevent="onBack" large color="blue darken-2"
              >keyboard_backspace</v-icon
            >
          </v-card-title>
          <v-card-title class="pt-0 pb-0">
            <v-flex class="md2">
              <v-text-field
                v-model="parent.amount_deductible"
                :disabled="amount_deductible_disable"
                label="Amount Deductible"
                placeholder="Amount Deductible"
              ></v-text-field>
            </v-flex>
            <v-flex class="md2">
              <div class="ml-3">
                <v-icon
                  v-show="buttons.edit"
                  @click="onEdit"
                  color="blue darken-2"
                  >edit</v-icon
                >
                <v-icon
                  v-show="buttons.saveUpdate"
                  @click="onSaveUpdateParent"
                  color="blue darken-2"
                  >save</v-icon
                >
              </div>
            </v-flex>
            <v-flex class="md8 text-xs-right">
              <v-icon
                @click="openCashAdvanceChildForm(null)"
                class="text-xs-right"
                color="green darken-2"
                medium
                >add_circle_outline</v-icon
              >
            </v-flex>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="parent.children"
            :search="search"
            hide-actions
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.date_dsp }}</td>
              <td>{{ props.item.transact_by }}</td>
              <td class="text-xs-right">{{ props.item.credit_dsp }}</td>
              <td class="text-xs-right">{{ props.item.debit_dsp }}</td>
              <td class="text-xs-right">{{ props.item.balance }}</td>
              <td class="text-xs-right">
                <template v-if="!props.item.is_payroll">
                  <v-icon
                    @click="openCashAdvanceChildForm(props.item)"
                    class="mr-3"
                    color="blue darken-2"
                    >edit</v-icon
                  >
                  <v-icon @click="onDelete(props.item)" color="red"
                    >highlight_off</v-icon
                  >
                </template>
              </td>
              <td></td>
            </template>
          </v-data-table>
        </v-card>
        <ChildDialogForm
          v-model="childDialogFrm"
          :child="child"
          @save-update:child="saveUpdateChild"
        />
        <DltChildDialog
          v-model="dltChildDialog"
          :child="child"
          @deleted:ca-child="deletedCaChild"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import _ from 'lodash'
import ChildDialogForm from '@/components/cash-advance/ChildDialogForm'
import DltChildDialog from '@/components/cash-advance/DltChildDialog'
export default {
  middleware: 'auth',
  components: {
    ChildDialogForm,
    DltChildDialog
  },
  data() {
    return {
      parent: null,
      child: null,
      search: '',
      headers: [
        {
          text: 'Date',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: 'Transact by',
          align: 'left',
          sortable: false,
          value: ''
        },
        {
          text: 'Credit',
          align: 'right',
          sortable: false,
          value: ''
        },
        {
          text: 'Debit',
          align: 'right',
          sortable: false,
          value: ''
        },
        {
          text: 'Balance',
          align: 'right',
          sortable: false,
          value: ''
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: ''
        },
        {
          text: '',
          align: 'right',
          sortable: false,
          value: ''
        }
      ],
      amount_deductible_disable: true,
      buttons: {
        edit: true,
        saveUpdate: false
      },
      childDialogFrm: false,
      dltChildDialog: false
    }
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`cash-advance/show/${params.id}`)
    return {
      parent: response.data
    }
  },
  methods: {
    onBack() {
      this.$router.push({
        path: '/cash-advance'
      })
    },
    onEdit() {
      this.amount_deductible_disable = false
      this.buttons.edit = false
      this.buttons.saveUpdate = true
    },
    async onSaveUpdateParent() {
      try {
        await this.$axios.$patch(
          `cash-advance/amount_deductible/${this.parent.id}`,
          {
            amount_deductible: this.parent.amount_deductible
          }
        )
        this.amount_deductible_disable = true
        this.buttons.edit = true
        this.buttons.saveUpdate = false
      } catch (error) {}
    },
    saveUpdateChild(response) {
      this.parent.children = response.data
    },
    openCashAdvanceChildForm(payload = null) {
      let child = payload

      if (_.isNull(child)) {
        child = {
          date: this._now(),
          credit: null,
          debit: null
        }
      }

      this.child = _.merge(_.clone(child), {
        ca_parents_id: this.parent.id
      })

      this.childDialogFrm = true
    },
    onDelete(child) {
      this.child = child
      this.dltChildDialog = true
    },
    deletedCaChild(children) {
      this.parent.children = children
    }
  }
}
</script>
