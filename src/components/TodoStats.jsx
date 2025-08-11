```jsx
import React from 'react';

const TodoStats = ({ todos }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const stats = [
    {
      label: 'Total',
      value: totalTodos,
      color: 'text-blue-300',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-400/30'
    },
    {
      label: 'Completed',
      value: completedTodos,
      color: 'text-green-300',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-400/30'
    },
    {
      label: 'Pending',
      value: pendingTodos,
      color: 'text-orange-300',
      bgColor: 'bg-orange-500/20',
      borderColor: 'border-orange-400/30'
    },
    {
      label: 'Progress',
      value: `${completionRate}%`,
      color: 'text-purple-300',
      bgColor: 'bg-purple-500/20',
      borderColor: 'border-purple-400/30'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`
            backdrop-blur-md bg-white/10 rounded-xl p-4 border ${stat.borderColor}
            shadow-lg hover:shadow-xl transition-all duration-300
            hover:bg-white/15 hover:scale-105
            ${stat.bgColor}
          `}
        >
          <div className="text-center">
            <div className={`text-2xl font-bold ${stat.color} mb-1`}>
              {stat.value}
            </div>
            <div className="text-white/70 text-sm font-medium">
              {stat.label}
            </div>
          </div>
          
          {/* Progress bar for completion rate */}
          {stat.label === 'Progress' && (
            <div className="mt-3">
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Visual indicator dots */}
          <div className="flex justify-center mt-2 space-x-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${stat.color.replace('text-', 'bg-')} opacity-60`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoStats;
```