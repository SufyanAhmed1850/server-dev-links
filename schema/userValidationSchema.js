import Joi from "joi";

const userValidationSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[a-zA-Z]+$/),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .regex(/^[a-zA-Z]+$/),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    password: Joi.string()
        .min(8)
        .max(64)
        .pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        )
        .required(),
    repeatPassword: Joi.ref("password"),
    profile: Joi.string().allow(null).default(null),
});

export default userValidationSchema;
