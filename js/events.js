import { state, MODES } from './state.js';
import { render } from './render.js';

export function initiallyBindEvents() {
  document.getElementById('add-todo-btn').addEventListener('click', () => {
    state.mode = MODES.CREATE;
    state.form.title = '';
    state.form.content = '';
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
