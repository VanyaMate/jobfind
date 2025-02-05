export type ModalPositionType =
    'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export type ModalPosition = {
    width: number | 'auto';
    height: number | 'auto';
    top: number;
    left: number;
};


export const getModalPosition = function (parent: HTMLElement | null, modal: HTMLElement | null, position: ModalPositionType): ModalPosition {
    if (parent && modal) {
        const parentRect = parent.getBoundingClientRect();
        const modalRect  = modal.getBoundingClientRect();
        const bodyWidth  = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;

        console.log('ParentRect', parentRect);
        console.log('ModalRect', modalRect);
        console.log('BodyWidth', bodyWidth);
        console.log('BodyHeight', bodyHeight);

        let width  = modalRect.width,
            height = modalRect.height,
            top    = 0,
            left   = 0;

        switch (position) {
            case 'top-left':
                break;
            case 'top-right':
                break;
            case 'top-center':
                break;
            case 'bottom-left':
                const freeHeightBottomSpace = bodyHeight - parentRect.bottom;
                const freeWidthRightSpace   = bodyWidth - parentRect.left;
                if (freeHeightBottomSpace < modalRect.height) {
                    // Not here
                    const freeHeightTopSpace = parentRect.top;
                    if (freeHeightTopSpace < modalRect.height) {
                        // Full screen
                        height = 0;
                        width  = 0;
                        break;
                    } else {
                        top    = -modalRect.height;
                        height = freeHeightTopSpace;
                    }
                } else {
                    top    = parentRect.height;
                    height = freeHeightBottomSpace;
                }

                if (freeWidthRightSpace < modalRect.width) {
                    // Not here
                    const freeWithSpace = modalRect.width - freeWidthRightSpace;
                    if (freeWithSpace < bodyWidth) {
                        if (modalRect.width >= bodyWidth) {
                            // Full screen
                            height = 0;
                            width  = 0;
                        } else {
                            left  = freeWidthRightSpace - modalRect.width;
                            width = freeWidthRightSpace;
                        }
                    } else {
                        // Full screen
                        height = 0;
                        width  = 0;
                    }
                } else {
                    left  = 0;
                    width = freeWidthRightSpace;
                }
                break;
            case 'bottom-right':
                break;
            case 'bottom-center':
                break;
        }

        return { width, height, top, left };
    }

    return { width: 'auto', height: 'auto', top: 0, left: 0 };
};