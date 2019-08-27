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
        <v-flex md2>
          <v-select
            v-model="form.payment_period"
            :items="payment_periods"
            :item-text="'name'"
            :item-value="'id'"
            :error-messages="
              errors.payment_period ? errors.payment_period[0] : ''
            "
            label="Payment Period"
            placeholder="Payment Period"
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
        <v-flex md1>
          <v-flex md4 class="group-title">Deductions</v-flex>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md12>
          <v-checkbox
            v-model="form.other.contributions"
            color="primary"
            label="Contributions (SSS, Philhealth, PagIbig)"
          ></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md1>
          <v-flex md4 class="group-title">Premiums</v-flex>
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
      payment_periods: [
        { id: 'weekly', name: 'Weekly' },
        { id: 'monthly', name: 'Monthly' }
      ],
      form: this.mappedExtras()
    }
  },
  computed: {
    ...mapGetters({
      locales: 'locales'
    })
  },
  methods: {
    ...mapMutations({
      setEmploymentDetails: 'employees/SET_EMPLOYMENT_DETAILS'
    }),
    mappedExtras() {
      let extras = _.clone(this.extras)
      extras = _.update(extras, 'locale', locale => {
        return locale !== null ? locale.id : locale
      })
      extras = _.update(extras, 'other', other => {
        if (other === null) {
          return {
            contributions: false,
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
.group-title {
  margin-bottom: -15px;
}
</style>
