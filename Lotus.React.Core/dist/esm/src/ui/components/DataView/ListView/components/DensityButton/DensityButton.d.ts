import React from 'react';
import { TPlacementDensity } from 'ui/types/PlacementDensity';
import { IButtonProps } from 'ui/components/Controls';
export interface IDensityButtonProps extends IButtonProps {
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
export declare const DensityButton: React.FC<IDensityButtonProps>;
