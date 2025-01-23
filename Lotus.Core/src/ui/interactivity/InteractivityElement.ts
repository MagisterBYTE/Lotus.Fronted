import { IGeneralElementProperties } from 'ui/base/GeneralElementProperties';
import { IInteractivityBackgroundProperties } from './InteractivityBackground';
import { IInteractivityBorderProperties } from './InteractivityBorder';
import { IInteractivityTextProperties } from './InteractivityText';

/**
 * Интерактивное взаимодействие элемента
 */
export interface IInteractivityElementProperties extends IGeneralElementProperties, 
  IInteractivityBackgroundProperties, IInteractivityBorderProperties, IInteractivityTextProperties
{

}