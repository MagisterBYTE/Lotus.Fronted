import React, { useState } from 'react';
import { TPlacementDensity } from 'ui/types/PlacementDensity';
import { MdDensityLarge, MdDensityMedium, MdDensitySmall } from 'react-icons/md';
import { Button, IButtonProps, TButtonVariant } from 'ui/components/Controls';
import { TControlSize } from 'ui/types';

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
    if (density === TPlacementDensity.Density)
    {
      setDensity(TPlacementDensity.Normal);
      onSetPlacementDensity(TPlacementDensity.Normal);
      return;
    }

    if (density === TPlacementDensity.Normal)
    {
      setDensity(TPlacementDensity.Spacious);
      onSetPlacementDensity(TPlacementDensity.Spacious);
      return;
    }

    if (density === TPlacementDensity.Spacious)
    {
      setDensity(TPlacementDensity.Density);
      onSetPlacementDensity(TPlacementDensity.Density);
    }
  }

  const getIcon = () =>
  {
    switch (density)
    {
      case TPlacementDensity.Density: return <MdDensitySmall />
      case TPlacementDensity.Normal: return <MdDensityMedium />
      case TPlacementDensity.Spacious: return <MdDensityLarge />
    }

    return <></>
  }

  return (
    <Button {...buttonProps} variant={TButtonVariant.Filled} size={TControlSize.Large} onClick={handleSetDensity}>
      {getIcon()}
    </Button>
  )
};
