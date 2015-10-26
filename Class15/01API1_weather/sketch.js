var weather;

var baseurl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var appid = '&APPID=7bbbb47522848e8b9c26ba35c226c734';
var city = 'London,UK';

function preload() {
  var url = baseurl+city+appid;
  weather = loadJSON(url);
}

function setup() {
  noLoop();
  console.log(weather.main);
}

function draw() {
  background(255);
  // get the humidity value out of the loaded JSON
  var humidity = weather.main.humidity;
  fill(humidity); // use the humidity value to set the alpha
  ellipse(width/2, height/2, 50, 50);
}