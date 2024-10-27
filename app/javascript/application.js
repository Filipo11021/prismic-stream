// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "flyonui"
import "@hotwired/turbo-rails"
import "controllers"
import "channels"
import "modules"

Turbo.StreamActions.update_input = function () {
    for (const target of this.targetElements) {
        target.value = this.templateContent.textContent
    }
};

window.addEventListener('load', function setInputsLazyValue() {
    const inputElements = document.querySelectorAll("[data-lazy-value]")

    for (const el of inputElements) {
        el.value = el.dataset.lazyValue
    }
})

window.addEventListener('turbo:render', function () {
    HSTogglePassword.autoInit()
})