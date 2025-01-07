<script setup lang="ts">
const { data } = await useAsyncData('projects-data', () => queryContent('/projets').find())

const projectsList = computed(() => {
  return data.value?.map(item => item.data[0].attributes).sort((a, b) => b.year - a.year)
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
.projects {
  &__header {
    padding-top: var(--spacer-11);
  }

  &__content {
    padding-top: var(--spacer-8);
    padding-bottom: var(--spacer-8);
    margin: 0;
    list-style: none;
    row-gap: var(--spacer-8);

    @media screen and (min-width: $breakpoint-xs) {
      grid-template-columns: repeat(6, 1fr);
      column-gap: var(--spacer-6);
    }

    &__item {
      &__link {
        position: relative;
        text-decoration: none;

        &__image {
          position: relative;
          margin-bottom: var(--spacer-6);

          &::before,
          &::after {
            content: '';
            width: var(--spacer-6);
            height: var(--spacer-6);
            border-top: 1px solid var(--color-secondary-darker);
            border-left: 1px solid var(--color-secondary-darker);
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
              width: var(--spacer-5);
              height: var(--spacer-5);
            }
          }

          &::before {
            top: calc(var(--spacer-3) * -1);
            left: calc(var(--spacer-3) * -1);

            .projects__content__item__link:hover &,
            .projects__content__item__link:focus & {
              top: calc(var(--spacer-3) * 1);
              left: calc(var(--spacer-3) * 1);
            }
          }

          &::after {
            right: calc(var(--spacer-3) * -1);
            bottom: calc(var(--spacer-3) * -1);
            transform: rotate(180deg);

            .projects__content__item__link:hover &,
            .projects__content__item__link:focus & {
              right: var(--spacer-3);
              bottom: var(--spacer-3);
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
              opacity: var(--opacity-9);
              background: linear-gradient(
                to bottom right,
                color-mix(
                  in srgb,
                  var(--color-secondary-darker) var(--opacity-percentage-5),
                  var(--color-primary-base)
                ) 25%,
                var(--color-primary-base),
                color-mix(
                  in srgb,
                  var(--color-secondary-darker) var(--opacity-percentage-5),
                  var(--color-primary-base)
                ) 75%);
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
