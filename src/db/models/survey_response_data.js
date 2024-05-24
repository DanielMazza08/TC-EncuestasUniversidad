'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey_response_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      survey_response_data.belongsTo( models.person_report_data, {
        foreignKey: 'person_id',
        targetKey: 'id',
        as: 'person_report_data'
      });
      survey_response_data.belongsTo( models.surveys, {
        foreignKey: 'survey_id',
        targetKey: 'id'
      });
      survey_response_data.belongsTo( models.survey_questions, {
        foreignKey: 'question_id',
        targetKey: 'id'
      });
      survey_response_data.belongsTo( models.survey_options, {
        foreignKey: 'option_id',
        targetKey: 'id'
      });
    }
  }
  survey_response_data.init({
    person_id: DataTypes.INTEGER,
    survey_id: DataTypes.INTEGER,
    question_id: DataTypes.INTEGER,
    option_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'survey_response_data',
  });
  return survey_response_data;
};