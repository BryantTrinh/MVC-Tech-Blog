const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/config');

// user model requires us to extend and we need to somehow check the password
// DONE

class User extends Model {
  checkPassword = (loginPw) => {
    return bcrypt.compareSync(loginPw, this.password);
  }
}



User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // password must have a length of at least 4 characters
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    // use beforeCreate hook before model instance is created. Pass in newUserData for data for the new model that is going to be created. using bcrypt to hash the password property of newUserData and then sets the hashed password back to password property. 10 times rehashing with bcrypt is the standard.
    hooks: {
      beforeCreate: async(newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async(updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  });

  module.exports = User;