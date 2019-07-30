<template>
  <v-stepper v-model="step">
    <v-stepper-header>
      <v-stepper-step :complete="step > 1" step="1"
        >Personal Details</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 2" step="2"
        >Employment Details</v-stepper-step
      >

      <v-divider></v-divider>

      <v-stepper-step :complete="step > 3" step="3">Scheduling</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">Overview</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <PersonalDetails :profile="profile" @saved:employee="savedEmployee">
          <template v-slot:buttons>
            <v-spacer></v-spacer>
            <v-btn color="error" nuxt :to="{ name: 'employees' }">Back</v-btn>
            <v-btn color="primary" type="submit">
              Next
            </v-btn>
          </template>
        </PersonalDetails>
      </v-stepper-content>

      <v-stepper-content step="2">
        <EmploymentDetails
          :extras="extras"
          @saved:employment-details="savedEmploymentDetails"
        >
          <template v-slot:buttons>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.prevent="step = 1">Back</v-btn>
            <v-btn color="primary" type="submit">
              Next
            </v-btn>
          </template>
        </EmploymentDetails>
      </v-stepper-content>

      <v-stepper-content step="3">
        <Scheduling
          :schedules="extras.schedules"
          @saved:scheduling="savedScheduling"
        >
          <template v-slot:buttons>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.prevent="step = 2">Back</v-btn>
            <v-btn color="primary" type="submit">
              Next
            </v-btn>
          </template>
        </Scheduling>
      </v-stepper-content>

      <v-stepper-content step="4">
        <Overview>
          <template v-slot:buttons>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.prevent="step = 3">Back</v-btn>
            <v-btn color="primary" type="submit">
              Finish
            </v-btn>
          </template>
        </Overview>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import PersonalDetails from '@/components/employees/PersonalDetails'
import EmploymentDetails from '@/components/employees/EmploymentDetails'
import Scheduling from '@/components/employees/Scheduling'
import Overview from '@/components/employees/Overview'
export default {
  components: {
    PersonalDetails,
    EmploymentDetails,
    Scheduling,
    Overview
  },
  props: {
    profile: {
      type: Object,
      default: () => {
        return {
          id: null,
          firstname: null,
          middlename: null,
          lastname: null,
          gender: null,
          contact: null,
          birthdate: new Date().toISOString().substr(0, 10),
          status: 1
        }
      }
    },
    extras: {
      type: Object,
      default: () => {
        return {
          rate: null,
          payment_period: null,
          schedules: [
            {
              day: 1,
              day_dsp: 'Monday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 2,
              day_dsp: 'Tuesday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 3,
              day_dsp: 'Wednesday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 4,
              day_dsp: 'Thursday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 5,
              day_dsp: 'Friday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 6,
              day_dsp: 'Saturday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: true
            },
            {
              day: 7,
              day_dsp: 'Sunday',
              start_1: null,
              end_1: null,
              start_2: null,
              end_2: null,
              status: false
            }
          ],
          locale: null,
          other: {
            contributions: false,
            night_shift: false,
            overtime: false
          }
        }
      }
    }
  },
  data() {
    return {
      step: 1
    }
  },
  methods: {
    savedEmployee() {
      this.step = 2
    },
    savedEmploymentDetails() {
      this.step = 3
    },
    savedScheduling() {
      this.step = 4
    }
  }
}
</script>
