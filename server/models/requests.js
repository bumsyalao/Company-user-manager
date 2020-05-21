'use strict';
module.exports = (sequelize, DataTypes) => {
  const Requests = sequelize.define('Requests', {
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  }, {});
  Requests.associate = function(models) {
    // associations can be defined here
    Request.belongsTo(models.Companies, { foreignKey: 'companyId' });
    Request.belongsTo(models.Users, { foreignKey: 'userId' });
  };
  return Requests;
};