<script setup lang="ts">
import { Project } from '@/types/project'

const route = useRoute()
const { findOne } = useStrapi()

const projectResponse = await findOne<Project>(
  'projects',
  {
    filters: {slug: route.params.slug},
    populate: ['cover_image', 'skills', 'main_images', 'main_images.images', 'main_images.zoom_images', 'typography', 'typography.typo_visual', 'colors', 'secondary_images']
  }
)
const projectData = ref(projectResponse.data[0])
</script>

<template>
  <div>
    <h1>
      {{ projectData.attributes?.name }}
    </h1>
    <div>
      {{ projectData.attributes?.year }}
    </div>
    <ul>
      <li v-for="skill in projectData.attributes?.skills.data">{{ skill.attributes?.name }}</li>
    </ul>
    <div>
      {{ projectData.attributes?.description }}
    </div>
    <div v-html="$mdRenderer.render(projectData.attributes?.description)"></div>
    <div>
      <template v-for="mainImage in projectData.attributes?.main_images" :key="mainImage.id">
        <CustomPicture :picture-data="mainImage.images?.data[0]?.attributes" format="full_width" />
        <template v-if="mainImage.zoom_images?.data">
          <CustomPicture  :picture-data="mainImage.zoom_images?.data[0]?.attributes" format="zoom_img"/>
        </template>
        
      </template>
    </div>
    <section>
      <h2>Typographie</h2>
      <template v-for="typography in projectData.attributes?.typography" :key="typography.id">
        <img :src="useStrapiMedia(typography.typo_visual?.data?.attributes.url)" :alt="typography.typo_name" />
      </template>
    </section>
    <section>
      <template v-for="color in projectData.attributes?.colors" :key="color.id">
        <div>{{ color.color_name }}</div>
        <div>{{ color.color_code }}</div>
      </template>
    </section>
  </div>
</template>