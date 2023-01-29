<script setup lang="ts">
import { About } from '@/types/about'

const { findOne } = useStrapi()
const aboutResponse = await findOne<About>('about', {populate: ['experience', 'skills', 'interests', 'social_links']})
const aboutData = ref(aboutResponse.data)
</script>

<template>
  <div>
    <h1>A propos</h1>
    <div v-html="$mdRenderer.render(aboutData.attributes.intro)"></div>

    <h2>Parcours</h2>
    <ul>
      <li v-for="experience in aboutData.attributes.experience" :key="experience.id">
        <h3>{{ experience.name }}</h3>
        <p>
          <span v-if="experience.place">{{ experience.place }},</span>
          <span>{{ experience.date }}</span>
        </p>
      </li>
    </ul>

    <h2>Compétences</h2>
    <ul>
      <li v-for="skill in aboutData.attributes.skills.data" :key="skill.id">
        <h3>{{ skill.attributes.name }}</h3>
        <nuxt-icon :name="skill.attributes.icon_name"/>
        <span v-if="skill.attributes.level">{{ skill.attributes.level === 1 ? 'Connaissance' : 'Bonne connaissance' }}</span>
      </li>
    </ul>

    <h2>Intérêts</h2>
    <ul>
      <li v-for="interest in aboutData.attributes.interests" :key="interest.id">
        <h3>{{ interest.name }}</h3>
        <nuxt-icon :name="interest.icon_name"/>
      </li>
    </ul>

    <h2>Contacts</h2>
    <ul>
      <li v-for="social_link in aboutData.attributes.social_links" :key="social_link.id">
        <a :href="social_link.url">
          <nuxt-icon :name="social_link.icon_name"/>
          {{ social_link.name }}
        </a>
      </li>
    </ul>
  </div>
</template>