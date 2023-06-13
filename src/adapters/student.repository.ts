import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Student } from "src/domain/student";

export class StudentRepository {
    constructor(@InjectModel(Student.name) private userModel: Model<Student>) { }

    public async save(student: Student): Promise<Student> {
        if(student._id) {
            await this.userModel.updateOne({ _id: student._id }, student);
        } else {
            await this.userModel.create(student);
        }
        return student;
    }

    public async findByEmail(email: string): Promise<Student> {
        return this.userModel.findOne({ email });
    }
}