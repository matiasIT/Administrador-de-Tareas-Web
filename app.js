// Obtener una referencia al elemento de lista de tareas
const taskList = document.getElementById('taskList');

// Obtener una referencia a los campos de entrada de la tarea
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');

// Obtener las tareas almacenadas en el almacenamiento local (si existen)
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Función para renderizar la lista de tareas en el HTML
function renderTaskList() {
  // Limpiar la lista actual
  taskList.innerHTML = '';

  // Recorrer todas las tareas y crear los elementos de la lista
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    const title = document.createElement('span');
    const description = document.createElement('p');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    // Configurar el contenido y atributos de los elementos
    title.textContent = task.title;
    description.textContent = task.description;
    editButton.textContent = 'Editar';
    deleteButton.textContent = 'Eliminar';
    li.setAttribute('data-index', index);

    // Agregar manejadores de eventos a los botones de editar y eliminar
    editButton.addEventListener('click', () => editTask(index));
    deleteButton.addEventListener('click', () => deleteTask(index));

    // Agregar los elementos a la lista
    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
  });
}

// Función para crear una nueva tarea
function createTask() {
  const title = titleInput.value;
  const description = descriptionInput.value;

  // Validar que los campos no estén vacíos
  if (!title || !description) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Crear un objeto de tarea
  const task = {
    title,
    description
  };

  // Agregar la tarea al arreglo de tareas
  tasks.push(task);

  // Actualizar el almacenamiento local con las nuevas tareas
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Renderizar la lista de tareas actualizada
  renderTaskList();

  // Limpiar los campos de entrada
  titleInput.value = '';
  descriptionInput.value = '';
}

// Función para editar una tarea existente
function editTask(index) {
  const task = tasks[index];

  // Obtener los nuevos valores de título y descripción
  const newTitle = prompt('Ingrese el nuevo título de la tarea', task.title);
  const newDescription = prompt('Ingrese la nueva descripción de la tarea', task.description);

  // Validar que los campos no estén vacíos
  if (!newTitle || !newDescription) {
    alert('Por favor, complete todos los campos');
    return;
  }

  // Actualizar los valores de la tarea
  task.title = newTitle;
  task.description = newDescription;

  // Actualizar el almacenamiento local con las tareas actualizadas
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Renderizar la lista de tareas actualizada
  renderTaskList();
}

// Función para eliminar una tarea existente
function deleteTask(index) {
  // Eliminar la tarea del arreglo de tareas
  tasks.splice(index, 1);

  // Actualizar el almacenamiento local con las tareas actualizadas
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Renderizar la lista de tareas actualizada
  renderTaskList();
}

// Función para vaciar la lista de tareas
function clearTasks() {
  // Limpiar el arreglo de tareas
  tasks = [];

  // Actualizar el almacenamiento local con las tareas vacías
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Renderizar la lista de tareas vacía
  renderTaskList();
}

// Renderizar la lista de tareas al cargar la página
renderTaskList();
