import { defineStore } from "pinia";

export const useUniversityStore = defineStore("university", {
  state: () => ({
    universities: [],
    loading: false,
  }),
  actions: {
    async getUniversities() {
      this.loading = true;
      const res = await fetch(
        "https://apitest.shabujglobal.africa/api/courses"
      );
      const data = await res.json();
      this.universities = data.data;
      this.loading = false;
    },

    async addUniversity(university) {
      this.universities.push(university);
      const res = await fetch(
        "https://apitest.shabujglobal.africa/api/courses",
        {
          method: "POST",
          body: JSON.stringify(university),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.error) {
        console.log(res.error);
      }
    },
    async updateUniversity(updatedUniversity) {
      try {
        const res = await fetch(
          "https://apitest.shabujglobal.africa/api/courses/" +
            updatedUniversity.id,
          {
            method: "PUT",
            body: JSON.stringify(updatedUniversity),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          const errorData = await res.json();
          console.error("Error updating university:", errorData);
          return;
        }

        const index = this.universities.findIndex(
          (university) => university.id === updatedUniversity.id
        );
        if (index !== -1) {
          this.universities[index] = updatedUniversity;
        }
      } catch (error) {
        console.error("Failed to update university:", error);
      }
    },

    async deleteUniversity(id) {
      this.universities = this.universities.filter((u) => {
        return u.id !== id;
      });

      const res = await fetch(
        "https://apitest.shabujglobal.africa/api/courses/" + id,
        {
          method: "DELETE",
        }
      );
    },
  },
});
