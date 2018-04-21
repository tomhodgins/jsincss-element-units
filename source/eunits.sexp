mixin('eunit', ['selector', 'rule'],
  returnValue('Array.from(document.querySelectorAll(selector))',
    reduceFunc(
      prelude('      rule = rule.replace(/(\\d*\\.?\\d+)(?:\\s*)(ew|eh|emin|emax)/gi,\n\
        (match, number, unit) => {\n\n\
          switch(unit) {\n\n\
            case \'ew\':\n\
              return tag.offsetWidth / 100 * number + \'px\'\n\n\
            case \'eh\':\n\
              return tag.offsetHeight / 100 * number + \'px\'\n\n\
            case \'emin\':\n\
              return Math.min(tag.offsetWidth, tag.offsetHeight) / 100 * number + \'px\'\n\n\
            case \'emax\':\n\
              return Math.max(tag.offsetWidth, tag.offsetHeight) / 100 * number + \'px\'\n\n\
          }\n\n\
        })\n\n',
        createAttribute(['selector'],
          addAttribute('tag', 'eunit',
            addRule('', '', 'eunit')))))))
