import { TColorVariantName } from 'modules';
import { IGeneralTextProperties } from './GeneralTextProperties';
/**
 * Расширенные свойства для текста элемента UI
 */
export interface IGeneralTextExtendedProperties extends IGeneralTextProperties {
    /**
     * Вариант отображения текста
     */
    textColorVariant?: TColorVariantName;
}
