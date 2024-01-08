const arr = [];
const textBox = document.querySelector('.txt-Box');
const addBut = document.querySelector('.addBut');
const displayBox = document.querySelector('.displayAction');
const dateBox = document.querySelector('.date-Box');


function print (){
  
  let fakeArr = '';
  arr.forEach((value, index) => {
    // const value = arr[i];
    // const name = value.name;
    // const dueDate = value.dueDate;
    const { name, dueDate } = value
    fakeArr += `
    <div>${name}</div> 
    <div>${dueDate}</div>
    <button class = "deleteBut">Delete</button>`
  });
  displayBox.innerHTML = fakeArr;

  const deleteBut = document.querySelectorAll('.deleteBut');
  deleteBut.forEach((deleteButton, index) =>{
    deleteButton.addEventListener('click', ()=> {
      arr.splice(index, 1);
      print();
    });
  });
}

function arrayStuff(){
  const name = textBox.value;
  const dueDate = dateBox.value;
  arr.push({
    // name: name,
    // dueDate: dueDate
    name,
    dueDate
  });
  dateBox.value = '';
  textBox.value = '';
  print();
}

addBut.addEventListener('click', ()=> {
  arrayStuff();
});

textBox.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
  arrayStuff();
  }
});

dateBox.addEventListener('keydown', (event) => {
  if(event.key === 'Enter'){
  arrayStuff();
  }
});
