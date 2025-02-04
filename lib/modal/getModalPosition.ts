export type ModalPositionType =
    'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export type ModalPosition = {
    width: number;
    height: number;
    top: number | null;
    left: number | null;
    right: number | null;
    bottom: number | null;
};

const MIN_MODAL_FREE_SPACE = 200;

export const getModalPosition = function (parent: HTMLElement, modal: HTMLElement, position: ModalPositionType): ModalPosition {
    const parentRect = parent.getBoundingClientRect();
    const modalRect  = modal.getBoundingClientRect();
    const bodyWidth  = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;

    let width  = modalRect.width,
        height = modalRect.height,
        top    = 0,
        left   = 0,
        right  = 0,
        bottom = 0;

    switch (position) {
        case 'top-left':
            break;
        case 'top-right':
            break;
        case 'top-center':
            break;
        case 'bottom-left':
            const freeHeightSpace = bodyHeight - parentRect.bottom - modalRect.height;
            const freeWidthSpace  = bodyWidth - parentRect.left - modalRect.width;
            if (freeHeightSpace < MIN_MODAL_FREE_SPACE) {
                // Not here
            } else {
                top    = parentRect.height;
                height = freeHeightSpace;
            }

            if (freeWidthSpace < MIN_MODAL_FREE_SPACE) {
                // Not here
            } else {
                left  = 0;
                width = freeWidthSpace;
            }
            break;
        case 'bottom-right':
            break;
        case 'bottom-center':
            break;
    }

    return { width, height, top, left, right, bottom };
};