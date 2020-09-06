import { Controller } from 'stimulus'
import { transitionIn, transitionOut  } from '../src/bare_transitions'

export default class extends Controller {
  static targets = ['toggleable', 'toggleArea']

  toggle(event) {
    event.stopPropagation()

    this.toggleableTargets.forEach(target => {
      if (target.classList.contains('hidden')) {
        transitionIn(target, () => target.classList.remove('hidden'))
      } else {
        transitionOut(target, () => target.classList.add('hidden'))
      }
    })
  }

  clickAway(event) {
    event.stopPropagation()

    if (!this.toggleAreaTarget.contains(event.target)) {
      this.toggleableTargets.forEach(target => {
        if (!target.classList.contains('hidden')) {
			    transitionOut(target, () => target.classList.add('hidden'))
        }
      })
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
  }

  toggleRemote(event) {
    this.toggle(event)

    let toggleController = this.application.getControllerForElementAndIdentifier(
      document.querySelector(this.data.get('remote')),
      "toggle"
    );

    toggleController.toggle(event);
  }

  hideWithKeyboard(event) {
    if (event.keyCode === 27) {
      this.hide()
    }
  }
}
