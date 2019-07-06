<template>
  <v-form @submit.prevent="submit">
    <v-container fluid grid-list-md text-xs-center>
      <v-layout row wrap>
        <v-flex xs12>
          <template v-if="schedules">
            <v-data-table
              :headers="headers"
              :items="schedules"
              class="elevation-1"
              hide-actions
            >
              <template v-slot:items="props">
                <td class="text-xs-left">{{ props.item.day_dsp }}</td>
                <td>
                  <v-text-field
                    v-model="props.item.start_1"
                    type="time"
                    label="Time In"
                    placeholder="Placeholder"
                    class="mt-3"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.end_1"
                    type="time"
                    label="Time Out"
                    placeholder="Placeholder"
                    class="mt-3"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.start_2"
                    type="time"
                    label="Time In"
                    placeholder="Placeholder"
                    class="mt-3"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    v-model="props.item.end_2"
                    type="time"
                    label="Time Out"
                    placeholder="Placeholder"
                    class="mt-3"
                  ></v-text-field>
                </td>
                <td>
                  <v-switch v-model="props.item.status" class="mt-3"></v-switch>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout row wrap>
      <slot name="buttons"></slot>
    </v-layout>
  </v-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: {
    schedules: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      headers: [
        { text: 'Day', value: '', sortable: false },
        { text: 'Frist Quarter', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Second Quarter', value: '', sortable: false },
        { text: '', value: '', sortable: false },
        { text: 'Status', value: '', sortable: false }
      ]
    }
  },
  methods: {
    ...mapMutations({
      setScheduling: 'employees/SET_SCHEDULING'
    }),
    submit() {
      this.$emit('saved:scheduling')
      this.setScheduling(this.schedules)
    }
  }
}
</script>

<style></style>
