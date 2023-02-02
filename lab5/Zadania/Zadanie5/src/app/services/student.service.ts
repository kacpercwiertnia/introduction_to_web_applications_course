import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Student } from '../students/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private db: AngularFirestore) {
    this.students = this.db.collection('Students').valueChanges();
    this.students.subscribe((s:any) => this.studentsList = s);
  }

  students: Observable<any[]>;
  studentsList: Student[] = [];


  createStudent(student: Student): void {
    this.db.collection('Students').doc(student.key.toString()).set({
      key: student.key,
      name: student.name,
      age: student.age
    })
  }

  updateStudent(s: Student) {
   this.db.collection('Students').doc(s.key.toString()).update({
    name: s.name,
    age: s.age
   })
  }

  deleteStudent(key: number) {
    this.db.collection('Students').doc(key.toString()).delete();
    for(let i = 0; i < this.studentsList.length; i++){
      if(this.studentsList[i].key == key){
        this.studentsList.splice(i,1);
        break;
      }
    }
  }

  getStudentsList()  {
    return this.students;
  }

  deleteAll() {
    for( let student of this.studentsList ){
      this.db.collection('Students').doc(student.key.toString()).delete();
    }
    this.studentsList = [];
  }
    
}
