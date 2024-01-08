const txtBox = document.querySelector('.txt-box');
const submitBut = document.querySelector('.submitBut');
const displayName = document.querySelector('.displayName');
const autoDisplayTextBox = document.querySelector('.autoDisplayTextBox');
const autoDisplayPara = document.querySelector('.autoDisplayPara');

submitBut.addEventListener('click', () => {
  displayTheName();
});

txtBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter'){
    displayTheName();
  }
});

function displayTheName () {
  displayName.innerHTML = `Your name is ${txtBox.value}`;
}

autoDisplayTextBox.addEventListener('keyup', () => {
  autoDisplayPara.innerHTML = `${autoDisplayTextBox.value}`;
});


// const arr1 = [-2,-1,0,1,100];
// const arr2 =[];
// for (let i = 0; i < arr1.length; i++) {
//   arr2[i] = arr1[i] + 1;
// }
// console.log(arr2);

function minMax(array){
  let max = array[0];
  let min = array[0];
  
  for (let i = 0; i < array.length; i++) {
    if(max > array[i]) {}

    else if (max <= array[i]) {
      max = array[i];
    }
    
    if(min < array[i]) {}

    else if (min >= array[i]) {
      min = array[i];
    }
  }
  if (min === undefined) min = null;
  if (max === undefined) max = null;

  console.log(`max: ${max}, min: ${min}`);

}
minMax([]);
