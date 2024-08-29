import React, { ComponentPropsWithoutRef, forwardRef } from 'react';

export interface IVerticalStackProps extends ComponentPropsWithoutRef<'div'>
{
  gap?: React.CSSProperties['gap'];
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
  wrap?: React.CSSProperties['flexWrap'];
  children: React.ReactNode;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const VerticalStack = forwardRef<HTMLDivElement, IVerticalStackProps>((props, ref) => 
{
  const { gap, alignItems, justifyContent, wrap, children, fullWidth, fullHeight, ...divProps } = props
  return (
    <div ref={ref} {...divProps} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: gap,
      alignItems: alignItems ?? 'start',
      justifyContent: justifyContent ?? 'flex-start',
      flexWrap: wrap,
      width: fullWidth ? '100%' : divProps.style?.width,
      height: fullHeight ? '100%' : divProps.style?.height,
      ...divProps.style
    }}>
      {children}
    </div>
  );
}
);