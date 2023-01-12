<script setup lang="ts">
import { Projects } from '@/types/project'
import { Homepage } from '@/types/homepage'

const { find } = useStrapi()
const homepageResponse = await find<Homepage>('homepage', {populate: ['highlight_medias']})
const homepageData = ref(homepageResponse.data)
</script>

<template>
  <div>
    <h1>{{ homepageData.attributes.title }}</h1>
    <p>{{ homepageData.attributes.subtitle }}</p>
    testtttt
  </div>
</template>