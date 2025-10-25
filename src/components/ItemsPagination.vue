<script setup>
import { defineProps, computed, defineEmits } from 'vue';

// 1. Props Definition (Equivalent to React function arguments)
const props = defineProps({
  className: {
    type: String,
    default: '',
  },
  items: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

// 2. Emits Definition (Equivalent to `setCurrentPage` setter function)
// This declares the event that the component can emit to update the parent state.
const emit = defineEmits(['update:currentPage']);

// 3. Computed Properties (Equivalent to logic inside the render function)
// Calculated properties are reactive and update automatically.
const numberOfPages = computed(() => {
  return Math.ceil(props.items / props.itemsPerPage);
});

// The startIndex is calculated but not used in the template, so it's optional.
// const startIndex = computed(() => {
//   return (props.currentPage - 1) * props.itemsPerPage;
// });

// 4. Methods/Handlers (Logic for page changes)
const setPage = (pageNumber) => {
  // Emit the event to update the 'currentPage' prop in the parent component
  emit('update:currentPage', pageNumber);
};

const goToPreviousPage = () => {
  if (props.currentPage > 1) {
    setPage(props.currentPage - 1);
  }
};

const goToNextPage = () => {
  if (props.currentPage < numberOfPages.value) {
    setPage(props.currentPage + 1);
  }
};
</script>

<template>
  <nav :class="['flex justify-center', props.className]">
    <ul class="flex items-center space-x-1">
      <li>
        <button
          v-if="props.currentPage > 1"
          class="p-2 font-semibold text-sm hover:bg-gray-100"
          @click.prevent="goToPreviousPage"
        >
          &lt; Previous
        </button>
      </li>

      <template v-if="props.currentPage > 2">
        <li class="hidden sm:block">
          <button
             class="p-2 font-semibold text-sm hover:bg-gray-100"
            @click.prevent="setPage(1)"
          >
            1
          </button>
        </li>
        <li>
          <span>...</span>
        </li>
      </template>

      <li>
        <button  class="p-2 font-semibold text-sm hover:bg-gray-100" disabled>
          {{ props.currentPage }}
        </button>
      </li>

      <template v-if="props.currentPage < numberOfPages - 1">
        <li>
          <span>...</span>
        </li>
        <li class="hidden sm:block">
          <button
            class="p-2 font-semibold text-sm hover:bg-gray-100"
            @click.prevent="setPage(numberOfPages)"
          >
            {{ numberOfPages }}
          </button>
        </li>
      </template>

      <li>
        <button
          v-if="props.currentPage < numberOfPages"
          class="p-2 font-semibold text-sm hover:bg-gray-100"
          @click.prevent="goToNextPage"
        >
          Next &gt;
        </button>
      </li>
    </ul>
  </nav>
</template>