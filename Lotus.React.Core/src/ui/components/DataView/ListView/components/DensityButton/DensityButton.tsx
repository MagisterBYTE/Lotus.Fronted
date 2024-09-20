import React, { useState } from 'react';
import { TPlacementDensity } from 'ui/types/PlacementDensity';
import { MdDensityLarge, MdDensityMedium, MdDensitySmall } from 'react-icons/md';
import { Button, IButtonProps } from 'ui/components/Controls';

export interface IDensityButtonProps extends IButtonProps
{
  /**
   * Функция обратного вызова для установки выбранной плотности
   * @param sort 
   * @returns 
   */
  onSetPlacementDensity: (density: TPlacementDensity) => void;

  /**
   * Изначальное значение плотности
   */
  initialDensity: TPlacementDensity;
}

export const DensityButton: React.FC<IDensityButtonProps> = (props: IDensityButtonProps) => 
{
  const { onSetPlacementDensity, initialDensity, ...buttonProps } = props;

  const [density, setDensity] = useState<TPlacementDensity>(initialDensity);

  const handleSetDensity = () =>
  {
    if (density === 'density')
    {
      setDensity('normal');
      onSetPlacementDensity('normal');
      return;
    }

    if (density === 'normal')
    {
      setDensity('spacious');
      onSetPlacementDensity('spacious');
      return;
    }

    if (density === 'spacious')
    {
      setDensity('density');
      onSetPlacementDensity('density');
    }
  }

  const getIcon = () =>
  {
    switch (density)
    {
      case 'density': return <MdDensitySmall />
      case 'normal': return <MdDensityMedium />
      case 'spacious': return <MdDensityLarge />
    }

    return <></>
  }

  return (
    <Button {...buttonProps} variant='filled' size='large' onClick={handleSetDensity}>
      {getIcon()}
    </Button>
  )
};
