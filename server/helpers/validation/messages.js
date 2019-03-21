import joi from 'joi';

const messageValidate = {
  async validate(req, res, next) {
    const schema = joi.object().keys({
        subject: joi.string().required(),
        messages: joi.string().required(),
        receiverid: joi.number().integer().required(),
        parentmessageid:joi.number().integer().required(),
        status:joi.string().alphanum().valid('read','draft','sent')
        .required(),
    });
    const { value, error } = joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message.replace(/[$\/\\#,+()$~%.'":*<>{}]/g,''),
      });
      
    }
    next();
  },

  async validateDraft(req, res, next) {
    const schema = joi.object().keys({
      subject: joi.string().trim().min(3),
      message: joi.string().trim().min(6),
      status: joi.string().trim().min(3).required(),
    });
    const { value, error } = joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
    next();
  },


  async validateMessageGroup(req, res, next) {
    const schema = joi.object().keys({
      subject: joi.string().trim().min(3),
      message: joi.string().trim().min(6),
      status: joi.string().alphanum().valid('sent')
        .required(),
    });
    const { value, error } = joi.validate(req.body, schema);
    if (error && error.details) {
      return res.status(400).send({
        status: 400,
        error: error.details[0].message
      });
    }
    next();
  }
};

export default messageValidate;