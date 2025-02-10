export type ModalPositionType =
    'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center';

export type ModalPositionItem =
    number
    | string;

export type ModalPosition = {
    width: ModalPositionItem;
    height: ModalPositionItem;
    top: ModalPositionItem;
    bottom: ModalPositionItem;
    left: ModalPositionItem;
    right: ModalPositionItem;
};


export const getModalPosition = function (parent: HTMLElement | null, modal: HTMLElement | null, position: ModalPositionType): ModalPosition {
    if (parent && modal) {
        const parentRect = parent.getBoundingClientRect();
        const modalRect  = modal.getBoundingClientRect();
        const bodyWidth  = document.body.clientWidth;
        const bodyHeight = document.body.clientHeight;
        const bodyStyles = window.getComputedStyle(document.body);

        const bodyLeftReserved   = parseInt(bodyStyles.getPropertyValue('padding-left'));
        const bodyRightReserved  = parseInt(bodyStyles.getPropertyValue('padding-right'));
        const bodyTopReserved    = parseInt(bodyStyles.getPropertyValue('padding-top'));
        const bodyBottomReserved = parseInt(bodyStyles.getPropertyValue('padding-bottom'));
        const bodyHeightReserved = bodyTopReserved + bodyBottomReserved;
        const bodyWidthReserved  = bodyLeftReserved + bodyRightReserved;

        console.log('body', bodyStyles);
        console.log('ParentRect', parentRect);
        console.log('ModalRect', modalRect);
        console.log('BodyWidth', bodyWidth);
        console.log('BodyHeight', bodyHeight);

        let modalWidth: ModalPositionItem  = modalRect.width,
            modalHeight: ModalPositionItem = modalRect.height,
            top: ModalPositionItem         = 'auto',
            bottom: ModalPositionItem      = 'auto',
            left: ModalPositionItem        = 'auto',
            right: ModalPositionItem       = 'auto';

        switch (position) {
            case 'top-left':
                break;
            case 'top-right':
                break;
            case 'top-center':
                break;
            case 'bottom-left': {
                const freeHeightBottomSpace = bodyHeight - parentRect.bottom - bodyBottomReserved;
                if (freeHeightBottomSpace < modalHeight) {
                    bottom      = '100%';
                    modalHeight = parentRect.top;
                } else {
                    top         = '100%';
                    modalHeight = freeHeightBottomSpace;
                }

                const freeWidthRightSpace = bodyWidth - parentRect.left - bodyRightReserved;
                if (freeWidthRightSpace < modalWidth) {
                    right = 0;
                } else {
                    left = 0;
                }
            }
                break;
            case 'bottom-right': {
                const freeHeightBottomSpace = bodyHeight - parentRect.bottom - bodyBottomReserved;
                if (freeHeightBottomSpace < modalHeight) {
                    const freeHeightTopSpace = parentRect.top;
                    if (freeHeightTopSpace < modalHeight) {
                        modalHeight = bodyHeight;
                        break;
                    } else {
                        top         = -modalHeight;
                        modalHeight = freeHeightTopSpace;
                    }
                } else {
                    top         = parentRect.height;
                    modalHeight = freeHeightBottomSpace;
                }

                const freeWidthLeftSpace = parentRect.right - bodyLeftReserved;
                if (freeWidthLeftSpace < modalWidth) {
                    if (modalWidth >= bodyWidth) {
                        modalWidth = bodyWidth;
                    } else {
                        right      = freeWidthLeftSpace - modalWidth;
                        modalWidth = Math.max(freeWidthLeftSpace, bodyWidth - bodyWidthReserved);
                    }
                } else {
                    right      = 0;
                    modalWidth = freeWidthLeftSpace;
                }
            }
                break;
            case 'bottom-center':
                break;
        }

        return {
            width : `calc(100dvw - ${ bodyWidthReserved }px)`,
            height: modalHeight,
            top,
            left,
            bottom,
            right,
        };
    }

    return {
        width : 'auto',
        height: 'auto',
        top   : 'auto',
        left  : 'auto',
        bottom: 'auto',
        right : 'auto',
    };
};