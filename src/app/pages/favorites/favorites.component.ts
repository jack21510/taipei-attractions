import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environment/environment';
import { FavoritesService } from '../../core/services/favorites.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { Attraction } from '../../core/models/attraction.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PaginationComponent, CardComponent],
})
export class FavoritesComponent implements OnInit {

  constructor(
    private fav: FavoritesService,
    private fb: FormBuilder
  ) { this.reload(); }


  ngOnInit() {

  }

  size = environment.PAGE_SIZE;
  page = 1;
  total = 0;
  all: Attraction[] = [];
  data: Attraction[] = [];

  loading = false;
  selectedIds = new Set<number>();



  reload() {
    this.all = this.fav.list();
    this.total = this.all.length;
    this.applyPage(1);
  }

  applyPage(p:number){
    this.page = Math.max(1, Math.min(p, Math.ceil(Math.max(1,this.total)/this.size)));
    const s=(this.page-1)*this.size;
    this.data = this.all.slice(s, s+this.size);
    this.selectedIds.clear();
  }

  toggleSelect(id:number,checked:boolean){
    checked?this.selectedIds.add(id):this.selectedIds.delete(id);
  }

  removeSelected(){
    this.fav.remove([...this.selectedIds]);
    this.reload();
  }


  isFav(id: number) {
    return this.fav.has(id);
  }

  deleteToFavorites() {
    this.fav.remove([...this.selectedIds]);
    this.reload();

  }

}
