<script setup lang="ts">
import { Project } from "@/types/project";

const { find } = useStrapi();

const projectsResponse = await find<Project>("projects", {
  fields: ["name", "slug", "year"],
  populate: ["cover_image"],
});
const projectsData = reactive(projectsResponse.data);
const projectsDataSorted = computed(() => {
  return projectsData.sort((a, b) => b.attributes.year - a.attributes.year);
});
</script>

<template>
  <div>
    <h1>Projets</h1>

    <ul>
      <li v-for="project in projectsDataSorted" :key="project.id">
        <h2>{{ project.attributes?.name }}</h2>
        <NuxtLink :to="`/projets/${project.attributes?.slug}`">
          {{ project.attributes?.slug }}
        </NuxtLink>
        <custom-picture
          :picture-data="project.attributes?.cover_image.data?.attributes"
          format="half_width"
        />
      </li>
    </ul>
  </div>
</template>
