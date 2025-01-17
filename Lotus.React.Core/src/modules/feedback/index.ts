export { type AlertTypeDesc, type TAlertType } from './domain/AlertType';
export { type IAlertValue } from './domain/AlertValue';
export { type FeedbackTypeDesc, type TFeedbackType } from './domain/FeedbackType';
export { showAlertFeedbackAction, hideAlertFeedbackAction } from './store/FeedbackActions';
export { useFeedbackState } from './store/FeedbackSelector';
export { feedbackSlice } from './store/FeedbackSlice';