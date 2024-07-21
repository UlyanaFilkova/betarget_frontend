<script setup>
import ResumeActions from "@/components/crmComponents/resumeComponents/ResumeActions.vue";
import ResumeContent from "@/components/crmComponents/resumeComponents/ResumeContent.vue";
import ResumeInfo from "@/components/crmComponents/resumeComponents/ResumeInfo.vue";
import { computed, watch } from "vue";
import { useActiveStore } from "@/store";

const activeStore = useActiveStore();

const activeResume = computed(() => activeStore.getActiveResume);
</script>

<template>
  <div class="resume">
    <section class="resume-display" v-if="activeResume">
      <ResumeActions :resumeData="activeResume" />
      <ResumeContent />
    </section>
    <ResumeInfo v-if="activeResume" />
    <div class="resume__not-chosen" v-else>Выберите резюме</div>
  </div>
</template>


