<script setup lang="ts">
</script>

<template>
  <main class="shops">
    <MainMenu />

    <ContentQuery path="/shops-page" find="one">
      <template #default="{ data }">
        <div class="container shops__header">
        <div class="section section--full">
          <img src="~/assets/images/logoWithBg.svg" alt="Logo" class="shops__header__logo" >
          <h1 v-if="data?.data.attributes.title" class="shops__header__title font-sans--md-capitalized">
            {{ data.data.attributes.title }}</h1>
          <p v-if="data?.data.attributes.subtitle" class="font-mono--small">
            {{ data.data.attributes.subtitle }}</p>
        </div>
      </div>

      <div class="container shops__content">
        <div class="section section--full">
          <h2 class="shops__content__title-second font-sans--capitalized">Mes boutiques</h2>

          <ul v-if="data?.data.attributes.shops_list" class="shops__content__shops-list">
            <li
              v-for="shopItem in data.data.attributes.shops_list"
              :key="shopItem.id"
              class="shops__content__shops-list__item">
              <a :href="shopItem.url" target="_blank" class="shops__content__shops-list__item__link">
                <nuxt-icon :name="shopItem.icon_name" class="icon icon--xl shops__content__shops-list__item__link__icon" />
                {{ shopItem.name }}
              </a>
            </li>
          </ul>
        </div>

        <div class="section section--full">
          <h2 class="shops__content__title-second font-sans--capitalized">Retrouvez
            moi aussi sur : </h2>

          <ul v-if="data?.data.attributes.social_links" class="shops__content__socials-links">
            <li v-for="socialLink in data.data.attributes.social_links" :key="socialLink.id">
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
      </template>

      <template #not-found>
        <p>No content found.</p>
      </template>
    </ContentQuery>
  </main>
</template>

<style lang="scss">
.shops {
  &__header {
    padding-top: var(--spacer-11);
    text-align: center;

    &__logo {
      width: 8rem;
      margin: 0 auto var(--spacer-6);
      border-radius: 50%;
      box-shadow:
        0
        var(--spacer-1)
        var(--spacer-2)
        color-mix(
          in srgb,
          transparent var(--opacity-percentage-8),
          var(--color-accent-base));
    }

    &__title {
      margin-bottom: var(--spacer-2);
    }
  }

  &__content {
    padding-top: var(--spacer-8);
    padding-bottom: var(--spacer-8);
    row-gap: var(--spacer-10);

    &__title-second {
      text-align: center;
    }

    &__shops-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacer-3);
      padding: 0;
      margin: var(--spacer-6) 0 0 0;
      list-style: none;

      &__item {
        width: 100%;
        max-width: 60rem;
        flex-grow: 0;
        flex-shrink: 0;

        &__link {
          @include font-sans(bold);
          display: flex;
          padding: var(--spacer-base);
          border: 1px solid var(--color-accent-darker);
          margin-bottom: var(--spacer-3);
          justify-content: flex-start;
          align-items: center;
          background: linear-gradient(
            to right,
            color-mix(
              in srgb,
              transparent var(--opacity-percentage-7),
              var(--color-accent-darker)),
            8%,
            transparent 25%,
          );
          background-size: 200% 100%;
          background-position: 0 0;
          text-decoration: none;
          transition: background-position .4s cubic-bezier(0.83, 0, 0.17, 1);

          &__icon {
            flex-shrink: 0;
            flex-grow: 0;
            margin-right: var(--spacer-base);

            svg {
              vertical-align: baseline;
            }
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
      gap: var(--spacer-8);
      justify-content: center;
      padding: 0;
      margin: var(--spacer-6) 0 0 0;
      list-style: none;

      &__item {
        @include font-sans(small);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacer-2);
        text-decoration: none;

        &__icon-wrapper {
          position: relative;
          color: var(--color-primary-base);

          svg {
            vertical-align: baseline;
          }

          &::before {
            width: 1.75rem;
            height: 1.75rem;
            border-width: var(--spacer-1);
            color: var(--color-accent-darker);
            background-color: var(--color-primary-reverse);
            box-shadow:
              0
              0
              var(--spacer-2)
              color-mix(
                in srgb,
                transparent var(--opacity-percentage-5),
                var(--color-accent-lighter));
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
