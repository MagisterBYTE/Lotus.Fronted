import { RootStateCore, useAppSelectorCore } from 'app/store';
import { ILayoutFooter, ILayoutHeader } from '../domain';
import { ILayoutState } from './LayoutState';

export const useLayoutState = (): ILayoutState =>
{
  return useAppSelectorCore((state: RootStateCore) => state.layout)
}

export const useLayoutFooterState = (): ILayoutFooter =>
{
  return useAppSelectorCore((state: RootStateCore) => state.layout.footer)
}

export const useLayoutHeaderState = (): ILayoutHeader =>
{
  return useAppSelectorCore((state: RootStateCore) => state.layout.header)
}
