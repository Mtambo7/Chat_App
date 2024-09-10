import Joi from "joi";

export const userSignupSchema = Joi.object({
  fullname: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 3 characters long",
    "string.max": "Full name must be less than 50 characters long",
  }),
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username must be less than 30 characters long",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match the password",
    "string.empty": "Confirm password is required",
  }),
  gender: Joi.string().valid("male", "female").required().messages({
    "string.empty": "Gender is required",
    "any.only": "Gender must be one of male or female",
  }),
});

export const userLoginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});
