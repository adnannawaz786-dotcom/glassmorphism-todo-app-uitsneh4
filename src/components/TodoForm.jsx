```jsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const TodoForm = ({ onAddTodo }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    setIsLoading(true);
    
    try {
      await onAddTodo(inputValue.trim());
      setInputValue('');
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="glassmorphism rounded-2xl p-6 border border-white/20 shadow-xl backdrop-blur-md bg-white/10">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                disabled={isLoading}
                className="w-full px-4 py-3 text-white placeholder-white/60 bg-white/5 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent backdrop-blur-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                maxLength={200}
              />
              <div className="absolute bottom-1 right-3 text-xs text-white/40">
                {inputValue.length}/200
              </div>
            </div>
            
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="group relative px-6 py-3 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-xl font-medium transition-all duration-200 hover:from-purple-600/90 hover:to-pink-600/90 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none focus:outline-none focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm border border-white/10"
            >
              <span className="flex items-center gap-2">
                <Plus 
                  size={18} 
                  className={`transition-transform duration-200 ${isLoading ? 'animate-spin' : 'group-hover:rotate-90'}`} 
                />
                {isLoading ? 'Adding...' : 'Add Todo'}
              </span>
            </button>
          </div>
          
          {/* Quick tips */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs text-white/50">
            <span className="px-2 py-1 bg-white/5 rounded-md border border-white/10">
              💡 Press Enter to add
            </span>
            <span className="px-2 py-1 bg-white/5 rounded-md border border-white/10">
              ✨ Keep it concise
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
```