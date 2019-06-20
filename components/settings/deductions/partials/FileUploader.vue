<template>
  <div>
    <input v-show="false" id="file" ref="file" type="file" @change="onUpload" />
    <v-btn small @click.prevent="$refs.file.click()">Choose File</v-btn>
    <v-btn small @click.prevent="onValidate">Validate</v-btn>
    <v-btn small @click.prevent="onSave">Save</v-btn>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      file: null
    }
  },
  computed: {
    ...mapGetters({
      ranges: 'contributions/ranges'
    })
  },
  methods: {
    ...mapActions({
      setRangesTable: 'contributions/setRangesTable'
    }),
    async onValidate() {
      const formData = new FormData()

      formData.append('file', this.file)

      const options = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      try {
        const response = await this.$axios.$post(
          'validate-data-ranges',
          formData,
          options
        )
        this.setRangesTable(response)
      } catch (error) {}
    },
    onUpload() {
      this.file = this.$refs.file.files[0]
    },
    async onSave() {
      try {
        const response = await this.$axios.$post('contribution-ranges', {
          id: this.ranges.id,
          table: this.ranges.table
        })
        this.file = null
        this.setRangesTable(response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
