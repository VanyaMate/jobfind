export type ModalPositionType =
    'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right'

export type ModalPositionItem =
    number
    | string;

export type ModalPosition = {
    maxWidth: ModalPositionItem;
    maxHeight: ModalPositionItem;
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

        let modalWidth: ModalPositionItem  = modalRect.width,
            modalHeight: ModalPositionItem = modalRect.height,
            maxWidth: ModalPositionItem    = `calc(100dvw - ${ bodyWidthReserved }px)`,
            maxHeight: ModalPositionItem   = 'auto',
            top: ModalPositionItem         = 'auto',
            bottom: ModalPositionItem      = 'auto',
            left: ModalPositionItem        = 'auto',
            right: ModalPositionItem       = 'auto';

        const toTop = function () {
            const freeHeightTopSpace = parentRect.top - bodyTopReserved;
            if (freeHeightTopSpace < modalHeight) {
                top       = '100%';
                maxHeight = bodyHeight - parentRect.bottom;
            } else {
                bottom    = '100%';
                maxHeight = parentRect.top;
            }
        };

        const toBottom = function () {
            const freeHeightBottomSpace = bodyHeight - parentRect.bottom - bodyBottomReserved;
            if (freeHeightBottomSpace < modalHeight) {
                bottom    = '100%';
                maxHeight = parentRect.top;
            } else {
                top       = '100%';
                maxHeight = freeHeightBottomSpace;
            }
        };

        const toLeft = function () {
            const freeWidthRightSpace = bodyWidth - parentRect.left - bodyRightReserved;
            if (freeWidthRightSpace < modalWidth) {
                const freeWidthLeftSpace = parentRect.right - bodyLeftReserved;
                if (freeWidthLeftSpace < modalWidth) {
                    left  = 0;
                    right = 0;
                } else {
                    right = 0;
                }
            } else {
                left = 0;
            }
        };

        const toRight = function () {
            const freeWidthLeftSpace = parentRect.right - bodyLeftReserved;
            if (freeWidthLeftSpace < modalWidth) {
                const freeWidthRightSpace = bodyWidth - parentRect.left - bodyRightReserved;
                if (freeWidthRightSpace < modalWidth) {
                    left  = 0;
                    right = 0;
                } else {
                    left = 0;
                }
            } else {
                right = 0;
            }
        };

        switch (position) {
            case 'top-left':
                toTop();
                toLeft();
                break;
            case 'top-right':
                toTop();
                toRight();
                break;
            case 'bottom-left':
                toBottom();
                toLeft();
                break;
            case 'bottom-right':
                toBottom();
                toRight();
                break;
        }

        return {
            maxWidth,
            maxHeight,
            top,
            left,
            bottom,
            right,
        };
    }

    return {
        maxWidth : 'auto',
        maxHeight: 'auto',
        top      : 'auto',
        left     : 'auto',
        bottom   : 'auto',
        right    : 'auto',
    };
};