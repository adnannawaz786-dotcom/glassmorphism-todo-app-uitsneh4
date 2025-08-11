```jsx
import React from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';

const TodoList = ({ 
  todos, 
  onToggle, 
  onDelete, 
  onEdit, 
  editingId, 
  editText, 
  setEditText, 
  onSaveEdit, 
  onCancelEdit 
}) => {
  const handleEditSubmit = (e, id) => {
    e.preventDefault();
    onSaveEdit(id);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4 opacity-50">📝</div>
        <p className="text-white/70 text-lg">No todos yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`group relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-lg hover:shadow-white/10 ${
            todo.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(todo.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                todo.completed
                  ? 'bg-green-500/80 border-green-400/80 text-white'
                  : 'border-white/40 hover:border-white/60 hover:bg-white/10'
              }`}
            >
              {todo.completed && <Check size={14} />}
            </button>

            {/* Todo Content */}
            <div className="flex-1 min-w-0">
              {editingId === todo.id ? (
                <form onSubmit={(e) => handleEditSubmit(e, todo.id)} className="flex gap-2">
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-green-500/80 hover:bg-green-500 text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={onCancelEdit}
                    className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between">
                  <span
                    className={`text-white transition-all duration-200 ${
                      todo.completed
                        ? 'line-through text-white/60'
                        : 'text-white'
                    }`}
                  >
                    {todo.text}
                  </span>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={() => onEdit(todo.id, todo.text)}
                      disabled={todo.completed}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        todo.completed
                          ? 'text-white/30 cursor-not-allowed'
                          : 'text-white/70 hover:text-white hover:bg-white/20'
                      }`}
                    >
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(todo.id)}
                      className="w-8 h-8 rounded-lg text-red-300 hover:text-red-200 hover:bg-red-500/20 flex items-center justify-center transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Completion timestamp */}
          {todo.completed && todo.completedAt && (
            <div className="mt-2 text-xs text-white/50 pl-9">
              Completed {new Date(todo.completedAt).toLocaleString()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
```