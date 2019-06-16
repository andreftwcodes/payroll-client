<template>
  <v-dialog v-model="show" persistent width="1000">
    <v-card v-if="attendance">
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ attendance.employee.fullname }}
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-layout>
              <v-flex xs12 md4>
                <v-select
                  v-model="attendance.locale"
                  :items="locales"
                  :item-text="'name'"
                  :item-value="'id'"
                  label="Locale"
                  placeholder="Locale"
                ></v-select>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="attendance.start"
                  type="time"
                  label="Time In"
                  placeholder="Placeholder"
                  append-icon="access_time"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md4>
                <v-text-field
                  v-model="attendance.end"
                  type="time"
                  label="Time Out"
                  placeholder="Placeholder"
                  append-icon="access_time"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-form>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.prevent="update">
          Update
        </v-btn>
        <v-btn color="primary" flat @click="show = false">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean
    },
    attendance: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters({
      locales: 'locales'
    }),
    show: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    mappedLocale() {
      const locale = this.attendance.locale
      return _.isObject(locale) ? locale.id : locale
    },
    async update() {
      try {
        const response = await this.$axios.$patch(
          `attendances/${this.attendance.id}`,
          {
            locale_id: this.mappedLocale(),
            start: this.attendance.start,
            end: this.attendance.end
          }
        )
        this.show = false
        this.$emit('attendance:updated', response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
