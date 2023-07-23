<script setup lang="ts">
import { Project } from "@/types/project";

const route = useRoute();
const { findOne } = useStrapi();

const projectResponse = await findOne<Project>("projects", {
  filters: { slug: route.params.slug },
  populate: [
    "cover_image",
    "skills",
    "main_images",
    "main_images.images",
    "main_images.zoom_images",
    "typography",
    "typography.typo_visual",
    "colors",
    "secondary_images",
  ],
});
const projectData = ref(projectResponse.data[0]);
</script>

<template>
  <div>
    <ProjectHeader
      :title="projectData.attributes?.name"
      :cover-image="projectData.attributes?.cover_image?.data"
    />
    <div class="container">
      <div class="section section--third">
        <div>
          {{ projectData.attributes?.year }}
        </div>
        <ul>
          <li
            v-for="skill in projectData.attributes?.skills.data"
            :key="skill.id"
          >
            {{ skill.attributes?.name }}
          </li>
        </ul>
      </div>

      <div
        class="section section--half"
        v-html="$mdRenderer.render(projectData.attributes?.description)"
      ></div>

      <div class="section section--full">
        <div class="project__main-images">
          <template
            v-for="mainImage in projectData.attributes?.main_images"
            :key="mainImage.id"
          >
            <div class="project__main-images__item">
              <ProjectMainImage
                :type="mainImage.type"
                :images="mainImage.images?.data"
              />
            </div>
          </template>
        </div>
      </div>

      <section
        v-if="projectData.attributes?.typography?.length > 0"
        class="section section--half"
      >
        <h2>Typographie</h2>
        <template
          v-for="typography in projectData.attributes?.typography"
          :key="typography.id"
        >
          <img
            :src="useStrapiMedia(typography.typo_visual?.data?.attributes.url)"
            :alt="typography.typo_name"
          />
        </template>
      </section>

      <section
        v-if="projectData.attributes?.colors?.length > 0"
        class="section section--half"
      >
        <template
          v-for="color in projectData.attributes?.colors"
          :key="color.id"
        >
          <div>{{ color.color_name }}</div>
          <div>{{ color.color_code }}</div>
        </template>
      </section>
    </div>
  </div>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project {
  &__main-images {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    row-gap: map-get($spacers, 6);

    &__item {
      display: flex;

      &:nth-of-type(odd) {
        grid-column: 1 / 3;
      }

      &:nth-of-type(even) {
        grid-column: 2 / 4;
        align-items: end;
        justify-content: end;
      }
    }

    @media screen and (min-width: $breakpoint-m) {
      row-gap: map-get($spacers, 8);
    }
  }
}
</style>
