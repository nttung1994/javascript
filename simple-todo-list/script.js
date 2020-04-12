const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
  HIDDEN: 'hidden',
  TASK: 'task',
  TASK_NAME: 'task-name',
  CHECK_TASK: 'check-task',
  TASK_DEADLINE: 'task-deadline',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const addTaskDiv = document.getElementById('add-task')
const taskName = document.getElementById('task-name')
const taskDeadline = document.getElementById('task-deadline')
const addTaskButton = document.getElementById('add-task-button')

let itemCount = 0
let uncheckedCount = 0

// Handle enter when input task name
taskName.addEventListener('keyup', function(event) {
	if (event.keyCode === 13) {
		// Cancel the default action, if needed
		event.preventDefault()
		// Trigger the button with a click
		addTaskButton.click()
	}
})

// Handle when click new todo button
function newTodo() {
	addTaskDiv.classList.remove(classNames.HIDDEN)
	taskName.focus()
}

// Handle when click add task
function addTask() {
	// get new task name
	const taskNameValue = taskName.value
	// get task deadline
	const taskDeadlineValue = taskDeadline.value
	
	// if task name is empty, just hide the block
	if (taskNameValue === '') {
		addTaskDiv.classList.add(classNames.HIDDEN)
		return
	}
	
	// create new li
	const li = document.createElement('li')
	li.classList.add(classNames.TASK)
	
	// add task name to li
	const content = document.createElement('span')
	content.appendChild(document.createTextNode(taskNameValue))
	content.classList.add(classNames.TASK_NAME)
	li.appendChild(content)
	
	// add deadline to li
	const deadlineLabel = document.createElement('span')
	deadlineLabel.appendChild(document.createTextNode('Deadline: '))
	li.appendChild(deadlineLabel)
	
	const deadline = document.createElement('span')
	if (taskDeadlineValue === '') {
		deadline.appendChild(document.createTextNode('Undefined'))
	}
	else {
		deadline.appendChild(document.createTextNode(formatDate(new Date(taskDeadlineValue))))
	}
	deadline.classList.add(classNames.TASK_DEADLINE)
	li.appendChild(deadline)
	
	// add checkbox completed to li
	const checkboxLabel = document.createElement('span')
	checkboxLabel.appendChild(document.createTextNode('Completed: '))
	li.appendChild(checkboxLabel)
	
	const checkbox = document.createElement('input')
	checkbox.type = 'checkbox'
	checkbox.onclick = function() {
		if (checkbox.checked) {
			decreaseUncheckedCount()
		}
		else {
			increaseUncheckedCount()
		}
	}
	checkbox.classList.add(classNames.CHECK_TASK)
	li.appendChild(checkbox)
	
	// add delete button to li
	const deleteButton = document.createElement('button')
	deleteButton.appendChild(document.createTextNode('Delete'))
	deleteButton.onclick = function() {
		list.removeChild(li)
		decreaseItemCount()
		if(!checkbox.checked) {
			decreaseUncheckedCount()
		}
	}
	li.appendChild(deleteButton)
	
	// add li to list
	list.appendChild(li)
	
	// increase item count and uncheck item count
	increaseItemCount()
	increaseUncheckedCount()
	
	// reset data and hide add task div
	taskName.value = ''
	taskDeadline.value = ''
	addTaskDiv.classList.add(classNames.HIDDEN)
}

// Handle when click cancel button
function cancel() {
	taskName.value = ''
	addTaskDiv.classList.add(classNames.HIDDEN)
}

// Increase and update item count
function increaseItemCount() {
	itemCount++
	itemCountSpan.textContent = itemCount
}

// Decrease and update item count
function decreaseItemCount() {
	itemCount--
	itemCountSpan.textContent = itemCount
}

// Increase and update unchecked count
function increaseUncheckedCount() {
	uncheckedCount++
	uncheckedCountSpan.textContent = uncheckedCount
}

// Decrease and update unchecked count
function decreaseUncheckedCount() {
	uncheckedCount--
	uncheckedCountSpan.textContent = uncheckedCount
}

// Format date using format DD/MM/YYYY
function formatDate(dateObj) {
	let date = dateObj.getDate()
	if (date < 10) {
		date = '0' + date
	}
	
	let month = dateObj.getMonth() + 1
	if (month < 10) {
		month = '0' + month
	}
	
	return date + '/' + month + '/' + dateObj.getFullYear()
}