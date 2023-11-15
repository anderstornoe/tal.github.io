const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList =
  window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent =
  window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

const synth = window.speechSynthesis;

var osName = navigator.platform;
var browserName = getBrowserName();

function getBrowserName() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") > -1) {
        return "Microsoft Edge";
      } else if (userAgent.indexOf("Firefox") > -1) {
        return "Mozilla Firefox";
      } else if (userAgent.indexOf("Chrome") > -1) {
        return "Google Chrome";
      } else if (userAgent.indexOf("Safari") > -1) {
        return "Apple Safari";
      } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
      } else if (userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
      } else {
        return "Unknown";
      }
  }

console.log("Current browser: " + browserName + ", osName: " + osName);

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
recognition.lang = 'da-DK';
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

speakButton.addEventListener('click', function() {
    const utterance = new SpeechSynthesisUtterance('Testing'); //Hved DU hvad tallet hedder. Tryk på lyt, så tjekker jeg det for dig.');
        overlay.style.display = 'none';

    utterance.lang = 'en-GB';
        utterance.pitch = 1;
        utterance.rate = .5;
    window.speechSynthesis.speak(utterance);

});

overlay.addEventListener('click', function(event) {
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

$("document").ready(function() {
    newQuestion();
    console.log("ready Man-o");
});

//hints.innerHTML = 'Klik på ';
$(".lyt-btn").click(function() {
    if (listening == false){
        recognition.start();
        startBlinking();
        listening = true;
        $("#content_title").html("Lytter...");
        console.log('Lyt knap trykket, recognition started');
    }else if(listening == true){
        recognition.abort();
        stopBlinking();
        listening = false;
        $("#content_title").html("Tryk på lytteknappen");
    }
});

$(".ok-btn").click(function() {
    newQuestion();
});

$(".btn-changenum").click(function() {
    recognition.abort();
    stopBlinking();
    newnum = parseInt($(this).attr("value"));
    console.log("btn-changenum: " +   newnum);
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

if (newnum ==1){
    $("#content_interactive").html(random_number);
}else{
tween_number(newnum);
}
        
    
}

function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    var random_rgba='rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + '0.6)';
console.log("random_rgba: " + random_rgba);
    return random_rgba;
}

recognition.onresult = function(event) {
    
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
        //updateCircleRadius();
        //updateTextContent();
        

        var pos_feedbackarray = ["Flot", "Super", "Du har lyttet efter i skolen", "Godt gået", "Du er klog", "Hvem skulle ha troet det?", "Du er en stjerne", "Jeg er stolt af dig", "Monster godt", "Mega flot", "Fantastisk", "Korrekt", "Perfekto", "Du styrer", "Godt klaret", "Super",   "Fremragende",
        "Fantastisk",
        "Fantastisk arbejde",
        "Imponerende",
        "Virkelig godt klaret",
        "Vidunderligt",
        "Du er en stjerne",
        "Strålende",
        "Du er utrolig",
        "Perfekt",
        "Du har gjort det igen",
        "Fortsæt det gode arbejde",
        "Exceptionelt",
        "Bravo",
        "Fremragende præstation",
        "Du er en mester",
        "Du er fantastisk",
        "Flot job",
        "Du rock",
        "Du er en sand professionel",
        "Du er en sand kunstner",
        "Du er uovertruffen",
        "Du er en fryd at arbejde med",
        "Du er en inspiration",
        "Du gør det hele så let",
        "Du er en god ven",
        "Du er en fantastisk lærer",
        "Du er en øjevækker",
        "Du er en inspiration for andre",
        "Du er en fantastisk kollega"]
        var pos2_feedbackarray = ["rigtigt", "korrekt", "passende", "sandt", "nøjagtigt", "fejlfrit", "godt", "præcist", "fabelagtigt", "udmærket"]

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
        

        utterance.lang = 'da-DK';
        utterance.pitch = 1;
        utterance.rate = .5;
        window.speechSynthesis.speak(utterance);


        $(".bgr").append("<div class='korrekt_nummer'>" + random_number + "</div>");

        $(".korrekt_nummer").eq($(".korrekt_nummer").length - 1).css("background-color", random_rgba());
        
    } else {
        var neg_feedbackarray = ["Sagde du virkelig", "Er du helt sikker på det er", "OK. Jeg hørte du sagde", "Jeg forstod det som", "Jeg lyttede mig frem til", "AHA!", "Nej dog", "Jeg undrer mig."]
        var neg_feedbackarray2 = ["Det er vist ikke helt rigtigt. Men jeg tager måske fejl.", "Det var ikke lige det nummer jeg tænkte på.", "Tæt på. Men ikke rigtigt vist.", "Det tror jeg er lidt forkert", "Prøv igen", "Jeg er ret sikker på det er forkert", "Jeg tænkte på noget andet"]


        var neg_feed1 = neg_feedbackarray[Math.floor(Math.random() * neg_feedbackarray.length)];
        var neg_feed2 = neg_feedbackarray2[Math.floor(Math.random() * neg_feedbackarray2.length)];

        const randomNumber = Math.random();

if (randomNumber < 0.5) {
    var utterance = new SpeechSynthesisUtterance(neg_feed1 + ", " + uttering + ", " + neg_feed2 + "lad os prøve et nyt tal");
  console.log("The random number is less than 0.5");
} else {
    var utterance = new SpeechSynthesisUtterance(uttering + "Nej, lad os prøve et andet tal"); //+ neg_feed2);
  console.log("The random number is greater than or equal to 0.5");
}
       
        
        
        
        utterance.lang = 'da-DK';
        utterance.pitch = 1;
        utterance.rate = .5;
        window.speechSynthesis.speak(utterance);

        $("#content_title").html("Computeren hørte: " + uttering);
        
    }

    utterance.onend = function(event) {
        console.log('Utterance has finished');
        newQuestion();
        // Call your function here
    }
    
}

recognition.onspeechend = function() {
    console.log('recognition.onspeechend');
    listening = false; 
    recognition.stop();
    stopBlinking();
}

/*recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}*/

recognition.onerror = function(event) {
    //diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
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