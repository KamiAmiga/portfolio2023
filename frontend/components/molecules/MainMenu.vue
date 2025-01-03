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
  z-index: map-get($z-index, nav);
  background-color: fade-out(map-get($theme-color-primary, base), map-get($opacities, 3));

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $spacer 0;

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
      padding: map-get($spacers, 3) 0;
      text-decoration: none;

      &-list {
        display: flex;
        gap: $spacer;

        @media screen and (min-width: $breakpoint-m) {
          gap: map-get($spacers, 6);
        }
      }

      &::after {
        content: "";
        display: block;
        width: map-get($spacers, 7);
        height: map-get($spacers, 1);
        position: absolute;
        bottom: map-get($spacers, 2);
        left: 0;
        background-color: map-get($theme-color-accent, base);
        box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-accent, lighter), map-get($fading-out, 7));
        transition: all .16s .04s ease-out;
      }

      &:hover,
      &:focus {
        &::after {
          width: 100%;
          height: 1px;
          background-color: map-get($theme-color-accent, darker);
          box-shadow: 0 0 0 transparent;
        }
      }
    }
  }
}
</style>