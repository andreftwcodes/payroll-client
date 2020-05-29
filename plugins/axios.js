export default function({ $axios, store }) {
  $axios.onError(error => {
    if (error.response.status === 422) {
      store.dispatch('validation/setErrors', error.response.data.errors)
    }

    if (store.getters['auth/authenticated']) {
      if (error.response.status === 401) {
        store.dispatch('auth/logout')
      }
    }

    return Promise.reject(error)
  })

  $axios.onRequest(() => {
    store.dispatch('validation/clearErrors')
  })
}
