<template>
  <div>
    <template v-if="getDeductionId == 1">
      <Contributions />
    </template>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
// import DetailForm from '@/components/settings/deductions/DetailForm'
import Contributions from '@/components/settings/deductions/partials/Contributions'
export default {
  middleware: 'auth',
  components: {
    // DetailForm
    Contributions
  },
  data() {
    return {
      singleDeduction: null
    }
  },
  computed: {
    ...mapGetters({
      disabled: 'disabled'
    }),
    getDeductionId() {
      return this.$route.params.id
    }
  },
  async asyncData({ app, params }) {
    const response = await app.$axios.$get(`deductions/${params.id}`)
    return {
      singleDeduction: response.data
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
        path: '/settings/deductions'
      })
    },
    async submit(form) {
      try {
        await this.$axios.$patch(`deductions/${this.$route.params.id}`, form)
        this.setDisabled(true)
      } catch (error) {}
    }
  }
}
</script>
