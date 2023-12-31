//configuration
const range_xy =  [document.getElementById("range_x"), document.getElementById("range_y")];
const value_xy = [document.getElementById("value_x"), document.getElementById("value_y")];
const sliderOption = {
  start: [1, 100],
  step: 1,
  margin: 0,
  connect: true,
  direction: "ltr",
  orientation: "horizontal",
  behavior: "tap-drag",
  tooltips: true,
  range: {
    "min": 1,
    "max": 100
  },
  format: {
    to: function(value){
      return Math.floor(Number(value));
    },
    from: function(value){
      return value;      
    }
  }
};
const min_xy = [];
const max_xy = [];
const quesNumField = document.getElementById("questionNumber");
const startButton = document.getElementById("startButton");

for(const range of range_xy) noUiSlider.create(range, sliderOption);
for(let i = 0;i < 2;i++){
  const xOryValue = ["xの値:", "yの値:"];
  range_xy[i].noUiSlider.on("update", function(values){
    min_xy[i] = values[0];
    max_xy[i] = values[1];
    value_xy[i].textContent = xOryValue[i]+min_xy[i]+"~"+max_xy[i];
  });
}

startButton.addEventListener("click", startQuestion);

//answer
const remainQuestion = { elem:document.getElementById("remainQuestion"), remain:-1 };
const questionDisplay = document.getElementById("questionDisplay");
const answerField = document.getElementById("answerField");
const answerButton = document.getElementById("answerButton");
const skipButton = document.getElementById("skipButton");
const finishButton = document.getElementById("finishButton");
let question_x, question_y;
let answerLoop;

answerField.disabled = true;
answerButton.disabled = true;
finishButton.disabled = true;
skipButton.disabled = true;
skipButton.addEventListener("click", ()=>{
  answerLog(question_x, question_y, -1, true);
  answerLoop.next();
});
finishButton.addEventListener("click", finishAnswer);

//status
const resultLog = document.getElementById("resultLog");

function startQuestion(){
  if(quesNumField.value == 0) return;

  controlConfiguration(false);
  controlAnswer(true);

  remainQuestion.remain = Number(quesNumField.value);
  createQuestion();
  answerLoop = answerLoopGen(quesNumField.value);
  answerButton.onclick = ()=>{
    answerField.focus();
    if(answerField.value == "") return;
    let ans = Number(answerField.value);
    answerField.value = "";
    answerLog(question_x, question_y, ans);
    if(question_x*question_y == ans) answerLoop.next();
  };
}

function controlConfiguration(boolean){
  if(boolean){
    for(const range of range_xy) range.noUiSlider.enable();
  }
  else {
    for(const range of range_xy) range.noUiSlider.disable();
  }
  quesNumField.disabled = !boolean;
  startButton.disabled = !boolean;
}

function controlAnswer(boolean){
  answerField.disabled = !boolean;
  answerButton.disabled = !boolean;
  finishButton.disabled = !boolean;
  skipButton.disabled = !boolean;
}

function uniformDist(min, max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function createQuestion(){
  remainQuestion.remain--;
  remainQuestion.elem.textContent = "残問題数:"+remainQuestion.remain;
  question_x = uniformDist(min_xy[0], max_xy[0]);
  question_y = uniformDist(min_xy[1], max_xy[1]);
  questionDisplay.textContent = question_x+"×"+question_y+"=";
  answerField.focus();
}

function clearAnswer(){
  questionDisplay.textContent = "x×y=";
  answerField.value = "";
  remainQuestion.elem.textContent = "残問題数:-";
}

function finishAnswer(){
  controlConfiguration(true);
  controlAnswer(false);
  clearAnswer();
}

function answerLog(x, y, ans, skip=false){
  let log;
  if(skip) log = "<p class='skipped'>"+x+"×"+y+"="+x*y+" スキップ";
  else if(x*y == ans) log = "<p class='correct'>"+x+"×"+y+"="+ans+" 正解";
  else log = "<p class='incorrect'>"+x+"×"+y+"≠"+ans+" 不正解";
  log += "</p>"
  resultLog.insertAdjacentHTML("afterbegin", log);
}

function* answerLoopGen(num){
  for(let i = 0;i < num-1;i++){
    createQuestion();
    yield;
  }
  controlConfiguration(true);
  controlAnswer(false);
  finishAnswer();
}