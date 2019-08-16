export const payslipMixin = {
  methods: {
    payslipDialog(url = '', title = 'xtf', w = 1200, h = 600) {
      const dualScreenLeft =
        window.screenLeft !== undefined ? window.screenLeft : screen.left
      const dualScreenTop =
        window.screenTop !== undefined ? window.screenTop : screen.top

      const width = window.innerWidth
        ? window.innerWidth
        : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width
      const height = window.innerHeight
        ? window.innerHeight
        : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height

      const left = width / 2 - w / 2 + dualScreenLeft
      const top = height / 2 - h / 2 + dualScreenTop
      window.open(
        url,
        title,
        'directories=no,toolbar=0,location=0,menubar=0,scrollbars=yes, width=' +
          w +
          ', height=' +
          h +
          ', top=' +
          top +
          ', left=' +
          left
      )
    }
  }
}
