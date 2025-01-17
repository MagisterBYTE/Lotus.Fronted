import { TColorVariantName } from 'modules';
import { TShadowElevation } from 'ui/types';
import { IGeneralBackgroundProperties } from './GeneralBackgroundProperties';
/**
 * Расширенные свойства для фона элемента UI
 */
export interface IGeneralBackgroundExtendedProperties extends IGeneralBackgroundProperties {
    /**
     * Вариант отображения фона
     */
    backColorVariant?: TColorVariantName;
    /**
     * Размер тени
     */
    shadowElevation?: TShadowElevation;
}
