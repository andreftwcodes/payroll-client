<template>
  <DetailForm :single-user="singleUser" @sumbit-user="submit">
    <template v-slot:buttons>
      <v-btn color="primary" @click.prevent="back">Back</v-btn>
      <template v-if="disabled">
        <v-btn class="primary" @click.prevent="edit">Edit</v-btn>
      </template>
      <template v-else>
        <v-btn class="primary" type="submit">Update</v-btn>
      </template>
    </template>
  </DetailForm>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import DetailForm from '@/components/users/DetailForm'
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
