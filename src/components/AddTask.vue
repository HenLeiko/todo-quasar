<template lang="">
  <q-card class="card" style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Добавить задачу</div>
    </q-card-section>
    <form @submit.prevent="addTask">
      <q-card-section class="q-pt-none">
        <q-input v-model="task.title" label="Заголовок" :rules="[val => !!val || 'Field is required']"
          @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="task.desc" label="Описание" :rules="[val => !!val || 'Field is required']"
          @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section class="flex">
        <q-input label="Дата начала" v-model="task.date.from" />
        <q-input label="Дата окончания" v-model="task.date.to" />
        <div class="flex column justify-center">
          <q-icon size="2em" name="event" />
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :locale="myLocale" v-model="task.date" range mask="D MMM"></q-date>
          </q-popup-proxy>
        </div>
      </q-card-section>
      <q-card-section>
        <q-select v-model="task.users" :options="users" label="Исполнители" option-label="firstName"
          clearable multiple options-selected-class="text-deep-orange">
          <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
              <q-item-section>
                <q-item-label v-html="scope.opt.firstName"></q-item-label>
                <q-item-label caption>{{ scope.opt.lastName }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-avatar>
                  <img :src="scope.opt.avatar">
                </q-avatar>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Отмена" v-close-popup />
        <q-btn flat type="submit" label="Добавить задачу" v-close-popup/>
      </q-card-actions>
    </form>
  </q-card>
</template>
<script>
  import { reactive } from '@vue/reactivity'
  import { useStore } from "vuex"
  import { computed } from '@vue/reactivity'
  import { useQuasar } from 'quasar'

  export default {
    setup() {
      const store = useStore()
      const $q = useQuasar()
      const task = reactive({
          title: '',
          desc: '',
          date: {
            from: '',
            to: ''
          },
          time: '',
          users: []
        })

      function addTask() {
        if (task.date.from !== '' && task.date.to !== '' && task.title !== '' && task.users.length !== 0) {
          store.dispatch('tasks/addTask', task)
        } else {
          $q.notify({
            color: 'purple',
            message: 'Вы заполнили не все поля ввода!'
          })
        }
      }

      return {
        task,
        myLocale: {
          days: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
          daysShort: 'Пн_Вт_Ср_Чт_Рт_Сб_Вс'.split('_'),
          months: 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
          monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
          firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
          format24h: true,
          pluralDay: 'ля'
        },
        users: computed(() => store.state.tasks.users),
        addTask
      }
    }
  }

</script>
<style>

</style>
