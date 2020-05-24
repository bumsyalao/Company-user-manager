'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserCompany = sequelize.define('UserCompany', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  UserCompany.associate = function (models) {
    UserCompany.belongsTo(models.Users, {
      foreignKey: 'userId',
    });
    UserCompany.belongsTo(models.Companies, {
      foreignKey: 'companyId',
    });
    // associations can be defined here
  };
  return UserCompany;
};