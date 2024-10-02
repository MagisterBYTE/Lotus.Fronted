import React from 'react';
import { Button, IButtonProps } from 'ui/components';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ICloseButtonProps extends IButtonProps
{
}

export const CloseButton: React.FC<ICloseButtonProps> = (props:ICloseButtonProps) => 
{
  return <Button {...props} variant={props.variant ?? 'text'}>{props.children ?? '✕'}</Button>
};