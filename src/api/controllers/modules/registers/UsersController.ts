import { Sequelize } from "sequelize";
import People from "../../../database/models/People.js";
import Users from "../../../database/models/Users.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";
import BasePeopleRegistersController from "./BasePopleRegistersController.js";

export default class UsersController extends BasePeopleRegistersController {
    static getTableClassModel() : any {
        return Users;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
