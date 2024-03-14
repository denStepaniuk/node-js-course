const {
    hazardousMeteorsResponseValidSchema,
    roverPictureRequestValidSchema,
    observableMeteorsSchema
} = require('./schemas/validator-schemas');

const observableMeteorsResponseValidator = (responseBody) => {
    return observableMeteorsSchema.validate(responseBody);
}

const meteorResponseBodyValidator = (responseBody) => {
    return hazardousMeteorsResponseValidSchema.validate(responseBody);
}

const roverPictureRequestBodyValidator = (req, res, next) => {
    const {error} = roverPictureRequestValidSchema.validate(req.body);
    next(error);
};

module.exports = {
    meteorResponseBodyValidator,
    roverPictureRequestBodyValidator,
    observableMeteorsResponseValidator
}