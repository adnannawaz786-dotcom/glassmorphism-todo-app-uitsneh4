```jsx
import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, CheckCircle2, Circle, Edit3, Trash2, Save, X } from 'lucide-react';

const TodoApp = () => {
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
      setTodos([todo, ...todos]);
      setNewTodo('');
    }
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
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
    
    switch (filter) {
      case 'active':
        return !todo.completed && matchesSearch;
      case 'completed':
        return todo.completed && matchesSearch;
      default:
        return matchesSearch;
    }
  });

  // Handle key press
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  // Get filter counts
  const totalTodos = todos.length;
  const activeTodos = todos.filter(todo => !todo.completed).length;
  const completedTodos = todos.filter(todo => todo.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Todo Glass
          </h1>
          <p className="text-white/80 text-lg">
            Organize your tasks with style
          </p>
        </div>

        {/* Add Todo Section */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-6 mb-6 border border-white/30 shadow-xl">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => handleKeyPress(e, addTodo)}
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-white/30 hover:bg-white/40 border border-white/30 rounded-xl text-white font-medium transition-all duration-200 flex items-center gap-2 backdrop-blur-sm hover:scale-105"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl p-6 mb-6 border border-white/30 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search todos..."
                className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All', count: totalTodos },
                { key: 'active', label: 'Active', count: activeTodos },
                { key: 'completed', label: 'Completed', count: completedTodos }
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-sm border ${
                    filter === key
                      ? 'bg-white/40 text-white border-white/50'
                      : 'bg-white/20 text-white/80 border-white/30 hover:bg-white/30'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="backdrop-blur-md bg-white/20 rounded-2xl border border-white/30 shadow-xl overflow-hidden">
          {filteredTodos.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-white/60 text-lg mb-2">
                {searchTerm ? 'No todos match your search' : 
                 filter === 'active' ? 'No active todos' :
                 filter === 'completed' ? 'No completed todos' :
                 'No todos yet'}
              </div>
              <div className="text-white/40">
                {!searchTerm && filter === 'all' && 'Add your first todo above!'}
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/20">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`p-4 hover:bg-white/10 transition-all duration-200 ${
                    todo.completed ? 'opacity-75' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Toggle Button */}
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {todo.completed ? (
                        <CheckCircle2 size={24} className="text-green-400" />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    {/* Todo Text */}
                    <div className="flex-1">
                      {editingId === todo.id ? (
                        <input
                          type="text"
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          onKeyPress={(e) => handleKeyPress(e, saveEdit)}
                          className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`text-white text-lg ${
                            todo.completed ? 'line-through text-white/60' : ''
                          }`}
                        >
                          {todo.text}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      {editingId === todo.id ? (
                        <>
                          <button
                            onClick={saveEdit}
                            className="p-2 text-green-400 hover:text-green-300 transition-colors"
                          >
                            <Save size={18} />
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditing(todo.id, todo.text)}
                            className="p-2 text-white/60 hover:text-white transition-colors"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            onClick={() => deleteTodo(todo.id)}
                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Footer */}
        {totalTodos > 0 && (
          <div className="mt-6 text-center">
            <div className="backdrop-blur-md bg-white/20 rounded-xl px-6 py-3 border border-white/30 inline-block">
              <span className="text-white/80">
                {activeTodos} of {totalTodos} tasks remaining
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
```