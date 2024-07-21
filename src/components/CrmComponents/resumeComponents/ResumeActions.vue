<script setup>
import {
  reactive,
  ref,
  inject,
  onMounted,
  watch,
  computed,
  unref,
  toRaw,
  defineProps,
} from "vue";
import { useActiveStore } from "@/store";
import Resume from "@/models/resume.js";
import axios from "axios"; 

const resumeStageElement = ref(null);
const resumeStageInput = ref(null);
const resumeChangeStageButton = ref(null);
const resumeCancelStageButton = ref(null);
const resumeSaveStageButton = ref(null);

const store = useActiveStore();

// const props = defineProps({
//   resumeData: Object,
//   required: true,
// });

// const resume = ref(new Resume(props.resumeData));

// watch(props.resumeData, (newResume) => {
//   resumeStageElement.value.textContent = translateResumeStage(
//     newResume.resumeStage
//   );
//   resumeStageElement.value.dataset.stage = newResume.resumeStage;
// });

// watch(
//   () => store.state.activeResume,
//   (newResume) => {
//     console.dir(newResume);
//     if (newResume) {
//       resumeStageElement.value.textContent = translateResumeStage(
//         newResume.resumeStage
//       );
//       resumeStageElement.value.dataset.stage = newResume.resumeStage;
//     }
//   }
// );

const translateResumeStage = (resumeStage) => {
  switch (resumeStage) {
    case "in_work":
      return "В работе";
    case "screening":
      return "Скрининг";
    case "interview":
      return "Интервью";
    case "review":
      return "На рассмотрении";
    case "accepted":
      return "Принято";
    case "rejected":
      return "Отказ";
    case "offer":
      return "Оффер";
    default:
      return resumeStage;
  }
};
</script>


<template>
  <div class="resume-display__actions">
    <div class="resume-display__stage">
      <p
        ref="resumeStageElement"
        class="resume-display__current-stage"
        data-stage=""
      ></p>
      <button class="resume-display__change-stage">Сменить этап</button>
      <!-- <p>Выберите этап</p> -->
      <select class="resume-display__stage-input">
        <option value="in_work">В работе</option>
        <option value="screening">Скрининг</option>
        <option value="interview">Интервью</option>
        <option value="offer">Оффер</option>
        <option value="rejected">Отказ</option>
      </select>
      <div class="resume-display__stage-actions">
        <button class="resume-display__save-stage" disabled>Сохранить</button>
        <button class="resume-display__cancel-stage">Отмена</button>
      </div>
    </div>
    <div class="resume-display__history"></div>
  </div>
</template>
