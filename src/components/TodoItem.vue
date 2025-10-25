<script setup>
import { defineProps } from 'vue';
import { RouterLink } from 'vue-router'; // Equivalent to 'react-router/Link'

// Define the props passed into the component
// This is equivalent to accessing 'props' in the React function signature
const props = defineProps({
  serialNumber: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

// Note: The custom components <Avatar> and <AvatarFallback>
// are replaced with <div> elements to keep the structure.
</script>

<template>
  <tr class="*:p-4 border-gray-700 text-sm md:p-3 mx-2 hover:bg-gray-200 border-b space-x-5">
    <td class="px-3">{{ props.serialNumber }}</td>

    <td>
      <h4 class="font-semibold hover:underline hover:font-bold">
        <RouterLink :to="props.link">{{ props.title }}</RouterLink>
      </h4>
    </td>

    <td>
      <div class="items-end">
        <div class="avatar-replacement">
          <div class="avatar-fallback-replacement p-1 rounded-full bg-gray-50">U1</div>
        </div>
      </div>
    </td>
  </tr>
</template>