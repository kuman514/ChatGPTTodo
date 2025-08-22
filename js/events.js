import { render } from './render.js';
import { MODES, state } from './state.js';

export function initiallyBindEvents() {
  document.getElementById('add-todo-btn').addEventListener('click', () => {
    state.selectedId = -1;
    state.mode = MODES.CREATE;
    render();
  });

  document.getElementById('todo-list').addEventListener('click', (e) => {
    const li = e.target.closest('li');
    if (!li) return;
    state.selectedId = parseInt(li.dataset.id, 10);
    state.mode = MODES.VIEW;
    render();
  });
}
