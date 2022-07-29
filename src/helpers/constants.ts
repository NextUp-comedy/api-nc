export const messages = {
  authResponse: {
    approvedUser: 'APPROVED ACCOUNT',
    rejectedUser: 'REJECTED ACCOUNT',
    verifiedUser: 'VERIFY ACCOUNT',
    notExist: 'NOT EXIST USER',
    waitApprove: 'WAITING APPROVAL',
    adminApproval: 'SUCCESSFULLY APPROVED',
    wrongEmailOrPassword: 'Incorrect email or password',
    logIn: 'SUCCESS LOGIN',
    logOut: 'SUCCESS LOGOUT',
    reset: 'SUCCESS RESET',
    unAuthUser: 'UNAUTHORIZED',
    resetPassword: 'RESET PASSWORD',
  },
  check: {
    emailCheck: 'CHECK EMAIL',
  },
  listOfUsers: {
    approved: 'APPROVED USERS',
    notApproved: 'NOT APPROVED USERS',
    rejected: 'REJECTED USERS',
  },
  token: {
    accessToken: 'accessToken',
    resetToken: 'resetPasswordToken',
    verifyToken: 'verifyEmailToken',
  },
};

export const userStatus = {
  pending: 'PENDING',
  rejected: 'REJECTED',
  approved: 'APPROVED',
  banned: 'BANNED',
};

export const emailTemplates = {
  test: 'testMail',
};

export const LOGGER_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const LOGGER_COLORS = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'cyan',
  debug: 'gray',
};
