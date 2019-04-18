import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  @Input() person: Person;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private personService: PersonService){ 
  }
  ngOnInit() {
    this.getPerson();
  }
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
    .subscribe(person => this.person = person);
  }
  save(): void{
      this.personService.updatePerson(this.person)
      .subscribe(()=> this.goBack());
  }
}
