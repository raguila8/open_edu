import { Controller } from 'stimulus';

export default class extends Controller {
  static targets = ['header']

  connect() {
    console.log('sticky running')
    if (this.hasHeaderTarget) {
      console.log('has header')
      console.log("elment offset: " + this.element.scrollTop)
      this.offset = this.headerTarget.getBoundingClientRect().top
      console.log("header offset: " + this.headerTarget.getBoundingClientRect().top)
      this.height = this.headerTarget.offsetHeight + "px"
      this.element.addEventListener('scroll', this.onScroll.bind(this))
    }
  }

  onScroll(event) {
    console.log("elment offset: " + this.element.scrollTop)
    if (this.element.scrollTop > this.offset) {
      if (!this.headerTarget.classList.contains('sticky')) {
        this.headerTarget.classList.add("sticky")
        this.headerTarget.style.right = this.getScrollbarWidth()

        this.headerTarget.nextElementSibling.style.paddingTop = this.height
      }
    } else {
      if (this.headerTarget.classList.contains('sticky')) {
        this.headerTarget.classList.remove("sticky")
        this.headerTarget.style.right = null
        this.headerTarget.nextElementSibling.style.paddingTop = null
      }   
    }
  }

  getScrollbarWidth() {
    let scrollDiv = document.createElement("div")
    scrollDiv.className = 'scrollbar-measure'
    document.body.appendChild(scrollDiv)

    // Get the scrollbar width
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
     console.log(scrollbarWidth) 
    // Delete the DIV 
    document.body.removeChild(scrollDiv)
    return scrollbarWidth  + "px"
  }
}
