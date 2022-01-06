import * as codes from './errorCodes';

export const getErrorMessage = ({ error, section }) => {
  switch (section) {
    case 'user':
      return codes.user[error];
    default:
      return 'Unknown error code: ' + error;
  }
};
