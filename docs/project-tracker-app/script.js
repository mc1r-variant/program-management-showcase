// Helper to color code status
function getStatusColor(status) {
  switch (status) {
    case 'To Do':
      return '#d9534f'; // red
    case 'In Progress':
      return '#f0ad4e'; // orange
    case 'Done':
      return '#5cb85c'; // green
    default:
      return '#999';
  }
}

// Handle form submission
document.getElementById('taskForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get input values
  const taskName = document.getElementById('taskName').value.trim();
  const taskOwner = document.getElementById('taskOwner').value.trim();
  const dueDate = document.getElementById('taskDueDate').value;
  const status = document.getElementById('taskStatus').value;

  // Validate
  if (!taskName || !taskOwner || !dueDate || !status) {
    alert("Please fill out all fields.");
    return;
  }

  // Create task HTML
  const taskHTML = `
    <li>
      <strong>${taskName}</strong> — ${taskOwner} — Due: ${dueDate}
      <span style="margin-left: 1rem; font-weight: bold; color: ${getStatusColor(status)}">
        [${status}]
      </span>
    </li>
  `;

  // Add to list
  const taskList = document.getElementById('taskList');
  taskList.insertAdjacentHTML('beforeend', taskHTML);

  // Reset form
  this.reset();
});
