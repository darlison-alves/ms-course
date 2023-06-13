import { Injectable } from "@nestjs/common";
import { Ctx, MessagePattern, RmqContext } from "@nestjs/microservices";
import { Student } from "src/domain/student";
import { IUpdateUserPayload } from "src/domain/update.user.payload";
import { StudentRepository } from "./student.repository";

@Injectable()
export class StudentHandler {
    constructor(private studentRepository: StudentRepository) { }

    @MessagePattern('UserUpdatedEvent')
    async update(@Ctx() context: RmqContext) {
        console.log('[UserUpdatedEvent]')

        const { content } = context.getMessage()

        const payload: IUpdateUserPayload = JSON.parse(content.toString());

        const student = await this.getStudent(payload);

        await this.studentRepository.save(student);
    }

    private async getStudent(payload: IUpdateUserPayload): Promise<Student> {
        const student = await this.studentRepository.findByEmail(payload.email);
        if(!student) {
            return Student.of(payload);
        }

        student.roles = payload.roles;

        return student
    }

} 