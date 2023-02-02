import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { StudentService } from 'src/app/services/student.service';
import { Student } from '../student';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent {
  student: Student = new Student(-1,"",0);
  submitted = false;

  constructor(private route: ActivatedRoute, private studentService: StudentService) {
    this.route.params.subscribe(params => {
      this.studentService.getStudentsList().pipe(take(1)).subscribe((st:any) =>{
        this.student = st.filter((el: { key: any; }) => el.key == params["key"])[0]
      });
    })
   }

  save() {
    this.studentService.getStudentsList().pipe(take(1)).subscribe((s:any) => 
    {
      this.studentService.updateStudent(this.student);
    });
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
