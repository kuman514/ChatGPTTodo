import { state } from './state.js';
import { loadTodos } from './storage.js';
import { render } from './render.js';
import { initiallyBindEvents } from './events.js';

function init() {
  state.todos = loadTodos();
  state.mode = 'EMPTY';
  render();
  initiallyBindEvents();
}

init();
