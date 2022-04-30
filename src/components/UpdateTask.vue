<template lang="">
  <q-card class="card" style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Редактирование задачи</div>
    </q-card-section>
    <form @submit.prevent="submitForm">
      <q-card-section class="q-pt-none">
        <q-input v-model="data.title" label="Заголовок" :rules="[val => !!val || 'Field is required']"
          @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input v-model="data.desc" label="Описание" :rules="[val => !!val || 'Field is required']"
          @keyup.enter="prompt = false" />
      </q-card-section>
      <q-card-section class="flex">
        <q-input label="Дата начала" v-model="data.date.from" />
        <q-input label="Дата окончания" v-model="data.date.to" />
        <div class="flex column justify-center">
          <q-icon size="2em" name="event" />
          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
            <q-date :locale="myLocale" v-model="data.date" range mask="D MMM"></q-date>
          </q-popup-proxy>
        </div>
      </q-card-section>
      <q-card-section>
        <q-select v-model="data.users" :options="users" label="Исполнители" option-label="firstName"
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
        <q-btn flat type="submit" label="Сохранить" v-close-popup />
      </q-card-actions>
    </form>
  </q-card>
</template>
<script>
  import { computed } from '@vue/runtime-core'
  import { useStore } from "vuex"
  import { reactive } from "vue"
  import { useQuasar } from 'quasar'

  export default {
    props: ['task', 'id'],
    setup(props) {
      const store = useStore()
      const $q = useQuasar()

      const data = reactive(JSON.parse(JSON.stringify(props.task)))

      function submitForm() {
        if (data.date.from !== '' && data.date.to !== '' && data.title !== '' && data.users.length !== 0 && data.desc !== ''){
            store.dispatch('tasks/updateTask', {
            id: props.id,
            updates: data
          })
        } else {
          $q.notify({
            color: 'purple',
            message: 'Вы заполнили не все поля!'
          })
        }
      }

      return {
        users: computed(() => store.state.tasks.users),
        data,
        submitForm,
        myLocale: {
          days: 'Понедельник_Вторник_Среда_Четверг_Пятница_Суббота_Воскресенье'.split('_'),
          daysShort: 'Пн_Вт_Ср_Чт_Рт_Сб_Вс'.split('_'),
          months: 'Января_Февраля_Марта_Апреля_Мая_Июня_Июля_Августа_Сентября_Октября_Ноября_Декабря'.split('_'),
          monthsShort: 'Янв_Фев_Мар_Апр_Май_Июн_Июл_Авг_Сен_Окт_Ноя_Дек'.split('_'),
          firstDayOfWeek: 1,
          format24h: true,
          pluralDay: 'ля'
        }
      }
    }
  }

</script>
<style>

</style>
