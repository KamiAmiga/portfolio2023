<script setup lang="ts">
const { data } = await useAsyncData('projects-data', () => queryContent('/projets').find())

const projectsList = computed(() => {
  return data.value?.map(item => item.data[0].attributes)
})
</script>

<template>
  <main class="projects">
    <MainMenu />

    <header class="container projects__header">
      <div class="section section--full">
        <h1 class="heading--main">Projets</h1>
      </div>
    </header>

    <ul v-if="projectsList" class="container projects__content">
      <li v-for="project in projectsList" :key="project.id" class="section section--third projects__content__item">
        <NuxtLink :to="`/projets/${project.slug}`" class="projects__content__item__link">
          <div class="projects__content__item__link__image">
            <div class="projects__content__item__link__image__wrapper">
              <custom-picture :picture-data="project.cover_image.data?.attributes" format="half_width" />
            </div>
          </div>

          <h2 class="heading--second projects__content__item__link__name">{{ project.name }}</h2>
        </NuxtLink>
      </li>
    </ul>
  </main>
</template>

<style lang="scss">
@use "../assets/styles/abstracts" as *;

.projects {
  &__header {
    padding-top: map-get($spacers, 11);
  }

  &__content {
    padding-top: map-get($spacers, 8);
    padding-bottom: map-get($spacers, 8);
    margin: 0;
    list-style: none;
    row-gap: map-get($spacers, 8);

    @media screen and (min-width: $breakpoint-xs) {
      grid-template-columns: repeat(6, 1fr);
      column-gap: map-get($spacers, 6);
    }

    &__item {
      &__link {
        position: relative;
        text-decoration: none;

        &__image {
          position: relative;
          margin-bottom: map-get($spacers, 6);

          &::before,
          &::after {
            content: '';
            width: map-get($spacers, 6);
            height: map-get($spacers, 6);
            border-top: 1px solid map-get($theme-color-secondary, darker);
            border-left: 1px solid map-get($theme-color-secondary, darker);
            position: absolute;
            z-index: 1;
            transition: width .3s cubic-bezier(0.16, 1, 0.3, 1),
              height .3s cubic-bezier(0.16, 1, 0.3, 1),
              top .3s cubic-bezier(0.16, 1, 0.3, 1),
              right .3s cubic-bezier(0.16, 1, 0.3, 1),
              bottom .3s cubic-bezier(0.16, 1, 0.3, 1),
              left .3s cubic-bezier(0.16, 1, 0.3, 1);

            .projects__content__item__link:hover &,
            .projects__content__item__link:focus & {
              width: map-get($spacers, 5);
              height: map-get($spacers, 5);
            }
          }

          &::before {
            top: map-get($spacers, 3) * -1;
            left: map-get($spacers, 3) * -1;

            .projects__content__item__link:hover &,
            .projects__content__item__link:focus & {
              top: map-get($spacers, 3) * 1;
              left: map-get($spacers, 3) * 1;
            }
          }

          &::after {
            right: map-get($spacers, 3) * -1;
            bottom: map-get($spacers, 3) * -1;
            transform: rotate(180deg);

            .projects__content__item__link:hover &,
            .projects__content__item__link:focus & {
              right: map-get($spacers, 3) * 1;
              bottom: map-get($spacers, 3) * 1;
            }
          }

          &__wrapper {
            position: relative;
            overflow: hidden;
            aspect-ratio: 1 / 1;

            &::after {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              clip-path: polygon(0 0, 0 102%, 0 102%, 0 0, 102% 0, 102% 102%, 0 102%, 0 102%, 102% 102%, 102% 0);
              opacity: map-get($opacities, 9);
              background: linear-gradient(to bottom right,
                  mix(map-get($theme-color-secondary, darker),
                    map-get($theme-color-primary, base),
                    32%),
                  25%,
                  map-get($theme-color-primary, base),
                  75%,
                  mix(map-get($theme-color-secondary, darker),
                    map-get($theme-color-primary, base),
                    32%));
              transition: clip-path .3s cubic-bezier(0.33, 1, 0.68, 1);

              .projects__content__item__link:hover &,
              .projects__content__item__link:focus & {
                clip-path: polygon(0 0, 0 102%, 8% 102%, 8% 8%, 92% 8%, 92% 92%, 8% 92%, 8% 102%, 102% 102%, 102% 0);

              }
            }
          }

          img {
            max-width: none;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }

        &__name {
          margin-bottom: 0;
        }
      }

      @media screen and (min-width: $breakpoint-xs) {
        grid-column: span 3;
      }

      @media screen and (min-width: $breakpoint-m) {
        grid-column: span 2;
      }
    }
  }
}
</style>
