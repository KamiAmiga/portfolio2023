<script setup lang="ts"></script>

<template>
  <div class="main-menu">
    <nav class="container">
      <div class="section section--full main-menu__content">
        <NuxtLink to="/">
          <img src="~/assets/images/logo.svg" alt="Logo" class="main-menu__content__logo" >
        </NuxtLink>

        <div class="main-menu__content__link-list">
          <NuxtLink to="/projets" class="main-menu__content__link"> Projets </NuxtLink>
          <NuxtLink to="/a-propos" class="main-menu__content__link"> À propos </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<style lang="scss">
.main-menu {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-nav);
  background-color: 
    color-mix(
      in srgb,
      transparent var(--opacity-percentage-3),
      var(--color-primary-base)
    );

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacer-base) 0;

    &__logo {
      height: 2rem;

      @media screen and (min-width: $breakpoint-m) {
        height: 2.5rem;
      }
    }

    &__link {
      @include font-sans(bold);
      position: relative;
      display: block;
      padding: var(--spacer-3) 0;
      text-decoration: none;

      &-list {
        display: flex;
        gap: var(--spacer-base);

        @media screen and (min-width: $breakpoint-m) {
          gap: var(--spacer-6);
        }
      }

      &::after {
        content: "";
        display: block;
        width: var(--spacer-7);
        height: var(--spacer-1);
        position: absolute;
        bottom: var(--spacer-2);
        left: 0;
        background-color: var(--color-accent-base);
        box-shadow:
          0
          0
          var(--spacer-2)
          color-mix(
            in srgb,
            transparent var(--opacity-percentage-5),
            var(--color-accent-lighter)
          );
        transition: all .16s .04s ease-out;
      }

      &:hover,
      &:focus {
        &::after {
          width: 100%;
          height: 1px;
          background-color: var(--color-accent-darker);
          box-shadow: 0 0 0 transparent;
        }
      }
    }
  }
}
</style>