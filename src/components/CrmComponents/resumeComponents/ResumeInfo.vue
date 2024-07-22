<script setup>
import { computed } from "vue";
import { useActiveStore } from "@/store";
import defaultProfilePhoto from "@/assets/img/default_profile_photo.jpg";

const activeStore = useActiveStore();

const activeResume = computed(() => activeStore.getActiveResume);
</script>

<template>
  <section class="resume-info" v-if="activeResume">
    <div class="resume__info-container">
      <div class="resume-info__rating-result">
        <p>Оценка:</p>
        <span id="resume-info__rating" class="resume-info__rating-result-span">
          {{ activeResume.rating }}
        </span>
        / 10
      </div>
      <div class="resume-info__rating-slider">
        <button
          class="resume-info__arrow resume-info__arrow_minus"
          id="resume-info__decrease"
        >
          -
        </button>
        <input
          type="range"
          id="resume-info__slider"
          min="0"
          max="10"
          :value="activeResume.rating"
          class="resume-info__slider"
        />
        <button
          class="resume-info__arrow resume-info__arrow_plus"
          id="resume-info__increase"
        >
          +
        </button>
      </div>
      <div class="resume-info__photo-container">
        <div class="resume-info__photo-wrapper">
          <img
            :src="activeResume.candidate.profilePicture || defaultProfilePhoto"
            class="resume-info__photo"
          />
        </div>
      </div>
      <div class="resume-info__name">
        {{ activeResume.candidate.firstName }}
        {{ activeResume.candidate.lastName }}
      </div>
      <div class="resume-info__position">{{ activeResume.jobTitle }}</div>
      <div class="resume-info__list">
        <li>
          <h6>Телефон</h6>
          <div class="resume-info__list-component">
            <a
              :href="'tel:' + activeResume.candidate.phoneNumber"
              type="tel"
              class="resume-info__phone"
            >
              {{ activeResume.candidate.phoneNumber }}
            </a>
          </div>
        </li>
        <li>
          <h6>Email</h6>
          <div class="resume-info__list-component">
            <a
              :href="'mailto:' + activeResume.candidate.email"
              type="email"
              class="resume-info__email"
            >
              {{ activeResume.candidate.email }}
            </a>
          </div>
        </li>
        <li>
          <h6>Город</h6>
          <div class="resume-info__list-component resume-info__city">
            {{ activeResume.candidate.city }}
          </div>
        </li>
        <li>
          <h6>Желаемая ЗП</h6>
          <div class="resume-info__list-component resume-info__salary">
            {{ activeResume.expectedSalary }}
          </div>
        </li>
        <li>
          <h6>Возраст</h6>
          <div class="resume-info__list-component resume-info__age">
            {{ activeResume.candidate.age }}
          </div>
        </li>
      </div>
      <div class="resume-info__contacts"></div>
    </div>
  </section>
</template>
