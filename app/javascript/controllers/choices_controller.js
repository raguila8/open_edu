import { Controller } from "stimulus"
import Tagify from '@yaireo/tagify'

export default class extends Controller {
  static targets = [ "input" ]

  connect() {
    // The DOM element you wish to replace with Tagify
    var input = document.querySelector('input[name=basic]');

    // initialize Tagify on the above input node reference
    this.tagify = new Tagify(input, {
      templates: {
        tag: this.tagTemplate
      },
    })  
  }

  disconnect() {
    
  }

  tagTemplate(tagData) {
    let tag = require('templates/tagify/tag.hbs')
    return tag({tagData: tagData, tagify: this.tagify})
  }
}
