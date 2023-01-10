// TODO: save reference to important DOM elements using jQuery
const displayEl = $('#time-display');
const nameEl = $('.user-name');
const projectEl = $('.project-type');
const dateEl = $('.current-date');
const saveBtnEl = $('.save-data');
const modalEl = $('.form-modal');
const tableEl = $('.table-list')

let projectData = JSON.parse(localStorage.getItem('project')) || [];

// TODO: write a function to handle displaying the time
setInterval(() => {
  const today = dayjs();
  displayEl.text(today.format('MMM DD, YYYY [at] HH:mm:ss a'));
})

// TODO: write a function that saves projects (passed as a parameter) to local storage
function saveProjectsToStorage() {
  localStorage.setItem('project', JSON.stringify(projectData));
  createTable();
}


function createData(e) {
  e.preventDefault();

  let data = {};
  let name = nameEl.val();
  let time = dateEl.val();
  let project = projectEl.find('option:selected').text();
  
  if (name === '' || time === '' || project == 'Open this select menu'){
    return;
  }

  // create a new object and push to projectDatabese array
  data.userName = name;
  data.projectType = project;
  data.saveDate = time;
  projectData.push(data);

  // reset the content of the form
  nameEl.val('');
  dateEl.val('');
  projectEl.prop('selectedIndex', 0)
  modalEl.modal('hide');
  
  saveProjectsToStorage();
}

// render the list to the table element
function createTable() {
  let tableString = '';
  
  for ( let i = 0 ; i < projectData.length ; i++){
    tableString += 
    `<tr>
      <th scope="row">`+ projectData[i].userName +`</th>
      <td>`+ projectData[i].projectType +`</td>
      <td>`+ projectData[i].saveDate +`</td>
      <td><a class="del-list" href="#" data-num="`+ i +`"><i class="fa-sharp fa-solid fa-trash-can"></i></a></td>
      </tr>`
    }

    tableEl.html(tableString);
  }
  
  // click the trash can Icon to delete the list
  function deleteList(e) {
    let targetEl = e.target.nodeName;

    if (targetEl !== 'A' && targetEl !== 'I') {
      return;
    }

    let index = e.target.dataset.num;
    projectData.splice(index, 1);
    saveProjectsToStorage()
  }
  
  // event listener
  tableEl.on('click', deleteList)
  saveBtnEl.on('click', createData)

  // initial function
  function init() {
    createTable();
  }
  
  init();