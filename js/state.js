export const MODES = {
  EMPTY: 'EMPTY',
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
};

export const state = {
  todos: [],
  selectedId: -1,
  mode: MODES.EMPTY,
  form: {
    title: '',
    content: '',
  },
};
