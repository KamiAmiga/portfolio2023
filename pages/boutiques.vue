<script setup lang="ts">
import { ShopsPage } from "@/types/shops-page";

const { findOne } = useStrapi();
const shopsPageResponse = await findOne<ShopsPage>("shops-page", {
  populate: ["shops_list", "social_links"],
});
const shopsPageData = ref(shopsPageResponse.data);
</script>

<template>
  <main class="shops">
    <div class="container shops__header">
      <div class="section section--full">
        <img src="~/assets/images/logoWithBg.svg" alt="Logo" class="shops__header__logo" />
        <h1 class="shops__header__title font-sans--md-capitalized">{{ shopsPageData.attributes.title }}</h1>
        <p class="font-mono--small">{{ shopsPageData.attributes.subtitle }}</p>
      </div>
    </div>

    <div class="container shops__content">
      <div class="section section--full">
        <h2 class="shops__content__title-second font-sans--capitalized">Mes boutiques</h2>

        <ul class="shops__content__shops-list">
          <li v-for="shopItem in shopsPageData.attributes.shops_list" :key="shopItem.id"
            class="shops__content__shops-list__item">
            <a :href="shopItem.url" target="_blank" class="shops__content__shops-list__item__link">
              <nuxt-icon :name="shopItem.icon_name" class="icon icon--xl shops__content__shops-list__item__link__icon" />
              {{ shopItem.name }}
            </a>
          </li>
        </ul>
      </div>

      <div class="section section--full">
        <h2 class="shops__content__title-second font-sans--base">Retrouvez
          moi aussi sur : </h2>

        <ul class="shops__content__socials-links">
          <li v-for="socialLink in shopsPageData.attributes.social_links" :key="socialLink.id">
            <a :href="socialLink.url" target="blank" class="shops__content__socials-links__item">
              <div
                class="shops__content__socials-links__item__icon-wrapper icon-wrapper icon-wrapper--m icon-wrapper--square">
                <nuxt-icon :name="socialLink.icon_name" class="shops__content__socials-links__item__icon icon icon--s" />
              </div>

              {{ socialLink.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style lang="scss">
@use "../assets/styles/abstracts" as *;

.shops {
  &__header {
    padding-top: map-get($spacers, 8);
    text-align: center;

    &__logo {
      width: 8rem;
      margin: 0 auto map-get($spacers, 6);
      border-radius: 50%;
      box-shadow: 0 map-get($spacers, 1) map-get($spacers, 2) fade-out(map-get($theme-color-accent, base), map-get($fading-out, 4));
    }

    &__title {
      margin-bottom: map-get($spacers, 2);
    }
  }

  &__content {
    padding-top: map-get($spacers, 8);
    padding-bottom: map-get($spacers, 8);
    row-gap: map-get($spacers, 10);

    &__title-second {
      text-align: center;
      color: map-get($theme-color-primary, reverse);
    }

    &__shops-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: map-get($spacers, 3);
      padding: 0;
      margin: $spacer 0 0 0;
      list-style: none;

      &__item {
        width: 100%;
        max-width: 60rem;
        flex-grow: 0;
        flex-shrink: 0;

        &__link {
          @include font-sans(bold);
          display: flex;
          padding: map-get($spacers, 4);
          border: 1px solid map-get($theme-color-accent, darker);
          margin-bottom: map-get($spacers, 3);
          justify-content: flex-start;
          align-items: center;
          background: linear-gradient(to right,
              fade-out(map-get($theme-color-accent, darker),
                map-get($fading-out, 5)),
              8%,
              fade-out(map-get($theme-color-accent, darker),
                map-get($fading-out, 0)) 25%,
            );
          background-size: 200% 100%;
          background-position: 0 0;
          text-decoration: none;
          transition: background-position .4s cubic-bezier(0.83, 0, 0.17, 1);

          &__icon {
            flex-shrink: 0;
            flex-grow: 0;
            margin-right: $spacer;
            vertical-align: baseline;
          }

          &:hover,
          &:focus {
            background-position: 100% 100%;
          }
        }
      }
    }

    &__socials-links {
      display: flex;
      gap: map-get($spacers, 8);
      justify-content: center;
      padding: 0;
      margin: $spacer 0 0 0;
      list-style: none;

      &__item {
        @include font-sans(small);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: map-get($spacers, 2);
        text-decoration: none;

        &__icon-wrapper {
          position: relative;
          color: map-get($theme-color-primary, base);

          &::before {
            width: 1.75rem;
            height: 1.75rem;
            border-width: map-get($spacers, 1);
            border-color: map-get($theme-color-accent, darker);
            background-color: map-get($theme-color-primary, reverse);
            box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-accent, lighter),
                map-get($fading-out, 7));
            transition: transform .32s cubic-bezier(0, -0.8, .4, 1.25);

            .shops__content__socials-links__item:hover &,
            .shops__content__socials-links__item:focus & {
              transform: translate(-50%, -50%) rotate(180deg);
            }
          }
        }
      }
    }
  }
}
</style>
