import validate from "validate.js";

const emailConstraints = {
  email: {
    message: "Must be a valid email address"
  }
};

const passwordConstraints = {
  length: {
    minimum: 8,
    message: "Must be at least 8 characters long"
  }
};

export function validateEmail(input) {
  if (!input.length) return null;
  const error = validate.single(input, emailConstraints, { format: "flat" });
  if (!error) return null;
  return error;
}

export function validatePassword(input) {
  if (!input.length) return null;
  const error = validate.single(input, passwordConstraints, { format: "flat" });
  if (!error) return null;
  return error;
}

export function disabledButton(state, emailError, passwordError) {
  return !state.email.length || !state.password.length || !!emailError || !!passwordError
}
