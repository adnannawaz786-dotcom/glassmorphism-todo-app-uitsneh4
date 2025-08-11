import React from 'react';

const TodoFilter = ({ currentFilter, onFilterChange, todoCounts }) => {
  const filters = [
    { key: 'all', label: 'All', count: todoCounts.total },
    { key: 'active', label: 'Active', count: todoCounts.active },
    { key: 'completed', label: 'Completed', count: todoCounts.completed }
  ];

  return (
    <div className="flex items-center justify-center gap-2 p-4">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              flex items-center gap-2 min-w-[80px] justify-center
              ${currentFilter === filter.key
                ? 'bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/30'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            <span>{filter.label}</span>
            <span className={`
              text-xs px-2 py-0.5 rounded-full
              ${currentFilter === filter.key
                ? 'bg-white/20 text-white'
                : 'bg-white/10 text-white/60'
              }
            `}>
              {filter.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoFilter;
