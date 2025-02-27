<template>
    <div
        :class="['app-file-input-container', { disabled }]"
        @click="handleClick"
        @keydown.enter.self="handleClick"
        tabindex="0"
    >
        <input ref="inputRef" type="file" class="file-input" @change="handleFileChange" v-bind="inputAttrs"/>
        <div class="file-input-preview">
            <div v-if="files.length" class="file-list">
                <div v-for="(file, index) in files" :key="index" class="file-item">
                    <div class="file-preview">
                        <img v-if="isFileImage(file)" :src="getFilePreviewUrl(file)" :alt="file.name" loading="lazy"/>
                        <span v-else class="file-icon">📃</span>
                    </div>
                    <footer>
                        <div class="file-info">
                            {{ file.name }}
                        </div>
                        <AppButton :style-type="AppButtonStyleType.INVISIBLE" quad @click.stop="removeFile(index)">
                            <svg width="10px" height="10px">
                                <line x1="0" y1="10" x2="10" y2="0"/>
                                <line x1="0" y1="0" x2="10" y2="10"/>
                            </svg>
                        </AppButton>
                    </footer>
                </div>
            </div>
            <div v-else class="placeholder">{{ placeholder }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, type HTMLAttributes, onBeforeUnmount } from 'vue';
import AppButton from '~/components/app/buttons/AppButton.vue';
import { AppButtonStyleType } from '~/components/app/buttons/types/AppButtonStyleType';


interface Props extends /* @vue-ignore */ HTMLAttributes {
    modelValue?: File[] | null;
    disabled?: boolean;
    placeholder?: string;
    multiple?: boolean;
    accept?: string;
}

interface Emits {
    (e: 'update:modelValue', value: File[] | null): void;

    (e: 'change', value: Event): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
    modelValue : null,
    disabled   : false,
    placeholder: 'Выберите файл',
    multiple   : false,
    accept     : '',
});

const inputRef        = ref<HTMLInputElement | null>(null);
const files           = ref<File[]>(props.modelValue || []);
const filePreviewUrls = ref<Record<string, string>>({});

const inputAttrs = computed(() => {
    const { modelValue, ...rest } = props;
    return {
        ...rest,
    };
});

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            files.value = newValue;
        } else {
            files.value = [];
        }
    },
    {
        deep: true,
    },
);

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const newFiles = Array.from(target.files);
        files.value.push(...newFiles);
        emit('update:modelValue', files.value);
        emit('change', event);
        newFiles.forEach(generatePreviewUrl);
    }
};

const removeFile         = (index: number) => {
    const fileToRemove = files.value[index];
    if (fileToRemove) {
        URL.revokeObjectURL(filePreviewUrls.value[fileToRemove.name]);
        delete filePreviewUrls.value[fileToRemove.name];
    }
    files.value.splice(index, 1);
    emit('update:modelValue', files.value);
};
const handleClick        = () => {
    if (!props.disabled) {
        inputRef.value?.click();
    }
};
const isFileImage        = (file: File) => {
    return file.type.startsWith('image/');
};
const getFilePreviewUrl  = (file: File) => {
    return filePreviewUrls.value[file.name];
};
const generatePreviewUrl = (file: File) => {
    if (isFileImage(file)) {
        filePreviewUrls.value[file.name] = URL.createObjectURL(file);
    }
};
onBeforeUnmount(() => {
    for (const url of Object.values(filePreviewUrls.value)) {
        URL.revokeObjectURL(url);
    }
});
defineExpose({
    focus () {
        nextTick(() => {
            inputRef.value?.focus();
        });
    },
    blur () {
        nextTick(() => {
            inputRef.value?.blur();
        });
    },
});

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.app-file-input-container {
    display         : flex;
    flex-direction  : column;
    gap             : var(--offset-small);
    position        : relative;
    width           : 100%;
    border          : 1px solid var(--border-color);
    border-radius   : var(--offset-small);
    background      : var(--bg-second);
    cursor          : pointer;
    min-height      : var(--all-input-height-medium);
    justify-content : center;
    outline         : 1px solid transparent;
    transition      : var(--fast);

    &:focus {
        border  : 1px solid var(--primary-color);
        outline : 1px solid var(--primary-color);
    }

    &.disabled {
        opacity : 0.6;
        cursor  : not-allowed;
    }

    .file-input {
        display : none;
    }

    .file-input-preview {
        padding     : var(--offset-small);
        height      : 100%;
        display     : flex;
        align-items : center;
    }

    .file-list {
        display        : flex;
        flex-direction : column;
        gap            : var(--offset-small);
    }

    .file-item {
        display        : flex;
        flex-direction : column;
        gap            : var(--offset-medium);
        align-items    : center;
        padding        : var(--offset-small);
        border         : 1px solid var(--border-color);
        border-radius  : var(--offset-small);
        background     : var(--bg-main);

        .file-preview {
            max-width  : 200px;
            max-height : 200px;

            img {
                width         : 100%;
                height        : 100%;
                object-fit    : cover;
                border-radius : var(--offset-small);
            }
        }

        footer {
            display         : flex;
            align-items     : center;
            justify-content : space-between;
            gap             : var(--offset-medium);
        }

        svg {
            transition : var(--fast);
            min-width  : fit-content;
            display    : inline-block;

            > line {
                stroke       : var(--border-color);
                stroke-width : 2px;
            }
        }
    }

    .placeholder {
        color : var(--color-invisible);
    }

    .file-info {
        flex-grow : 1;
    }

    .file-icon {
        font-size : var(--font-size-l);
    }
}
</style>