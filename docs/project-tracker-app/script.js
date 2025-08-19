// Store tasks in memory
let tasks = [];

// Helper to color code status
function getStatusColor(status) {
  switch (status) {
    case 'To Do': return '#d9534f'; // red
    case 'In Progress': return '#f0ad4e'; // orange
    case 'Done': return '#5cb85c'; // green
    default: return '#999';
  }
}

// Render tasks to the DOM
function renderTasks(filter = 'All') {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  const filteredTasks = tasks.filter(task => {
    return filter === 'All' || task.status === filter;
  });

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.name}</strong> — ${task.owner} — Due: ${task.dueDate}
      <span style="margin-left: 1rem; font-weight: bold; color: ${getStatusColor(task.status)}">
        [${task.status}]
      </span>
    `;
    taskList.appendChild(li);
  });
}

// Handle task form submission
document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = document.getElementById('taskName').value.trim();
  const taskOwner = document.getElementById('taskOwner').value.trim();
  const dueDate = document.getElementById('taskDueDate').value;
  const status = document.getElementById('taskStatus').value;

  if (!taskName || !taskOwner || !dueDate || !status) {
    alert("Please fill out all fields.");
    return;
  }

  tasks.push({ name: taskName, owner: taskOwner, dueDate, status });

  renderTasks(document.getElementById('statusFilter').value);
  this.reset();
});

// Handle status filter change
document.getElementById('statusFilter').addEventListener('change', function () {
  renderTasks(this.value);
});

