import { Controller } from "stimulus"
export default class extends Controller {
  static targets = [ "container", "name" ]

  render() {
    this.name = event.detail.data.value
    this.nameTarget.value = this.name
    let toggleController = this.application.getControllerForElementAndIdentifier(
      this.containerTarget,
      "toggle"
    )

    toggleController.toggle(event)

    console.log(event)
  }
}
