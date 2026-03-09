let lastReply="Përshëndetje!";

function addMessage(sender,text){

let chat=document.getElementById("chat");

chat.innerHTML+=`<p><b>${sender}:</b> ${text}</p>`;

chat.scrollTop=chat.scrollHeight;

}

function sendMessage(){

let input=document.getElementById("input").value;

if(!input)return;

addMessage("You",input);

let text=input.toLowerCase();

let reply="";

if(text.includes("hello")||text.includes("pershendetje")){
reply="Hello! Në anglisht themi Hello.";
}

else if(text.includes("shtepi")||text.includes("shtëpi")){
reply="House = Shtëpi.";
}

else if(text.includes("uje")||text.includes("ujë")){
reply="Water = Ujë.";
}

else{
reply="Më pyet për një fjalë në shqip.";
}

addMessage("Drita AI",reply);

lastReply=reply;

document.getElementById("input").value="";

}

function speakLast(){

let speech=new SpeechSynthesisUtterance(lastReply);

speech.lang="en-US";

speechSynthesis.speak(speech);

}

function startVoice(){

let recognition=new webkitSpeechRecognition();

recognition.lang="sq-AL";

recognition.onresult=function(event){

let text=event.results[0][0].transcript;

document.getElementById("input").value=text;

};

recognition.start();

}