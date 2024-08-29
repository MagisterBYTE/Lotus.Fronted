import React, { ComponentPropsWithRef, forwardRef } from 'react';

export interface IGridProps extends ComponentPropsWithRef<'div'>
{
  gridTemplateColumns: React.CSSProperties['gridTemplateColumns'];
  gridTemplateRows: React.CSSProperties['gridTemplateRows'];
  columnGap?: React.CSSProperties['columnGap'];
  rowGap?: React.CSSProperties['rowGap'];
  horizontalAlign?: React.CSSProperties['justifyContent'];
  verticalAlign?: React.CSSProperties['alignContent'];
  horizontalContentAlign?: React.CSSProperties['justifyItems'];
  verticalContentAlign?: React.CSSProperties['alignItems'];
}

export const Grid = forwardRef<HTMLDivElement, IGridProps>((props, ref) => 
{
  const { gridTemplateColumns, gridTemplateRows, columnGap, rowGap, horizontalAlign, verticalAlign, horizontalContentAlign,
    verticalContentAlign, children, ...divProps } = props
  return (
    <div ref={ref} {...divProps} style={{
      display: 'grid',
      gridTemplateColumns: gridTemplateColumns,
      gridTemplateRows: gridTemplateRows,
      columnGap: columnGap,
      rowGap: rowGap,
      justifyContent: horizontalAlign ?? 'stretch',
      alignContent: verticalAlign ?? 'center',
      justifyItems: horizontalContentAlign ?? 'start',
      alignItems: verticalContentAlign ?? 'center',
      ...divProps.style
    }}>
      {children}
    </div>
  );
}
)