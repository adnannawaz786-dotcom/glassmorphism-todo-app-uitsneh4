
import React, { useState } from 'react';
import { Trash2, Edit3, Check, X } from 'lucide-react';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="group relative mb-3 animate-in slide-in-from-top-2 duration-300">
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-white/15">
        {/* Glassmorphism gradient overlay */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative flex items-center gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(todo.id)}
            className={`flex-shrink-0 w-5 h-5 rounded-full border-2 transition-all duration-300 ${
              todo.completed
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 border-emerald-400 shadow-lg shadow-emerald-400/30'
                : 'border-white/40 hover:border-white/60 hover:shadow-md'
            }`}
          >
            {todo.completed && (
              <Check className="w-3 h-3 text-white m-auto" strokeWidth={3} />
            )}
          </button>

          {/* Todo Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleEdit}
                className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 text-sm font-medium"
                placeholder="Enter todo text..."
                autoFocus
              />
            ) : (
              <span
                className={`block text-sm font-medium transition-all duration-300 ${
                  todo.completed
                    ? 'text-white/60 line-through'
                    : 'text-white group-hover:text-white/90'
                }`}
              >
                {todo.text}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-all duration-200 hover:scale-110"
                  title="Save"
                >
                  <Check className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
                <button
                  onClick={handleCancel}
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-200 hover:scale-110"
                  title="Cancel"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 hover:text-blue-200 transition-all duration-200 hover:scale-110"
                  title="Edit"
                  disabled={todo.completed}
                >
                  <Edit3 className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 transition-all duration-200 hover:scale-110"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Completion timestamp */}
        {todo.completed && todo.completedAt && (
          <div className="mt-2 text-xs text-white/40 font-light">
            Completed {new Date(todo.completedAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
