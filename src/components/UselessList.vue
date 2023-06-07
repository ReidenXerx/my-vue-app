<template>
	<div>
		<h2 class="header">{{ `It's useless list` }}</h2>
		<ul class="list">
			<li v-for="(item, index) in uselessList" :key="item">
				<div class="container-flex justify-content-space-between list__item">
					{{ `${(item as string).slice(0, 15)}...` }}
					<button class="list__button" @click="() => removeUselessListElementHandler(index)">x</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUselessList } from '../store/useUselessList';
import { storeToRefs } from 'pinia';
import '../styles/Common.scss'
import { computed } from '@vue/reactivity';

export default defineComponent({
	setup() {
		const store = useUselessList()
		const { uselessList } = storeToRefs(store)
		const { removeUselessListElement } = store

		const removeUselessListElementHandler = computed(() => (index: number) => {
			removeUselessListElement(store, { index })
		})

		return {
			uselessList,
			removeUselessListElementHandler,
		};
	},
});
</script>