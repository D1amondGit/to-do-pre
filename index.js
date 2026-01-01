let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


formElement.addEventListener('submit', function(item) {
	item.preventDefault();
	let text = inputElement.value;
	listElement.prepend(createItem(text));
	items = getTasksFromDOM();
	saveTasks(items);
	inputElement.value = "";

})
function loadTasks() {
	const savedTasks = localStorage.getItem('tasks');
	if (savedTasks){
		return JSON.parse(savedTasks);
	}
	else {
		return items;
	}
	
}

function createItem(item) {

	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	
	textElement.textContent = item;

	editButton.addEventListener('click', function() {

		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});
	textElement.addEventListener('blur', function() {
		textElement.setAttribute('contenteditable', 'false');
		let currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	duplicateButton.addEventListener('click', function() {
		let itemName = textElement.textContent;
		let newItem = createItem(itemName);
		listElement.prepend(newItem);
		let items = getTasksFromDOM();
		saveTasks(items);

	});

	deleteButton.addEventListener('click', function() {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});
	return clone;
}

function getTasksFromDOM() {
	let itemsNamesElements = document.querySelectorAll('.to-do__item-text');
	let tasks = [];
	itemsNamesElements.forEach(function(item) {
		tasks.push(item.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

items = loadTasks();
items.forEach(function(item) {
	const evt = createItem(item);
	listElement.append(evt);
}
)