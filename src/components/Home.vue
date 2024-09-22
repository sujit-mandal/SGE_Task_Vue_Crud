<script setup>
import { ref } from "vue";
import { useUniversityStore } from "../stores/useUniversityStore";
import Modal from "./Modal.vue";

const universityStore = useUniversityStore();
universityStore.getUniversities();

const showModal = ref(false);
const mode = ref("add");
const currentUniversity = ref(null);

const openModal = (editMode = "add", university = null) => {
  mode.value = editMode;
  currentUniversity.value = university;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <h1 class="text-center my-10 font-bold text-5xl">SGE Task</h1>
  <div class="flex justify-center items-center" v-if="universityStore.loading">
    Loading....
  </div>

  <div class="container mx-auto p-4">
    <button
      @click="openModal('add')"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 float-right"
    >
      Add Data
    </button>
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
              @click="openModal('edit', university)"
              class="text-blue-500 hover:underline"
            >
              Edit
            </button>
            <button
              @click="universityStore.deleteUniversity(university.id)"
              class="text-red-500 hover:underline ml-4"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <Modal
      v-if="showModal"
      :mode="mode"
      :university="currentUniversity"
      @close="closeModal"
    />
  </div>
</template>
