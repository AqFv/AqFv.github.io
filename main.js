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
const numOfQuesField = document.getElementById("numOfQuestion");
const startSubmit = document.getElementById("startSubmit");

//answer
const questionDisplay = document.createElement("label");
const answerField = document.createElement("input");
const answerSubmit = document.createElement("input");

for(const range of range_xy) noUiSlider.create(range, sliderOption);
for(let i = 0;i < 2;i++){
  const xOryValue = ["xの値:", "yの値:"];
  range_xy[i].noUiSlider.on("update", function(values){
    min_xy[i] = values[0];
    max_xy[i] = values[1];
    value_xy[i].textContent = xOryValue[i]+min_xy[i]+"~"+max_xy[i];
  });
}

questionDisplay.setAttribute("for", "answerField");
answerField.setAttribute("id", "answerField");
answerField.setAttribute("type", "number");
answerSubmit.setAttribute("type", "submit");
answerSubmit.setAttribute("value", "解答");

startSubmit.addEventListener("click", startQuestion);

function startQuestion(){
  if(numOfQuesField.value === "") return;

  controlConfiguration(false);

}

function controlConfiguration(boolean){
  if(boolean){
    for(const range of range_xy) range.noUiSlider.enable();
  }
  else {
    for(const range of range_xy) range.noUiSlider.disable();
  }
  numOfQuesField.disable = !boolean;
  startSubmit.disable = !boolean;
}

function uniformDist(min, max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

function createQuestion(){
  let x = uniformDist(min_xy[0], max_xy[0]);
  let y = uniformDist(min_xy[1], max_xy[1]);
  questionDisplay.textContent = x+"×"+y+"=";
  return [x, y];
}