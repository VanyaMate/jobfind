<template>
    <div class="page">
        <div class="header" ref="headerRef" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
            <canvas ref="canvasRef" class="background"></canvas>
            <div class="content">
                <h1>
                    <AppText :color="AppTextColor.RAINBOW" class="title">JobFind</AppText>
                    <br/>
                    <AppText :color="AppTextColor.MAIN" class="description">сервис для поиска работы</AppText>
                </h1>
                <div class="buttons">
                    <AppButton
                        :size="AppButtonSize.LARGE"
                        :style-type="AppButtonStyleType.PRIMARY"
                        @click="selectMainInput"
                    >
                        Я ищу работу
                    </AppButton>
                    <template v-if="!user">
                        <AppText :color="AppTextColor.INVISIBLE">или</AppText>
                        <AppButton :size="AppButtonSize.LARGE" :style-type="AppButtonStyleType.DEFAULT">
                            Я даю работу
                        </AppButton>
                    </template>
                </div>
            </div>
        </div>
        <div class="jobs-container" ref=formRef>
            <div class="jobs-content">
                <AppTopLabel>
                    <template v-slot:label>
                        Что вы ищете?
                    </template>
                    <template v-slot:input>
                        <AppInput placeholder="Frontend-разработчик" :size="AppInputSize.LARGE" ref="inputRef"/>
                    </template>
                </AppTopLabel>
                <VacancyListSettings class="jobs-sort"/>
                <div class="jobs-box">
                    <VacancyListFilter class="jobs-filter"/>
                    <section class="jobs-list">
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                        <JobPreview/>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import AppText from '~/components/app/typography/AppText/AppText.vue';
import { AppTextColor } from '~/components/app/typography/AppText/types/AppText.types';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonSize } from '~/components/app/buttons/types/AppButtonSize';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';
import AppInput from '~/components/app/inputs/AppInput/AppInput.vue';
import { AppInputSize } from '~/components/app/inputs/AppInput/types/AppInputSize';
import AppTopLabel from '~/components/app/label/AppTopLabel/AppTopLabel.vue';
import JobPreview from '~/components/vacancy/VacancyPreview/VacancyPreview.vue';
import { useStore } from '@vanyamate/sec-vue';
import { userModel } from '~/model/user/user.model';
import VacancyListFilter from '~/components/vacancy/VacancyListFilter/VacancyListFilter.vue';
import VacancyListSettings from '~/components/vacancy/VacancyListSettings/VacancyListSettings.vue';


const user = useStore(userModel);

const inputRef                           = ref<{ inputRef: HTMLInputElement } | null>(null);
const headerRef                          = ref<HTMLElement | null>(null);
const formRef                            = ref<HTMLElement | null>(null);
const canvasRef                          = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let animationFrameId: number | null      = null;
let canvasWidth                          = 0;
let canvasHeight                         = 0;
let headerRect                           = { left: 0, top: 0, width: 0, height: 0 };
const stars: Star[]                      = [];
const numStars                           = ref<number>(20);
const canvasIsHidden                     = ref(false);
const interObserver                      = ref<IntersectionObserver | null>(null);

const selectMainInput = function () {
    if (inputRef.value && formRef.value) {
        const input = inputRef.value.inputRef;
        formRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
        input.focus({ preventScroll: true });
    }
};

const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
const lerp  = (start: number, end: number, factor: number): number => start + (end - start) * factor;

class Star {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    fadeSpeed: number;
    fadingIn: boolean;

    constructor () {
        this.x         = Math.random() * canvasWidth;
        this.y         = Math.random() * canvasHeight;
        this.radius    = Math.random() * 2 + 1;
        this.opacity   = Math.random();
        this.fadeSpeed = Math.random() * 0.001 + 0.006;
        this.fadingIn  = Math.random() > 0.5;
    }

    update (): void {
        if (this.fadingIn) {
            this.opacity += this.fadeSpeed;
            if (this.opacity >= 1) this.fadingIn = false;
        } else {
            this.opacity -= this.fadeSpeed;
            if (this.opacity <= 0) {
                this.fadingIn = true;
                this.x        = Math.random() * canvasWidth;
                this.y        = Math.random() * canvasHeight;
                this.radius   = Math.random() * 2 + 1;
            }
        }
    }

    draw (): void {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${ this.opacity })`;
        ctx.fill();
    }
}

function initStars (): void {
    stars.length = 0;
    for (let i = 0; i < numStars.value; i++) {
        stars.push(new Star());
    }
}

function draw (): void {
    if (!canvasRef.value || !ctx) return;

    mouse.x = lerp(mouse.x, mouse.targetX, 0.1);
    mouse.y = lerp(mouse.y, mouse.targetY, 0.1);

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Отрисовка градиента от движения мыши
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 800);
    gradient.addColorStop(0, 'rgba(77,55,255,.18)');
    gradient.addColorStop(1, 'rgba(77,55,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Отрисовка звёзд
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    if (!canvasIsHidden.value) {
        animationFrameId = requestAnimationFrame(draw);
    }
}

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

const updateCanvasSize = () => {
    // Возможно для мобилок для этой функции нужен будет дебаунс или тротл
    if (!canvasRef.value || !canvasRef.value) return;

    headerRect             = canvasRef.value.getBoundingClientRect();
    canvasWidth            = headerRect.width;
    canvasHeight           = headerRect.height;
    canvasRef.value.width  = canvasWidth;
    canvasRef.value.height = canvasHeight;
    numStars.value         = canvasWidth * canvasHeight / 80000;

    mouse.x = mouse.targetX = canvasWidth / 2;
    mouse.y = mouse.targetY = canvasHeight / 2;

    initStars();
};


// Ставим на паузу когда вне видимости для оптимизации
watch([ canvasIsHidden ], () => {
    if (!canvasIsHidden.value) {
        draw();
    } else {
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }
    }
});

onMounted(() => {
    if (canvasRef.value) {
        ctx = canvasRef.value.getContext('2d');
        updateCanvasSize();

        interObserver.value = new IntersectionObserver((items) => {
            items.forEach((intersection) => {
                canvasIsHidden.value = !intersection.isIntersecting;
            });
        });

        interObserver.value.observe(canvasRef.value);
    }
    window.addEventListener('resize', updateCanvasSize);
});

onMounted(() => {
    if (!canvasRef.value) return;

    if (headerRef.value) {
        headerRect   = headerRef.value.getBoundingClientRect();
        mouse.x      = mouse.targetX = headerRect.width / 2;
        mouse.y      = mouse.targetY = headerRect.height;
        mouse.active = true;
        requestAnimationFrame(draw);
    }

    ctx = canvasRef.value.getContext('2d');
    updateCanvasSize();
    initStars();
    draw();

    window.addEventListener('resize', updateCanvasSize);
});

onUnmounted(() => {
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', updateCanvasSize);
    interObserver.value?.disconnect();
});

useHead({
    title: 'JobFind',
});

useSeoMeta({
    title      : 'JobFind',
    description: 'Сервис для поиска работы',
});

</script>

<style scoped>
@container page (max-width: 600px) {
    .buttons {
        flex-direction : column;
    }

    .header {
        padding : 140px var(--offset-small) 80px !important;
    }
}


.page {
    container-name : page;
    container-type : inline-size;
    position       : relative;
}


.header {
    position        : relative;
    display         : flex;
    flex-direction  : column;
    min-height      : calc(100dvh - var(--offset-medium) * 2);
    align-items     : center;
    justify-content : center;
    z-index         : 0;

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

.jobs-container {
    min-height    : 1000px;
    margin-top    : var(--offset-large);
    border-radius : var(--offset-medium);
    padding       : calc(var(--offset-large) * 2) 0 var(--offset-large);
    max-width     : 100%;

    .jobs-content {
        max-width      : 1200px;
        margin         : auto;
        display        : flex;
        flex-direction : column;
        gap            : var(--offset-medium);

        .jobs-box {
            display : flex;
            gap     : var(--offset-large);

            .jobs-filter {
                display        : flex;
                flex-direction : column;
                gap            : var(--offset-medium);
                min-width      : 300px;

                @media screen and (max-width : 800px) {
                    display : none;
                }
            }

            .jobs-list {
                display        : flex;
                flex-direction : column;
                gap            : var(--offset-medium);
                width          : 100%;
            }
        }
    }
}
</style>