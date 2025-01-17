import { TThemeColor } from 'ui/theme/types';
import { TCssBackgroundImage } from 'ui/types';
/**
 * Общие свойства для фона элемента UI
 */
export interface IGeneralBackgroundProperties {
    /**
     * Основной цвет
     */
    backColor?: TThemeColor;
    /**
     * Фоновое изображение
     */
    backImage?: TCssBackgroundImage;
}
