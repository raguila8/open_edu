import { Controller } from 'stimulus';
import Rails from "@rails/ujs";

export default class extends Controller {
  static targets = ['avatarContainer']

  submit(event) {
    Rails.fire(this.element, 'submit')
    this.avatarContainerTarget.querySelectorAll('.hidden').forEach((el) => {
      el.classList.remove('hidden')
    })
  }

  selectFile() {
    this.element.querySelector('input[type="file"]').click()
  }
}
