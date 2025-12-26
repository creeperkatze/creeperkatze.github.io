<template>
    <div class="dropdown relative inline-flex" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
        <NuxtLink id="dropdown-hover-event" :to="resolveTo(titleLink)" type="button"
            class="inline-flex navbar-element items-center justify-center" :class="{ 'router-link-active': isTitleActive }">
            {{ title }}
            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
        </NuxtLink>

        <!-- Invisible hover bridge -->
        <div v-if="dropdownOpen" class="absolute left-0 w-48" style="height:2rem;top:100%;pointer-events:auto;"></div>

        <Transition name="dropdown-fade">
            <div v-if="dropdownOpen"
                class="absolute left-0 mt-8 w-48 rounded-md bg-neutral-800 border-2 max-h-[80vh] overflow-y-auto">
                <template v-for="item in items" :key="item.name">
                    <div v-if="item.children" @mouseenter="openSubmenu(item.name)" @mouseleave="closeSubmenu(item.name)">
                        <NuxtLink :to="resolveTo(item.link)" class="text-lg flex items-center cursor-pointer px-4 py-2 navbar-element"
                            :class="{ 'router-link-active': isItemActive(item) }">
                            {{ item.name }}
                            <IconDown class="size-4 transform transition-all"
                                :class="{ 'rotate-180': openSubmenus[item.name] }" />
                        </NuxtLink>
                        <div v-if="openSubmenus[item.name]" class="flex flex-col space-y-4 border-l-2 border-white ml-4 mb-2">
                            <NuxtLink v-for="child in item.children" :key="child.name" :to="localePath(child.link)"
                                class="text-left navbar-element block px-4" :class="{ 'router-link-active': isLinkExactActive(child.link) }">
                                {{ child.name }}
                            </NuxtLink>
                        </div>
                    </div>
                    <NuxtLink v-else :to="resolveTo(item.link)" class="text-left navbar-element block px-4 py-2"
                        :class="{ 'router-link-active': isLinkExactActive(item.link) }">
                        {{ item.name }}
                    </NuxtLink>
                </template>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
const route = useRoute();
const dropdownOpen = ref(false);
const openSubmenus = ref({});

const stripQueryAndHash = (path) => String(path ?? '').split(/[?#]/)[0];

const normalizePath = (path) =>
{
    const clean = stripQueryAndHash(path);
    if (!clean.startsWith('/')) return clean;
    if (clean.length > 1 && clean.endsWith('/')) return clean.slice(0, -1);
    return clean;
}

const isExternalLink = (link) =>
{
    const l = String(link ?? '').toLowerCase();
    return l.startsWith('http://') || l.startsWith('https://');
}

const resolveTo = (link) =>
{
    if (isExternalLink(link)) return link;
    return localePath(link);
}

const isLinkExactActive = (link) =>
{
    if (isExternalLink(link)) return false;
    const target = normalizePath(localePath(link));
    const current = normalizePath(route.path);
    return current === target;
}

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    titleLink: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
        default: () => []
    }
})

const isTitleActive = computed(() =>
{
    if (isExternalLink(props.titleLink)) return false;
    const target = normalizePath(localePath(props.titleLink));
    const current = normalizePath(route.path);
    return current === target || current.startsWith(target.endsWith('/') ? target : target + '/');
})

const isItemActive = (item) =>
{
    if (!item?.children) return false;

    // Active if the parent link itself is active, or any child is active.
    if (!item.link || isExternalLink(item.link)) return false;
    const parentTarget = normalizePath(localePath(item.link));
    const currentPath = normalizePath(route.path);
    if (currentPath === parentTarget || currentPath.startsWith(parentTarget.endsWith('/') ? parentTarget : parentTarget + '/'))
    {
        return true;
    }

    return item.children.some(child =>
    {
        const path = normalizePath(localePath(child.link));
        return currentPath === path || currentPath.startsWith(path.endsWith('/') ? path : path + '/');
    });
}

const openSubmenu = (name) =>
{
    openSubmenus.value[name] = true;
}

const closeSubmenu = (name) =>
{
    openSubmenus.value[name] = false;
}

watch(dropdownOpen, (newVal) =>
{
    if (newVal)
    {
        props.items.forEach(item =>
        {
            if (item.children)
            {
                const hasActiveChild = item.children.some(child =>
                {
                    const path = normalizePath(localePath(child.link));
                    const currentPath = normalizePath(route.path);
                    return currentPath === path || currentPath.startsWith(path);
                });
                if (hasActiveChild)
                {
                    openSubmenus.value[item.name] = true;
                }
            }
        });
    }
});
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active
{
    transition: opacity 0.15s, transform 0.15s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to
{
    opacity: 0;
    transform: translateY(10px);
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from
{
    opacity: 1;
    transform: translateY(0);
}
</style>