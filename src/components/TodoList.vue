<script setup>
import { ref, computed, onMounted } from 'vue';
import TodoItem from './TodoItem.vue'; // Assume TodoItem.vue is the converted child component
import ItemsPagination from './ItemsPagination.vue'; // Assume ItemsPagination.vue is the converted child component
 import { fetchAllTodoItems } from "../services/api/typicode-service";
 import "../styles.css"
// ----------------------------------------


// ----------------------------------

// 1. Constants
const pageSize = 10;

// 2. State (Equivalent to `useState()`)
const page = ref(1); // Equivalent to `const [page, setPage] = useState(1);`
const todos = ref([]); // Equivalent to `let [todos, setTodos] = useState([]);`

// 3. Lifecycle Hook (Equivalent to `useEffect(() => {...}, [])`)
onMounted(() => {
  // Data Fetching
  fetchAllTodoItems()
    .then((data) => {
      todos.value = data; // Update state using .value
    })
    .catch(console.error); // Use console.error instead of console.log for errors

  // Console log equivalent (Use standard browser global)
  console.log(navigator.userAgent);
});

// 4. Computed Properties (Equivalent to logic inside the render function)
const numberOfPages = computed(() => {
  return Math.ceil(todos.value.length / pageSize);
});

const startIndex = computed(() => {
  return (page.value - 1) * pageSize;
});

const endIndex = computed(() => {
  return startIndex.value + pageSize;
});

// 5. Paginated and Mapped Todos
// Use a computed property to handle the filtering and slicing logic
const paginatedTodos = computed(() => {
  return todos.value
    .slice(startIndex.value, endIndex.value)
    .map((e) => ({
        ...e,
        link: `${e.id}`, // Prepare the link string
        serialNumber: e.id, // Ensure serial number is mapped to id
    }));
});
</script>

<template>
  <div class="grid justify-center">
    <div class="w-fit">
      <h1 class="text-3xl mb-4 p-2 text-center">Todo Application</h1>

      <h3 class="text-xl text-center pb-2">
        Page {{ page }} of {{ numberOfPages }}
      </h3>
      <table>
        <thead class="p-2 text-left">
          <tr class="bg-gray-100">
            <th class="p-2">#</th>
            <th class="p-2">Title</th>
            <th class="p-2">User</th>
          </tr>
        </thead>
        <tbody>
          <TodoItem
            v-for="todo in paginatedTodos"
            :key="todo.id"
            :serialNumber="todo.serialNumber"
            :link="todo.link"
            v-bind="todo" 
            
            />
          <tr v-if="!todos.length"><td colspan="3" class="p-4 text-center">Loading todos...</td></tr>
        </tbody>
      </table>

      <ItemsPagination
        class-name="mt-4"
        v-model:currentPage="page"
        :items="todos.length"
        :items-per-page="pageSize"
      />
    </div>
  </div>
</template>

<style>
/* You would replace the content of App.css here, or use Tailwind imports */
/* Example: */
/* .grid { display: grid; } */
/* Add global or component styles here */
</style>