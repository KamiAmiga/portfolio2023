<script setup lang="ts">
import { Project } from '@/types/projects'

const { find } = useStrapi()
const projectsResponse = await find<Project>('projects', {fields: ['name', 'slug', 'year'], populate: ['cover_image']})
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
        <NuxtLink to="">
          <h2>{{ project.attributes?.name }}</h2>
        </NuxtLink>
        <custom-picture :picture-data="project.attributes?.cover_image.data?.attributes" format="full_width" />
      </li>
    </ul>
  </div>
</template>