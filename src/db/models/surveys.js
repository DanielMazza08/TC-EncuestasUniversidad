'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class surveys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      surveys.hasMany(models.survey_questions, {
        foreignKey: 'survey_id'
      });
      surveys.hasMany(models.survey_response_data, {
        foreignKey: 'survey_id'
      });
    }
  }
  surveys.init({
    survey_name: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'surveys',
    timestamps: true,
  });
  return surveys;
};