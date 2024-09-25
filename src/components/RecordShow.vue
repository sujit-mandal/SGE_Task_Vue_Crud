<script setup>
import { useUniversityStore } from "../stores/useUniversityStore.js";

const emit = defineEmits(["edit"]);
const universityStore = useUniversityStore();
universityStore.getUniversities();

const handleDelete = async (id) => {
  await universityStore.deleteUniversity(id);
};

const handleEdit = (id) => {
  emit("edit", id);
};
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- Table to display universities -->
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Country Name</th>
          <th class="py-2 px-4 border-b">University Name</th>
          <th class="py-2 px-4 border-b">Course Name</th>
          <th class="py-2 px-4 border-b">Tuition Fee</th>
          <th class="py-2 px-4 border-b">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="university in universityStore.universities"
          :key="university.id"
          class="text-center"
        >
          <td class="py-2 px-4 border-b">{{ university.country_name }}</td>
          <td class="py-2 px-4 border-b">{{ university.university_name }}</td>
          <td class="py-2 px-4 border-b">{{ university.course_name }}</td>
          <td class="py-2 px-4 border-b">{{ university.tuition_fee }}</td>
          <td class="py-2 px-4 border-b">
            <button
              @click="handleEdit(university.id)"
              class="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              @click="handleDelete(university.id)"
              class="text-red-500 hover:underline ml-4"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
