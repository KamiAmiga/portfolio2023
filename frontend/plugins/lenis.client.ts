import Lenis from "lenis";

const lenis = new Lenis()

const raf = (time: number) => {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("lenis", lenis);
  nuxtApp.hook('page:finish', () => {
    lenis.scrollTo('body', {
      offset: 0,
      duration: 0,
      immediate: true
    })
  })
});