<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <DetailForm :single-user="singleUser" @sumbit-user="submit">
            <template v-slot:buttons>
              <v-btn @click.prevent="back" color="primary">Back</v-btn>
              <template v-if="disabled">
                <v-btn @click.prevent="edit" class="primary">Edit</v-btn>
              </template>
              <template v-else>
                <v-btn class="primary" type="submit">Update</v-btn>
              </template>
            </template>
          </DetailForm>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import DetailForm from '@/components/users/DetailForm'
import { mapGetters, mapMutations } from 'vuex'
export default {
  middleware: 'auth',
  components: {
    DetailForm
  },
  data() {
    return {
      singleUser: null
    }
  },
  computed: {
    ...mapGetters({
      disabled: 'disabled'
    })
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`users/${params.id}`)
    return {
      singleUser: response.data
    }
  },
  created() {
    this.setDisabled(true)
  },
  methods: {
    ...mapMutations({
      edit: 'EDIT',
      setDisabled: 'SET_DISABLED'
    }),
    back() {
      this.$router.push({
        path: '/users'
      })
    },
    async submit(form) {
      try {
        await this.$axios.$patch(`users/${this.$route.params.id}`, form)
        this.setDisabled(true)
      } catch (error) {}
    }
  }
}
</script>
