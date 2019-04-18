import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { MessageService } from './messages.service';
import { Person } from './person';
import { PEOPLE } from './mock-people';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleUrl = 'http://localhost:8080/api/index.php?/people'; // /person/${id}
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getPeople(): Observable<Person[]> { 
    this.messageService.add('People Service: Returned People');
    //return of(PEOPLE || []);
    return this.http.get<Person[]>(this.peopleUrl);
  }
  getPerson(id: number): Observable<Person> {
    this.messageService.add(`People Service: Returned Person id: ${id}`);
    return of(PEOPLE.find(person =>  person.id == id));
  }
  private log(message: string) {
    this.messageService.add(`PeopleService: ${message}`);
  }
}
