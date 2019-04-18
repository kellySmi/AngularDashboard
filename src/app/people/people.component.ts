import { Component, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})

export class PeopleComponent implements OnInit {
    people : Person[];
  constructor(private personService: PersonService) { };
  ngOnInit() {
      this.getPeople();
  };
  getPeople(): void{
      this.personService.getPeople()
      .subscribe(people => this.people = people);
  }
}
