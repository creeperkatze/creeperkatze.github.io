<template>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <h2 class="text-left mb-2 mt-4">{{ $t('page.projects.subtitle.webdev') }}</h2>
        <hr class="mb-2">
        <div class="grid md:grid-cols-2 gap-2">
            <Card :link="localePath('/blog/first-website/')" image="/images/CardWebsite.png" alt="Website card"
                :title="$t('page.projects.project.website.title')"
                :description="$t('page.projects.project.website.description')" />
            <div class="grid grid-cols-2 grid-rows-2 gap-2">
                <SmallCard :link="localePath('/idiot-test/')" image="/images/seo/idiot-test.jpg" alt="Idiot Test card"
                    :title="$t('page.projects.project.idiot-test.title')" />
                <SmallCard :link="localePath('/christmas-quiz/')" image="/images/seo/christmas-quiz.jpg" alt="Christmas Quiz card"
                    :title="$t('page.projects.project.christmas-quiz.title')" />
                <SmallCard :link="localePath('/generators/joke/')" image="/images/seo/joke.jpg" alt="Joke Generator card"
                    :title="$t('page.projects.project.joke.title')" />
                <SmallCard :link="localePath('/generators/cat/')" image="/images/seo/cat.jpg" alt="Joke Generator card"
                    :title="$t('page.projects.project.cat.title')" />
            </div>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>