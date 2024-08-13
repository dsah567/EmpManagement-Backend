import mongoose,{Schema} from "mongoose"

const getEmpList = (username) => {

    const collectionName = `${username}_collection`;

    const employeeSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
        },
        designation: {
            type: String,
            required: true,
            enum: ['HR', 'Manager', 'Sales']
        },
        gender: {
            type: String,
            enum: ['M', 'F'],
            required: true
        },
        courses: {
            type: String,
            enum: ['MCA', 'BCA', 'BSC'],
            required: true
        },
        image: {
            type: Buffer, 
            required: false
        }
    },{timestamps:true});

    
    const EmployeeModel = mongoose.model(collectionName, employeeSchema);


    return EmployeeModel;
};

export {getEmpList}