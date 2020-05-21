'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
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
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    instanceMethods: {
      verifyPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
      },
      filterUserDetails() {
        const details = this.get();
        delete details.password;
        delete details.updatedAt;

        return details;
      }
    }
  });
  Users.associate = function (models) {
    // associations can be defined here
    Users.belongsToMany(models.Companies, {
      through: 'CompanyUsers',
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Users;
};