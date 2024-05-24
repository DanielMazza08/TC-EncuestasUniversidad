'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class survey_questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      survey_questions.hasMany(models.survey_options, {
        foreignKey: 'question_id'
      });
      survey_questions.belongsTo( models.surveys, {
        foreignKey: 'survey_id',
        targetKey: 'id'
      });
    }
  }
  survey_questions.init({
    survey_id: DataTypes.INTEGER,
    question_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Esto asegura que el question_code sea único
    },
    question_title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'survey_questions',
  });
  return survey_questions;
};