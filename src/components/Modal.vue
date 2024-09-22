<script setup>
import { ref, watch } from "vue";
import { useUniversityStore } from "../stores/useUniversityStore";

const props = defineProps({
  mode: String,
  university: Object,
});
const emit = defineEmits(["close"]);

const universityStore = useUniversityStore();

const country_name = ref("");
const university_name = ref("");
const course_name = ref("");
const tuition_fee = ref("");
watch(
  () => props.university,
  (newUniversity) => {
    if (newUniversity && props.mode === "edit") {
      country_name.value = newUniversity.country_name;
      university_name.value = newUniversity.university_name;
      course_name.value = newUniversity.course_name;
      tuition_fee.value = newUniversity.tuition_fee;
    } else {
      country_name.value = "";
      university_name.value = "";
      course_name.value = "";
      tuition_fee.value = "";
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  if (
    country_name.value &&
    university_name.value &&
    course_name.value &&
    tuition_fee.value
  ) {
    const universityData = {
      country_name: country_name.value,
      university_name: university_name.value,
      course_name: course_name.value,
      tuition_fee: tuition_fee.value,
    };

    if (props.mode === "add") {
      universityData.id = Math.floor(Math.random() * 1000);
      universityStore.addUniversity(universityData);
    } else if (props.mode === "edit") {
      universityData.id = props.university.id;
      universityStore.updateUniversity(universityData);
    }

    emit("close");
  }
};
</script>

<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-bold mb-4">
        {{ mode === "add" ? "Add University" : "Edit University" }}
      </h2>
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
            {{ mode === "add" ? "Add" : "Update" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
