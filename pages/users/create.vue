<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-card>
          <DetailForm @sumbit-user="submit">
            <template v-slot:buttons>
              <v-btn color="primary" nuxt :to="{ name: 'users' }">Back</v-btn>
              <v-btn color="primary" type="submit">Save</v-btn>
            </template>
          </DetailForm>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import DetailForm from '@/components/users/DetailForm'
export default {
  middleware: 'auth',
  components: {
    DetailForm
  },
  computed: {},
  created() {
    this.setDisabled(false)
  },
  methods: {
    async submit(user) {
      try {
        await this.$axios.$post('users', user)
        this.$router.push({
          path: '/users'
        })
      } catch (error) {}
    },
    ...mapMutations({
      setDisabled: 'SET_DISABLED'
    })
  }
}
</script>

<style></style>
