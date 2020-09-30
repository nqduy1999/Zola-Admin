import createRequestTypes from './constype';

export const CREDENTIAL_TYPE = {
  ...createRequestTypes('CREDENTIAL', 'SIGNIN_CREDENTIAL')
};
