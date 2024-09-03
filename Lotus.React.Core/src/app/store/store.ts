import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { layoutSlice } from 'app/layout/store/LayoutSlice';
import { feedbackSlice } from 'modules/feedback/store/FeedbackSlice';

export function makeStoreCore() 
{
  return configureStore({
    reducer: {
      feedback: feedbackSlice.reducer,
      layout: layoutSlice.reducer,
      // @ts-expect-error window
      window: window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    }
  });
}

export const storeCore = makeStoreCore();

export type RootStateCore = ReturnType<typeof storeCore.getState>;

export type AppDispatchCore = typeof storeCore.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateCore,
  unknown,
  Action<string>
>;
