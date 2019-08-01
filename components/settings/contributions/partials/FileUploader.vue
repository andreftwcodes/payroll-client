<template>
  <div>
    <input v-show="false" id="file" ref="file" type="file" @change="onUpload" />
    <v-badge v-model="badge" color="success" right overlap>
      <template v-slot:badge>
        <v-icon dark small>
          done
        </v-icon>
      </template>
      <v-btn small @click.prevent="$refs.file.click()">Choose File</v-btn>
    </v-badge>
    <v-btn small @click.prevent="onValidate">Validate</v-btn>
    <v-btn small :disabled="canSaveRanges" @click.prevent="confirmDialog = true"
      >Save</v-btn
    >
    <ConfirmationDialog v-model="confirmDialog" @confirm-save="onSave" />
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions } from 'vuex'
import ConfirmationDialog from '@/components/settings/contributions/partials/ConfirmationDialog'
export default {
  components: {
    ConfirmationDialog
  },
  data() {
    return {
      file: null,
      badge: false,
      confirmDialog: false
    }
  },
  computed: {
    ...mapGetters({
      ranges: 'contributions/ranges',
      canSaveRanges: 'contributions/canSaveRanges'
    }),
    mappedRangesTable() {
      return _.map(this.ranges.table, o => {
        return {
          to: o.to,
          from: o.from,
          er: o.er,
          ee: o.ee
        }
      })
    }
  },
  watch: {
    file: function(newVal) {
      this.badge = newVal !== null
    }
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

      const loading = this.$loading.show()

      try {
        const response = await this.$axios.$post(
          'validate-data-ranges',
          formData,
          options
        )
        loading.hide()
        this.setRangesTable(response)
      } catch (error) {
        loading.hide()
        this.setRangesTable([])
      }
    },
    onUpload() {
      if (this.$refs.file.files[0] === undefined) {
        this.file = null
      } else {
        this.file = this.$refs.file.files[0]
      }
    },
    async onSave() {
      const loading = this.$loading.show()
      try {
        const response = await this.$axios.$post('contribution-ranges', {
          id: this.ranges.id,
          table: this.mappedRangesTable
        })
        loading.hide()
        this.file = null
        this.setRangesTable(response.data)
      } catch (error) {}
    }
  }
}
</script>

<style></style>
