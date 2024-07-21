<script setup>
import { computed } from "vue";
import { useActiveStore } from "@/store";

const activeStore = useActiveStore();

const activeResume = computed(() => activeStore.getActiveResume);
</script>

<template>
  <div class="resume-content" v-if="activeResume">
    <div class="resume-content__skills">
      <h3>Ключевые навыки</h3>
      <ul class="resume-content__skills-list">
        <li v-for="skill in activeResume.skills" :key="skill">{{ skill }}</li>
      </ul>
    </div>
    <div class="resume-content__experience">
      <h3>Опыт работы</h3>
      <p v-for="experience in activeResume.experience" :key="experience.id">
        {{ experience.description }}
      </p>
    </div>
    <div class="resume-content__education">
      <h3>Образование</h3>
      <p v-for="educationItem in activeResume.education" :key="educationItem.id">
        {{ educationItem.description }}
      </p>
    </div>
    <div class="resume-content__about">
      <h3>О себе</h3>
      <p>
        {{ activeResume.candidate.about }}
      </p>
    </div>
  </div>
  <div v-else>
    Резюме не выбрано
  </div>
</template>
