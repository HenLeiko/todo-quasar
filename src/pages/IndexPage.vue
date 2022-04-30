<template>
  <q-page class="page">
    <div class="list flex wrap">
    <cards class="cards" v-for="(task, key) in tasks" :key="key" :task="task" :id="key">
    </cards>
  </div>
  </q-page>

</template>

<script>
  import { useStore } from 'vuex'
  import cards from 'components/ToDoCard.vue'
  import addTask from 'components/AddTask.vue'


  export default ({
    name: 'IndexPage',
    components: {
      cards,
      addTask,
    },
    setup() {
      const store = useStore()

      return {
        tasks: store.state.tasks.tasks,
      }
    },
  })

</script>

<style lang="scss">
.page {
  display: flex;
}
.cards {
  height: 100%;
  margin: 20px 20px 20px 20px;

  &:not(:last-child) {
    margin-right: 30px;
  }
}
.list {
  height: 100%;
}
</style>
