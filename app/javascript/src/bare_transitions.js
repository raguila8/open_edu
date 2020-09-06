export function transitionIn (el, show = () => {}) {
  const attrs = getXAttrs(el, 'transition')

  // If any transition attrs.
  if (attrs.filter(attr => ['enter', 'enter-start', 'enter-end'].includes(attr.value)).length > 0) {
    transitionClassesIn(el, attrs, show)
  } else {
  // If not, just show that damn thing.
    show()
  }
}

export function transitionOut (el, hide = () => {}) {
  const attrs = getXAttrs(el, 'transition')

  if (attrs.filter(attr => ['leave', 'leave-start', 'leave-end'].includes(attr.value)).length > 0) {
    transitionClassesOut(el, attrs, hide)
  } else {
    hide()
  }
}

export function transitionClassesIn (el, directives, showCallback) {
  const enter = (directives.find(i => i.value === 'enter') || { expression: '' }).expression.split(' ').filter(i => i !== '')
  const enterStart = (directives.find(i => i.value === 'enter-start') || { expression: '' }).expression.split(' ').filter(i => i !== '')
  const enterEnd = (directives.find(i => i.value === 'enter-end') || { expression: '' }).expression.split(' ').filter(i => i !== '')

  transitionClasses(el, enter, enterStart, enterEnd, showCallback, () => {})
}

export function transitionClassesOut (el, directives, hideCallback) {
  const leave = (directives.find(i => i.value === 'leave') || { expression: '' }).expression.split(' ').filter(i => i !== '')
  const leaveStart = (directives.find(i => i.value === 'leave-start') || { expression: '' }).expression.split(' ').filter(i => i !== '')
  const leaveEnd = (directives.find(i => i.value === 'leave-end') || { expression: '' }).expression.split(' ').filter(i => i !== '')

  transitionClasses(el, leave, leaveStart, leaveEnd, () => {}, hideCallback)
}

export function transitionClasses (el, classesDuring, classesStart, classesEnd, hook1, hook2) {
  const originalClasses = el.__x_original_classes || []

  const stages = {
    start () {
      el.classList.add(...classesStart)
    },
    during () {
      el.classList.add(...classesDuring)
    },
    show () {
      hook1()
    },
    end () {
      // Don't remove classes that were in the original class attribute.
      el.classList.remove(...classesStart.filter(i => !originalClasses.includes(i)))
      el.classList.add(...classesEnd)
    },
    hide () {
      hook2()
    },
    cleanup () {
      el.classList.remove(...classesDuring.filter(i => !originalClasses.includes(i)))
      el.classList.remove(...classesEnd.filter(i => !originalClasses.includes(i)))
    }
  }

  transition(el, stages)
}

export function transition (el, stages) {
  stages.start()

  // Force compute the styles. This is necessary for newly inserted elements in the DOM.
  // Se this bug report https://bugzilla.mozilla.org/show_bug.cgi?id=916620
  const randomProperty = 'width'
  getComputedStyle(el).getPropertyValue(randomProperty)

  stages.during()

  requestAnimationFrame(() => {
    // Note: Safari's transitionDuration property will list out comma separated transition durations
    // for every single transition property. Let's grab the first one and call it a day.
    const duration = Number(getComputedStyle(el).transitionDuration.replace(/,.*/, '').replace('s', '')) * 1000

    stages.show()

    requestAnimationFrame(() => {
      stages.end()

      setTimeout(() => {
        stages.hide()

        // Adding an "isConnected" check, in case the callback
        // removed the element from the DOM.
        if (el.isConnected) {
          stages.cleanup()
        }
      }, duration)
    })
  })
}

const xAttrRE = /^x-transition\b/

export function isXAttr (attr) {
  const name = attr.name
  return xAttrRE.test(name)
}

export function getXAttrs (el, type) {
  return Array.from(el.attributes)
    .filter(isXAttr)
    .map(attr => {
      const name = attr.name

      const typeMatch = name.match(xAttrRE)
      const valueMatch = name.match(/:([a-zA-Z\-:]+)/)
      const modifiers = name.match(/\.[^.\]]+(?=[^\]]*$)/g) || []

      return {
        type: typeMatch ? 'transition' : null,
        value: valueMatch ? valueMatch[1] : null,
        modifiers: modifiers.map(i => i.replace('.', '')),
        expression: attr.value
      }
    })
    .filter(i => {
      // If no type is passed in for filtering, bypass filter
      if (!type) return true

      return i.type === type
    })
}
