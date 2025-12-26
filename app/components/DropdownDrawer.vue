<template>
    <div class="dropdown flex flex-col" @click="setDropdown(!dropdownOpen)">
        <NuxtLink :to="resolveTo(titleLink)" type="button" class="inline-flex navbar-element items-center" :class="{ 'router-link-active': isTitleActive }">
            {{ title }}
            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
        </NuxtLink>

        <div v-if="dropdownOpen" class="mt-2 flex">
            <div class="flex flex-col space-y-4 border-l-2 border-white pl-2">
                <template v-for="item in items" :key="item.name">
                    <div v-if="item.children" class="ml-2">
                        <div class="text-lg flex items-center navbar-element"
                            :class="{ 'router-link-active': isSubmenuActive(item) }">
                            <NuxtLink :to="resolveTo(item.link)" @click.stop="toggleSubmenu(item.name)" class="text-inherit no-underline">
                                {{ item.name }}
                            </NuxtLink>
                            <button type="button" class="flex items-center text-current" @click.stop="toggleSubmenu(item.name)">
                                <IconDown class="size-4 transform transition-all"
                                    :class="{ 'rotate-180': openSubmenus[item.name] }" />
                            </button>
                        </div>
                        <div v-if="openSubmenus[item.name]"
                            class="flex flex-col space-y-4 border-l-2 border-white pl-2 pt-2">
                            <NuxtLink v-for="child in item.children" :key="child.name" :to="localePath(child.link)"
                                class="navbar-element ml-2" :class="{ 'router-link-active': isLinkExactActive(child.link) }" @click="emit('item-clicked')    ">
                                {{ child.name }}
                            </NuxtLink>
                        </div>
                    </div>
                    <div v-else class="ml-2">
                        <NuxtLink :to="localePath(item.link)" class="navbar-element" :class="{ 'router-link-active': isLinkExactActive(item.link) }" @click="emit('item-clicked')">
                            {{ item.name }}
                        </NuxtLink>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath();
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
    },
    drawerOpen: {
        type: Boolean,
        required: true
    }
})

const isTitleActive = computed(() =>
{
    if (isExternalLink(props.titleLink)) return false;
    const target = normalizePath(localePath(props.titleLink));
    const current = normalizePath(route.path);
    return current === target || current.startsWith(target.endsWith('/') ? target : target + '/');
})

const isSubmenuActive = (item) =>
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

const toggleSubmenu = (name) =>
{
    openSubmenus.value[name] = !openSubmenus.value[name];
}

watch(() => props.drawerOpen, (newVal) =>
{
    if (!newVal)
    {
        setDropdown(false)
    }
})

const setDropdown = (state) =>
{
    if (state)
    {
       useNuxtApp().$bus.$emit('close');
    }
    dropdownOpen.value = state;
}

onMounted(() => {
    useNuxtApp().$bus.$on('close', () => {
        setDropdown(false)
    });
});


const emit = defineEmits(['item-clicked'])
</script>