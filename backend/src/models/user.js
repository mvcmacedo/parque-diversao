/* eslint-disable no-param-reassign */
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,
        password_hash: DataTypes.STRING,
        is_admin: DataTypes.BOOLEAN,
        is_student: DataTypes.BOOLEAN,
        age: DataTypes.INTEGER,
      },
      {
        hooks: {
          beforeSave: async (user) => {
            if (user.password) {
              user.password_hash = await bcrypt.hash(user.password, 8);
            }
          },
        },
        tableName: 'Users',
        sequelize,
      },
    );
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
