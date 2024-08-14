import { Router } from "express";
import {employeeList,addEmployee,getEmployee,updateEmployee,deleteEmployee} from"../controllers/empList.controllers.js"
import {verifyJWT} from "../middlewares/auth.middlewares.js"
const empRouter = Router()

empRouter.route("/employeelist").get(verifyJWT,employeeList)
empRouter.route("/").post(verifyJWT,addEmployee)
empRouter.route("/:id").get(verifyJWT,getEmployee)
empRouter.route("/:id").put(verifyJWT,updateEmployee)
empRouter.route("/:id").delete(verifyJWT,deleteEmployee)

export default empRouter