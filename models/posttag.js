'use strict';
module.exports = function(sequelize, DataTypes) {
  var postsTags = sequelize.define('postsTags', {
    tagId: DataTypes.INTEGER,
    favoriteId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return postsTags;
};