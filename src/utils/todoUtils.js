
/**
 * Utility functions for todo operations
 */

// Generate unique ID for todos
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Filter todos based on status
export const filterTodos = (todos, filter) => {
  switch (filter) {
    case 'active':
      return todos.filter(todo => !todo.completed);
    case 'completed':
      return todos.filter(todo => todo.completed);
    case 'all':
    default:
      return todos;
  }
};

// Sort todos by different criteria
export const sortTodos = (todos, sortBy = 'created') => {
  const todosCopy = [...todos];
  
  switch (sortBy) {
    case 'alphabetical':
      return todosCopy.sort((a, b) => a.text.localeCompare(b.text));
    case 'priority':
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return todosCopy.sort((a, b) => {
        const aPriority = priorityOrder[a.priority] || 1;
        const bPriority = priorityOrder[b.priority] || 1;
        return bPriority - aPriority;
      });
    case 'dueDate':
      return todosCopy.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'created':
    default:
      return todosCopy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

// Search todos by text
export const searchTodos = (todos, searchTerm) => {
  if (!searchTerm.trim()) return todos;
  
  const term = searchTerm.toLowerCase();
  return todos.filter(todo => 
    todo.text.toLowerCase().includes(term) ||
    (todo.description && todo.description.toLowerCase().includes(term)) ||
    (todo.category && todo.category.toLowerCase().includes(term))
  );
};

// Get todo statistics
export const getTodoStats = (todos) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return {
    total,
    completed,
    active,
    completionRate
  };
};

// Check if todo is overdue
export const isOverdue = (todo) => {
  if (!todo.dueDate || todo.completed) return false;
  return new Date(todo.dueDate) < new Date();
};

// Get todos due today
export const getTodosDueToday = (todos) => {
  const today = new Date().toDateString();
  return todos.filter(todo => 
    todo.dueDate && 
    !todo.completed && 
    new Date(todo.dueDate).toDateString() === today
  );
};

// Get overdue todos
export const getOverdueTodos = (todos) => {
  return todos.filter(todo => isOverdue(todo));
};

// Validate todo data
export const validateTodo = (todoData) => {
  const errors = {};
  
  if (!todoData.text || !todoData.text.trim()) {
    errors.text = 'Todo text is required';
  }
  
  if (todoData.text && todoData.text.length > 500) {
    errors.text = 'Todo text must be less than 500 characters';
  }
  
  if (todoData.dueDate && new Date(todoData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
    errors.dueDate = 'Due date cannot be in the past';
  }
  
  if (todoData.priority && !['low', 'medium', 'high'].includes(todoData.priority)) {
    errors.priority = 'Priority must be low, medium, or high';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format due date for display
export const formatDueDate = (dueDate) => {
  if (!dueDate) return '';
  
  const date = new Date(dueDate);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
    });
  }
};

// Get priority color class
export const getPriorityColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'text-red-400 bg-red-400/10 border-red-400/20';
    case 'medium':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
    case 'low':
      return 'text-green-400 bg-green-400/10 border-green-400/20';
    default:
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
  }
};

// Export todo data as JSON
export const exportTodos = (todos) => {
  const dataStr = JSON.stringify(todos, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `todos-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
};

// Import todo data from JSON
export const importTodos = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const todos = JSON.parse(e.target.result);
        
        // Validate imported data
        if (!Array.isArray(todos)) {
          throw new Error('Invalid file format: Expected array of todos');
        }
        
        const validTodos = todos.filter(todo => 
          todo && 
          typeof todo === 'object' && 
          typeof todo.text === 'string' &&
          typeof todo.completed === 'boolean'
        );
        
        resolve(validTodos);
      } catch (error) {
        reject(new Error('Failed to parse todo file: ' + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

// Group todos by category
export const groupTodosByCategory = (todos) => {
  return todos.reduce((groups, todo) => {
    const category = todo.category || 'Uncategorized';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(todo);
    return groups;
  }, {});
};

// Get unique categories from todos
export const getUniqueCategories = (todos) => {
  const categories = todos
    .map(todo => todo.category)
    .filter(category => category && category.trim())
    .filter((category, index, arr) => arr.indexOf(category) === index);
  
  return categories.sort();

```