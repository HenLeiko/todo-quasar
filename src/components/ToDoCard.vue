<template lang="">
  <q-card clickable @click="open = true" flat bordered class="my-card bg-grey-1 card-wrapper">
    <q-card-section>
      <div class="row items-center no-wrap">
        <div class="col">
          <div class="text-h6">{{task.title}}</div>
          <div class="text-subtitle2">
            <q-chip v-for="user in task.users">
              <q-avatar>
                <img :src="user.avatar">
              </q-avatar>
              {{user.firstName}}
            </q-chip>
          </div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      {{task.desc}}
    </q-card-section>
    <q-card-section>
      <div class="section-title"> Период выполнения:</div>
      {{task.date.from}} - {{task.date.to}}
    </q-card-section>

    <q-separator></q-separator>

    <q-card-actions>
      <q-btn @click="deleteTask()" flat>Удалить</q-btn>
      <q-btn @click="open = true" flat>Редактировать</q-btn>
      <q-dialog v-model="open" persistent>
        <apdates :task="task" :id="id"></apdates>
      </q-dialog>
    </q-card-actions>
  </q-card>
</template>
<script>
  import { ref } from '@vue/runtime-core'
  import { useStore } from "vuex"
  import apdates from 'components/UpdateTask.vue'



  export default {
    props: ['task', 'id'],
    components: {
      apdates,
    },
    setup(props) {
      const store = useStore()

      function deleteTask() {
        store.dispatch('tasks/deleteTask', props.id)
      }

      return {
        deleteTask,
        open: ref(false),
      }
    }


  }

</script>
<style lang="scss">
  .section-title {
    font-weight: bold;
  }

  .card-wrapper {
    width: 300px;
  }

</style>
