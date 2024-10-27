import consumer from "channels/consumer"

export function ready() {
    const channelId = document.querySelector("[data-channel-id]")?.dataset.channelId;
    if (!channelId) return console.debug("channelId not exist")

    const messages = document.getElementById("messages");
    if (!messages) return console.debug("messages not exist")

    consumer.subscriptions.create({channel: "MessagesChannel", room: channelId}, {
        connected() {
            messages.scrollTop = messages.scrollHeight;
        },
        disconnected() {
            // Called when the subscription has been terminated by the server
        },
        received(data) {
            const isAtBottom = messages.scrollTop + messages.clientHeight >= messages.scrollHeight

            messages.insertAdjacentHTML("beforeend", data.html);

            if (isAtBottom) messages.scrollTop = messages.scrollHeight;
        }
    });
}
