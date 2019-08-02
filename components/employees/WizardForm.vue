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

      <v-stepper-step step="4">Finish</v-stepper-step>
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
          :schedules-prop="extras.schedules"
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
        <Finish>
          <template v-slot:buttons>
            <v-spacer></v-spacer>
            <v-btn color="error" @click.prevent="step = 3">Back</v-btn>
            <v-btn color="primary" type="submit">
              Finish
            </v-btn>
          </template>
        </Finish>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import PersonalDetails from '@/components/employees/PersonalDetails'
import EmploymentDetails from '@/components/employees/EmploymentDetails'
import Scheduling from '@/components/employees/Scheduling'
import Finish from '@/components/employees/Finish'
export default {
  components: {
    PersonalDetails,
    EmploymentDetails,
    Scheduling,
    Finish
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
          schedules: [],
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
