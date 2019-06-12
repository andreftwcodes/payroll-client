<template>
  <div>
    <v-flex xs12 class="pb-0">
      <v-select
        v-model="employee"
        :items="employees"
        item-text="fullname"
        item-value="id"
        label="Employee"
      ></v-select>
    </v-flex>
    <v-flex xs12 class="pt-0 pb-0">
      <v-dialog
        ref="dialog"
        v-model="modalFrom"
        :return-value.sync="dateFrom"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateFrom"
            label="Period From"
            append-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateFrom"
          :max="new Date().toISOString().substr(0, 10)"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modalFrom = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog.save(dateFrom)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 class="pt-0 pb-0">
      <v-dialog
        ref="dialog2"
        v-model="modalTo"
        :return-value.sync="dateTo"
        persistent
        lazy
        full-width
        width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateTo"
            label="To"
            append-icon="event"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="dateTo"
          :max="new Date().toISOString().substr(0, 10)"
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="modalTo = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dialog2.save(dateTo)"
            >OK</v-btn
          >
        </v-date-picker>
      </v-dialog>
    </v-flex>
    <v-flex xs12 class="pt-0">
      <v-btn color="primary" block round @click.prevent="onPickUp"
        >Pick Up</v-btn
      >
    </v-flex>
    <v-layout column align-center>
      <v-flex xs12 class="pt-0">
        <!-- <v-btn color="primary" round @click.prevent="onPrint">Paid</v-btn> -->
        <v-btn v-if="canPrint" color="primary" round @click.prevent="onPrint"
          >Print</v-btn
        >
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: {
    employees: {
      type: Array,
      required: true
    },
    canPrint: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      employee: 1,
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      modalFrom: false,
      modalTo: false
    }
  },
  methods: {
    onPickUp() {
      this.$emit('pickup:payslip', {
        employee_id: this.employee,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      })
    },
    onPrint() {
      this.$emit('show:popup-payslip')
    }
  }
}
</script>

<style></style>
