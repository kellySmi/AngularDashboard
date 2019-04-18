import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './messages.service';
import { Person } from './person';
//import { PEOPLE } from './mock-people';


@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private peopleUrl = 'api/people'; // /person/${id}
  //private personUrl = 'api/person';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  getPeople(): Observable<Person[]> { 
    this.messageService.add('People Service: All People');
    //return of(PEOPLE || []);
    return this.http.get<Person[]>(this.peopleUrl)
      .pipe(
        tap(_ => this.log('fetched people')),
        catchError(this.handleError<Person[]>('getPeople', []))
    );
  }
  getPerson(id: number): Observable<Person> {
    this.messageService.add(`People Service: Person id: ${id}`);
    //return of(PEOPLE.find(person =>  person.id == id));
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<Person>(url)
      .pipe(
        tap(_ => this.log(`fetched person id:${id}`)),
        catchError(this.handleError<Person>(`getPerson id:${id}`,))
      );
  }
  private log(message: string) {
    this.messageService.add(`PeopleService: ${message}`);
  }
  private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
