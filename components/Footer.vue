<template>
  <footer class="bg-black items-center ignore-scrollbar pb-2 h-auto">
    <p class="text-white mt-4 mx-4 text-center text-sm md:text-lg">
      ©<span v-text="new Date().getFullYear()"></span> {{ $t ("footer.copyright") }}
    </p>
    <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
      {{ $t("footer.text_part1") }}
      <a href="https://nuxt.com/" target="_blank">{{
        $t("footer.link_nuxt")
      }}</a
      >{{ $t("footer.text_part2")
      }}<a href="https://tailwindcss.com/" target="_blank">{{
        $t("footer.link_tailwind")
      }}</a
      >{{ $t("footer.text_part3")
      }}<a
        href="https://github.com/Creeperkatze/creeperkatze.github.io"
        target="_blank"
        >{{ $t("footer.link_github") }}</a
      >.
    </p>
    <NuxtImg
      class="w-40 px-1 inline"
      src="https://img.shields.io/github/last-commit/creeperkatze/creeperkatze.github.io/main?display_timestamp=author&logo=github"
      alt="last commit"
      format="webp" />
    <NuxtImg
      class="w-32 px-1 inline"
      src="https://img.shields.io/github/actions/workflow/status/Creeperkatze/creeperkatze.github.io/deploy.yml?logo=github"
      alt="build"
      format="webp" />
  </footer>
</template>
