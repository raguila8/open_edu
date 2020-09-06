import { Controller } from 'stimulus'

export default class extends Controller {
  connect () {
    this.element.setAttribute('novalidate', true)
    this.element.addEventListener('blur', this.onBlur, true)
    this.element.addEventListener('submit', this.onSubmit)
    this.element.addEventListener('ajax:beforeSend', this.onSubmit)
    this.element.addEventListener('input', this.onInput, true)
  }

  disconnect () {
    this.element.removeEventListener('blur', this.onBlur)
    this.element.removeEventListener('input', this.onInput)
    this.element.removeEventListener('submit', this.onSubmit)
    this.element.removeEventListener('ajax:beforeSend', this.onSubmit)
  }

  onBlur = (event) => {
    if (event.target.hasAttribute('changed')) {
      this.validateField(event.target)
    }
  }

  onInput = (event) => {
    event.target.setAttribute('changed', true)
  }

  onSubmit = (event) => {
    if (!this.validateForm()) {
      event.preventDefault()
      this.firstInvalidField.focus()
    } else {
      this.load()
    }
  }

  validateForm () {
    let isValid = true
    // Not using `find` because we want to validate all the fields
    this.formFields.forEach((field) => {
      if (this.shouldValidateField(field) && !this.validateField(field)) isValid = false
    })
    return isValid
  }

  validateField (field) {
    let isValid = true
    if (!this.shouldValidateField(field))
      return true

    if (!field.validity.valid) {
      isValid = false
      this.showError(field)
    } else if (this.isPasswordConfirmationField(field) && this.hasPasswordMismatch(field) ) {
      isValid = false
      this.showError(field, "Password confirmation does not match password");
    } else if (field.classList.contains('invalid')) {
      this.removeError(field)
    }
    return isValid
  }

  isPasswordConfirmationField(field) {
    return field.name == "user[password_confirmation]"
  }

  hasPasswordMismatch(field) {
    let passwordField = this.element.querySelector("input[name='user[password]'")
    return field.value != passwordField.value
  }

  shouldValidateField (field) {
    return !field.disabled && !['file', 'reset', 'submit', 'button'].includes(field.type)
  } 
  
  showError(field, msg=field.validationMessage) {
    field.classList.add('invalid')
    // The element after the inputContainer should either be an error msg
    // or info msg. If field already has error msg then we remove it. 
    // If field has info msg then we hide it to then show an error msg.
    let sibling = field.nextElementSibling
    if (sibling) {
      if (sibling.classList.contains('error')) {
        sibling.remove()
      }
    }

    field.insertAdjacentHTML('afterend', `<p class="error">${msg}</p>`)
  }
  
  removeError(field) {
    field.classList.remove('invalid');

    let sibling = field.nextElementSibling
    sibling.remove()
  }

  
  get formFields () {
    return Array.from(this.element.elements)
  }

  get firstInvalidField () {
    return this.formFields.find(field => !field.checkValidity())
  }

  load() {
    let btn = this.element.querySelector('[type="submit"]')
    btn.disabled = true
    let spinner = btn.querySelector('svg')
    if (spinner)
      spinner.classList.remove('hidden')
  }
}
