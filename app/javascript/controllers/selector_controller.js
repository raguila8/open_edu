import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    this.tagify = new Tagify(this.inputTarget, {
      enforceWhitelist: true,
      whitelist: this.inputTarget.value.trim().split(/\s*,\s*/), // Array of values.

      templates: {
        tag: this.tagTemplate
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
        console.log(httpRequest.response['resources'].map(author => { return author['name'] }))
        //console.log(httpRequest.response['resources'][0].map(author => { return author['name'] }))
        var newWhitelist = httpRequest.response['resources'].map(author => { return author['name'] })

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

  disconnect() {
    
  }

  tagTemplate(tagData) {
    let tag = require('templates/tagify/tag.hbs')
    return tag({tagData: tagData, tagify: this.tagify})
  }
}
