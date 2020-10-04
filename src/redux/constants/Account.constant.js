import createRequestTypes from './constype';
export const CREDENTIAL_TYPE = {
  ...createRequestTypes('CREDENTIAL', 'SIGNIN'),
  ...createRequestTypes('CREDENTIAL', 'SIGNOUT')
};
