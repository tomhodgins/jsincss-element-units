export default (selector, rule) => {

  return Array.from(document.querySelectorAll(selector))

    .reduce((styles, tag, count) => {

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

      const attr = selector.replace(/\W/g, '')

      tag.setAttribute(`data-eunit-${attr}`, count)
      styles += `[data-eunit-${attr}="${count}"] { ${rule} }\n`
      count++

      return styles

    }, '')

}
