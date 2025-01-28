<template>
    <main>
        <nav>
            <ul>
                <li>
                    <NuxtLink to="/">Home</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/about">About</NuxtLink>
                </li>
            </ul>
        </nav>
        <slot/>
    </main>
</template>

<script lang="ts" setup>
const theme = useCookie('theme', {
    default () {
        return 'auto';
    },
});
useHead({
    bodyAttrs: {
        ['data-theme']: theme,
    },
});
</script>