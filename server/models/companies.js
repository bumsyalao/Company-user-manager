'use strict';
module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define('Companies', {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'company name already in use'
      },
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        },
      }
    },
    companySize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {});
  Companies.associate = function (models) {
    // associations can be defined here
    Companies.belongsToMany(models.Users, {
      through: 'CompanyUsers',
      foreignKey: 'companyId',
      onDelete: 'CASCADE'
    });
    // Companies.hasMany(models.Users, {
    //   foreignKey: 'companyId'
    // });
  };
  return Companies;
};