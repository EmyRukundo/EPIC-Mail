import joi from 'joi';

const userValidate = {
  
  async validate(req, res, next) {
  
    const schema = joi.object().keys({
        email: joi.string().email().required(),
        firstname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        lastname: joi.string().regex(/^[a-zA-Z]/).min(2).required(),
        password: joi.string().min(6).required(),
    });
    const { error } = joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g,''),
      });
    }
    next();
  },

  async validatelogin(req, res, next) {
    const schema = joi.object().keys({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });
    const { error } = joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g,''),
      });
    }
    next();
  }
};
export default userValidate;