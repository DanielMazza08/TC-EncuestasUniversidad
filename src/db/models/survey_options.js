'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey_options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      survey_options.belongsTo( models.survey_questions, {
        foreignKey: 'question_id',
        targetKey: 'id'
      });
    }
  }
  survey_options.init({
    question_id: DataTypes.INTEGER,
    label_option: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'survey_options',
  });
  return survey_options;
};