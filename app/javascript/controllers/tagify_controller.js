import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    this.tagifyInit()
    this.addTagifyEventListeners()
    // this.renderSuggestionsList()
  }

  tagifyInit() {
    let options = {
      addTagOnBlur: false,
      whitelist: this.inputTarget.value.trim().split(/\s*,\s*/).filter(Boolean), // Array of values.
      dropdown: {
        closeOnSelect: true,
        enabled: 1,
        searchKeys: ['name']  // very important to set by which keys to search for suggesttions when typing
      },
      autoComplete: {
        enabled: false,
      },
      templates: {
        tag: this.tagTemplate.bind(this),
        dropdown: this.dropdownTemplate,
        dropdownItem: this.dropdownItemTemplate.bind(this),
      },
    }

    if (this.data.get('type') == 'person') {
      options.enforceWhitelist = true
    } else {
      options.enforceWhitelist = false
    }

    this.tagify = new Tagify(this.inputTarget, options)
  }

  addTagifyEventListeners() {
    this.tagify.on('input', this.onInput.bind(this))
               .on('dropdown:show', this.showDropdown.bind(this))
               .on('dropdown:hide', this.hideDropdown.bind(this))
               .on('invalid', this.onInvalid.bind(this))
  }

  onInvalid(event) {
    if (this.data.get('type') == 'person' && event.detail.data.__isValid == 'not allowed') {
      let authorController = this.application.getControllerForElementAndIdentifier(
        this.element,
        "author"
      )

      authorController.render(event)

    } else {

    }
  }

  onInput(event) {
    //this.tagify.state.dropdown.visible = false
    this.hideDropdown()
    this.tagify.settings.whitelist.length = 0 // reset current whitelist

    if (event.detail.value.length >= 1) {
      // show loader & hide suggestions dropdown (if opened)
      this.tagify.loading(true).dropdown.hide.call(this.tagify)
      let self = this
      let httpRequest = new XMLHttpRequest()
      httpRequest.responseType = "json"
      
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          //console.log(httpRequest.response['resources'][0].map(author => { return author['name'] }))
          var newWhitelist = httpRequest.response['resources']
          //.map(author => { return author['name'] })
  
          // replace tagify "whitelist" array values with new values 
          // and add back the ones already choses as Tags
	        self.tagify.settings.whitelist.push(...newWhitelist, ...self.tagify.value)
  
          // render the suggestions dropdown
          self.tagify.loading(false).dropdown.show.call(self.tagify, event.detail.value)
	      }
      }
  
      httpRequest.open('GET', `${this.data.get('endpoint')}?q=${event.detail.value}`)
      httpRequest.send()
    }
  }

  showDropdown(event) {
    this.tagify.DOM.dropdown.classList.remove('hidden')
/*
    this.tagify.DOM.dropdown.style.top = null
    this.tagify.DOM.dropdown.style.left = null
    this.tagify.DOM.dropdown.style.width = null
*/
  }

  hideDropdown(event) {
    this.tagify.DOM.dropdown.classList.add('hidden')
  }

  renderSuggestionsList() {
    this.tagify.dropdown.show.call(this.tagify) // load the list
    this.element.appendChild(this.tagify.DOM.dropdown)
    
  }

  tagTemplate(tagData) {
    let tag = require(`templates/tagify/${this.data.get('type')}_tag.hbs`)
    return tag({ tagData: tagData, tagify: this.tagify, attributes: window.Helpers.toHTMLAttributes(tagData) })
  }

  dropdownItemTemplate(item) {
    let attributes = this.tagify.getAttributes(item)
    let dropdownItem = require(`templates/tagify/dropdown_${this.data.get('type')}_item.hbs`)
    return dropdownItem({item: item, tagify: this.tagify, attributes: attributes})
  }

  dropdownTemplate(settings){
    let dropdown = require("templates/tagify/dropdown.hbs")
    return dropdown({ 
      settings: settings, 
      _sd: settings.dropdown, 
      isManual: settings.dropdown.position == 'manual', 
      className: settings.classNames.dropdown 
    })
	}	
}
