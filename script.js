const avatar = document.getElementById("avatar");
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const statusText = document.getElementById("status");
const lessonInfo = document.getElementById("lessonInfo");

const normalAvatar = "avatar.gif";
const talkingAvatar = "voice.gif";

let currentLevel = "";
let currentLesson = "";
let lessonStep = 0;
let lastReply = "Përshëndetje! Unë jam Drita dhe do të të mësoj greqisht.";

const lessons = {
  A1: {
    alphabet: [
      "Mësimi A1 - Alfabeti grek. Shkronjat e para janë: Α, Β, Γ, Δ, Ε.",
      "Vazhdojmë me alfabetin grek: Ζ, Η, Θ, Ι, Κ, Λ.",
      "Më tej: Μ, Ν, Ξ, Ο, Π, Ρ.",
      "Fundi i alfabetit grek: Σ, Τ, Υ, Φ, Χ, Ψ, Ω.",
      "Ushtrim: Si quhet shkronja Α në greqisht? Quhet alfa."
    ],
    greetings: [
      "Mësimi A1 - Përshëndetje në greqisht. Γεια σου do të thotë përshëndetje. Καλημέρα do të thotë mirëmëngjes. Καληνύχτα do të thotë natën e mirë.",
      "Ushtrim: Si themi mirëmëngjes në greqisht? Themi Καλημέρα."
    ],
    colors: [
      "Mësimi A1 - Ngjyrat. Κόκκινο do të thotë e kuqe. Μπλε do të thotë blu. Πράσινο do të thotë jeshile.",
      "Vazhdojmë: Κίτρινο do të thotë e verdhë. Άσπρο do të thotë e bardhë. Μαύρο do të thotë e zezë.",
      "Ushtrim: Si themi blu në greqisht? Themi Μπλε."
    ],
    vowels: [
      "Mësimi A1 - Zanoret në greqisht janë: α, ε, η, ι, ο, υ, ω.",
      "Ushtrim: Sa zanore ka gjuha greke? Ka shtatë zanore bazë."
    ],
    verbs: [
      "Mësimi A1 - Folje bazë. Πάω do të thotë shkoj. Έρχομαι do të thotë vij. Τρώω do të thotë ha. Πίνω do të thotë pi.",
      "Vazhdojmë: Βλέπω do të thotë shoh. Μιλάω do të thotë flas. Γράφω do të thotë shkruaj.",
      "Ushtrim: Si themi ha në greqisht? Themi Τρώω."
    ],
    family: [
      "Mësimi A1 - Familja. Μητέρα do të thotë nënë. Πατέρας do të thotë baba. Αδερφός do të thotë vëlla. Αδερφή do të thotë motër.",
      "Vazhdojmë: Γιος do të thotë djalë. Κόρη do të thotë vajzë. Οικογένεια do të thotë familje.",
      "Ushtrim: Si themi baba në greqisht? Themi Πατέρας."
    ],
    friends: [
      "Mësimi A1 - Miqtë. Φίλος do të thotë mik mashkull. Φίλη do të thotë mike femër.",
      "Ushtrim: Si themi mik në greqisht? Themi Φίλος."
    ]
  },
  A2: {
    intro: [
      "Mësimi A2. Këtu mësojmë fjali të shkurtra, pyetje të thjeshta dhe biseda të përditshme në greqisht."
    ]
  },
  B1: {
    intro: [
      "Mësimi B1. Këtu kalojmë në fjali më të gjata, kohë foljesh dhe komunikim më të natyrshëm në greqisht."
    ]
  },
  B2: {
    intro: [
      "Mësimi B2. Këtu mësojmë të flasim më rrjedhshëm, me më shumë saktësi dhe fjalor më të pasur në greqisht."
    ]
  }
};

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
  setStatus("Gjendja: Gati për të dëgjuar");
}

function switchToTalking() {
  avatar.src = talkingAvatar;
  avatar.classList.add("talking");
  setStatus("Gjendja: Po flet");
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

function speakText(text) {
  if (!("speechSynthesis" in window)) {
    alert("Ky browser nuk mbështet zë.");
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "sq-AL";
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

function speakAndShow(text) {
  lastReply = text;
  addMessage("Drita AI", text, "ai");
  speakText(text);
}

function startLesson(level) {
  currentLevel = level;
  lessonStep = 0;

  if (level === "A1") {
    currentLesson = "alphabet";
    lessonInfo.textContent = "Mësimi: A1 - Alfabeti grek";
    speakAndShow("Po fillojmë me nivelin A1. Tema e parë është alfabeti grek.");
    setTimeout(() => {
      playCurrentLessonStep();
    }, 1200);
    return;
  }

  currentLesson = "intro";
  lessonInfo.textContent = `Mësimi: ${level}`;
  playCurrentLessonStep();
}

function playCurrentLessonStep() {
  if (!currentLevel || !currentLesson) return;

  const pack = lessons[currentLevel];
  if (!pack || !pack[currentLesson]) return;

  const items = pack[currentLesson];

  if (lessonStep >= items.length) {
    speakAndShow("Kjo pjesë mbaroi. Thuaj vazhdo që të shkojmë më tej.");
    return;
  }

  const text = items[lessonStep];
  lastReply = text;
  addMessage("Drita AI", text, "ai");
  speakText(text);
  lessonStep++;
}

function nextA1Lesson() {
  if (currentLevel !== "A1") return;

  const order = ["alphabet", "greetings", "colors", "vowels", "verbs", "family", "friends"];
  const currentIndex = order.indexOf(currentLesson);

  if (currentIndex === -1 || currentIndex === order.length - 1) {
    lessonInfo.textContent = "Mësimi: A1 - U përfundua";
    speakAndShow("Shumë mirë. Mbaruam paketën bazë A1 në greqisht.");
    return;
  }

  currentLesson = order[currentIndex + 1];
  lessonStep = 0;

  const names = {
    alphabet: "Alfabeti grek",
    greetings: "Përshëndetjet",
    colors: "Ngjyrat",
    vowels: "Zanoret",
    verbs: "Foljet bazë",
    family: "Familja",
    friends: "Miqtë"
  };

  lessonInfo.textContent = `Mësimi: A1 - ${names[currentLesson]}`;
  speakAndShow(`Po kalojmë në temën tjetër: ${names[currentLesson]}.`);
  setTimeout(() => {
    playCurrentLessonStep();
  }, 1000);
}

function isGreeting(text) {
  const greetings = [
    "pershendetje",
    "përshëndetje",
    "miredita",
    "mirëdita",
    "mirëmbrëma",
    "mirembrama",
    "tungjatjeta",
    "hello",
    "hi"
  ];

  return greetings.some(word => text.includes(word));
}

function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  addMessage("Ti", userText, "user");

  const text = userText.toLowerCase().trim();

  if (isGreeting(text)) {
    const reply = "Përshëndetje! Mirë se erdhe në mësim. A do të fillojmë greqishten sot?";
    lastReply = reply;
    addMessage("Drita AI", reply, "ai");
    input.value = "";
    speakText(reply);
    return;
  }

  if (text === "a1" || text.includes("niveli a1")) {
    input.value = "";
    startLesson("A1");
    return;
  }

  if (text === "a2" || text.includes("niveli a2")) {
    input.value = "";
    startLesson("A2");
    return;
  }

  if (text === "b1" || text.includes("niveli b1")) {
    input.value = "";
    startLesson("B1");
    return;
  }

  if (text === "b2" || text.includes("niveli b2")) {
    input.value = "";
    startLesson("B2");
    return;
  }

  if (
    text.includes("dua mesim") ||
    text.includes("dua mësim") ||
    text.includes("fillo mesimin") ||
    text.includes("fillo mësimin") ||
    text.includes("mesim") ||
    text.includes("mësim")
  ) {
    if (!currentLevel) {
      const reply = "Zgjidh një nivel: A1, A2, B1 ose B2.";
      lastReply = reply;
      addMessage("Drita AI", reply, "ai");
      input.value = "";
      speakText(reply);
      return;
    }

    const reply = `Po fillojmë mësimin ${currentLevel}.`;
    lastReply = reply;
    addMessage("Drita AI", reply, "ai");
    input.value = "";
    speakText(reply);

    setTimeout(() => {
      playCurrentLessonStep();
    }, 1000);
    return;
  }

  if (text.includes("vazhdo") || text.includes("continue") || text.includes("next")) {
    input.value = "";

    if (currentLevel === "A1") {
      const pack = lessons[currentLevel][currentLesson];
      if (lessonStep < pack.length) {
        playCurrentLessonStep();
      } else {
        nextA1Lesson();
      }
      return;
    }

    playCurrentLessonStep();
    return;
  }

  if (text.includes("alfabet") || text.includes("alphabet")) {
    currentLevel = "A1";
    currentLesson = "alphabet";
    lessonStep = 0;
    lessonInfo.textContent = "Mësimi: A1 - Alfabeti grek";
    input.value = "";
    playCurrentLessonStep();
    return;
  }

  if (text.includes("ngjyra") || text.includes("colors")) {
    currentLevel = "A1";
    currentLesson = "colors";
    lessonStep = 0;
    lessonInfo.textContent = "Mësimi: A1 - Ngjyrat";
    input.value = "";
    playCurrentLessonStep();
    return;
  }

  if (text.includes("familj") || text.includes("family")) {
    currentLevel = "A1";
    currentLesson = "family";
    lessonStep = 0;
    lessonInfo.textContent = "Mësimi: A1 - Familja";
    input.value = "";
    playCurrentLessonStep();
    return;
  }

  if (text.includes("miq") || text.includes("shok") || text.includes("friends")) {
    currentLevel = "A1";
    currentLesson = "friends";
    lessonStep = 0;
    lessonInfo.textContent = "Mësimi: A1 - Miqtë";
    input.value = "";
    playCurrentLessonStep();
    return;
  }

  if (text.includes("pershendetje ne greqisht") || text.includes("si thuhet pershendetje ne greqisht")) {
    const reply = "Në greqisht përshëndetje themi: Γεια σου.";
    lastReply = reply;
    addMessage("Drita AI", reply, "ai");
    input.value = "";
    speakText(reply);
    return;
  }

  if (text.includes("si thuhet baba ne greqisht")) {
    const reply = "Baba në greqisht thuhet: Πατέρας.";
    lastReply = reply;
    addMessage("Drita AI", reply, "ai");
    input.value = "";
    speakText(reply);
    return;
  }

  if (text.includes("si thuhet nene ne greqisht") || text.includes("si thuhet nënë ne greqisht")) {
    const reply = "Nënë në greqisht thuhet: Μητέρα.";
    lastReply = reply;
    addMessage("Drita AI", reply, "ai");
    input.value = "";
    speakText(reply);
    return;
  }

  const reply = "Mund të më thuash: dua mësim, A1, vazhdo, alfabeti, ngjyrat, familja, miqtë, ose të më pyesësh si thuhet një fjalë në greqisht.";
  lastReply = reply;
  addMessage("Drita AI", reply, "ai");
  input.value = "";
  speakText(reply);
}

function speakLast() {
  speakText(lastReply);
}

function startVoice() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Ky browser nuk mbështet njohje të zërit.");
    return;
  }

  setStatus("Gjendja: Po dëgjon");

  const recognition = new SpeechRecognition();
  recognition.lang = "sq-AL";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = function (event) {
    const text = event.results[0][0].transcript;
    input.value = text;
    sendMessage();
  };

  recognition.onerror = function () {
    setStatus("Gjendja: Problem me mikrofonin");
  };

  recognition.onend = function () {
    if (!avatar.classList.contains("talking")) {
      setStatus("Gjendja: Gati për të dëgjuar");
    }
  };

  recognition.start();
}

function clearChat() {
  chat.innerHTML = `
    <div class="message ai">
      <span class="name">Drita AI</span>
      <p>Përshëndetje! Unë jam Drita. Do të të mësoj greqisht hap pas hapi. Thuaj “dua mësim” ose zgjidh një nivel.</p>
    </div>
  `;
  lastReply = "Përshëndetje! Unë jam Drita dhe do të të mësoj greqisht.";
  currentLevel = "";
  currentLesson = "";
  lessonStep = 0;
  lessonInfo.textContent = "Mësimi: Asnjë mësim aktiv";
  window.speechSynthesis.cancel();
  switchToNormal();
}
