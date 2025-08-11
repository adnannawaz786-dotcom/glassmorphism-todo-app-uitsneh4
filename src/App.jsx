```jsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Check, Edit2, Trash2, X } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('glassmorphism-todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('glassmorphism-todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const todo = {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Start editing
  const startEditing = (id, text) => {
    setEditingId(id);
    setEditingText(text);
  };

  // Save edit
  const saveEdit = () => {
    if (editingText.trim() !== '') {
      setTodos(todos.map(todo =>
        todo.id === editingId ? { ...todo, text: editingText.trim() } : todo
      ));
    }
    setEditingId(null);
    setEditingText('');
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'active' ? !todo.completed :
      filter === 'completed' ? todo.completed : true;
    
    return matchesSearch && matchesFilter;
  });

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const activeCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Glassmorphism Todo
          </h1>
          <p className="text-white/80">Stay organized with style</p>
        </div>

        {/* Main Todo Container */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-xl p-6">
          {/* Add Todo Section */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Add a new todo..."
                className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white hover:bg-white/30 transition-all duration-200 flex items-center gap-2"
            >
              <Plus size={20} />
              Add
            </button>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search todos..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {['all', 'active', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    filter === filterType
                      ? 'bg-white/30 text-white border border-white/40'
                      : 'bg-white/10 text-white/70 border border-white/20 hover:bg-white/20'
                  }`}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-between items-center mb-4 text-white/80 text-sm">
            <span>{activeCount} active, {completedCount} completed</span>
            {completedCount > 0 && (
              <button
                onClick={clearCompleted}
                className="text-white/60 hover:text-white transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>

          {/* Todo List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-8 text-white/60">
                {searchTerm ? 'No todos match your search' : 'No todos yet. Add one above!'}
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg transition-all duration-200 ${
                    todo.completed ? 'opacity-70' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 transition-all duration-200 ${
                      todo.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-white/40 hover:border-white/60'
                    }`}
                  >
                    {todo.completed && <Check size={14} className="mx-auto" />}
                  </button>

                  {/* Todo Text */}
                  <div className="flex-1">
                    {editingId === todo.id ? (
                      <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="w-full bg-transparent border-none outline-none text-white"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`text-white ${
                          todo.completed ? 'line-through text-white/60' : ''
                        }`}
                      >
                        {todo.text}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-1">
                    {editingId === todo.id ? (
                      <>
                        <button
                          onClick={saveEdit}
                          className="p-1 text-green-400 hover:text-green-300 transition-colors"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditing(todo.id, todo.text)}
                          className="p-1 text-white/60 hover:text-white transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1 text-white/60 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/60 text-sm">
          Built with React + Vite + Tailwind CSS
        </div>
      </div>
    </div>
  );
}

export default App;
```