<script setup lang="ts">
import { ProjectMainImageTypes } from "../../types/project";
import {
  StrapiImage,
  StrapiResponsiveFormats,
} from "../../types/strapiResponsiveImage";

const props = defineProps<{
  type: `${ProjectMainImageTypes}`;
  images: StrapiImage[];
}>();

const mainImageCategory = computed(() => {
  return props.type.split("-")[0];
});
</script>

<template>
  <figure>
    <div :class="mainImageCategory">
      <template v-if="type === ProjectMainImageTypes.Drawing">
        <CustomPicture
          :picture-data="images[0].attributes"
          :format="StrapiResponsiveFormats.FullWidth"
        />
      </template>

      <template v-else-if="type === ProjectMainImageTypes.UIMobileDesktop">
        <CustomPicture
          :key="images[0].id"
          :picture-data="images[0].attributes"
          :format="StrapiResponsiveFormats.FullWidth"
        />
        <CustomPicture
          :key="images[1].id"
          :picture-data="images[1].attributes"
          :format="StrapiResponsiveFormats.FourthWidth"
        />
      </template>

      <template
        v-else-if="
          type === ProjectMainImageTypes.UIDesktop ||
          type === ProjectMainImageTypes.DesignVisualID
        "
      >
        <CustomPicture
          :key="images[0].id"
          :picture-data="images[0].attributes"
          :format="StrapiResponsiveFormats.FullWidth"
        />
      </template>

      <template v-else-if="ProjectMainImageTypes.DesignPrint">
        <CustomPicture
          v-for="image in images"
          :key="image.id"
          :picture-data="image.attributes"
          :format="StrapiResponsiveFormats.HalfWidth"
        />
      </template>

      <template v-else>
        <CustomPicture
          v-for="image in images"
          :key="image.id"
          :picture-data="image.attributes"
          :format="StrapiResponsiveFormats.FourthWidth"
        />
      </template>
    </div>
  </figure>
</template>
