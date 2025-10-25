<script setup>
import { ref, onMounted, watch } from 'vue'; // ref, onMounted (useEffect), watch (for dependency)
import { useRoute, RouterLink } from 'vue-router'; // useRoute (useParams), RouterLink (Link)

// --- Imports to be replaced/simulated ---
 import { fetchTodoItem } from "@/services/api/typicode-service"; // Assume this function is available
import { ArrowLeftIcon, CheckCircle, CircleEllipsis } from 'lucide-vue-next'; // If using lucide for Vue
// ----------------------------------------

// --- Replaced/Simulated Imports ---
// Mock the API function for demonstration
// ----------------------------------

// 1. Get Route Params (Equivalent to `useParams()`)
const route = useRoute();
const todoId = ref(route.params.id);

// 2. State (Equivalent to `useState({})`)
const todo = ref({});

// 3. Data Fetching Logic (Equivalent to `useEffect(() => {...}, [id])`)
const fetchItem = async (id) => {
  console.log(`Fetching todo item with ID: ${id}`);
  try {
    const data = await fetchTodoItem(id);
    console.log("Fetched todo item:", data);
    todo.value = data;
  } catch (error) {
    console.error("Error fetching todo item:", error);
    // Optionally set error state here
  }
};

// Use `watch` to re-fetch when the ID changes (equivalent to dependency array `[id]`)
watch(
  () => route.params.id,
  (newId) => {
    todoId.value = newId;
    fetchItem(newId);
  },
  { immediate: true } // Fetch immediately on mount
);

// We can simplify the initial fetch by using `immediate: true` in the watch,
// or use `onMounted` for the initial load if the ID is guaranteed not to change.
// For this scenario, `watch` with `immediate: true` is the closest pattern to useEffect([id]).
</script>

<template>
  <div class="grid mt-4 text-xs md:text-[1rem] grid-cols-12">
    <div class="p-3 col-span-12">
      <RouterLink to="/">
        <span
          class="p-2 inline-flex items-center gap-1 border rounded-lg hover:bg-gray-700 hover:text-white border-gray-600 text-xs md:text-sm"
        >
          ⬅️
          Back to Todos List
        </span>
      </RouterLink>
    </div>

    <div class="text-sm md:text-[1rem] col-start-1 col-span-10 p-5">
      <h1 class="text-3xl mb-4 text-center">Todo Details</h1>
      <div class="p-4 border rounded-lg shadow-md">
        <p v-if="todo.id" class="text-gray-500">ID: {{ todo.id }}</p>
        <h2 class="text-xl font-semibold mb-2">{{ todo.title }}</h2>
        <p class="text-gray-700">
          Status: &nbsp; <Status :completed="todo.completed" />
        </p>

        <p v-if="!todo.id">Loading todo item...</p>
      </div>
    </div>
  </div>
</template>

<script>
// This is an alternative to placing the nested component in a separate file.
// In a real application, Status.vue would be its own file and imported.
// For simplicity in this single file conversion:
import { defineComponent } from 'vue';

const Status = defineComponent({
  props: {
    completed: {
      type: Boolean,
      default: false,
    },
  },
  template: `
    <span
      :class="['inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium text-white', completed ? 'bg-green-600' : 'bg-purple-600']"
    >
      <template v-if="completed">
        ✅ Completed
      </template>
      <template v-else>
        🟣 Pending
      </template>
    </span>
  `,
  // The structure above simulates the <Badge> component from shadcn
});

export default {
  components: {
    Status,
  },
};
</script>