var view = document.querySelector('.window');
var pageList = document.querySelector('.page__list');
var ppp = document.querySelector('.ppp');
var startscreen  = document.querySelector('.startscreen');
var falseBtn = document.querySelector('.btn-false');
var trueBtn = document.querySelector('.btn-true');
var closeBtn = document.querySelector('.btn-close');
var page = document.querySelector('.page');
var tab = document.querySelector('.js-tab');
var start = document.querySelector('.start');
var content = document.querySelector('.content');

var dataIndexNow;
var questionCount = 1;

// Shufffel function
function shuffle(o){
  for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
  return o;
}

let dataNum = [];

for(key in data) {;
  dataNum.push(key);
};

shuffle(dataNum);

var dataLength = dataNum.length;

var show = function(dataItem) {
  var card;
  var questionContent = '<div id="question" class="question"  data-true="'+ data[dataNum[dataItem]].answer +'"><h3 class="question__title">ВОПРОС '+ questionCount +' <h3><p class="question__desc">'+ data[dataNum[dataItem]].question +'</p></div>';

  dataIndexNow = dataItem;
  ++questionCount;
  card = document.createElement('div');
  card.innerHTML = questionContent;

  view.appendChild(card);
};
show(0);

var container = document.querySelector( '.container-to-move' );
var question = document.getElementById( 'question' );
var targetFalse = document.querySelector( '.block-false' );
var targetTrue = document.querySelector('.block-true');
var thresholdValue = '4%';

var containerTop = container.getBoundingClientRect().top;
var containerLeft = container.getBoundingClientRect().left;

let answer = '';


/*- range -*/

var questionsRange = document.querySelector('.questionsRange');
noUiSlider.create(questionsRange, {
  start: 1,
  range: {
    'min' : 0,
    'max': dataLength
  }
});

/*-timer range-*/
var tooltipSlider = document.querySelector('.slider-tooltips');
var secunda =  + tooltipSlider.getAttribute('data-timer');

var timer = new Timer();

timer.addEventListener('secondsUpdated', function (e) {
  var secundaVal = timer.getTotalTimeValues().seconds;

  tooltipSlider.noUiSlider.set(secundaVal);
  if(secundaVal == 0){
    init.showResult();
  }
});

/*- range -*/

var init = {
  countThis: function(el){
    var valr = ++el.textContent;
    var text = el.textContent;
    el.textContent.replace(text, valr);

    swipeCount = ++swipeCount;
  },
  checkAnswer: function () {
    var question = document.getElementById( 'question' );
    var $data = question.getAttribute('data-true');
    console.log(swipeCount);

    if(swipeCount <= 0){
      init.clearPageList();
    }

    if($data == answer) {
      init.countThis(targetTrue);
      startscreen.classList.add('is-true');
      setTimeout(function() {
        startscreen.classList.remove('is-true');
      }, 400);

      var questionContent = '<div  class="question is-true" ><h3 class="question__title">Верно </h3><p class="question__desc">'+ data[dataNum[dataIndexNow]].desc +'</p></div>';

      var listContent = '<div class="page__list_question"><p class="question__desc">'+ data[dataNum[dataIndexNow]].question +'</p><p class="question__desc"><strong>Правильный ответ: </strong> '+ data[dataNum[dataIndexNow]].desc +'</p></div>';


      var li = document.createElement('li');
      li.className = 'page__list_row is-true';
      li.innerHTML = listContent;

      pageList.appendChild(li);

    } else {

      init.countThis(targetFalse);
      startscreen.classList.add('is-false');
      setTimeout(function() {
        startscreen.classList.remove('is-false');
      }, 400);

      var questionContent = '<div  class="question is-false" ><h3 class="question__title">Ошибка </h3><p class="question__desc">'+ data[dataNum[dataIndexNow]].desc +'</p></div>';
      var listContent = '<div class="page__list_question"><p class="question__desc">'+ data[dataNum[dataIndexNow]].question +'</p><p class="question__desc"><strong>Правильный ответ: </strong> '+ data[dataNum[dataIndexNow]].desc +'</p></div>';

      var li = document.createElement('li');
      li.className = 'page__list_row is-false';
      li.innerHTML = listContent;
      pageList.appendChild(li);
    }
  },
  showResult: function () {
    var rightAnswers  = targetTrue.textContent;
    var finalMessage = document.createElement('div');
    var buttons = document.querySelector('.buttons');

    finalMessage.className = 'final';
    var finalContent;

    if(rightAnswers < 6 ){
      finalContent = '<h4 class="final__title">Верных ответов: '+ rightAnswers +'</h4><p class="final__desc">Увы, о Днестре вам мало что известно. Но не беда, пройдите игру еще разок и многое для себя узнаете. Еще стоит почитать статьи о Днестре на сайте NM </p> ';
    } else if(rightAnswers < 12) {
      finalContent = '<h4 class="final__title">Верных ответов: '+ rightAnswers +'</h4><p class="final__desc">Знания стоит освежить. Это несложно - поиграйте еще раз и многое узнаете о Днестре. </p> ';
    } else if(rightAnswers < 18) {
      finalContent = '<h4 class="final__title">Верных ответов: '+ rightAnswers +'</h4><p class="final__desc">Неплохо. Ваши знания о Днестре достойны уважения. Если сыграете еще раз, точно ответите на большее число вопросов.</p> ';
    } else if(rightAnswers < 24) {
      finalContent = '<h4 class="final__title">Верных ответов: '+ rightAnswers +'</h4><p class="final__desc">Отличный результат! Вероятно, вы увлекатетесь экологией и не понаслышке знаете о водных ресурсах Молдовы. А, может, вы живете на берегу Днестра. В любом случае вы значительно больше многих знаете о Днестре.</p> ';
    } else {
      finalContent = '<h4 class="final__title">Верных ответов: '+ rightAnswers +'</h4><p class="final__desc">Поздравляем! Вы переплыли Днестр!</p> ';
    }

    init.clearAnswer();
    finalMessage.innerHTML = finalContent;
    view.appendChild(finalMessage);

    var btn = document.createElement('button');
    btn.className = 'btn btn-show js-ppp';
    btn.innerHTML = 'Посмотреть свои ответы';
    buttons.innerHTML = '';
    buttons.appendChild(btn);

    var btnRestart = document.createElement('button');
    btnRestart.className = 'btn btn-restart js-restart';
    btnRestart.innerHTML = 'Повторить игру';
    buttons.appendChild(btnRestart);

    var showBtn = document.querySelector('.btn-show');
    var restartBtn = document.querySelector('.btn-restart');
    var pageList = document.querySelector('.page__list');

    showBtn.addEventListener('click', function(){
      ppp.classList.add('is-active');
      scrollToSmoothly(content, 600);
      // page.classList.add('is-fixed');
    });

    restartBtn.addEventListener('click', function(){
      window.location.reload();
    });
  },
  showNewAnswer: function () {
    // console.log(swipeCount);
    if(swipeCount == dataLength  ) {
      init.showResult();
    } else {
      show(swipeCount);
      init.threshhold();
    }
  },
  clearAnswer: function () {
    view.innerHTML = '';
  },
  startPosition: function () {
    TweenLite.set(question, {clearProps:"all"});
  },
  clearPageList: function() {
    pageList.innerHTML = ' ' ;
  },
  threshhold: function () {
    var question = document.getElementById( 'question' );
    var containerTop = container.getBoundingClientRect().top;
    var containerLeft = container.getBoundingClientRect().left;

    var falseElLeft = Math.floor( targetFalse.getBoundingClientRect().left - 1 ) - containerLeft * 2;
    var trueElLeft = Math.floor( targetTrue.getBoundingClientRect().left - 1 ) ;
    var questionElLeft = Math.floor( question.getBoundingClientRect().left - 1 ) - containerLeft;

    var offsetFalse = falseElLeft - questionElLeft;
    var offsetTrue = trueElLeft - questionElLeft ;

    Draggable.create( question, {
      type: 'x',
      bounds: container,
      onDragEnd: function () {
        if (this.hitTest(targetFalse, thresholdValue) ) {
          TweenMax.to(this.target, 1, {
            x: offsetFalse + 'px',
            rotation: "-=10",
            backgroundColor: '#333',
            ease: Elastic.easeOut
          });

          answer = 'false';
          // init.countThis(targetFalse);
          init.checkAnswer();
          init.clearAnswer();
          init.showNewAnswer();
          questionsRange.noUiSlider.set(questionCount - 1);

        } else if ( this.hitTest(targetTrue, thresholdValue) ) {
           TweenMax.to(this.target, 1, {
            x: offsetTrue + 'px',
            rotation: "+=10",
            backgroundColor: '#693',
            ease: Elastic.easeOut
          });

          answer = 'true';
          // init.countThis(targetTrue);
          init.checkAnswer();
          init.clearAnswer();
          init.showNewAnswer();
          questionsRange.noUiSlider.set(questionCount - 1);

         } else {

          init.startPosition();

        }
      },
    });
  },
  drugFalse: function () {
    var question = document.getElementById( 'question' );
    var buttons = document.querySelector('.buttons');
     answer = 'false';

     // init.checkTotal();

    buttons.classList.add('click-disabled');

    TweenMax.to(question, .3, {
      x: -600 + 'px',
      rotation: "-=10",
      onComplete: function () {
        init.checkAnswer();
        init.clearAnswer();
        init.showNewAnswer();
        // init.threshhold();
        // init.checkTotal();
      }
    });

    buttons.classList.remove('click-disabled');

  },
  drugTrue: function () {
    var question = document.getElementById( 'question' );
    var buttons = document.querySelector('.buttons');
    answer = 'true';

    // init.checkTotal();

    buttons.classList.add('click-disabled');

    TweenMax.to(question, .3, {
      x: 600 + 'px',
      rotation: "+=10",
      onComplete: function () {
        init.checkAnswer();
        init.clearAnswer();
        init.showNewAnswer();
        // init.threshhold();
      }
    });
    buttons.classList.remove('click-disabled');

  },
  checkTotal: function() {
    if(swipeCount == dataLength  ) {
      var rightAnswers  = targetTrue.textContent;
      var finalMessage = document.createElement('div');
      finalMessage.className = 'final';
      var finalContent;
      finalMessage.className = 'final';

      if(rightAnswers < 6 ){
        finalContent = ' меньше 6';
      } else if(rightAnswers < 12) {
        finalContent = ' меньше 12';
      } else if(rightAnswers < 18) {
        finalContent = ' меньше 18';
      } else if(rightAnswers < 24) {
        finalContent = ' меньше 18';
      } else {
        finalContent = ' 24 b 25';
      }

      init.clearAnswer();
      finalMessage.innerHTML = finalContent;
      view.appendChild(finalMessage);
    }
  }
};




let swipeCount = +'0';

function scrollToSmoothly(el) {
  el.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
  });
}

init.threshhold();


falseBtn.addEventListener('click', function(){
  init.drugFalse();
  questionsRange.noUiSlider.set(questionCount - 1);
});

trueBtn.addEventListener('click', function(){
  init.drugTrue();
  questionsRange.noUiSlider.set(questionCount - 1);
});

closeBtn.addEventListener('click', function(){
  ppp.classList.remove('is-active');
});

tab.addEventListener('click', function(){
  content.classList.add('is-active');
  start.classList.add('is-hidden');

  timer.start({countdown: true, startValues: {seconds: secunda}, precision: 'seconds'});

  noUiSlider.create(tooltipSlider, {
    start: 0,
    tooltips: [wNumb({decimals: 0})],
    range: {
        'min': 0,
        'max': secunda
    }
  });

});



