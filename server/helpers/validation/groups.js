import joi from 'joi';

const groupValidate = {
  async validate(req, res, next) {
    const schema = joi.object().keys({
        
        name: joi.string().regex(/^[a-zA-Z]/).min(3).required(),
        
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

  
};
export default groupValidate;