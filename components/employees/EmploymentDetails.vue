<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md2>
          <v-text-field
            v-model="form.rate"
            label="Rate"
            placeholder="Rate"
            :error-messages="errors.rate ? errors.rate[0] : ''"
          ></v-text-field>
        </v-flex>
        <v-flex md3>
          <v-dialog
            ref="dialog1"
            v-model="timepicker1"
            :return-value.sync="form.schedule.start"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.schedule.start"
                :error-messages="errors.start ? errors.start[0] : ''"
                label="Time In"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timepicker1"
              v-model="form.schedule.start"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="timepicker1 = false"
                >Cancel</v-btn
              >
              <v-btn
                flat
                color="primary"
                @click="$refs.dialog1.save(form.schedule.start)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex md3>
          <v-dialog
            ref="dialog2"
            v-model="timepicker2"
            :return-value.sync="form.schedule.end"
            persistent
            lazy
            full-width
            width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-model="form.schedule.end"
                :error-messages="errors.end ? errors.end[0] : ''"
                label="Time Out"
                append-icon="access_time"
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-time-picker
              v-if="timepicker2"
              v-model="form.schedule.end"
              full-width
            >
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="timepicker2 = false"
                >Cancel</v-btn
              >
              <v-btn
                flat
                color="primary"
                @click="$refs.dialog2.save(form.schedule.end)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-dialog>
        </v-flex>
        <v-flex md4>
          <v-select
            v-model="form.locale"
            :items="locales"
            :item-text="'name'"
            :item-value="'id'"
            :error-messages="errors.locale ? errors.locale[0] : ''"
            label="Locale"
            placeholder="Locale"
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3>
          <v-select
            v-model="form.deductions"
            :items="deductions"
            :item-text="'name'"
            :item-value="'id'"
            :error-messages="errors.deductions ? errors.deductions[0] : ''"
            attach
            chips
            label="Deductions"
            multiple
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3>
          <v-checkbox
            v-model="form.other.special_person"
            color="primary"
            label="Special Person"
          ></v-checkbox>
        </v-flex>
        <v-flex md3>
          <v-checkbox
            v-model="form.other.night_shift"
            color="primary"
            label="Night Shift"
          ></v-checkbox>
        </v-flex>
        <v-flex md3>
          <v-checkbox
            v-model="form.other.overtime"
            color="primary"
            label="With Overtime"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <slot name="buttons"></slot>
    </v-layout>
  </v-form>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapMutations } from 'vuex'
export default {
  props: {
    extras: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      checkbox: true,
      timepicker1: false,
      timepicker2: false,
      form: this.mappedExtras()
    }
  },
  computed: {
    ...mapGetters({
      deductions: 'deductions',
      locales: 'locales'
    })
  },
  methods: {
    ...mapMutations({
      setEmploymentDetails: 'employees/SET_EMPLOYMENT_DETAILS'
    }),
    mappedExtras() {
      let extras = _.clone(this.extras)
      extras = _.update(extras, 'deductions', deductions =>
        _.map(deductions, 'id')
      )
      extras = _.update(extras, 'schedule', schedule => {
        if (schedule === null) {
          return {
            start: null,
            end: null
          }
        }
        return schedule
      })
      extras = _.update(extras, 'locale', locale => {
        return locale !== null ? locale.id : locale
      })
      extras = _.update(extras, 'other', other => {
        if (other === null) {
          return {
            special_person: false,
            night_shift: false,
            overtime: false
          }
        }
        return other
      })
      return extras
    },
    async submit() {
      try {
        await this.$axios.$post(
          'employee/employment/validate',
          _.merge(_.cloneDeep(this.form), {
            start: this.form.schedule.start,
            end: this.form.schedule.end
          })
        )
        this.$emit('saved:employment-details')
        this.setEmploymentDetails(_.cloneDeep(this.form))
      } catch (error) {}
    }
  }
}
</script>
