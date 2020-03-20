<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md3>
          <v-avatar :size="130" color="grey lighten-4" class="mt-3">
            <img src="/employee-avatar.png" alt="avatar" />
          </v-avatar>
          <div class="mt-3">
            <v-btn small>Upload</v-btn>
          </div>
        </v-flex>
        <v-flex md9>
          <v-layout row wrap>
            <v-flex md3>
              <v-text-field
                v-model="form.firstname"
                :error-messages="errors.firstname ? errors.firstname[0] : ''"
                label="Firstname"
                placeholder="Firstname"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="form.middlename"
                :error-messages="errors.middlename ? errors.middlename[0] : ''"
                label="Middlename"
                placeholder="Middlename"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="form.lastname"
                :error-messages="errors.lastname ? errors.lastname[0] : ''"
                label="Lastname"
                placeholder="Lastname"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-select
                v-model="form.gender"
                :items="genders"
                :item-text="'text'"
                :item-value="'value'"
                :error-messages="errors.gender ? errors.gender[0] : ''"
                label="Gender"
                placeholder="Gender"
              ></v-select>
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="form.contact"
                :error-messages="errors.contact ? errors.contact[0] : ''"
                label="Contact"
                placeholder="Contact"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-dialog
                ref="dialog"
                v-model="birthdateMenu"
                :return-value.sync="form.birthdate"
                persistent
                lazy
                full-width
                width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="form.birthdate"
                    label="Birthdate"
                    append-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="form.birthdate"
                  :max="_now()"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="birthdateMenu = false"
                    >Cancel</v-btn
                  >
                  <v-btn
                    flat
                    color="primary"
                    @click="$refs.dialog.save(form.birthdate)"
                    >OK</v-btn
                  >
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex md3>
              <v-select
                v-model="form.status"
                :items="statuses"
                :item-text="'text'"
                :item-value="'value'"
                label="Status"
                placeholder="Status"
              ></v-select>
            </v-flex>
          </v-layout>
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
    profile: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      genders: [
        {
          value: 'male',
          text: 'Male'
        },
        {
          value: 'female',
          text: 'Female'
        }
      ],
      statuses: [
        {
          value: 1,
          text: 'Active'
        },
        {
          value: 0,
          text: 'Inactive'
        }
      ],
      form: this.profile,
      birthdateMenu: false
    }
  },
  computed: {
    ...mapGetters({
      employee: 'employees/employee',
      errors: 'validation/errors'
    })
  },
  methods: {
    ...mapMutations({
      setEmployee: 'employees/SET_EMPLOYEE'
    }),
    async submit() {
      try {
        await this.$axios.$post('employee/personal/validate', this.form)
        this.$emit('saved:employee')
        this.setEmployee(_.clone(this.form))
      } catch (error) {}
    }
  }
}
</script>
