import { ERROR_MESSAGES } from "./constants/errorMessages";
import { emailRegex, passwordRegex, usernameRegex } from "./regex";

export const validateEmail = (email: string | undefined): string | null => {
  if (!email) return ERROR_MESSAGES.EMAIL_REQUIRED;
  if (!emailRegex.test(email)) return ERROR_MESSAGES.EMAIL_INVALID;
  return null;
};

export const validateUsername = (
  username: string | undefined
): string | null => {
  if (!username) return ERROR_MESSAGES.USERNAME_REQUIRED;
  if (!usernameRegex.test(username)) return ERROR_MESSAGES.USERNAME_INVALID;
  return null;
};

export const validatePassword = (
  password: string | undefined
): string | null => {
  if (!password) return ERROR_MESSAGES.PASSWORD_REQUIRED;
  if (!passwordRegex.test(password)) return ERROR_MESSAGES.PASSWORD_INVALID;
  return null;
};

export const validatePasswordMatch = (
  password: string | undefined,
  passwordTwo: string | undefined
): string | null => {
  if (passwordTwo === undefined) return null;
  if (!passwordTwo) return ERROR_MESSAGES.PASSWORD_TWO_REQUIRED;
  if (password !== passwordTwo) return ERROR_MESSAGES.PASSWORDS_MISMATCH;
  return null;
};

export const validationReg = (
  email: string | undefined,
  username: string | undefined,
  password: string | undefined,
  passwordTwo?: string
): string | null => {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const usernameError = validateUsername(username);
  if (usernameError) return usernameError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  const passwordMatchError = validatePasswordMatch(password, passwordTwo);
  if (passwordMatchError) return passwordMatchError;

  return null;
};

export const validationLog = (
  username: string | undefined,
  password: string | undefined
): string | null => {
  const usernameError = validateUsername(username);
  if (usernameError) return usernameError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  return null;
};
