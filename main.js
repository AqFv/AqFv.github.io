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

for(const range of range_xy) noUiSlider.create(range, sliderOption);
for(let i = 0;i < 2;i++){
  const xOryValue = ["xの値:", "yの値:"];
  range_xy[i].noUiSlider.on("update", function(values){
    min_xy[i] = values[0];
    max_xy[i] = values[1];
    value_xy[i].textContent = xOryValue[i]+min_xy[i]+"~"+max_xy[i];
  });
}

startSubmit.addEventListener("click", startQuestion);

function startQuestion(){
  
}