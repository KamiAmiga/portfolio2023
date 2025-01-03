<script setup lang="ts">
</script>

<template>
  <main class="homepage">
    <MainMenu />

    <ContentQuery v-slot="{ data }" path="/homepage" find="one">
      <template v-if="data">
        <ContentRenderer :value="data">
          <div class="homepage__bg-triangle homepage__bg-triangle--1"/>
          <div class="homepage__bg-triangle homepage__bg-triangle--2"/>
          <div class="homepage__bg-triangle homepage__bg-triangle--3"/>
          <div class="homepage__bg-triangle homepage__bg-triangle--4"/>
          <div class="homepage__bg-triangle homepage__bg-triangle--5"/>
          <div class="homepage__bg-line homepage__bg-line--1"/>
          <div class="homepage__bg-line homepage__bg-line--2"/>
          <div class="homepage__bg-line homepage__bg-line--3"/>

          <div class="container homepage__content-wrapper">
            <div class="section section--half">
              <h1 class="homepage__title-container">
                <div v-if="data?.data.attributes.title" class="homepage__title-sub">
                  <div class="anim-slide-up">
                    <div class="font-sans--md-capitalized anim-slide-up__text">
                      {{ data.data.attributes.title }}
                    </div>
                  </div>
                </div>
                <div v-if="data?.data.attributes.subtitle" class="homepage__title-main">
                  <div class="anim-slide-up">
                    <div class="anim-slide-up__text">
                      {{ data.data.attributes.subtitle }}
                    </div>
                  </div>
                </div>
              </h1>
            </div>
          </div>

          <div class="homepage__illustration">
            <div class="homepage__illustration__cityscape">
              <div class="homepage__illustration__skyline homepage__illustration__skyline--left-1"/>
              <div
                class="homepage__illustration__skyline homepage__illustration__skyline--right-1 homepage__illustration__skyline--dashes"/>
              <div class="homepage__illustration__skyline homepage__illustration__skyline--right-2"/>
              <div
                class="homepage__illustration__skyline homepage__illustration__skyline--right-3 homepage__illustration__skyline--dashes"/>

              <div class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-left-1">
                <div
                  class="homepage__illustration__cityscape__building__lights homepage__illustration__cityscape__building__lights--back-left-1"/>
              </div>
              <div class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-left-2"/>
              <div class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-left-3"/>
              <div
                class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-center-1"/>
              <div
                class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-center-2"/>
              <div
                class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-right-1">
                <div
                  class="homepage__illustration__cityscape__building__lights homepage__illustration__cityscape__building__lights--back-right-1"/>
              </div>
              <div
                class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-right-2"/>
              <div
                class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--back-right-3"/>
              <div class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--fore-left">
                <CustomPicture
                    v-if="data?.data.attributes.highlight_medias?.data?.[0]"
                    :picture-data="data.data.attributes.highlight_medias.data[0].attributes"
                    format="half_width"
                  class="homepage__illustration__cityscape__building__image homepage__illustration__cityscape__building__image--left" />
              </div>
              <div class="homepage__illustration__cityscape__building homepage__illustration__cityscape__building--fore-right">
                <CustomPicture
                  v-if="data?.data.attributes.highlight_medias?.data?.[1]"
                  :picture-data="data.data.attributes.highlight_medias.data[1].attributes"
                  format="half_width"
                  class="homepage__illustration__cityscape__building__image homepage__illustration__cityscape__building__image--right" />
              </div>
              <div class="homepage__illustration__cityscape__light homepage__illustration__cityscape__light--left"/>
              <div class="homepage__illustration__cityscape__light homepage__illustration__cityscape__light--right"/>
            </div>

            <div class="homepage__illustration__horizon">
              <div class="homepage__illustration__horizon__line"/>
              <div class="homepage__illustration__horizon__shape"/>
            </div>

            <div class="homepage__illustration__ground">
              <div class="homepage__illustration__skyline homepage__illustration__skyline--left-2"/>
              <div class="homepage__illustration__skyline homepage__illustration__skyline--right-4"/>
              <div
                class="homepage__illustration__skyline homepage__illustration__skyline--right-5 homepage__illustration__skyline--dashes"/>

              <div class="homepage__illustration__ground__shape"/>
              <div class="homepage__illustration__ground__reflexion homepage__illustration__ground__reflexion--left"/>
              <div class="homepage__illustration__ground__reflexion homepage__illustration__ground__reflexion--right"/>
              <div class="homepage__illustration__ground__light"/>
            </div>
          </div>
        </ContentRenderer>
      </template>

      <template v-else>
        <p>No content found.</p>
      </template>
    </ContentQuery>
  </main>
</template>

<style lang="scss">
@use "../assets/styles/abstracts" as *;
@use "../assets/styles/base/typography" as *;

//
// Variables
//

$bg-lines: 1 88% dashed 0 53% 0.08, 2 67% solid 0 50% 0.16,
  3 86% solid 58% 0 0.08;

$bg-triangles: 1 5.75rem map-get($theme-color-primary, reverse) 13.25rem -41rem,
  2 13.25rem map-get($theme-color-accent, lighter) 0 -40rem,
  3 5.875rem none 5rem -36.25rem 1,
  4 9.375rem map-get($theme-color-primary, reverse) 6.875rem -35.25rem 0.16,
  5 4.75rem map-get($theme-color-accent, lighter) 9.875rem -31rem;

$triangle-ratio: 0.867;
$triangle-base-angle: 30deg;

//
// Animations
//

.anim-slide-up {
  overflow: hidden;

  &__text {
    opacity: 0.3;
    transform: translateY(100%);
    animation-name: anim-slide-up__text;
    animation-duration: 0.5s;
    animation-delay: 0.24s;
    animation-fill-mode: forwards;
  }
}

@keyframes anim-slide-up__text {
  from {
    opacity: 0.3;
    transform: translateY(100%);
  }

  30% {
    opacity: 0.3;
  }

  75% {
    opacity: 1;
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes anim-fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

//
// Styling
//

.homepage {
  position: relative;
  overflow-x: hidden;

  &__content-wrapper {
    min-height: 100dvh;
  }

  &__title {
    &-container {
      position: absolute;
      margin: 0;
      left: 0;
      bottom: map-get($spacers, 9);
      z-index: map-get($z-index, base-increase);
    }

    &-sub {
      display: inline-block;
      margin: 0 0 map-get($spacers, 5) map-get($spacers, 7);
    }

    &-main {
      @include font-sans(xxl);
      box-sizing: border-box;
      padding: map-get($spacers, 4) map-get($spacers, 4) map-get($spacers, 4) (map-get($spacers, 7) - map-get($spacers, 2));
      border-left-width: map-get($spacers, 2);
      border-left-style: solid;
      border-left-color: fade-out(map-get($theme-color-secondary, darker),
          map-get($fading-out, 0));
      position: relative;
      animation-name: homepage-title-main-border-anim;
      animation-duration: 0.32s;
      animation-delay: 0.64s;
      animation-fill-mode: forwards;

      @keyframes homepage-title-main-border-anim {
        from {
          border-left-color: fade-out(map-get($theme-color-secondary, darker),
              map-get($fading-out, 0));
        }

        to {
          border-left-color: fade-out(map-get($theme-color-secondary, darker),
              map-get($fading-out, 9));
        }
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 100%;
        z-index: map-get($z-index, base-decrease);
        background: linear-gradient(to right,
            fade-out(map-get($theme-color-secondary, darker),
              map-get($fading-out, 5)),
            16.5%,
            fade-out(map-get($theme-color-secondary, darker),
              map-get($fading-out, 0)) 50%);
        animation-name: homepage-title-main-gradient-anim;
        animation-duration: 0.32s;
        animation-delay: 0.64s;
        animation-fill-mode: forwards;

        @keyframes homepage-title-main-gradient-anim {
          from {
            right: 100%;
          }

          to {
            right: 0;
          }
        }
      }
    }
  }

  &__illustration {
    width: 100%;
    min-width: 20rem;
    max-width: 25rem;
    min-height: 100vh;
    position: absolute;
    top: map-get($spacers, 9);
    right: map-get($spacers, 7) * -1;
    z-index: map-get($z-index, base);
    overflow: hidden;
    opacity: 0;
    animation-name: anim-fade-in;
    animation-duration: 0.8s;
    animation-delay: 0.4s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;

    &__skyline {
      height: 0;
      position: absolute;
      border-top-width: 2px;
      border-top-color: map-get($theme-color-primary, reverse);
      transform: rotate($triangle-base-angle * -1);

      &--left-1 {
        width: 33.783%;
        border-top-style: solid;
        left: 0;
        bottom: 0;
        opacity: map-get($opacities, 2);
        transform-origin: top left;
      }

      &--right-1 {
        width: 33.783%;
        border-top-style: dashed;
        top: 9.375%;
        right: 10.546%;
        opacity: map-get($opacities, 5);
        transform-origin: top right;
      }

      &--right-2 {
        width: 33.783%;
        border-top-style: solid;
        top: 9.375%;
        right: 2.685%;
        opacity: map-get($opacities, 6);
        transform-origin: top right;
      }

      &--right-3 {
        width: 33.783%;
        border-top-style: dashed;
        right: 0;
        bottom: 21%;
        opacity: map-get($opacities, 3);
        transform-origin: top right;
      }

      &--left-2 {
        width: 8.784%;
        border-top-style: solid;
        top: 3.125%;
        left: 6.757%;
        opacity: map-get($opacities, 1);
        transform-origin: top right;
      }

      &--right-4 {
        width: 27.027%;
        border-top-style: solid;
        top: 9.375%;
        right: 6.757%;
        opacity: map-get($opacities, 1);
        transform-origin: top right;
      }

      &--right-5 {
        width: 24.324%;
        border-top-style: dashed;
        top: 15.625%;
        right: 9.459%;
        opacity: map-get($opacities, 2);
        transform-origin: top right;
      }
    }

    &__cityscape {
      padding-bottom: 80%;
      position: absolute;
      left: 12px;
      right: 12px;
      overflow: hidden;

      &__building {
        position: absolute;
        bottom: 0;
        overflow: hidden;

        &__lights {
          position: absolute;
          bottom: 0;

          &::before,
          &::after {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            position: absolute;
          }

          &--back {
            &-left-1 {
              width: 2.778%;
              top: 3.226%;
              left: 27.778%;
              background: linear-gradient(to bottom,
                  fade-out(map-get($theme-color-fourth, darker),
                    map-get($fading-out, 0)),
                  fade-out(map-get($theme-color-primary, reverse),
                    map-get($fading-out, 3)));

              &::before,
              &::after {
                background: linear-gradient(to bottom,
                    fade-out(map-get($theme-color-fourth, darker),
                      map-get($fading-out, 0)),
                    fade-out(map-get($theme-color-primary, reverse),
                      map-get($fading-out, 3)));
              }

              &::before {
                right: 400%;
              }

              &::after {
                left: 400%;
              }
            }

            &-right-1 {
              width: 2%;
              top: 10%;
              right: 30.769%;
              background: linear-gradient(to bottom,
                  fade-out(map-get($theme-color-tertiary, darker),
                    map-get($fading-out, 2)),
                  fade-out(map-get($theme-color-tertiary, base),
                    map-get($fading-out, 6)));

              &::before,
              &::after {
                background: linear-gradient(to bottom,
                    fade-out(map-get($theme-color-tertiary, darker),
                      map-get($fading-out, 2)),
                    fade-out(map-get($theme-color-tertiary, base),
                      map-get($fading-out, 6)));
              }

              &::before {
                right: 600%;
              }

              &::after {
                left: 600%;
              }
            }
          }
        }

        &--fore {
          &-left {
            width: 21.622%;
            height: 67.188%;
            left: 18.92%;
            z-index: map-get($z-index, base-increase);
            background: white;
            box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-fourth, lighter),
                map-get($fading-out, 7));
            transform-origin: top left;
            transform: skewY($triangle-base-angle);
          }

          &-right {
            width: 24.324%;
            height: 84.375%;
            left: 43.243%;
            z-index: map-get($z-index, base-increase);
            background: white;
            box-shadow: 0 0 map-get($spacers, 2) fade-out(map-get($theme-color-tertiary, lighter),
                map-get($fading-out, 7));
            transform-origin: top right;
            transform: skewY($triangle-base-angle * -1);
          }
        }

        &__image {
          width: 250%;
          max-width: none;
          position: absolute;
          left: 50%;
          transform-origin: top right;
          transform: translateX(-50%) skewY($triangle-base-angle);

          &--left {
            width: 200%;
            max-width: none;
            transform-origin: top left;
            transform: translateX(-50%) skewY($triangle-base-angle * -1);
          }
        }

        &--back {
          &-left-1 {
            width: 12.162%;
            height: 96.875%;
            left: 8.784%;
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-fourth, darker),
                  map-get($fading-out, 2)),
                33%,
                fade-out(map-get($theme-color-fourth, base),
                  map-get($fading-out, 5)));
            transform-origin: top right;
            transform: skewY($triangle-base-angle * -1);
          }

          &-left-2 {
            width: 6.757%;
            height: 85.156%;
            left: 18.92%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-primary, reverse),
                  map-get($fading-out, 1)),
                fade-out(map-get($theme-color-primary, reverse),
                  map-get($fading-out, 8)));
          }

          &-left-3 {
            width: 5.405%;
            height: 93.75%;
            left: 32.432%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                transparent,
                67%,
                fade-out(map-get($theme-color-primary, reverse),
                  map-get($fading-out, 8)));
          }

          &-center-1 {
            width: 27.702%;
            height: 86.719%;
            left: 36.149%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-accent, darker),
                  map-get($fading-out, 2)),
                33%,
                fade-out(map-get($theme-color-tertiary, lighter),
                  map-get($fading-out, 3)));
            transform-origin: top right;
            transform: skewY($triangle-base-angle * -1);
          }

          &-center-2 {
            width: 22.973%;
            height: 26.563%;
            left: 55.405%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-primary, reverse),
                  map-get($fading-out, 1)),
                67%,
                fade-out(map-get($theme-color-primary, reverse),
                  map-get($fading-out, 6)));
          }

          &-right-1 {
            width: 20.312%;
            height: 62.5%;
            left: 70.95%;
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-primary, base),
                  map-get($fading-out, 2)),
                33%,
                fade-out(map-get($theme-color-secondary, darker),
                  map-get($fading-out, 8)));
            transform-origin: top right;
            transform: skewY($triangle-base-angle * -1);
          }

          &-right-2 {
            width: 5.405%;
            height: 93.75%;
            left: 75.676%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-tertiary, darker),
                  map-get($fading-out, 0)),
                67%,
                fade-out(map-get($theme-color-tertiary, base),
                  map-get($fading-out, 6)));
          }

          &-right-3 {
            width: 14.86%;
            height: 93.75%;
            left: 81.76%;
            z-index: map-get($z-index, base-decrease);
            background: linear-gradient(to bottom,
                fade-out(map-get($theme-color-secondary, lighter),
                  map-get($fading-out, 2)),
                33%,
                fade-out(map-get($theme-color-tertiary, base),
                  map-get($fading-out, 5)));
            transform-origin: top left;
            transform: skewY($triangle-base-angle);
          }
        }
      }

      &__light {
        position: absolute;
        bottom: 0;
        z-index: map-get($z-index, base-increase);
        transform: translateY(50%);

        &--left {
          width: 44.594%;
          padding-bottom: 44.594%;
          left: 5.405%;
          background: radial-gradient(circle closest-side,
              fade-out(map-get($theme-color-fourth, lighter),
                map-get($fading-out, 6)),
              67%,
              fade-out(map-get($theme-color-fourth, darker),
                map-get($fading-out, 0)));
        }

        &--right {
          width: 66.216%;
          padding-bottom: 66.216%;
          left: 21.622%;
          background: radial-gradient(circle closest-side,
              fade-out(map-get($theme-color-tertiary, lighter),
                map-get($fading-out, 7)),
              fade-out(map-get($theme-color-tertiary, darker),
                map-get($fading-out, 0)));
        }
      }
    }

    &__horizon {
      position: relative;
      margin-top: 80%;
      z-index: map-get($z-index, base-increase);

      &__line {
        width: 100%;
        height: map-get($spacers, 1);
        background-color: map-get($theme-color-accent, lighter);
        border-radius: 0.0625rem;
        box-shadow: 0 0 map-get($spacers, 1) fade-out(map-get($theme-color-accent, lighter),
            map-get($fading-out, 7));
      }

      &__shape {
        width: 12.5%;
        padding-bottom: 14.375%;
        position: absolute;
        top: 0;
        left: 29.514%;
        clip-path: polygon(100% 0, 0 50%, 100% 100%);
        background: linear-gradient(to right,
            map-get($theme-color-accent, base),
            67%,
            map-get($theme-color-accent, darker));
        transform: translateY(-50%);

        &::before,
        &::after {
          content: "";
          position: absolute;
          clip-path: polygon(100% 0, 0 50%, 100% 100%);
        }

        &::before {
          width: 50%;
          padding-bottom: 56.94%;
          top: 50%;
          left: 25%;
          background-color: map-get($theme-color-primary, base);
          transform: translateY(-50%);
        }

        &::after {
          width: 20%;
          padding-bottom: 22.222%;
          right: 16.5%;
          bottom: 50%;
          background-color: map-get($theme-color-primary, reverse);
        }
      }
    }

    &__ground {
      position: absolute;
      left: 12px;
      right: 12px;
      padding-bottom: 80%;
      overflow: hidden;

      &__shape {
        width: 100%;
        height: 100%;
        position: absolute;
        clip-path: polygon(100% 0, 0 0, 50% 100%);
        background: linear-gradient(to bottom,
            fade-out(map-get($theme-color-accent, lighter),
              map-get($fading-out, 3)),
            33%,
            fade-out(map-get($theme-color-accent, darker),
              map-get($fading-out, 0)));
      }

      &__reflexion {
        position: absolute;
        top: 0;
        z-index: map-get($z-index, base-decrease);

        &--left {
          width: 21.622%;
          height: 39.844%;
          left: 18.92%;
          background: linear-gradient(to bottom,
              fade-out(map-get($theme-color-fourth, darker),
                map-get($fading-out, 4)),
              fade-out(map-get($theme-color-primary, base),
                map-get($fading-out, 0)));
          transform-origin: top right;
          transform: skewY($triangle-base-angle);
        }

        &--right {
          width: 24.324%;
          height: 53.125%;
          left: 43.243%;
          background: linear-gradient(to bottom,
              fade-out(map-get($theme-color-tertiary, darker),
                map-get($fading-out, 4)),
              fade-out(map-get($theme-color-primary, base),
                map-get($fading-out, 0)));
          transform-origin: top left;
          transform: skewY($triangle-base-angle * -1);
        }
      }

      &__light {
        width: 80%;
        padding-bottom: 80%;
        position: absolute;
        top: 0;
        left: 50%;
        background: radial-gradient(circle closest-side,
            fade-out(map-get($theme-color-accent, darker),
              map-get($fading-out, 5)),
            fade-out(map-get($theme-color-primary, base), map-get($fading-out, 0)));
        transform: translate(-50%, -50%);
      }
    }
  }

  @media screen and (min-width: $breakpoint-m) {
    position: relative;
    overflow: hidden;
    background: linear-gradient(to top,
        fade-out(map-get($theme-color-accent, darker), map-get($fading-out, 5)),
        16.5%,
        fade-out(map-get($theme-color-accent, base), map-get($fading-out, 0)) 50%);

    &__bg {
      &-line {
        width: 0;
        position: absolute;
        border-right-width: 2px;
        border-right-color: map-get($theme-color-accent, lighter);
        transform-origin: top right;
        transform: rotate(60deg);

        @each $number,
        $height,
        $border-style,
        $vertical-position,
        $horizontal-position,
        $opacity in $bg-lines {
          &--#{$number} {
            height: $height;
            border-right-style: $border-style;
            top: $vertical-position;
            right: $horizontal-position;
            opacity: $opacity;
          }
        }
      }
    }

    &__content-wrapper {
      position: relative;
      overflow: hidden;
    }

    &__title {
      &-container {
        box-sizing: border-box;
        width: 50%;
        padding-left: map-get($spacers, 4);
        bottom: 50%;
        transform: translateY(50%);
      }

      &-sub {
        margin-bottom: map-get($spacers, 8);
      }

      &-main {
        @include font-sans(xxxl);
        border-left: none;
        position: relative;

        &::after {
          content: "";
          display: block;
          width: 50%;
          height: map-get($spacers, 3);
          position: absolute;
          top: 100%;
          left: 0;
          background-color: map-get($theme-color-secondary, darker);
        }
      }
    }

    &__illustration {
      box-sizing: border-box;
      width: 50%;
      max-width: 36rem;
      top: 12%;
      right: 0;
    }
  }

  @media screen and (min-width: $breakpoint-l) {
    &__bg {
      &-triangle {
        border-top-style: solid;
        border-top-width: 1px;
        position: absolute;
        overflow: hidden;
        left: 50%;

        &::before,
        &::after {
          content: "";
          width: 100%;
          border-top-style: solid;
          border-top-width: 1px;
          position: absolute;
          bottom: 0;
        }

        &::before {
          right: 50%;
          transform-origin: bottom right;
          transform: rotate(60deg);
        }

        &::after {
          left: 50%;
          transform-origin: top left;
          transform: rotate(-60deg);
        }

        @each $number,
        $width,
        $border-color,
        $vertical-position,
        $horizontal-position,
        $opacity in $bg-triangles {
          &--#{$number} {
            width: $width;
            height: $width * $triangle-ratio;
            top: $vertical-position;
            transform: translateX($horizontal-position);

            @if $opacity {
              opacity: $opacity;
            }

            @else {
              opacity: map-get($opacities, 2);
            }

            @if $border-color !=none {
              border-top-color: $border-color;

              &::before,
              &::after {
                border-top-color: $border-color;
              }
            }

            @else {
              border-top: $border-color;

              &::before,
              &::after {
                content: $border-color;
              }
            }
          }
        }

        &--2 {
          border-top: none;

          &::before,
          &::after {
            border-top-width: 2px;
            border-top-style: dashed;
          }
        }

        &--3 {
          clip-path: polygon(100% 0, 0 0, 50% 100%);
          background: linear-gradient(to bottom,
              fade-out(map-get($theme-color-secondary, darker),
                map-get($fading-out, 5)),
              33%,
              fade-out(map-get($theme-color-secondary, darker),
                map-get($fading-out, 0)));
        }
      }
    }

    &__title {
      &-container {
        padding-left: map-get($spacers, 8);
      }
    }

    &__illustration {
      right: map-get($spacers, 7);
    }
  }
}
</style>
