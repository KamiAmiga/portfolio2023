<script setup lang="ts">
</script>

<template>
  <main class="project">
    <MainMenu />

    <ContentQuery :path="$route.path" find="one">
      <template #default="{ data }">
        <ProjectHeader
          v-if="data?.data[0].attributes?.name"
          :title="data.data[0].attributes?.name"
          :cover-image="data.data[0].attributes?.cover_image?.data" />
        <div class="container project__content">
          <section class="section section--third">
            <ProjectStats
              v-if="data?.data[0].attributes?.year"
              :year="data.data[0].attributes?.year"
              :skills="data.data[0].attributes?.skills?.data"/>
          </section>
    
          <section class="section section--half">
            <RichtextWrapper 
              v-if="data?.data[0].attributes?.description"
              :text="data.data[0].attributes?.description" />
          </section>
    
          <section class="section section--full">
            <div v-if="data?.data[0].attributes?.main_images" class="project__main-images">
              <template v-for="mainImage in data.data[0].attributes?.main_images" :key="mainImage.id">
                <div class="project__main-images__item">
                  <ProjectMainImage :type="mainImage.type" :images="mainImage.images?.data" />
                </div>
              </template>
            </div>
          </section>
    
          <section
            v-if="data?.data[0].attributes?.typography && data?.data[0].attributes?.typography?.length > 0"
            class="section section--half">
            <h2 class="heading--second">Typographie</h2>
    
            <ProjectTypography :fonts="data.data[0].attributes.typography" />
          </section>
    
          <section 
            v-if="data?.data[0].attributes?.colors
              && data?.data[0].attributes?.colors?.length > 0"
            class="section section--half">
            <h2 class="heading--second">Couleurs</h2>
    
            <ProjectColors :colors="data.data[0].attributes?.colors" />
          </section>
    
          <section v-if="data?.data[0].attributes?.secondary_images?.data" class="section section--full">
            <ProjectSecondaryImages :images="data.data[0].attributes?.secondary_images?.data" />
          </section>
        </div>
      </template>

      <template #not-found>
        <p>No content found.</p>
      </template>
    </ContentQuery>
  </main>
</template>

<style lang="scss">
@use "../../assets/styles/abstracts" as *;

.project {
  &__content {
    padding-top: map-get($spacers, 8);
    padding-bottom: map-get($spacers, 8);
    row-gap: map-get($spacers, 9);

    @media screen and (min-width: $breakpoint-m) {
      padding-top: map-get($spacers, 10);
      padding-bottom: map-get($spacers, 10);
      row-gap: map-get($spacers, 10);
    }
  }

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
