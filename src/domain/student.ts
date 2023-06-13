import { Schema as SchemaMongo } from "mongoose"
import { Prop, Schema } from "@nestjs/mongoose";
import { Roles } from "./roles.enum";
import { IUpdateUserPayload } from "./update.user.payload";

@Schema()
export class Student {

    @Prop({ _id: true, auto: true })
    _id: SchemaMongo.Types.ObjectId;

    @Prop()
    userId: string;

    @Prop()
    email: string;

    @Prop()
    roles: Roles[];

    static of(payload: IUpdateUserPayload): Student {
        const student = new Student();
        student.userId = payload.userId;
        student.email = payload.email;
        student.roles = payload.roles;
        return student;
    }
}