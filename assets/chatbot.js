// Satmoko Law Firm — Legal OS Assistant widget
// Injects the chat widget markup + behavior on every page that includes this script.
// TODO(before launch): replace CHAT_ENDPOINT with the real backend URL once deployed.
(function () {
  "use strict";

  var CHAT_ENDPOINT = "https://namapythonanywhere.pythonanywhere.com/chat";
  var currentLang = window.location.href.indexOf("-en.html") !== -1 ? "en" : "id";

  var strings = {
    id: {
      title: "Legal OS Assistant",
      placeholder: "Tanya soal RWA, SBLC...",
      send: "Kirim"
    },
    en: {
      title: "Legal OS Assistant",
      placeholder: "Ask about RWA, SBLC...",
      send: "Send"
    }
  };

  function injectMarkup() {
    var t = strings[currentLang];
    var wrap = document.createElement("div");
    wrap.id = "chat-widget";
    wrap.innerHTML =
      '<div id="chat-box">' +
        '<div id="chat-header">' +
          '<span>' + t.title + '</span>' +
          '<span id="chat-close">&times;</span>' +
        '</div>' +
        '<div id="chat-messages"></div>' +
        '<div id="chat-input">' +
          '<input type="text" id="userInput" placeholder="' + t.placeholder + '">' +
          '<button id="chat-send">' + t.send + '</button>' +
        '</div>' +
      '</div>' +
      '<button id="chat-button" aria-label="' + t.title + '">&#128172;</button>';
    document.body.appendChild(wrap);
  }

  function toggleChat() {
    var box = document.getElementById("chat-box");
    box.style.display = box.style.display === "flex" ? "none" : "flex";
  }

  function addMessage(text, sender) {
    var messages = document.getElementById("chat-messages");
    var msg = document.createElement("div");
    msg.className = "msg " + sender;
    msg.textContent = text;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function sendMessage() {
    var input = document.getElementById("userInput");
    var message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message, lang: currentLang })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) { addMessage(data.answer, "bot"); })
      .catch(function () {
        addMessage(
          currentLang === "en"
            ? "Sorry, the assistant is temporarily unavailable. Please use WhatsApp instead."
            : "Maaf, asisten sedang tidak tersedia. Silakan hubungi kami via WhatsApp.",
          "bot"
        );
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    injectMarkup();
    document.getElementById("chat-button").addEventListener("click", toggleChat);
    document.getElementById("chat-close").addEventListener("click", toggleChat);
    document.getElementById("chat-send").addEventListener("click", sendMessage);
    document.getElementById("userInput").addEventListener("keydown", function (e) {
      if (e.key === "Enter") sendMessage();
    });
  });
})();
