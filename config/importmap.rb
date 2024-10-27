# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/modules", under: "modules"
pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"
pin "hls.js", to: "https://cdn.jsdelivr.net/npm/hls.js@1/+esm"
pin "clipboard", to: "https://cdn.jsdelivr.net/npm/clipboard@2.0.11/dist/clipboard.min.js/+esm" # @2.0.11
pin "flyonui", to: "/js/flyonui.js" # @1.1.0
