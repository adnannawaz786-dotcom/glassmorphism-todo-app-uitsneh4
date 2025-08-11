// Todo filter types
export const FILTER_TYPES = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// Todo status
export const TODO_STATUS = {
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

// Todo actions
export const TODO_ACTIONS = {
  ADD: 'ADD_TODO',
  DELETE: 'DELETE_TODO',
  TOGGLE: 'TOGGLE_TODO',
  EDIT: 'EDIT_TODO',
  CLEAR_COMPLETED: 'CLEAR_COMPLETED',
  TOGGLE_ALL: 'TOGGLE_ALL'
};

// Filter labels for UI
export const FILTER_LABELS = {
  [FILTER_TYPES.ALL]: 'All',
  [FILTER_TYPES.ACTIVE]: 'Active',
  [FILTER_TYPES.COMPLETED]: 'Completed'
};

// Local storage key
export const STORAGE_KEY = 'glassmorphism-todos';

// Animation durations (in ms)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
};

// Maximum todo text length
export const MAX_TODO_LENGTH = 500;

// Glassmorphism CSS classes
export const GLASS_STYLES = {
  PRIMARY: 'backdrop-blur-md bg-white/10 border border-white/20',
  SECONDARY: 'backdrop-blur-sm bg-white/5 border border-white/10',
  HOVER: 'hover:bg-white/20 transition-all duration-300',
  ACTIVE: 'bg-white/30'
};
