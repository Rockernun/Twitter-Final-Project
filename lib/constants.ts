export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);
export const NAME_MIN_LENGTH = 3;
export const PASSWORD_REGEX_ERROR =
  "비밀번호는 소문자, 대문자, 특수문자를 포함하고 있어야 합니다!";
