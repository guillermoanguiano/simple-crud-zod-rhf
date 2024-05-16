import { body, validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  let errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });
  next();
};

export const validateRequiredFields = (fields) => {
  return fields.map(field => body(field).notEmpty().withMessage(`${field} is required`))
}