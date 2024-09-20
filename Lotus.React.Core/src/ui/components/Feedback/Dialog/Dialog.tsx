import { css, cx } from '@emotion/css';
import { ThemeHelper } from 'ui/theme/helpers';
import { ComponentPropsWithoutRef, forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import { Button } from 'ui/components/Controls';
import { IGeneralPropertiesElement } from 'ui/components/GeneralPropertiesElements';
import { TThemeColorVariant } from 'ui/types';
import './Dialog.css';

export interface IDialogComponent
{
  get isOpen(): boolean;
  get getReturnValue(): string;
  show(): void;
  showModal(): void;
  close(returnValue?: string): void;
}

export interface IDialogProps extends Omit<ComponentPropsWithoutRef<'dialog'>, 'color'>, IGeneralPropertiesElement
{
  /**
   * Заголовок диалога
   */
  header?: string;

  /**
   * Подвал диалог
   */
  footer?: ReactNode;
};

export const Dialog = forwardRef<IDialogComponent, IDialogProps>((props, ref) =>  
{
  const { borderRounded: hasRadius, color = 'primary', size = 'medium', paddingControl = 'normal', children,
    header, footer, ...propsDialog } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

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

  const colorVariant: TThemeColorVariant | undefined = (color == 'main' || color == 'secondary') ? undefined : 'palest';

  const dialogMain = css(
    {
      ...ThemeHelper.getFontProps(size),
      ...ThemeHelper.getForegroundColorForBackAsCSS(color, colorVariant),
      ...ThemeHelper.getBackgroundColorProps(color, colorVariant),
      ...ThemeHelper.getBorderProps(color, undefined, hasRadius, size),
      ...ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal')
    });

  const dialogClass = cx(dialogMain, 'lotus-dialog');

  const dialogHeaderMain = css(
    {
      marginLeft: `-${ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingLeft}`,
      marginRight: `-${ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingRight}`,
      borderBottomColor: ThemeHelper.getBorderProps(color, 'alpha04').borderColor
    });

  const dialogHeaderClass = cx(dialogHeaderMain, 'lotus-dialog-header');

  const dialogFooterMain = css(
    {
      marginLeft: `-${ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingLeft}`,
      marginRight: `-${ThemeHelper.getPaddingProps(size, paddingControl, 'normal', 'normal').paddingRight}`,
      borderTopColor: ThemeHelper.getBorderProps(color, 'alpha04').borderColor
    });

  const dialogFooterClass = cx(dialogFooterMain, 'lotus-dialog-footer');

  const handleButtonCloseClick = () => 
  {
    dialogRef?.current?.close();
  };

  return (
    <dialog
      ref={dialogRef}
      className={dialogClass}
      {...propsDialog}
    >
      <div className='lotus-dialog-main'>
        <div className={dialogHeaderClass}>
          {header && (
            <div className='lotus-dialog-header-text'>{header}</div>
          )}

          <button onClick={handleButtonCloseClick} className='lotus-dialog-header-button'> ✕ </button>
        </div>

        <div className='lotus-dialog-body'>
          {children}
        </div>

        <div className={dialogFooterClass}>
          {footer}
          <Button style={{ minWidth: '100px' }} color={color} size={size} borderRounded={hasRadius} paddingControl={paddingControl} value='Ок' variant='filled' >
            Ок
          </Button>
          <Button style={{ minWidth: '100px' }} color={color} size={size} borderRounded={hasRadius} paddingControl={paddingControl}
            onClick={handleButtonCloseClick} value='Cancel' variant='outline' >
            Cancel
          </Button>
        </div>
      </div>
    </dialog>
  );
});
