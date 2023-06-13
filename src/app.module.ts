import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { StudentHandler } from './adapters/student.handler';
import { StudentRepository } from './adapters/student.repository';
import { Student } from './domain/student';


const { MONGO_URL } = process.env

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {}),
    MongooseModule.forFeature([
      {
        name: Student.name,
        schema: SchemaFactory.createForClass(Student)
      },
    ])
  ],
  controllers: [
    StudentHandler
  ],
  providers: [ StudentRepository ],
})
export class AppModule {}
