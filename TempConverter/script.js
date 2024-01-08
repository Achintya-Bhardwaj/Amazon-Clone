

function convertToFahrenheit(celsius) {
  const Farenheit = (celsius * (9/5)) + 32;
  return Farenheit;
}

function convertToCelsius(farenheit){
  const Celsius = (farenheit - 32) * (5/9);
  return Celsius;
}

function convertTemperature(degrees, unit){
  if (unit === 'c' || unit === 'C'){
    console.log(convertToFahrenheit(degrees) + '° F');

  }else if  (unit === 'f' || unit === 'F'){
    console.log(convertToCelsius(degrees) + '° C');

  }else{
    console.log('invalid unit');
  }

}