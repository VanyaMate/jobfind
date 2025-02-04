<template>
    <div
        ref="parent"
        :class="['container', { opened: isOpen }]"
        role="combobox"
        :aria-expanded="isOpen"
        tabindex="0"
        @keydown.down.prevent="navigate(1)"
        @keydown.up.prevent="navigate(-1)"
        @keydown.enter.prevent="selectOption(options[hoveredIndex])"
        @keydown.esc="close"
        @keydown.space.prevent="open"
        @keydown.tab="smartClose"
        @blur="close"
    >
        <div
            class="label"
            @click="toggleDropdown"
        >
            <span :class="['text', { empty: !selectedLabel }]">
                {{ selectedLabel || 'Не выбрано' }}
            </span>
            <svg width="10px" height="7px">
                <line x1="0" y1="0" x2="5" y2="6"/>
                <line x1="5" y1="6" x2="10" y2="0"/>
            </svg>
        </div>
        <ul
            :class="['modal']"
            role="listbox"
            ref="modal"
            :style="{
                top: (modalPosition.top) ? modalPosition.top + 'px' : 'auto',
                left: (modalPosition.left) ? modalPosition.left + 'px' : 'auto',
                right: (modalPosition.right) ?  modalPosition.right + 'px' : 'auto',
                bottom: (modalPosition.bottom) ? modalPosition.bottom + 'px' : 'auto',
                maxWidth: modalPosition.width + 'px',
                maxHeight: modalPosition.height + 'px',
            }"
        >
            <li
                v-for="(option, index) in props.options" :key="index"
                :aria-selected="props.modelValue === option.value"
                :class="{active: hoveredIndex === index, selected: props.modelValue === option.value}"
                role="option"
                @click="() => selectOption(option)"
            >
                {{ option.label }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import type { SelectHTMLAttributes } from 'vue';
import { getModalPosition, type ModalPosition } from '~/lib/modal/getModalPosition';


type Option = { value: string, label: string };

interface Props extends /* @vue-ignore */ SelectHTMLAttributes {
    modelValue?: string;
    options: Array<Option>;
};

const emits         = defineEmits([ 'update:modelValue' ]);
const props         = defineProps<Props>();
const isOpen        = ref(false);
const hoveredIndex  = ref(props.options.findIndex((option) => option.value === props.modelValue));
const parent        = useTemplateRef<HTMLDivElement>('parent');
const modal         = useTemplateRef<HTMLDivElement>('modal');
const modalPosition = ref<ModalPosition>({ width: 0, height: 0, top: 0, left: 0, bottom: 0, right: 0 });

const selectedLabel  = computed(() => {
    const selected = props.options.find((option) => option.value === props.modelValue);
    return selected ? selected.label : '';
});
const smartClose     = function (event: Event) {
    if (isOpen.value) {
        event.preventDefault();
    }

    isOpen.value = false;
};
const toggleDropdown = function () {
    if (isOpen.value) {
        close();
    } else {
        open();
    }
};
const open           = function () {
    if (!isOpen.value) {
        modalPosition.value = getModalPosition(parent.value!, modal.value!, 'bottom-left');
        isOpen.value        = true;

        let _index = -1;
        if (props.options.some((option, index) => (option.value === props.modelValue) && ((_index = index) || true))) {
            hoveredIndex.value = _index;
        }
    }
};
const close          = function () {
    isOpen.value = false;
};
const selectOption   = function (option: Option) {
    if (option) {
        emits('update:modelValue', option.value);
        isOpen.value = false;
    }
};
const navigate       = function (direction: number) {
    hoveredIndex.value = (hoveredIndex.value + direction + props.options.length) % props.options.length;

    if (!isOpen.value) {
        selectOption(props.options[hoveredIndex.value]);
    }
};

defineOptions({
    inheritAttrs: false,
});
</script>

<style scoped>
.container {
    position : relative;
    display  : inline-block;
    outline  : none;

    &:focus {
        .label {
            border     : 1px solid var(--primary-color);
            outline    : 1px solid var(--primary-color);
            background : var(--bg-second);
        }
    }

    &.opened {
        .modal {
            visibility : visible;
            opacity    : 1;
            transform  : translateY(var(--offset-small));
        }

        .label {
            border : 1px solid var(--primary-color);

            svg {
                transform : rotate(180deg);

                line {
                    stroke : var(--primary-color);
                }
            }
        }
    }

    .label {
        padding         : var(--offset-small);
        background      : var(--bg-main);
        border          : 1px solid var(--border-color);
        transition      : var(--fast);
        border-radius   : var(--offset-small);
        display         : inline-flex;
        justify-content : space-between;
        align-items     : center;
        height          : var(--all-input-height-medium);
        cursor          : default;
        gap             : var(--offset-medium);
        user-select     : none;
        outline         : 1px solid transparent;
        width           : 100%;

        .text {
            &.empty {
                color : var(--color-invisible);
            }
        }

        svg {
            transition : var(--fast);

            line {
                stroke       : var(--border-color);
                stroke-width : 2px;
            }
        }

        &:hover {
            background : var(--bg-second);
        }
    }

    .modal {
        position        : absolute;
        visibility      : hidden;
        opacity         : 0;
        transition      : var(--fast);
        transform       : translateY(0);
        background      : var(--bg-main);
        border          : 1px solid var(--border-color);
        padding         : var(--offset-small);
        border-radius   : var(--offset-small);
        display         : flex;
        flex-direction  : column;
        gap             : var(--offset-small);
        list-style-type : none;
        z-index         : 10;

        li {
            transition    : var(--fast);
            cursor        : pointer;
            padding       : var(--offset-small) var(--offset-medium);
            border-radius : var(--offset-small);
            display       : flex;
            align-items   : center;
            gap           : var(--offset-small);

            &:before {
                content     : '->';
                white-space : nowrap;
                visibility  : hidden;
                opacity     : 0;
                transition  : var(--fast);
                font-size   : var(--font-size-s);
            }

            &.active,
            &:hover {
                background : color-mix(in srgb, var(--primary-color), transparent 50%);
            }

            &.active {
                &:before {
                    visibility : visible;
                    opacity    : 1;
                }
            }

            &.selected {
                background : var(--primary-color);
                color      : var(--primary-color-inv);
            }
        }
    }
}
</style>