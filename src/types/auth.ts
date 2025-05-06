export enum AuthErrorType {
  SESSION_ERROR = "session_error",
  SIGN_IN_ERROR = "sign_in_error",
  SIGN_UP_ERROR = "sign_up_error",
  SIGN_OUT_ERROR = "sign_out_error",
  UNKNOWN_ERROR = "unknown_error",
}

export interface AuthError {
  type: AuthErrorType;
  message: string;
}
