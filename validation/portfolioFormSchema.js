const Joi = require('joi');

// Joi validation schema for the portfolio contact form
const portfolioFormSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters long',
  }),
  subject: Joi.string().min(3).required().messages({
    'string.empty': 'Subject is required',
    'string.min': 'Subject must be at least 3 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email address',
  }),
  message: Joi.string().min(10).required().messages({
    'string.empty': 'Message is required',
    'string.min': 'Message must be at least 10 characters long',
  }),
});

module.exports = portfolioFormSchema;
