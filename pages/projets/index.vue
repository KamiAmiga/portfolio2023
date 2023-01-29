<script setup lang="ts">
import { Project } from '@/types/projects'

const { find } = useStrapi()
const projectsResponse = await find<Project>('projects', {fields: ['name', 'year'], populate: ['cover_image']})
const projectsData = reactive(projectsResponse.data)
const projectsDataSorted = computed(() => {
  return projectsData.sort((a, b) => b.attributes.year - a.attributes.year)
})
</script>

<template>
  <div>
    <h1>Projets</h1>

    <ul>
      <li v-for="project in projectsDataSorted" :key="project.id">
        <h2>{{ project.attributes.name }}</h2>
        <img :src="useStrapiMedia(project.attributes.cover_image.data?.attributes?.url)"/>
      </li>
    </ul>
  </div>
</template>