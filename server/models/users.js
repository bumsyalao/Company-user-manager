const bcrypt = require('bcrypt');
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'email already in use'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        },
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
          user.updateAt = Date.now();
        }
      }
    },
  });
  Users.prototype.verifyPassword = function (userPassword) {
    return bcrypt.compareSync(userPassword, this.password);
  };
  Users.associate = (models) => {
    // associations can be defined here
    Users.belongsToMany(models.Companies, {
      through: 'CompanyUsers',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};