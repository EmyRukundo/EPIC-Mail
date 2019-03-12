import joi from 'joi';

const Validation = {
    
  userSchema: joi.object().keys({
    email: joi.string().email().required(),
    firstname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
    lastname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
    password: joi.string().min(6).required(),
    
  }),
  messageSchema: joi.object().keys({
    subject: joi.string().required(),
    message: joi.string().trim().min(10).max(100),
    senderId: joi.number().integer().required(),
    receiverId: joi.number().integer().required(),
    parentMessageId: joi.number().integer().required(),
    // ​status: joi.string().required(),
    status: joi.string().alphanum().valid("sent", "draft", "read")
    .required(),
  }),

// //   groupSchema: joi.object().keys({
// //     name: joi.string().required().min(1),
// //   }),
 
  loginSchema: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
  validationOption: {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  },
 
};
export default Validation;