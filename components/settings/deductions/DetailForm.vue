<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex md9>
          <v-layout row wrap>
            <v-flex md6>
              <v-text-field
                v-model="form.name"
                label="Name"
                placeholder="Name"
                :disabled="disabled"
              ></v-text-field>
            </v-flex>
            <v-flex md3>
              <v-switch
                v-model="form.status"
                label="Status"
                color="success"
                hide-details
              ></v-switch>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex md6>
              <slot name="buttons"></slot>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    singleDeduction: {
      type: Object,
      default: function() {
        return {
          name: null,
          status: null
        }
      }
    }
  },
  data() {
    return {
      form: this.singleDeduction
    }
  },
  computed: {
    ...mapGetters({
      disabled: 'disabled'
    })
  },
  methods: {
    submit() {
      this.$emit('sumbit-deduction', this.form)
    }
  }
}
</script>
