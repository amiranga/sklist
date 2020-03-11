import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { School } from '../shared/models/school.model';

@Injectable()
export class SchoolService {

  constructor(private http: HttpClient) { }

  getSchools(): Observable<School[]> {
    return this.http.get<School[]>('/api/schools');
  }

  countSchools(): Observable<number> {
    return this.http.get<number>('/api/schools/count');
  }

  addSchool(school: School): Observable<School> {
    return this.http.post<School>('/api/school', school);
  }

  getSchool(school: School): Observable<School> {
    return this.http.get<School>(`/api/school/${school._id}`);
  }

  editSchool(school: School): Observable<any> {
    return this.http.put(`/api/school/${school._id}`, school, { responseType: 'text' });
  }

  deleteSchool(school: School): Observable<any> {
    return this.http.delete(`/api/school/${school._id}`, { responseType: 'text' });
  }

}
