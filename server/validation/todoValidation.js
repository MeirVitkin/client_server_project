const Joi = require("joi");

function handelIdValidation(req, res, next){
    const idSchema = Joi.number().min(1).required();
    const { error } = idSchema.validate(req.params.id);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

function handleBodyValidation(req, res, next) {
    const setTodos = Joi.object({
        title: Joi.string()
    });
    const { error } = setTodos.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}
function handleEditValidation(req, res, next) {
    const editTodos = Joi.object({
        id: Joi.number(),
        title: Joi.string()
    });
    const { error } = editTodos.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    next();
}

function handelCheckValidation(req, res, next) {
    const idSchema = Joi.number().min(1).required();
    const { error } = idSchema.validate(req.params.id);
    if (error) {
        res.status(400).send(error? error.details[0].message: error2.error.details[0].message);
        return;
    }
    next();
}

module.exports ={
    handleBodyValidation,
    handleEditValidation,
    handelIdValidation,
    handelIdValidation, 
    handelCheckValidation
}