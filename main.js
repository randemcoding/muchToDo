const addButton = document.getElementById('add-button');
const textInput = document.getElementById('text-input');
const toDoContainer = document.getElementById('to-do-container');
textInput.hidden = true;
addButton.addEventListener('click', function showTextInput(){
textInput.hidden = false;
console.log('yeah');
addButton.hidden = true;
})
textInput.addEventListener('keydown', (event) => {
if (event.key === 'Enter' || event.key === 'Go'){
  if(!localStorage.getItem('to-do-data')){
    let existingData = [{name: event.target.value, style: 'to-do-one'}];
    localStorage.setItem('to-do-data', JSON.stringify(existingData))
    console.log(JSON.parse(localStorage.getItem('to-do-data')))
    textInput.value =''
    textInput.hidden = true
  } else{
    let existingData = JSON.parse(localStorage.getItem('to-do-data'));
    let tempObject = {name: event.target.value, style: 'to-do-one'}
    existingData.push(tempObject);
    localStorage.setItem('to-do-data', JSON.stringify(existingData))
    console.log(JSON.parse(localStorage.getItem('to-do-data')))
    textInput.value =''
    textInput.hidden = true
    addButton.hidden = false;
  }
  checkStorage()
} 
})
function checkStorage() {
  if (!localStorage.getItem('to-do-data')) {
    toDoContainer.innerText = 'Enter your first ToDo';
  } else {
    let existingData = JSON.parse(localStorage.getItem('to-do-data'));
    console.log(existingData);
    toDoContainer.innerHTML = ''
    for (const data of existingData) {
      let div = document.createElement('div');
      div.classList.add(`${data.style}`);
      div.innerText += data.name;
      toDoContainer.appendChild(div);
      div.addEventListener('click', function (event) {
        event.preventDefault();
        console.log(event.target);
        // Find the clicked object in the existingData array
        const clickedObject = existingData.find(item => item.name === data.name);
        // Check if the item was found in the array
        if (clickedObject) {
          // Update the style property of the clicked object
          if (clickedObject.style === 'to-do-two') {
            clickedObject.style = 'to-do-one';
          } else {
            clickedObject.style = 'to-do-two';
          }
      
          // Update the div's class based on the updated clickedObject.style
          div.classList.remove('to-do-one', 'to-do-two');
          div.classList.add(clickedObject.style);
      
          localStorage.setItem('to-do-data', JSON.stringify(existingData));
        }
      });
      

      div.addEventListener('contextmenu', function (event) {
        event.preventDefault();
        // Remove the ToDo item from the array
        existingData = existingData.filter(item => item !== data);
        localStorage.setItem('to-do-data', JSON.stringify(existingData));
        // Remove the div element from the container
        toDoContainer.removeChild(div);
        if(existingData.length < 1){
          toDoContainer.innerText = `Enter your first ToDo`
        }
      });
    }
  }
}
checkStorage()
checkContainer()
//localStorage.removeItem('to-do-data')
console.log(localStorage.getItem('to-do-data'));
function checkContainer() {
if(toDoContainer.innerHTML === ''){
  toDoContainer.innerText = `Enter your first ToDo`
}
}