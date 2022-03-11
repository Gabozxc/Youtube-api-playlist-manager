import { Sequelize } from "sequelize";
import db from "../config/db";

const User = db.define("user", {
  
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING(60),
    allowNull: false,
    validate: {
      isEmail: {
        msg: "Agrega un correo valido",
      },
      notEmpty: {
        msg: "Debe agregar un correo",
      },
    },
  }

});

export default User;
