import React from 'react';
export interface IDialogAppBarProps {
    /**
     * Заголовок диалога
     */
    title?: string;
    /**
     * Функция обратного вызова для закрытия диалога
     * @returns
     */
    onClose: () => void;
}
export declare const DialogAppBar: React.FC<IDialogAppBarProps>;
