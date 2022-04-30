<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          todo
        </q-toolbar-title>
         <q-btn color="secondary" label="Добавить" @click="prompt = true" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
      <q-dialog v-model="prompt" persistent>
      <addTask @close="prompt = false"></addTask>
    </q-dialog>
    </q-page-container>

  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import addTask from 'components/AddTask.vue'


export default defineComponent({
  name: 'MainLayout',

  components: {
    addTask
  },

  setup () {

    return {
      prompt: ref(false),
    }
  }
})
</script>
