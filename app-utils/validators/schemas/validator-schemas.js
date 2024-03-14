const Joi = require('joi');

const closeApproachDataSchema = Joi.object({
  close_approach_date: Joi.string().isoDate().required(),
  close_approach_date_full: Joi.string().required(),
  epoch_date_close_approach: Joi.number().required(),
  relative_velocity: Joi.object({
    kilometers_per_second: Joi.string().required(),
    kilometers_per_hour: Joi.string().required(),
    miles_per_hour: Joi.string().required()
  }).required(),
  miss_distance: Joi.object({
    astronomical: Joi.string().required(),
    lunar: Joi.string().required(),
    kilometers: Joi.string().required(),
    miles: Joi.string().required()
  }).required(),
  orbiting_body: Joi.string().required()
});

const observableMeteorsSchema = Joi.object().pattern(
    /\d{4}-\d{2}-\d{2}/,
    Joi.array().items(
        Joi.object({
          id: Joi.string().required(),
          name: Joi.string().required(),
          average_diameter: Joi.number().required(),
          is_potentially_hazardous_asteroid: Joi.boolean().required(),
          close_approach_data: Joi.array().items(closeApproachDataSchema).required(),
          relative_velocity: Joi.string().required()
        })
    )
);


const hazardousMeteorsResponseValidSchema = Joi.object({
  visible: Joi.object({
    meteors: Joi.number().integer().positive().required()
  }).optional(),
  hazardous: Joi.object({
    amount: Joi.number().positive().integer().required(),
    meteors: Joi.array().items(
        Joi.object({
          id: Joi.string().pattern(/^\d+$/).required(),
          name: Joi.string().required(),
          is_potentially_hazard: Joi.boolean().required()

        })
    ).required()
  }).optional()
});

const roverPictureRequestValidSchema= Joi.object({
    id: Joi.string().uuid(),
    name: Joi.string().pattern(/^[a-z ,.'-]+$/i, 'name').required(),
    user_api_key: Joi.string().min(10).alphanum().required(),
    sol: Joi.number().positive().integer().min(1).max(1000).required(),
    page: Joi.number().positive().integer().required()
});

module.exports = {
    hazardousMeteorsResponseValidSchema,
    roverPictureRequestValidSchema,
    observableMeteorsSchema
}