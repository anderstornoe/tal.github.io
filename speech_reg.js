const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const synth = window.speechSynthesis;
var voices = synth.getVoices();
var language;
var pos_feedbackarray;
var pos2_feedbackarray;
var neg_feedbackarray;
var neg_feedbackarray2;
var neg_utterance1; 
var neg_utterance2; 

var content_title; 
var content_title2; 


function populateVoiceList() {
  console.log("populateVoiceList");
  if (typeof speechSynthesis === "undefined") {
    return;
  }
  const voices = speechSynthesis.getVoices();
  console.log ("got voices");
  const isDaDKVoiceAvailable = voices.find(voice => voice.lang === "da-DK");

if (isDaDKVoiceAvailable) {
  $(".lang").css("opacity", ".5");
  $(".da-DK").css("opacity", "1");
  console.log("da-DK voice is  available");
  language = "da-DK";
} else {
  $(".da-DK").hide();
  $(".lang").css("opacity", ".5");
  $(".en-GB").css("opacity", "1");
  language = "en-GB";
  console.log("da-DK voice is not available");
}

$(".go_container").css("opacity", "1");
  
  }

  const langElements = document.querySelectorAll('.lang');

  langElements.forEach(element => {
    element.addEventListener('click', function () {
      classlanguage = this.classList[1];
      console.log("Selected language: " + classlanguage);
      setLanguage(classlanguage);
      newQuestion();
    });
  });


function setLanguage(selectedLang) {
  
    console.log("setLanguage: " + selectedLang);
    $(".lang").css("opacity", ".5");
    if (selectedLang == "da-DK"){
      var utterance = new SpeechSynthesisUtterance('Lad os komme igang med at lære tallene');
      neg_utterance1 = "lad os prøve et nyt tal";
      neg_utterance2 = "Nej, lad os prøve et andet tal";

      content_title2 = "Tryk på knappen med øret for at starte. "; 
      content_title = "Lytter..."
      
      $(".da-DK").css("opacity", "1");
    }else if (selectedLang == "en-GB"){
      content_title = "Listening..."
      var utterance = new SpeechSynthesisUtterance('Lets get started learning numbers')
      neg_utterance1 = "lets try another number";
      neg_utterance2 = "Nope, lets try another number";
      content_title2 = "Press the button with your ear to start. ";
      

      $(".en-GB").css("opacity", "1");
    }else if(selectedLang == "it-IT"){
      $(".it-IT").css("opacity", "1");
      content_title = "Ascoltando..."
      content_title2 = "Premi il pulsante con l'orecchio per iniziare. ";
      var utterance = new SpeechSynthesisUtterance('Iniziamo a imparare i numeri');
      neg_utterance1 = "proviamo un altro numero";
      neg_utterance2 = "mi dispiace, proviamo un altro numero";
      
    }
    
    utterance.lang = selectedLang;
    window.speechSynthesis.speak(utterance);  

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
  if (language == 'da-DK'){
    var utterance = new SpeechSynthesisUtterance('Hved du hvad tallet hedder. Tryk på knappen med øret, og fortæl mig hvad tallet hedder.');
  } else if (language == 'en-GB'){
    var utterance = new SpeechSynthesisUtterance('Do you know what the number is called. Press the button with the ear, and tell me what it is called.');
  }else if (language == 'it-IT'){
    var utterance = new SpeechSynthesisUtterance('Saindo che il numero sia chiamato. Premi il pulsante per verificare.');
  }


  overlay.style.display = 'none';

  utterance.lang = language;
  //utterance.pitch = 1;
  utterance.rate = .8;
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
  $("#content_title").html(content_title);
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
  setTimeout(populateVoiceList, 1000);
  
});

//hints.innerHTML = 'Klik på ';
$(".lyt-btn").click(function () {
  if (listening == false) {
    recognition.start();
    startBlinking();
    listening = true;
    $("#content_title").html(content_title);
    console.log('Lyt knap trykket, recognition started');
  } else if (listening == true) {
    recognition.stop();
    stopBlinking();
    listening = false;
    $("#content_title").html(content_title2);
    check_results();
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
  $("#content_title").html(content_title2);


});



function newQuestion() {

  $("#content_title").html(content_title2);


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
  var uttering_number = uttering.replace(/[^\w\s]/g, '');
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

    if (randomNumber < 0.9) {
      // Do something if the random number is less than 0.5
      if (language =='da-DK') {
        var utterance = new SpeechSynthesisUtterance(pos_feed1 + "......... !! " + random_number + ' er et ' + pos_feed2 + 'svar!');
      } else if (language=='en-GB') {
      var utterance = new SpeechSynthesisUtterance(pos_feed1 + "......... !! " + random_number + ' is a   ' + pos_feed2 + 'result!');
      }else if (language=='it-IT') {
          var utterance = new SpeechSynthesisUtterance(pos_feed1 + "......... !! " + random_number + ' è una risposta ' + pos_feed2 + '!');
        }
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



      var utterance = new SpeechSynthesisUtterance(neg_feed1 + ", " + uttering + ", " + neg_feed2 + neg_utterance1);
      console.log("The random number is less than 0.5");
    } else {
      var utterance = new SpeechSynthesisUtterance(uttering + neg_utterance2); //+ neg_feed2);
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