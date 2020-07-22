import mutations from '@/store/mutations';

const { SHOW_NOTIFY } = mutations;

const notificationStore = {
  state: {
    messages: [],
  },
  getters: {
    messages: ({ messages }) => messages[messages.length - 1],
  },
  mutations: {
    [SHOW_NOTIFY](state, msg) {
      state.messages.push(msg);
    },
  },
  actions: {
    showNotify({ commit }, msg) {
      commit(SHOW_NOTIFY, msg);
    },
  },
};

export default notificationStore;
