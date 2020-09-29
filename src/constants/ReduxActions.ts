const SUCCESS_SUFFIX = '_SUCCESS';
const FAILURE_SUFFIX = '_FAIL';

export const GET_ORDER_DETAILS = 'GET_ORDER_DETAILS';
export const MARK_AS_PAID_ORDER = 'MARK_AS_PAID_ORDER';
export const CANCEL_ORDER = 'CANCEL_ORDER';

export const SAVE_CREDENTIAL = 'SAVE_CREDENTIAL';

export const ActionSuccessfully = (action: string): string => {
  return action.concat(SUCCESS_SUFFIX);
};

export const ActionFailure = (action: string): string => {
  return action.concat(FAILURE_SUFFIX);
};
