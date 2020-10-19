import { Controller } from 'stimulus'
import { transitionIn, transitionOut  } from '../src/bare_transitions'

export default class extends Controller {
  static targets = ['toggleable', 'toggleArea']

  connect() {
    this.data.set('expanded', false)
  }

  toggle(event) {
    event.stopPropagation()

    this.toggleableTargets.forEach(target => {
      if (target.classList.contains('hidden')) {
        transitionIn(target, () => target.classList.remove('hidden'))
      } else {
        transitionOut(target, () => target.classList.add('hidden'))
      }
    })

    this.toggleExpandedAttribute()
  }

  clickAway(event) {
    event.stopPropagation()

    if (!this.toggleAreaTarget.contains(event.target)) {
      this.toggleableTargets.forEach(target => {
        if (!target.classList.contains('hidden')) {
			    transitionOut(target, () => target.classList.add('hidden'))
        }
      })

      this.data.set('expanded', false)
    }
  }

  show(event) {
    if (event !== undefined) {
      event.stopPropagation()
    }

    this.toggleableTargets.forEach(target => {
      if (target.classList.contains('hidden')) {
        transitionIn(target, () => target.classList.remove('hidden'))
      }
    })

    this.data.set('expanded', true)
  }

  hide(event) {
    if (event !== undefined) {
      event.stopPropagation()
    }
    this.toggleableTargets.forEach(target => {
      if (!target.classList.contains('hidden')) {
			  transitionOut(target, () => target.classList.add('hidden'))
      }
    })

    this.data.set('expanded', false)
  }

  toggleRemote(event) {
    this.toggle(event)

    let toggleController = this.application.getControllerForElementAndIdentifier(
      document.querySelector(this.data.get('remote')),
      "toggle"
    )

    toggleController.toggle(event)
  }

  hideWithKeyboard(event) {
    if (event.keyCode === 27) {
      this.hide()
    }
  }

  toggleExpandedAttribute() {
    if (this.data.get('expanded') == 'true') {
      this.data.set('expanded', false)
    } else {
      this.data.set('expanded', true)
    }
  }
}
