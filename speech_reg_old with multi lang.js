const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const synth = window.speechSynthesis;
var voices = synth.getVoices();
var language = 'en-GB';
var pos_feedbackarray;
var pos2_feedbackarray;
var neg_feedbackarray;
var neg_feedbackarray2;

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  const voices = speechSynthesis.getVoices();

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;
    console.log("Lang found: " + voices[i].lang);

    if (voices[i].default) {
      option.textContent += " — DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    document.getElementById("voiceSelect").appendChild(option);
  }

  
}

const langElements = document.querySelectorAll('.lang');

langElements.forEach(element => {
  element.addEventListener('click', function () {
    classlanguage = this.classList[1];
    console.log("Selected language: " + classlanguage);
    setLanguage(classlanguage);
  });
});

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

document.getElementById("voiceSelect").addEventListener("change", function () {
  setLanguage();
  newQuestion();
});

function setLanguage(selectedLang) {
  if (arguments.length > 0) {
    console.log("setLanguage: " + selectedLang);
    var utterance = new SpeechSynthesisUtterance('Lets get started');
    utterance.lang = selectedLang;
    window.speechSynthesis.speak(utterance);
  } else {
    var selectedOption = document.getElementById("voiceSelect").value;
    var selectedLang = selectedOption.split(" (")[1].slice(0, -1);
    console.log("Selected voice: " + selectedOption + "Selected lang: " + selectedLang);
    
  }

  console.log("selectedLang: " + selectedLang);
    language = selectedLang;
    recognition.lang = language;
    
    if (selectedLang == 'da-DK'){
      pos_feedbackarray = pos_feedbackarray_da;  
      pos2_feedbackarray = pos2_feedbackarray_da;
      neg_feedbackarray = neg_feedbackarray_da;
      neg_feedbackarray2 = neg_feedbackarray2_da;
  
      
    }else if (selectedLang == 'it-IT'){
      pos_feedbackarray = pos_feedbackarray_it;  
      pos2_feedbackarray = pos2_feedbackarray_it;
      neg_feedbackarray = neg_feedbackarray_it;
      neg_feedbackarray2 = neg_feedbackarray2_it;

    }else if (selectedLang == 'en-GB'){
      pos_feedbackarray = pos_feedbackarray_en;  
      pos2_feedbackarray = pos2_feedbackarray_en;
      neg_feedbackarray = neg_feedbackarray_en;
      neg_feedbackarray2 = neg_feedbackarray2_en;
      
    }
    
  // Use the selectedLang variable to set the language wherever you need it

  // Examle:
  // speechSynthesisUtterance.lang = selectedLang;
}

var score = 0;
//media.webspeech.recognition.enable;
//var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
//var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
//var speechRecognitionList = new window.SpeechGrammarList();

var utterance;

//speechRecognitionList.addFromString(grammar, 1);
//recognition.grammars = speechRecognitionList;
//recognition.continuous = false;

recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
//var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var random_number;

var newnum = 10;

var listening = false;

const overlay = document.getElementById('overlay');
const speakButton = document.getElementById('speak-button');

speakButton.addEventListener('click', function () {
  const utterance = new SpeechSynthesisUtterance('Lets get started'); //Hved DU hvad tallet hedder. Tryk på lyt, så tjekker jeg det for dig.');

  overlay.style.display = 'none';

  utterance.lang = language;
  //utterance.pitch = 1;
  //utterance.rate = .5;
  window.speechSynthesis.speak(utterance);

});

overlay.addEventListener('click', function (event) {
  if (event.target === overlay) {
    overlay.style.display = 'none';
  }
});



/*var colorHTML= '';
colors.forEach(function(v, i, a){
  console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});*/

let blinkInterval;

function startBlinking() {
  $("#content_title").html("Lytter...");
  blinkInterval = setInterval(() => {
    $('.lyt-btn').toggleClass('blink');
  }, 500);
}

function stopBlinking() {
  clearInterval(blinkInterval);
  $('.lyt-btn').removeClass('blink');
}

$("document").ready(function () {
  newQuestion();
  console.log("ready Man-o");
});

//hints.innerHTML = 'Klik på ';
$(".lyt-btn").click(function () {
  if (listening == false) {
    recognition.start();
    startBlinking();
    listening = true;
    $("#content_title").html("Lytter...");
    console.log('Lyt knap trykket, recognition started');
  } else if (listening == true) {
    recognition.abort();
    stopBlinking();
    listening = false;
    $("#content_title").html("Tryk på lytteknappen");
  }
});

$(".ok-btn").click(function () {
  newQuestion();
});

$(".btn-changenum").click(function () {
  recognition.abort();
  stopBlinking();
  newnum = parseInt($(this).attr("value"));
  console.log("btn-changenum: " + newnum);
  newQuestion();
  $("#content_title").html("Tryk på Lyt for at svare.");


});



function newQuestion() {

  $("#content_title").html("Tryk på Lyt-knappen for at svare.");


  if (newnum == 1) {
    random_number = Math.floor(1 + Math.random() * 9);
  } else if (newnum == 10) {
    random_number = Math.floor(10 + Math.random() * 90);
  } else if (newnum == 100) {
    random_number = Math.floor(100 + Math.random() * 900);
  } else if (newnum == 1000) {
    random_number = Math.floor(1000 + Math.random() * 9000);
  } else if (newnum == 10000) {
    random_number = Math.floor(10000 + Math.random() * 90000);
  }

  if (newnum == 1) {
    $("#content_interactive").html(random_number);
  } else {
    tween_number(newnum);
  }


}

function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  var random_rgba = 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + '0.6)';
  console.log("random_rgba: " + random_rgba);
  return random_rgba;
}

recognition.onresult = function (event) {
  check_results();
}

function check_results() {

  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var uttering = event.results[last][0].transcript;
  var uttering_number = uttering.match(/\d+/g);
  console.log("onresult: " + uttering + "uttering_number: " + uttering_number);
  //diagnostic.textContent = 'Jeg hørte du sagde: ' + uttering + '.';
  //bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);

  random_number = random_number.toString();

  console.log("Uttering: " + uttering + "random_number: " + random_number);


  if (uttering_number == random_number) {
    score++;
    var pos_feed1 = pos_feedbackarray[Math.floor(Math.random() * pos_feedbackarray.length)];
    var pos_feed2 = pos2_feedbackarray[Math.floor(Math.random() * pos2_feedbackarray.length)];

    const randomNumber = Math.random();

    if (randomNumber < 0.3) {
      // Do something if the random number is less than 0.5
      var utterance = new SpeechSynthesisUtterance(pos_feed1 + "......... !! " + random_number + ' er et ' + pos_feed2 + 'svar!');

      console.log("The random number is less than 0.5");
    } else {
      // Do something else if the random number is greater than or equal to 0.5
      var utterance = new SpeechSynthesisUtterance(pos_feed1); // + "......... !! " + random_number + ' er et ' + pos_feed2 + 'svar!');

      console.log("The random number is greater than or equal to 0.5");
    }

    utterance.lang = language;
    window.speechSynthesis.speak(utterance);


    $(".bgr").append("<div class='korrekt_nummer'>" + random_number + "</div>");

    $(".korrekt_nummer").eq($(".korrekt_nummer").length - 1).css("background-color", random_rgba());

  } else {
  

    var neg_feed1 = neg_feedbackarray[Math.floor(Math.random() * neg_feedbackarray.length)];
    var neg_feed2 = neg_feedbackarray2[Math.floor(Math.random() * neg_feedbackarray2.length)];

    const randomNumber = Math.random();

    if (randomNumber < 0.9) {
      var utterance = new SpeechSynthesisUtterance(neg_feed1 + ", " + uttering + ", " + neg_feed2 + "lad os prøve et nyt tal");
      console.log("The random number is less than 0.5");
    } else {
      var utterance = new SpeechSynthesisUtterance(uttering + "Nej, lad os prøve et andet tal"); //+ neg_feed2);
      console.log("The random number is greater than or equal to 0.5");
    }




    utterance.lang = language;
    window.speechSynthesis.speak(utterance);

    $("#content_title").html("Computeren hørte: " + uttering);

  }

  utterance.onend = function (event) {
    console.log('Utterance has finished');
    newQuestion();
    // Call your function here
  }

}

recognition.onspeechend = function () {
  console.log('recognition.onspeechend');
  listening = false;
  recognition.stop();
  stopBlinking();
}

/*recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}*/

recognition.onerror = function (event) {
  console.log('Error occurred in recognition: ' + event.error);
}

function tween_number(newnum) {
  //alert("newnum" + newnum);
  var i = 0,
    howManyTimes = random_number;

  i = random_number - newnum; // + i;
  console.log("i: " + i);
  function f() {
    $("#content_interactive").html(i);
    i = i + newnum / 5;
    if (i <= howManyTimes) {
      setTimeout(f, 20);

    }
  }
  f();
  console.log("Tweened number");

}

/*function updateCircleRadius() {
    const circle = document.querySelector('.circle');
    const radius = 20 + score * 5;
    circle.setAttribute('r', radius);
  }

  function updateTextContent() {
    const text = document.querySelector('.text');
    const fontSize = 16 + score * 2;
      text.style.fontSize = `${fontSize}px`;
    text.textContent = "Svar: " + score;
  }

  */