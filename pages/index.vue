<script setup lang="ts">
import { Homepage } from '@/types/homepage'

const { findOne } = useStrapi()
const homepageResponse = await findOne<Homepage>('homepage', {populate: ['highlight_medias']})
const homepageData = ref(homepageResponse.data)
</script>

<template>
  <div>
    <h1>{{ homepageData.attributes.title }}</h1>
    <p>{{ homepageData.attributes.subtitle }}</p>
    <NuxtLink to="/a-propos">
      À propos
    </NuxtLink>
    <NuxtLink to="/projets">
      Projets
    </NuxtLink>
  </div>
</template>