import { uid } from 'quasar'

const state = {
  tasks: {
    '1': {
      id: 1,
      title: 'Some title one',
      desc: 'Some desc one',
      date: {
        from: '12 Апр',
        to: '15 Мар'
      },
      users: [
        {
          firstName: 'Den',
          lastName: 'Den',
          avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
        }
      ]
    },
    '2': {
      id: 2,
      title: 'Some title two',
      desc: 'Some desc two',
      date: {
        from: '1 Янв',
        to: '16 Янв'
      },
      users: [
        {
          firstName: 'Den',
          lastName: 'Den',
          avatar: 'https://krot.info/uploads/posts/2021-02/1613819225_43-p-kruglii-fon-dlya-avi-43.png'
        }
      ],
    },
    '3': {
      id: 3,
      title: 'Some title three',
      desc: 'Some desc three',
      date: {
        from: '24 Июн',
        to: '15 Июл'
      },
      users: [
        {
          firstName: 'Den',
          lastName: 'Den',
          avatar: 'https://i.pinimg.com/originals/20/3a/7a/203a7a27dc41ffca2bfbd077d8409bd4.jpg'
        }
      ]
    }
  },
  users: [
    {
      id: 1,
      firstName: 'Nigger',
      lastName: 'niggos',
      avatar: 'https://pixelbox.ru/wp-content/uploads/2021/02/youtube-avatar-anime-95.jpg'
    },
    {
      id: 2,
      firstName: 'Vasya',
      lastName: 'Pupkin',
      avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'
    },
    {
      id: 3,
      firstName: 'Nasyua',
      lastName: 'Kuznicova',
      avatar: 'https://i.pinimg.com/originals/20/3a/7a/203a7a27dc41ffca2bfbd077d8409bd4.jpg'
    },
  ]
}

const mutations = {
  addTask (state, payload) {
    state.tasks[payload.id] = payload.task
  },
  deleteTask (state, key) {
    delete state.tasks[key]
  },
  updateTask (state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  }
}

const actions = {
  addTask ({commit}, task) {
    let id = uid()
    let payload = {
      id: id,
      task: task
    }
    commit('addTask', payload)
  },
  deleteTask ({commit}, key) {
    commit('deleteTask', key)
  },
  updateTask ({commit}, payload) {
    commit('updateTask', payload)
  }
}

const getters = {
  getUsers (state) {
    return state.users
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
