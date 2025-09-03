import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environment/environment';
import { FavoritesService } from '../../core/services/favorites.service';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { Attraction } from '../../core/models/attraction.model';
import { EditFavoriteModalComponent } from '../../shared/components/favorite-modal/edit-favorite-modal.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterLink, PaginationComponent, CardComponent,EditFavoriteModalComponent],
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

  isModalOpen = false;
  editingItem: any | null = null;



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

  //編輯相關
  editItem(item: any) {
    this.editingItem = item;
    this.isModalOpen = true;
  }

  saveEdit(payload: { id: number; name: string; note: string; phone: string }) {
    this.fav.updateOne(payload.id, payload);
    this.reload();
    this.isModalOpen = false;
  }

  cancelEdit() {
    this.isModalOpen = false;
    this.editingItem = null;
  }

}
