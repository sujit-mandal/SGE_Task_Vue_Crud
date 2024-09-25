<script setup>
import { ref } from "vue";
import RecordShow from "../components/RecordShow.vue";
import RecordAdd from "../components/RecordAdd.vue";
import RecordEdit from "../components/RecordEdit.vue";
import { useUniversityStore } from "../stores/useUniversityStore.js";

const universityStore = useUniversityStore();
universityStore.getUniversities();

const currentEditId = ref(null); // Tracks the current university being edited
const editing = ref(false); // Tracks if the edit form is being shown
const addFormShow = ref(false); // Tracks if the add form is being shown

// Show the add form
const showAddForm = () => {
  addFormShow.value = true;
};

// Hide the add form
const hideAddForm = () => {
  addFormShow.value = false;
};

// Handle the edit event, show the edit form, and pass the id
const handleEdit = (id) => {
  currentEditId.value = id;
  editing.value = true;
};

// Close the edit form
const handleEditClose = () => {
  editing.value = false;
  currentEditId.value = null;
};
</script>

<template>
  <div class="container pb-20">
    <h1 class="text-center my-10 font-bold text-5xl">
      University Course Information
    </h1>
    <button
      @click="showAddForm"
      class="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4 float-right"
    >
      Add University
    </button>
  </div>

  <div>
    <!-- Render RecordShow -->
    <RecordShow @edit="handleEdit" />

    <!-- Render RecordAdd only if addFormShow is true -->
    <RecordAdd v-if="addFormShow" @close="hideAddForm" />

    <!-- Render RecordEdit only if editing is true -->
    <RecordEdit v-if="editing" :id="currentEditId" @close="handleEditClose" />
  </div>
</template>
