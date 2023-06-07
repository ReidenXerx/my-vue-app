<template>
  <div class="container-flex column dropdownItem">
    <div :class="className">
      <button @click="toggle">
        <p v-if="opened">-</p>
        <p v-else>+</p>
      </button>
      
      <p>{{ content }}</p>

    </div>
    <div v-if="opened" class="container-flex column">
      <DropdownItem v-for="(entity, index) in siblings" :entityCombined="entity" :currentPath="computeCurrentPath(index)" :key="entity._nodeId" />  
    </div>
  </div>
  
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import '../styles/Common.scss'
import { ActionTypes, EntityCombined } from '../types';
import { getSiblingsFromEntityCombined, getEntityContentFromEntityCombined } from '../utils';
import { useFocusedElement } from '../store/useFocusedElement';
import { storeToRefs } from 'pinia';
import { useUselessList } from '../store/useUselessList';

type DropdownItemProps = {
  entityCombined: EntityCombined,
  currentPath: Array<number>,
}

export default defineComponent({
    name: "DropdownItem",
    props: {
      entityCombined: {
        type: Object as () => EntityCombined,
        required: true,
      },
      currentPath: {
        type: Array as () => Array<number>,
        required: true,
      }
    },
    setup({ entityCombined, currentPath }: DropdownItemProps) {
      const storeFocusedElement = useFocusedElement()
      const storeUselessList = useUselessList()
      const { focusedElement, actionType } = storeToRefs(storeFocusedElement)
      const { setFocusElement, clearActionType } = storeFocusedElement
      const { addUselessListElement } = storeUselessList
      const opened = ref(false)

      const isFocused = computed(() => {
        return currentPath.join(',') === focusedElement.value.join(',')
      })

      const className = computed(() => {
        return {
          'selectedDropdownItem': isFocused.value,
          'color-white': isFocused.value,
          'align-items-center': true,
          'container-flex': true,
        };
      });

      const isOpened = computed(() => {
        if (actionType.value === ActionTypes.expandAll && currentPath.join(',').indexOf(focusedElement.value.join(',')) === 0) {
          return true
        }

        if (actionType.value === ActionTypes.collapseAll && currentPath.join(',').indexOf(focusedElement.value.join(',')) === 0) {
          return false
        }

        if (actionType.value === ActionTypes.startupOpening && currentPath.length < focusedElement.value.length) {
          return true
        }
      });

      watch(isOpened, (newValue) => {
        console.log('triggered')
        opened.value = newValue ?? opened.value
      }, { immediate: true })

      const siblings = computed(() => getSiblingsFromEntityCombined(entityCombined))
      const content = computed(() => getEntityContentFromEntityCombined(entityCombined).join(", "));
      const computeCurrentPath = (index: number) => {
        return [...currentPath, index];
      };
      onMounted(() => {
        console.log(currentPath)
      })
      const toggle = () => {
          // pure function
          if (isFocused.value) {
            opened.value = opened.value ? false : true;
          }
          setFocusElement(storeFocusedElement, { focusedElement: [...currentPath] })
          addUselessListElement(storeUselessList, { element: content.value })
          clearActionType(storeFocusedElement)
      };

      watch(focusedElement, (newValue) => {
        console.log('focusedElement update', newValue)
      })

      watch(actionType, (newValue) => {
        console.log('actionType update', newValue)
      })
      
      return {
          toggle,
          opened,
          content,
          siblings,
          currentPath,
          computeCurrentPath,
          className,
      };
    },
});
</script>

<style scoped lang="scss">
.dropdownItem {
  @include dynamicPadding(2)
}
</style>