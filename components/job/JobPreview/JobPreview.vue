<template>
    <article>
        <header>
            <AppSeparator>
                <NuxtLink to="#">
                    <ShortPreview
                        title="Ozon"
                        avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"
                        primary
                    />
                </NuxtLink>
                <NuxtLink to="#">
                    <ShortPreview title="Отдел разработки"
                                  avatar="https://cdn.centra.ai/product-logo/o/tmp-original-92d09971-a255-4923-a75a-21c457df1179.png"/>
                </NuxtLink>
            </AppSeparator>
        </header>
        <h3>Frontend разработчик</h3>
        <p>
            <AppText :color="AppTextColor.INVISIBLE">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, odit?
            </AppText>
        </p>
        <footer>
            <AppButton :style-type="AppButtonStyleType.PRIMARY" :size="AppButtonSize.MEDIUM">Откликнуться</AppButton>
            <AppButton :style-type="AppButtonStyleType.DEFAULT" :size="AppButtonSize.MEDIUM">Чат</AppButton>
        </footer>
    </article>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import ShortPreview from '~/components/common/ShortPreview/ShortPreview.vue';
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppSeparator from '~/components/app/separator/AppSeparator/AppSeparator.vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';


interface Props extends /* @vue-ignore */ HTMLAttributes {

}

const props = defineProps<Props>();

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
article {
    padding        : var(--offset-large);
    background     : var(--bg-main);
    border         : 1px solid var(--border-color);
    border-radius  : var(--offset-large);
    display        : flex;
    flex-direction : column;
    gap            : var(--offset-medium);

    header {
        a {
            line-height : var(--offset-medium);
        }
    }

    footer {
        display    : flex;
        margin-top : 10px;
        gap        : var(--offset-small);
    }
}
</style>