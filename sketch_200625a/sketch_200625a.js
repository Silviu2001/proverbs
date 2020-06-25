var txt ="A aduce apă după ce s-a stins focul A aduna nuiele pentru spinarea sa A ajunge cuțitul la os A auzit clopotul, dar nu știe de la ce bisericǎ A avea ac de cojocul cuiva A avea mai mult noroc decât minte A bate apa-n piuăA bate calul care trage A bate fierul cât e cald A bate la ochi A bate toba în tot satul A călca pe bec A cânta cuiva în strună A căra apă cu ciurul Aceași Mărie cu altă pălărie Acela care Îl iubește pe Dumnezeu, îi iubește și pe oameni A da bir cu fugiții A da peste noroc A da perle la porci A despica firul în patru A duce cu preșul Adevărul este întotdeauna la mijloc Adevărul se spune la despărțire Adevărul stă scris printre rânduri A dispărut de parcă l-a înghițit pământul A face bortă în apă A face cruce în tavan A face cuiva hatârul A face cum îl taie capul A face din cal măgar și din țânțar armăsar A face ochi dulci cuiva A face pe cineva cu ou și cu oțet A face pe cineva de două parale A face treaba în doi peri A face umbră pământului degeaba A face un bine înseamnă a-și bate cuie în talpă A fi cu ochii în patru A fi pe drojdie A fi prins cu cioara vopsită Ai ales pân-ai cules Ai carte, ai parte Ai, dai, n-ai  Ia nu da, să vezi cum ai A dat-o cotită A-i fi frică și de umbra sa A împăca capra cu varza A împușca doi iepuri dintr-un foc A pune carul înaintea boilor A turna gaz pe foc ";
var order = 1;
var ngrams = {};
var button;
var avoid = 0;
function setup() {
  noCanvas();

  for (var i = 0; i <= txt.length - order; i++) {
    var gram = txt.substring(i, i + order);

    if (!ngrams[gram]) {
      ngrams[gram] = [];
    }
    ngrams[gram].push(txt.charAt(i + order));
  }
  checkbox = createCheckbox('Avoid concatanated sentence', false);
  checkbox.changed(myCheckedEvent);
  checkbox.position(12,8);
  
  button = createButton('generate');
  button.position(50,100);
  button.mousePressed(markovIt);
  orderT = createDiv('order');
  orderT.position(15, 30);
  orderS = createSlider(0,6,3,1);
  orderS.position(60,30);
  
  lenT = createDiv('length');
  lenT.position(15, 60);
  lenS = createSlider(10,100,25,1);
  lenS.position(60,60);
  
  text = createDiv(ngrams);
  text.position(50, 130);
  //console.log(ngrams);
}

function markovIt() {
  if(order!=orderS.value())
  {
    order=orderS.value();
    for (var i = 0; i <= txt.length - order; i++) {
      var gram = txt.substring(i, i + order);

      if (!ngrams[gram]) {
        ngrams[gram] = [];
      }
      ngrams[gram].push(txt.charAt(i + order));
    }
  }
  var L=lenS.value();
  var currentGram = txt.substring(0, order);
  var result = currentGram;

  for (var j = 0; j < L; j++) {
    var possibilities = ngrams[currentGram];
    if (!possibilities) {
      break;
    }
    var next = random(possibilities);
    result += next;
    var len = result.length;
    currentGram = result.substring(len - order, len);
  }
  let words = split(result,'A');
  if(avoid){
    result="A "+words[1];
  }
  block = createDiv('<div style="height:200px;width:900px;"></div>');
  block.position(50,130);
  block.style('background-color',"#ffff");
  text = createDiv(result);
  text.style('font-size', '18px');
  text.position(50, 130);
  //createP(result);
}

function myCheckedEvent() {
  if (this.checked()) {
    avoid = 1;
  } else {
    avoid = 0;
  }
}
