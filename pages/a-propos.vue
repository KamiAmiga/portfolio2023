<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { About } from "@/types/about";

const { findOne } = useStrapi();
const aboutResponse = await findOne<About>("about", {
  populate: ["experience", "skills", "interests", "social_links"],
});
const aboutData = ref(aboutResponse.data);
</script>

<template>
  <main class="about">
    <header class="container">
      <div class="section section--full">
        <h1 class="heading--main">A propos</h1>
      </div>
    </header>

    <div class="container">
      <div class="section section--half">
        <div v-html="$mdRenderer.render(aboutData.attributes.intro)"></div>
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Parcours</h2>

        <about-history :history="aboutData.attributes.experience" />
      </div>

      <div class="section section--full">
        <h2 class="heading--second">Compétences</h2>
        <ul>
          <li v-for="skill in aboutData.attributes.skills.data" :key="skill.id">
            <h3>{{ skill.attributes.name }}</h3>
            <nuxt-icon :name="skill.attributes.icon_name" />
            <span v-if="skill.attributes.level">{{
              skill.attributes.level === 1
              ? "Connaissance"
              : "Bonne connaissance"
            }}</span>
          </li>
        </ul>
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Intérêts</h2>
        <ul>
          <li v-for="interest in aboutData.attributes.interests" :key="interest.id">
            <h3>{{ interest.name }}</h3>
            <nuxt-icon :name="interest.icon_name" />
          </li>
        </ul>
      </div>

      <div class="section section--half">
        <h2 class="heading--second">Contacts</h2>
        <ul>
          <li v-for="social_link in aboutData.attributes.social_links" :key="social_link.id">
            <a :href="social_link.url">
              <nuxt-icon :name="social_link.icon_name" />
              {{ social_link.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>
