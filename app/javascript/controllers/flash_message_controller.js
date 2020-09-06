import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['container']

  connect() {
    let flash_messages = document.querySelectorAll('[data-controller*="flash-message"]')
    if ( flash_messages.length > 1 ) {
      let height = 0
      flash_messages.forEach((flash_message, index) => {
        if (flash_message.isEqualNode(this.element) && index > 0) {
          //this.element.style.top = height + "px"
          this.element.style.transform = `translateY(${height}px)`
        }

        height += this.heightOf(flash_message)
        //height += flash_message.offsetHeight
      })
    }
    
    let toggleController = this.application.getControllerForElementAndIdentifier(
      this.element,
      "toggle"
    )

    toggleController.show(event)

    this.hideTimeout = setTimeout(() => {
      this.hide()
    }, 30000)
  }

  disconnect() {
    clearTimeout(this.hideTimeout)
  }

  hide(event) {
    let toggleController = this.application.getControllerForElementAndIdentifier(
      this.element,
      "toggle"
    )

    toggleController.hide()

    setTimeout(() => {
      let flash_messages = document.querySelectorAll('[data-controller*="flash-message"]')
     
      if ( flash_messages.length > 1 ) {
        let flash_index = Array.from(flash_messages).indexOf(this.element)
        let height = 0

        flash_messages.forEach((flash_message, index) => {
          if (!flash_message.isEqualNode(this.element)) {
            if (index > flash_index) {
              //flash_message.style.top = height + "px"
              flash_message.style.transform = `translateY(${height}px)`
            }

            height += this.heightOf(flash_message)
            //height += flash_message.height
          }
        })
      }

      this.element.remove()
    }, 100)
  }

  heightOf(flash_message) {
    let container = flash_message.querySelector('div')
    let height = 0
    if (container.classList.contains('hidden')) {
      container.style.visibility = 'hidden'
      container.classList.remove('hidden')
      height = flash_message.offsetHeight
      container.classList.add('hidden')
      container.style.visibility = null
    } else {
      height = flash_message.offsetHeight
    }
    return height
  }
}
