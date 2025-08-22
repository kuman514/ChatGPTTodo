import { MODES, state } from './state.js';
import { saveTodos } from './storage.js';

export function render() {
  renderTodoList();
  renderContent();
}

function renderTodoList() {
  const ul = document.getElementById('todo-list');
  ul.innerHTML = '';

  state.todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo.title;
    li.dataset.id = todo.id;
    ul.appendChild(li);
  });
}

function renderContent() {
  const content = document.getElementById('content');
  content.innerHTML = '';

  switch (state.mode) {
    case MODES.EMPTY: {
      const div = document.createElement('div');
      div.className = 'empty-screen';
      div.textContent = '할일을 생성하거나 클릭하세요.';
      content.appendChild(div);
      break;
    }

    case MODES.VIEW: {
      const todo = state.todos.find((t) => t.id === state.selectedId);
      if (!todo) return;

      const container = document.createElement('div');
      container.className = 'view-mode';

      const title = document.createElement('h2');
      title.textContent = todo.title;

      const body = document.createElement('p');
      body.textContent = todo.content;

      const btnContainer = document.createElement('div');
      btnContainer.className = 'view-buttons';

      const editBtn = document.createElement('button');
      editBtn.textContent = '수정';
      editBtn.className = 'edit-btn';
      editBtn.addEventListener('click', () => {
        state.mode = MODES.EDIT;
        render();
      });

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '삭제';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        if (confirm('정말 삭제하시겠습니까?')) {
          state.todos = state.todos.filter((t) => t.id !== state.selectedId);
          state.selectedId = -1;
          state.mode = MODES.EMPTY;
          saveTodos(state.todos);
          render();
        }
      });

      btnContainer.appendChild(editBtn);
      btnContainer.appendChild(deleteBtn);

      container.appendChild(title);
      container.appendChild(body);
      container.appendChild(btnContainer);

      content.appendChild(container);
      break;
    }

    case MODES.CREATE:
    case MODES.EDIT: {
      const form = document.createElement('form');
      form.id = 'todo-form';

      const initData = state.todos.find((t) => t.id === state.selectedId) ?? {
        title: '',
        content: '',
      };

      const titleGroup = document.createElement('div');
      titleGroup.className = 'form-group';
      const titleLabel = document.createElement('label');
      titleLabel.textContent = '제목';
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = initData.title;
      titleInput.name = 'title';
      titleGroup.appendChild(titleLabel);
      titleGroup.appendChild(titleInput);

      const contentGroup = document.createElement('div');
      contentGroup.className = 'form-group';
      const contentLabel = document.createElement('label');
      contentLabel.textContent = '내용';
      const textarea = document.createElement('textarea');
      textarea.name = 'content';
      textarea.rows = 10;
      textarea.value = initData.content;
      contentGroup.appendChild(contentLabel);
      contentGroup.appendChild(textarea);

      const confirmBtn = document.createElement('button');
      confirmBtn.type = 'submit';
      confirmBtn.className = 'confirm-btn';
      confirmBtn.textContent = state.mode === MODES.CREATE ? '생성' : '수정';

      form.appendChild(titleGroup);
      form.appendChild(contentGroup);
      form.appendChild(confirmBtn);

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = form.elements['title'].value.trim();
        const content = form.elements['content'].value.trim();

        switch (state.mode) {
          case MODES.CREATE: {
            const newId =
              state.todos.length === 0
                ? 0
                : state.todos[state.todos.length - 1].id + 1;
            const newTodo = { id: newId, title, content };
            state.todos.push(newTodo);
            state.selectedId = newId;
            state.mode = MODES.VIEW;
            break;
          }
          case MODES.EDIT: {
            const idx = state.todos.findIndex((t) => t.id === state.selectedId);
            if (idx !== -1) {
              state.todos[idx] = { id: state.selectedId, title, content };
              state.mode = MODES.VIEW;
            }
            break;
          }
        }

        saveTodos(state.todos);
        render();
      });

      content.appendChild(form);
      break;
    }
  }
}
