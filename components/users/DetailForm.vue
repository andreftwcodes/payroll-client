<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md3>
          <v-avatar :size="130" color="grey lighten-4" class="mt-3">
            <img src="/user-avatar.png" alt="avatar" />
          </v-avatar>
          <div class="mt-3">
            <v-btn small>Upload</v-btn>
          </div>
        </v-flex>
        <v-flex md9>
          <v-layout row wrap>
            <v-flex md3>
              <v-text-field
                v-model="form.name"
                :disabled="disabled"
                label="Fullname"
                placeholder="Fullname"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="form.email"
                :disabled="disabled"
                label="Username"
                placeholder="Username"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-text-field
                v-model="form.password"
                :disabled="disabled"
                label="Password"
                placeholder="Password"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md4>
              <v-select
                v-model="form.roles"
                :items="roles"
                :item-text="'name'"
                :item-value="'id'"
                :disabled="disabled"
                attach
                chips
                label="Roles"
                placeholder="Roles"
                multiple
              ></v-select>
            </v-flex>
          </v-layout>
          <slot name="buttons"></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  props: {
    singleUser: {
      type: Object,
      default: function() {
        return {
          name: null,
          email: null,
          password: null,
          roles: []
        }
      }
    }
  },
  data() {
    return {
      form: this.mappedUser()
    }
  },
  computed: {
    ...mapGetters({
      roles: 'roles',
      disabled: 'disabled'
    })
  },
  methods: {
    mappedUser() {
      return _.update(_.clone(this.singleUser), 'roles', roles => {
        return _.map(roles, 'id')
      })
    },
    submit() {
      this.$emit('sumbit-user', this.form)
    }
  }
}
</script>
