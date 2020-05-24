'use strict';
module.exports = (sequelize, DataTypes) => {
  const CompanyUsers = sequelize.define('CompanyUsers', {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  CompanyUsers.associate = function (models) {
    // associations can be defined here
    CompanyUsers.belongsTo(models.Companies, {
      foreignKey: 'companyId'
    });
    CompanyUsers.belongsTo(models.Users, {
      foreignKey: 'userId'
    });
  };
  return CompanyUsers;
};