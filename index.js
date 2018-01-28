export default (selector, rule) => {

  let styles = ''
  let count = 0

  document.querySelectorAll(selector).forEach(tag => {

    const attr = selector.replace(/\W/g, '')

    rule = rule.replace(/(\d*\.?\d+)(?:\s*)(ew|eh|emin|emax)/gi,
      (match, number, unit) => {

        switch(unit) {

          case 'ew':
            return tag.offsetWidth / 100 * number + 'px'

          case 'eh':
            return tag.offsetHeight / 100 * number + 'px'

          case 'emin':
            return Math.min(tag.offsetWidth, tag.offsetHeight) / 100 * number + 'px'

          case 'emax':
            return Math.max(tag.offsetWidth, tag.offsetHeight) / 100 * number + 'px'

        }

      })

    tag.setAttribute(`data-eunit-${attr}`, count)
    styles += `[data-eunit-${attr}="${count}"] { ${rule} }\n`
    count++

  })

  return styles

}