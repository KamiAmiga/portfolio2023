<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@use '~/assets/styles/base/index';

@forward '~/assets/styles/components/atoms/headings.scss';
@forward '~/assets/styles/components/atoms/icons.scss';
@forward '~/assets/styles/components/atoms/links.scss';

:root {
  @each $level, $values in $theme-colors {
    @each $name, $value in $values {
      --color-#{$level}-#{$name}: #{$value};
    }
  }

  @each $level, $value in $opacities {
    --opacity-#{$level}: #{$value};
  }

  @each $level, $value in $opacities-percentages {
    --opacity-percentage-#{$level}: #{$value};
  }

  @each $level, $value in $fading-out {
    --fading-out-#{$level}: #{$value};
  }

  @each $setting, $values in $font-sans-settings {
    @each $name, $value in $values {
      --font-sans-#{$setting}-#{$name}: #{$value};
    }
  }

  @each $setting, $values in $font-mono-settings {
    @each $name, $value in $values {
      --font-mono-#{$setting}-#{$name}: #{$value};
    }
  }

  @each $level, $value in $icon-sizes {
    --icon-size-#{$level}: #{$value};
  }

  @each $level, $value in $icon-wrapper-sizes {
    --icon-wrapper-size-#{$level}: #{$value};
  }

  @each $level, $value in $spacers {
    --spacer-#{$level}: #{$value};
  }
  --spacer-base: var(--spacer-4);

  @each $level, $value in $z-index {
    --z-index-#{$level}: #{$value};
  }
}
</style>