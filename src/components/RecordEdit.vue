<script setup>
import { ref, watch } from "vue";
import { useUniversityStore } from "../stores/useUniversityStore.js";

const props = defineProps({
  id: Number,
});

const emit = defineEmits(["close"]);

const universityStore = useUniversityStore();
const country_name = ref("");
const university_name = ref("");
const course_name = ref("");
const tuition_fee = ref("");

// Watch the id prop and load the corresponding university data
watch(
  () => props.id,
  (newId) => {
    if (newId) {
      const university = universityStore.universities.find(
        (u) => u.id === newId
      );
      if (university) {
        country_name.value = university.country_name;
        university_name.value = university.university_name;
        course_name.value = university.course_name;
        tuition_fee.value = university.tuition_fee;
      }
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  const updatedUniversity = {
    id: props.id,
    country_name: country_name.value,
    university_name: university_name.value,
    course_name: course_name.value,
    tuition_fee: tuition_fee.value,
  };

  await universityStore.updateUniversity(updatedUniversity);
  emit("close");
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">Edit University</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-2">Country Name:</label>
          <input
            v-model="country_name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">University Name:</label>
          <input
            v-model="university_name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Course Name:</label>
          <input
            v-model="course_name"
            type="text"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block mb-2">Tuition Fee:</label>
          <input
            v-model="tuition_fee"
            type="number"
            class="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div class="flex justify-end">
          <button
            @click="emit('close')"
            class="bg-gray-500 text-white py-2 px-4 rounded mr-2"
          >
            Cancel
          </button>
          <button class="bg-blue-500 text-white py-2 px-4 rounded">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
