const form = document.getElementById("form");
const listParent = document.getElementById("list");
const inputForm = document.getElementById("inputForm");

const mytittle = document.getElementById("titulito");
const boton = document.getElementById("btn-color");

const cambiarColor = () => {
  boton.addEventListener(onclick, cambiador());
};

const cambiador = () => {
  mytittle.classList.toggle("tittlerojo");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

const addTask = () => {
  if (inputForm.value === "") {
    console.log("esto no va vacio!"); // esto de tarea : que sea un elemento que se vea y un css bonito
    return false;
  }

  localStorage.setItem(
    "todos",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("todos") || "[]"),
      {
        todos: inputForm.value.trim(),
        completed: false,
      },
    ])
  );

  //   const card = document.createElement("div")
  //  card.innerHTML = `<div class="card"></div>`

  const list = document.createElement("li");
  list.innerHTML = `
    <input type="checkbox"  onclick="todoComplete(this)" class="check">
    <input class= "afuera"  type="text" value="${inputForm.value.trim()}"onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
    <i class="fa fa-trash" onclick="removeTodo(this)"></i>
    `;

  listParent.insertBefore(list, listParent.children[0]);
  inputForm.value = "";
};

const loadTasks = () => {
  if (localStorage.getItem("todos") == null) return;

  // caso contrario:
  // crea un obj desde un obj que sea "de tipo array"

  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

  todos.forEach((todo) => {
    const list = document.createElement("li");
    list.innerHTML = `
    <input type="checkbox" onclick="todoComplete(this)" class="check"${
      todo.completed ? "cheked" : ""
    }">
    <input class= "adentro" type="text" value="${todo.todos.trim()}"onfocus="getCurrentTodo(this)" onblur="editTodo(this)">
    <i class="fa fa-trash" onclick="removeTodo(this)"></i>

    `;

    listParent.insertBefore(list, listParent.children[0]);
  });
};

const todoComplete = (e) => {
  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

  todos.forEach((todo) => {
    if (todo.todos === e.nextElementSibling.value) {
      todo.completed = !todo.completed;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    e.nextElementSibling.classList.toggle("completed");
  });
};

const removeTodo = (e) => {
  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

  todos.forEach((todo) => {
    if (todo.todos === e.parentNode.children[1].value) {
      todos.splice(todos.indexOf(todo), 1);
    }

    localStorage.setItem("todos", JSON.stringify(todos));
    e.parentNode.remove();
  });
};

const editTodo = (e) => {
  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));

  if (e.value === "") {
    alert("Este campo no puede estar vacio"); // que esto sea algun elemento de html que aparezca y desaparezca a los 2 segundos
    e.value = currentValue;

    return;
  }

  // Tarea: si quiero puedo hacer un trim, obligatorio de +de 2 letras etc. no dejar espacios.

  todos.forEach((todo) => {
    if (todo.todos === currentValue) {
      todo.todos = e.value;
    } // le cambio el valor a lo que tiene el imput
  });
  localStorage.setItem("todos", JSON.stringify(todos)); // grabo el valor.
};

//lo inicio vacio, pero no puede ser const , vamos a estar metiendole valor , y ademas necesitamos que este afuera por lo vamos a acceder varias veces

//* https://developer.mozilla.org/es/docs/Glossary/Hoisting
let currentValue = null;

const getCurrentTodo = (e) => {
  currentValue = e.value;
};

// loadTasks()

window.onload = loadTasks;
