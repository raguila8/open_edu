import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["entry"]

  initialize() {
    let options = {
      rootMargin: '100px',
    }

    this.intersectionObserver = new IntersectionObserver((entries, self) => this.processIntersectionEntries(entries, self), options)
  }

  connect() {
    this.entryTargets.forEach(entry => { 
      this.intersectionObserver.observe(entry)
    })
  }

  disconnect() {
    this.entryTargets.forEach(entry => { this.intersectionObserver.unobserve(entry) })
  }

  processIntersectionEntries(entries, self) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.loadContentFor(entry.target)
        self.unobserve(entry.target)
      }
    })
  }

  loadContentFor(targetElement) {
    if (this.needToLoadImageFor(targetElement)) { 
      this.preloadImage(targetElement)
    }
  }

  preloadImage(targetElement) {
    const src = targetElement.getAttribute('data-image-src')
    if (!src) { return }
    if (this.isImage(targetElement)) {
      targetElement.addEventListener('load', function(event) {
        targetElement.removeAttribute('data-image-src')
        targetElement.classList.remove('opacity-0')
	      targetElement.parentElement.classList.remove("animate-pulse")
	    }, { once: true })
      
      targetElement.src = src
    } else {
      targetElement.style.backgroundImage = `url(${src})`
    }
  }

  needToLoadImageFor(targetElement) {
    return targetElement.hasAttribute('data-image-src')
  }

  isImage(targetElement) {
    return targetElement instanceof HTMLImageElement
  }
}
