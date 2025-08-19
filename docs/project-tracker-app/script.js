document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const taskName = document.getElementById('taskName').value;
  const assignee = document.getElementById('assignee').value;
  const dueDate = document.getElementById('dueDate').value;

  const taskItem = document.createElement('li');
  taskItem.textContent = `${taskName} → ${assignee} (Due: ${dueDate})`;

  document.getElementById('taskList').appendChild(taskItem);

  // Reset form
  this.reset();
});
