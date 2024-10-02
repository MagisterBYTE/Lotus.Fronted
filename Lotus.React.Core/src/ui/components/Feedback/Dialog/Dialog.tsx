import { css, cx } from '@emotion/css';
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useEffect, useImperativeHandle, useRef } from 'react';
import { Button, CloseButton, IButtonProps } from 'ui/components/Controls';
import { IGeneralElementProperties, ITypographyProps, Typography, TypographyHelper } from 'ui/components';
import { Theme, TThemeColorVariant } from 'ui/theme';
import { TShadowElevation } from 'ui/types';
import { DraggingComponentHelper } from 'ui/helpers/DraggingComponentHelper';
import './Dialog.css';

export interface IDialogComponent
{
  get isOpen(): boolean;
  get getReturnValue(): string;
  show(): void;
  showModal(): void;
  close(returnValue?: string): void;
}

export interface IDialogProps extends Omit<ComponentPropsWithoutRef<'dialog'>, 'color'>, Omit<IGeneralElementProperties, 'extraClass'>
{
  /**
   * Окно можно перемещать
   */
  isMoveable?: boolean;

  /**
   * Функция обратного вызова для реагирования на нажатия кнопки Ок
   * @returns 
   */
  onOk?: () => void;

  /**
   * Функция обратного вызова для реагирования на нажатия кнопки закрыть или Cancel
   * @returns 
   */
  onClose?: () => void;

  /**
   * Вариант отображения
   */
  colorVariant?: TThemeColorVariant;

  /**
   * Размер тени
   */
  shadowElevation?: TShadowElevation;

  /**
   * Отделить заголовок границей
   */
  hasHeaderDivider?: boolean;

  /**
   * Заголовок диалога
   */
  header?: ReactNode;

  /**
   * Параметры отображения заголовка диалога
   */
  headerTypographyProps?: ITypographyProps;

  /**
   * Отделить подвал границей
   */
  hasFooterDivider?: boolean;

  /**
   * Показать кнопку Ок
   */
  hasButtonOk?: boolean;

  /**
   * Параметры отображения кнопки Ок
   */
  buttonOkProps?: IButtonProps;

  /**
   * Показать кнопку Cancel
   */
  hasButtonCancel?: boolean;

  /**
   * Параметры отображения кнопки Cancel
   */
  buttonCancelProps?: IButtonProps;
};

export const Dialog = forwardRef<IDialogComponent, IDialogProps>((props, ref) =>  
{
  const { borderRounded, borderStyle, color, size = 'medium', paddingControl = 'normal', children,
    isMoveable, onOk, onClose, colorVariant = 'palest', shadowElevation, hasHeaderDivider, header, headerTypographyProps,
    hasFooterDivider, hasButtonOk = true, buttonOkProps, hasButtonCancel = true, buttonCancelProps, ...propsDialog } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handlePointerDown = (event: PointerEvent) => 
  {
    if (isMoveable) DraggingComponentHelper.startDragFromPointerDown(event);
  }

  useEffect(() =>
  {
    if (isMoveable) window.addEventListener('pointerdown', handlePointerDown);
    return () =>
    {
      if (isMoveable) window.removeEventListener('pointerdown', handlePointerDown);
    }
  }, [])

  useImperativeHandle(
    ref,
    () => 
    {
      return {
        get isOpen() 
        {
          return dialogRef?.current?.open;
        },
        get getReturnValue() 
        {
          return dialogRef?.current?.returnValue;
        },
        show() 
        {
          dialogRef?.current?.show();
        },
        showModal() 
        {
          dialogRef?.current?.showModal();
        },
        close(returnValue?: string) 
        {
          dialogRef?.current?.close(returnValue);
        }
      } as IDialogComponent;
    },
    []
  );

  const dialogMain = css(
    {
      ...Theme.getFontProps(size),
      ...Theme.getPaddingProps(size, paddingControl, 'normal', 'normal'),
      ...Theme.getForegroundColorProps(color, colorVariant, true),
      ...Theme.getBackgroundColorProps(color, colorVariant),
      ...(borderStyle ? Theme.getBorderStyleProps(size, borderRounded, borderStyle) : { border: 'none' }),
      ...(borderStyle ? Theme.getBorderColorProps(color, colorVariant, 3) : {}),
      ...(shadowElevation ? Theme.getBoxShadowProps(shadowElevation, color) : {})
    });

  const dialogClass = cx(dialogMain, 'lotus-dialog');

  const dialogHeaderMain = css(
    {
      marginLeft: `-${Theme.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingLeft}`,
      marginRight: `-${Theme.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingRight}`,
      ...(hasHeaderDivider ? Theme.getBorderStyleIndividualProps(size, 'solid', false, false, false, true) : {}),
      ...(hasHeaderDivider ? { borderBottomColor: Theme.getBorderColorProps(color, colorVariant, 3, 0.4).borderColor } : {})
    });

  const dialogHeaderClass = cx(dialogHeaderMain, 'lotus-dialog-header', isMoveable ? 'lotus-dialog-header-move' : '');

  const dialogFooterMain = css(
    {
      marginLeft: `-${Theme.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingLeft}`,
      marginRight: `-${Theme.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingRight}`,
      ...(hasFooterDivider ? Theme.getBorderStyleIndividualProps(size, 'solid', false, true) : {}),
      ...(hasFooterDivider ? { borderTopColor: Theme.getBorderColorProps(color, colorVariant, 3, 0.4).borderColor } : {})
    });

  const dialogFooterClass = cx(dialogFooterMain, 'lotus-dialog-footer');

  const handleButtonOkClick = () => 
  {
    dialogRef?.current?.close();
    if (onOk)
    {
      onOk();
    }
  };

  const handleButtonCloseClick = () => 
  {
    dialogRef?.current?.close();
    if (onClose)
    {
      onClose();
    }
  };

  return (
    <dialog ref={dialogRef} className={dialogClass} {...propsDialog}>
      <div className='lotus-dialog-main'>
        <div className={dialogHeaderClass} data-dialog-draggable>
          {header && (
            <Typography color={headerTypographyProps?.color ?? color}
              variant={headerTypographyProps?.variant ?? TypographyHelper.getTypographyVariantByControlSize(size)}
              {...headerTypographyProps}>{header}</Typography>
          )}
          <CloseButton onClick={handleButtonCloseClick} style={{marginTop: '-0.5rem', marginRight: '0.5rem'}}/>
        </div>
        <div className='lotus-dialog-body'>
          {children}
        </div>

        <div className={dialogFooterClass}>
          {hasButtonOk && (<Button style={{ minWidth: '100px' }}
            color={buttonOkProps?.color ?? color}
            size={buttonOkProps?.size ?? size}
            borderRounded={buttonOkProps?.borderRounded ?? true}
            borderStyle={buttonOkProps?.borderStyle ?? 'solid'}
            paddingControl={buttonOkProps?.paddingControl ?? paddingControl}
            onClick={buttonOkProps?.onClick ?? handleButtonOkClick}
            value='Ок'
            hasRippleEffect={buttonCancelProps?.hasRippleEffect ?? true}
            variant={buttonOkProps?.variant ?? 'filled'} >
            {buttonOkProps?.children ?? 'Ok'}
          </Button>)}
          {hasButtonCancel && (<Button style={{ minWidth: '100px' }}
            color={buttonCancelProps?.color ?? color}
            size={buttonCancelProps?.size ?? size}
            borderRounded={buttonCancelProps?.borderRounded ?? true}
            borderStyle={buttonCancelProps?.borderStyle ?? 'solid'}
            paddingControl={buttonCancelProps?.paddingControl ?? paddingControl}
            onClick={handleButtonCloseClick}
            value='Cancel'
            hasRippleEffect={buttonCancelProps?.hasRippleEffect ?? true}
            variant={buttonCancelProps?.variant ?? 'outline'} >
            {buttonCancelProps?.children ?? 'Cancel'}
          </Button>)}
        </div>
      </div>
    </dialog>
  );
});
