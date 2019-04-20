import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Person } from './person';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const people = [
      { id: 11, name: 'Joe' },
      { id: 12, name: 'Marco'},
      { id: 13, name: 'Horatio'},
      { id: 14, name: 'Cheryl'},
      { id: 15, name: 'Magnolia'},
      { id: 16, name: 'Roger'},
      { id: 17, name: 'Diane'},
      { id: 18, name: 'Drake'},
      { id: 19, name: 'Magnus'},
      { id: 20, name: 'Chastity'}
    ];
    return {people};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(people: Person[]): number {
    return people.length > 0 ? Math.max(...people.map(person => person.id)) + 1 : 11;
  }
}