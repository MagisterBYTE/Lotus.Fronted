/**
 * Цветовая модель, в которой цветовыми координатами являются тон, насыщенность и светлота.
 */
export interface IColorModelHSL
 {

  /**
   * Тон [0; 360]
   */
  h:number

  /**
   * Насыщенность [0; 1]
   */
  s:number

  /**
   * Светлота [0; 1]
   */
  l:number
}