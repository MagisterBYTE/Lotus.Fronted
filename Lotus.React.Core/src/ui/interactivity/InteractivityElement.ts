import { IGeneralElementProperties } from 'ui/components';
import { IInteractivityBackground } from './InteractivityBackground';
import { IInteractivityBorder } from './InteractivityBorder';
import { IInteractivityText } from './InteractivityText';

/**
 * Интерактивное взаимодействие элемента
 */
export interface IInteractivityElement extends IGeneralElementProperties, 
  IInteractivityBackground, IInteractivityBorder, IInteractivityText
{

}