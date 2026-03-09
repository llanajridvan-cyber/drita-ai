const avatar = document.getElementById("avatar");
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const statusText = document.getElementById("status");

const normalAvatar = "avatar.gif";
const talkingAvatar = "voice.gif";

let lastReply = "Përshëndetje! Shkruaj një fjalë në shqip dhe unë do të të ndihmoj.";

function handleEnter(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function setStatus(text) {
  statusText.textContent = text;
}

function switchToNormal() {
  avatar.src = normalAvatar;
  avatar.classList.remove("talking");
  setStatus("Gjendja: Duke pritur...");
}

function switchToTalking() {
  avatar.src = talkingAvatar;
  avatar.classList.add("talking");
  setStatus("Gjendja: Duke folur...");
}

function addMessage(sender, text, type) {
  const message = document.createElement("div");
  message.className = `message ${type}`;

  message.innerHTML = `
    <span class="name">${sender}</span>
    <p>${text}</p>
  `;

  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

function getReply(userText) {
  const text = userText.toLowerCase().trim();

  if (text.includes("pershendetje") || text.includes("përshëndetje") || text.includes("hello")) {
    return "Në anglisht themi: Hello. Στα ελληνικά: Γεια σου.";
  }

  if (text.includes("si je")) {
    return "Në anglisht: How are you? Στα ελληνικά: Τι κάνεις;";
  }

  if (text.includes("shtepi") || text.includes("shtëpi")) {
    return "Në anglisht: House. Στα ελληνικά: Σπίτι.";
  }

  if (text.includes("uje") || text.includes("ujë")) {
    return "Në anglisht: Water. Στα ελληνικά: Νερό.";
  }

  if (text.includes("buk")) {
    return "Në anglisht: Bread. Στα ελληνικά: Ψωμί.";
  }

  if (text.includes("faleminderit")) {
    return "Në anglisht: Thank you. Στα ελληνικά: Ευχαριστώ.";
  }

  if (text.includes("miredita") || text.includes("mirëdita")) {
    return "Në anglisht: Good afternoon. Στα ελληνικά: Καλημέρα / Καλό μεσημέρι.";
  }

  if (text.includes("nata e mire") || text.includes("natën e mirë")) {
    return "Në anglisht: Good night. Στα ελληνικά: Καληνύχτα.";
  }

  if (text.includes("dua te mesoj") || text.includes("dua të mësoj")) {
    return "Shumë mirë. Mund të fillojmë me fjalë të thjeshta, fraza, ose dialog të shkurtër.";
  }

  return "Shkruaj një fjalë ose frazë në shqip και εγώ θα στη μεταφράσω σε anglisht ose greqisht.";
}

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Ky browser nuk mbështet text to speech.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-GB";
  speech.rate = 1;
  speech.pitch = 1;

  speech.onstart = function () {
    switchToTalking();
  };

  speech.onend = function () {
    switchToNormal();
  };

  speech.onerror = function () {
    switchToNormal();
  };

  window.speechSynthesis.speak(speech);
}

function sendMessage() {
  const userText = input.value.trim();

  if (!userText) return;

  addMessage("You", userText, "user");

  const reply = getReply(userText);
  lastReply = reply;

  addMessage("Drita AI", reply, "ai");

  input.value = "";

  speakText(reply);
}

function speakLast() {
  speakText(lastReply);
}

function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Ky browser nuk e mbështet voice recognition.");
    return;
  }

  setStatus("Gjendja: Duke dëgjuar...");

  const recognition = new SpeechRecognition();
  recognition.lang = "sq-AL";

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    input.value = text;
    setStatus("Gjendja: U dëgjua zëri.");
  };

  recognition.onerror = function () {
    setStatus("Gjendja: Gabim në mikrofon.");
  };

  recognition.onend = function () {
    if (!avatar.classList.contains("talking")) {
      setStatus("Gjendja: Duke pritur...");
    }
  };

  recognition.start();
}

function clearChat() {
  chat.innerHTML = `
    <div class="message ai">
      <span class="name">Drita AI</span>
      <p>Përshëndetje! Shkruaj një fjalë në shqip dhe unë do të të ndihmoj.</p>
    </div>
  `;

  lastReply = "Përshëndetje! Shkruaj një fjalë në shqip dhe unë do të të ndihmoj.";
  window.speechSynthesis.cancel();
  switchToNormal();
}