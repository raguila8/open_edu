import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    this.tagify = new Tagify(this.inputTarget, {
      enforceWhitelist: true,
      whitelist: this.inputTarget.value.trim().split(/\s*,\s*/), // Array of values.
      dropdown: {
        closeOnSelect: true,
        enabled: 1,
        searchKeys: ['name']  // very important to set by which keys to search for suggesttions when typing
      },

      templates: {
        tag: this.tagTemplate.bind(this),
        dropdown: this.dropdownTemplate,
        dropdownItem: this.dropdownItemTemplate.bind(this),
      },
    })

    this.tagify.on('input', this.onInput.bind(this))
  }

  onInput(event) {
    this.tagify.settings.whitelist.length = 0; // reset current whitelist
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

  tagTemplate(tagData) {
    console.log("tagData values: " + Object.values(tagData.value))
    console.log("tagData keys: " + Object.keys(tagData.value))

    console.log(window.Helpers.toHTMLAttributes(tagData.value))
    let tag = require('templates/tagify/tag.hbs')
    return tag({ tagData: tagData, tagify: this.tagify, attributes: window.Helpers.toHTMLAttributes(tagData) })
  }

  dropdownItemTemplate(item) {
    let attributes = this.tagify.getAttributes(item)
    let dropdownItem = require('templates/tagify/dropdown_item.hbs')
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
