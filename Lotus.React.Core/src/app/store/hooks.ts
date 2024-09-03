import { useDispatch, useSelector } from 'react-redux';
import { AppDispatchCore, RootStateCore } from './store';

export const useAppDispatchCore = useDispatch.withTypes<AppDispatchCore>();
export const useAppSelectorCore = useSelector.withTypes<RootStateCore>();