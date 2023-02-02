import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student } from '../student';
import { StudentService } from '../../services/student.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.component.html',
  styleUrls: ['./create-student.component.css']
})
export class CreateStudentComponent {

  student: Student = new Student(-1, "", 0);
  submitted = false;

  constructor(private studentService: StudentService) { }

  newStudent(): void {
    this.submitted = false;
    this.student = new Student(-1,"",0);
  }

  save() {
    this.studentService.getStudentsList().pipe(take(1)).subscribe((s:any) =>
    {
      this.student.key = Math.max(Math.max(...s.map((el: { key: any; }) => el.key)),-1) + 1
      this.studentService.createStudent(this.student);
      this.student = new Student(-1,"",0);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

}
