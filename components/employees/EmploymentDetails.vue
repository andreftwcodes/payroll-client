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
        <v-flex md1 class="pt-3 pr-5">
          <RateHistoryDialog />
        </v-flex>
        <v-flex md5>
          <v-select
            v-model="form.schedule"
            :items="schedules"
            :item-text="'name'"
            :item-value="'id'"
            :error-messages="errors.locale ? errors.locale[0] : ''"
            label="Schedule"
            placeholder="Schedule"
          ></v-select>
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
        <v-flex md1>
          <v-flex md4 class="premiums-flex">Premiums</v-flex>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
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
            label="Overtime"
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
import RateHistoryDialog from '@/components/employees/RateHistoryDialog'
export default {
  components: {
    RateHistoryDialog
  },
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
      schedules: 'schedules',
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
        return schedule !== null ? schedule.id : schedule
      })
      extras = _.update(extras, 'locale', locale => {
        return locale !== null ? locale.id : locale
      })
      extras = _.update(extras, 'other', other => {
        if (other === null) {
          return {
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
          _.cloneDeep(this.form)
        )
        this.$emit('saved:employment-details')
        this.setEmploymentDetails(_.cloneDeep(this.form))
      } catch (error) {}
    }
  }
}
</script>

<style scoped>
.premiums-flex {
  margin-bottom: -15px;
}
</style>
