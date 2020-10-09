import createRequestTypes from './constype';
export const CREDENTIAL_TYPE = {
  ...createRequestTypes('CREDENTIAL', 'SIGNIN'),
  ...createRequestTypes('CREDENTIAL', 'SIGNOUT'),
  ...createRequestTypes('CREDENTIAL', 'GET_INFO'),
  ...createRequestTypes('CREDENTIAL', 'UPDATE_INFO'),
  ...createRequestTypes('CREDENTIAL', 'CHANGE_PASSWORD')
};
