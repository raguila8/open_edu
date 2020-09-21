import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['item']

  keydown(event) {
    switch(event.which) {
      case 40:
        console.log('down')
        if (this.element.dataset.toggleExpanded == 'true') {
        }
        break
      case 13:
        console.log('enter')
        break
      case 32:
        console.log('space')
        break
      case 27:
        console.log('escape')
        break
    }
  }
}
