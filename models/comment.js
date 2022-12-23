// we need to bring in Sequelize, Model, DataTypes which require sequelize
// sequelize to require our config

// our comment class needs to bring in model, where we initialize the Comment, and we need its body

// DONE

const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = require('../config/config');

class Comment extends Model {} 

// Comment init to connect to database and perform operation on it. 


Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;