import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import multer from "multer";
import mongoose from "mongoose";
import { getEmpList } from "../models/getEmpList.model.js";


const employeeList=async (req,res)=>{
    if(req.user._id){
        try {
            const Employee = getEmpList(req.user.username);
            const employees = await Employee.find();
            return res
            .status(201)
            .json(new ApiResponse(200, employees, "List of Employee"));
        } catch (error) {
            console.error("Error fetching employee list:", error);
            throw new ApiError(
                500,
                "Error fetching employee list"
              );
        }
    }
}

const addEmployee=async (req,res)=>{
    if(req.user._id){
        try {
            const { name, email, mobile, designation, gender, courses } = req.body;
            const Employee = getEmpList(req.user.username);
            const existedEmp = await Employee.findOne( {email});
            if (existedEmp) {
                throw new ApiError(409, "User with Employee already exists");
              }
            const newEmp = await Employee.create({
                image: req.file && req.file.buffer , 
                name,
                email,
                mobile,
                designation,
                gender,
                courses
            });
            console.log(newEmp);

            res.status(201).json(new ApiResponse(200,newEmp, 'Employee added successfully'))
        } catch (err) {
            console.error('Error creating user:', err);
            res.status(500).json({ message: 'Server error' });
        }

    }
}
const getEmployee=async (req,res)=>{
    if(req.user._id){
        try {
            const Employee = getEmpList(req.user.username);
            const employee = await Employee.findById(req.params.id);
            //const employee = await getEmployee(req.user.username, req.params.id);
            if (!employee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json(employee);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
const updateEmployee= async (req,res)=>{
    if(req.user._id){

    }
}
const deleteEmployee=async (req,res)=>{
    if(req.user._id){
        try {
            const Employee = getEmpList(req.user.username);
            const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
            //const deletedEmployee = await deleteEmployee(req.user.username, req.params.id);
            if (!deletedEmployee) {
                return res.status(404).json({ error: 'Employee not found' });
            }
            res.json({ message: 'Employee deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export {employeeList,
        addEmployee,
        getEmployee,
        updateEmployee,
        deleteEmployee}