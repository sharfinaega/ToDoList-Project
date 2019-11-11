const clear = document.querySelector(".clear");
// console.log(clear);
const date = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_DONE = "lineThrough";

// ambil data dari local storage
let data = localStorage.getItem("input.value");

// var
// let LIST, id;

// cek apakah value ada atau tidak
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
}
// else {
//   let LIST = [];
//   let id = 0;
// }

let LIST = [];
let id = 0;

function loadList(arr) {
  arr.forEach(function(item) {
    addTodo(item.name, item.done, item.trash);
  });
}

// hapus local storage
clear.addEventListener("click", function() {
  localStorage.clear();
  location.reload();
});

// tanggal/ date
const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
const today = new Date();

date.innerHTML = today.toLocaleDateString("id-ID", options);

// function menambahkan todo list
function addTodo(id, done, trash) {
  if (!input.value) {
    alert("You must enter the text");
  }
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_DONE : "";

  const text = `<li class="item">
  <i class="fa ${DONE} co" job="complete" id="${id}"></i>
  <p class="text ${LINE}">${input.value}</p>
  <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
</li>`;

  const position = "beforeend";

  list.insertAdjacentHTML(position, text);
  input.value = "";
}

document.addEventListener("keyup", function(event) {
  if (event.keyCode == 13) {
    // const toDo = input.value;
    // if input tidak kosong
    if (input.value) {
      addTodo();
      LIST.push({
        name: input.value,
        id: id,
        done: false,
        trash: false
      });
      // menambahkan item ke local storage
      localStorage.setItem(input.value, JSON.stringify(LIST));
      id = id + 1;
      input.value = "";
    } else {
      alert("You must enter the text");
    }
  }
});

// to do yang sudah selesai
function completeTodo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_DONE);

  const selesai = LIST[element.id].done;

  selesai = selesai ? false : true;
}

// hapus todo
function removeTodo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function(event) {
  const element = event.target;
  const elementJob = element.attributes.job.value;

  if (elementJob == "complete") {
    completeTodo(element);
  } else if (elementJob == "removed") {
    removeTodo(element);
  }
  localStorage.setItem(input.value, JSON.stringify(LIST));
});
