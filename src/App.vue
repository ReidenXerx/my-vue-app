<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div class="container-flex row" >
    <div class="container-flex column">
      <div class="container-flex justify-content-center margin-top-common">
        <button class="control-buttons " @click="onClickHandlerExpand">Expand</button>
        <button class="control-buttons" @click="onClickHandlerCollapse">Collapse</button>
      </div>
      <DropdownItem :currentPath="[0]" :entityCombined="firstNode"/>
    </div>
    <UselessList />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import DropdownItem from './components/DropdownItem.vue';
import './styles/Common.scss'
import json from '../test.json'
import { ActionTypes, EntityCombined } from './types';
import { useFocusedElement } from './store/useFocusedElement';
import UselessList from './components/UselessList.vue';

export default defineComponent({
  components: {
    DropdownItem,
    UselessList
},
  setup() {
    const firstNode = ref(json.tree.cat) as unknown as EntityCombined
    const store = useFocusedElement()
    const { setActionType } = store

    const onClickHandlerExpand = () => {
      setActionType(store, { actionType: ActionTypes.expandAll })
    }

    const onClickHandlerCollapse = () => {
      setActionType(store, { actionType: ActionTypes.collapseAll })
    }

    onMounted(() => {
      console.log(json.tree.cat)
      setActionType(store, { actionType: ActionTypes.startupOpening })
    })

    return {
      firstNode,
      onClickHandlerExpand,
      onClickHandlerCollapse,
    }
  }
});
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
