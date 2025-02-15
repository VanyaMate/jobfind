<template>
    <div class="header" ref="headerRef" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <canvas ref="canvasRef" class="background"></canvas>
        <div class="content">
            <h1>
                <AppText :color="AppTextColor.RAINBOW" class="title">JobFind</AppText>
                <br/>
                <AppText :color="AppTextColor.MAIN" class="description">сервис по поиску работы</AppText>
            </h1>
            <div class="buttons">
                <AppButton :size="AppButtonSize.LARGE" :style-type="AppButtonStyleType.PRIMARY">Я ищу работу
                </AppButton>
                <AppText :color="AppTextColor.INVISIBLE">или</AppText>
                <AppButton :size="AppButtonSize.LARGE" :style-type="AppButtonStyleType.PRIMARY">Я даю работу
                </AppButton>
            </div>
        </div>
    </div>
    <div class="jobs-list"></div>
</template>
<script setup lang="ts">
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


const headerRef                          = ref<HTMLElement | null>(null);
const canvasRef                          = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number | null      = null;
let canvasWidth                          = 0;
let canvasHeight                         = 0;
let headerRect                           = { left: 0, top: 0, width: 0, height: 0 };

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
const lerp  = (start: number, end: number, factor: number) => start + (end - start) * factor;

const handleMouseMove = (event: MouseEvent) => {
    mouse.targetX = event.clientX - headerRect.left;
    mouse.targetY = event.clientY - headerRect.top;
    mouse.active  = true;

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(draw);
    }
};

const handleMouseLeave = () => {
    mouse.active = true;

    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(draw);
    }
};

const draw = () => {
    if (!canvasRef.value || !ctx) return;

    mouse.x = lerp(mouse.x, mouse.targetX, 0.1);
    mouse.y = lerp(mouse.y, mouse.targetY, 0.1);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 800);
    gradient.addColorStop(0, 'rgba(77,55,255,.18)');
    gradient.addColorStop(1, 'rgba(77,55,255,0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    if (Math.abs(mouse.x - mouse.targetX) > 1 || Math.abs(mouse.y - mouse.targetY) > 1) {
        animationFrameId = requestAnimationFrame(draw);
    } else {
        animationFrameId = null;
    }
};

const updateCanvasSize = () => {
    // Возможно для мобилок для этой функции нужен будет дебаунс или тротл
    if (!canvasRef.value || !headerRef.value) return;

    headerRect             = headerRef.value.getBoundingClientRect();
    canvasWidth            = headerRect.width;
    canvasHeight           = headerRect.height;
    canvasRef.value.width  = canvasWidth;
    canvasRef.value.height = canvasHeight;

    mouse.x = mouse.targetX = canvasWidth / 2;
    mouse.y = mouse.targetY = canvasHeight / 2;
};

onMounted(() => {
    if (canvasRef.value) {
        ctx = canvasRef.value.getContext('2d');
        updateCanvasSize();
    }
    window.addEventListener('resize', updateCanvasSize);

    if (headerRef.value) {
        headerRect   = headerRef.value.getBoundingClientRect();
        mouse.x      = mouse.targetX = headerRect.width / 2;
        mouse.y      = mouse.targetY = headerRect.height;
        mouse.active = true;
        requestAnimationFrame(draw);
    }
});

onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', updateCanvasSize);
});
</script>

<style scoped>
.header {
    position  : relative;
    padding   : 200px 0;
    --mouse-x : 50%;
    --mouse-y : 50%;
    z-index   : 0;

    .background {
        position       : absolute;
        top            : 0;
        left           : 0;
        width          : 100%;
        height         : 100%;
        pointer-events : none;
        z-index        : 1;
        border-radius  : var(--offset-medium);
    }

    .content {
        display        : flex;
        flex-direction : column;
        gap            : 60px;
        position       : relative;
        z-index        : 2;
    }

    h1 {
        text-align  : center;
        line-height : var(--font-size-l);

        .title {
            font-size : var(--font-size-xxxl);
        }

        .description {
            font-size   : var(--font-size-xl);
            font-weight : normal;
            color       : var(--color-second);
        }
    }

    .buttons {
        display         : flex;
        align-items     : center;
        justify-content : center;
        gap             : var(--offset-medium);
    }
}

.jobs-list {
    height        : 1000px;
    margin-top    : var(--offset-medium);
    border-radius : var(--offset-medium);
    background    : var(--bg-second);
}
</style>