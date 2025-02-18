import Joi from 'joi';

// Doctor Registration Validation
export function validateDoctorRegistration(data) {
  const schema = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phoneNumber: Joi.string().pattern(/^\d{10}$/),
    role: Joi.string().valid("doctor", "patient").required(), // ✅ Role validation added
    specialization: Joi.string().required(),
    licenseNumber: Joi.string().required(), // ✅ Fixed name to match your request payload
    hospitalClinic: Joi.string().required() // ✅ Fixed name to match your request payload
  });

  return schema.validate(data);
}
