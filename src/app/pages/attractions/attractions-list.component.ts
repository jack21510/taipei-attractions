import { Component, OnInit } from '@angular/core';
import { AttractionsService } from '../../core/services/attractions.service';
import { GetAttractionAll } from '../../core/models/attraction.model';

@Component({
  selector: 'app-attractions-list',
  templateUrl: './attractions-list.component.html',
  styleUrls: ['./attractions-list.component.scss']
})
export class AttractionsListComponent implements OnInit {

  constructor(
    private attractionsService: AttractionsService,
  ) { }

  ngOnInit() {
    this.getAttraction();
  }

  getAttraction () {
    const getAttractionAll = new GetAttractionAll;
        getAttractionAll.categoryIds = '12',
        getAttractionAll.page = 1;
    this.attractionsService.getAttractions(getAttractionAll).subscribe((res) => {
          if (res) {
            console.log(res);

          }
        });
  }
}
