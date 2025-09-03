import { Component, OnInit } from '@angular/core';
import { AttractionsService } from '../../core/services/attractions.service';
import { Attraction, Category, CategoryAll, GetAttractionAll } from '../../core/models/attraction.model';
import { Response as ApiResponse} from '../../core/models/response.model'
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from "../../shared/components/pagination/pagination.component";
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { CardComponent } from '../../shared/components/card/card.component';
import { ViewportScroller } from '@angular/common';
import { FavoritesService } from '../../core/services/favorites.service';
import { LoadingService } from '../../core/services/loaging.service';

@Component({
  selector: 'app-attractions-list',
  templateUrl: './attractions-list.component.html',
  styleUrls: ['./attractions-list.component.scss'],
  imports: [PaginationComponent, NgIf, NgFor, CardComponent, ReactiveFormsModule]
})
export class AttractionsListComponent implements OnInit {

  page = 1;
  readonly size = 30;
  total = 0;
  validateForm!: FormGroup;

  categories: Category[] = [];
  data: Attraction[] = [];
  selectedIds = new Set<number>();



  constructor(
    private attractionsService: AttractionsService,
    private fb: FormBuilder,
    private viewport:ViewportScroller,
    private fav: FavoritesService,
    private loadingService: LoadingService,

  ) { }

  ngOnInit() {
    this.initForm();
    this.getCategory();
  }

  private initForm() {
    this.validateForm = this.fb.group({
      category: [],
    });
  }

  onSearchClick() {

    this.setValidate();
    if (this.validateForm.valid) {
      const category = this.validateForm.get('category')?.value;
      this.page = 1;
      this.getAttraction(category,this.page );
    }

    return;
  }

  setValidate() {
    const category = this.validateForm.get('category')?.value ?? '';

    if (category == '') {
      this.validateForm.get('category')?.addValidators([Validators.required]);

      return;
    }
    else {
      this.validateForm.get('category')?.clearValidators();
      this.validateForm.get('category')?.updateValueAndValidity();
    }

  }

  onToggle(id: number, checked: boolean) {
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
  }

  addToFavorites() {
    const added = this.data.filter(x => this.selectedIds.has(x.id)).map(x => ({ ...x }));
    this.selectedIds.clear();
    this.fav.upsert(added);
    alert(`已加入我的最愛：${added.length} 筆`);

    console.log(this.fav.list);

  }

  isFav(id: number) {
    return this.fav.has(id);
  }

  // ---- 分頁 ----
  onPageChange(p: number): void {
    const last = Math.max(1, Math.ceil(this.total / this.size));
    const clamped = Math.max(1, Math.min(p, last));
    if (clamped === this.page) return;
    this.page = clamped;
    const category = this.validateForm.get('category')?.value;
    this.getAttraction(category,this.page);
  }

  // ---- 勾選 / 收藏 ----
  toggleSelect(id: number, checked: boolean): void {
    checked ? this.selectedIds.add(id) : this.selectedIds.delete(id);
  }

  // ---- 切分頁後滾動到list頂部 ----
  private scrollToList() {
  this.viewport.scrollToAnchor('list');
  }



  getAttraction (categoryIds: string, page :number) {
    this.loadingService.busy();
    const getAttractionAll = new GetAttractionAll;
        getAttractionAll.categoryIds = categoryIds,
        getAttractionAll.page = page;
    this.attractionsService.getAttractions(getAttractionAll).subscribe((res) => {
          if (res) {
             this.loadingService.idle();
            const mainData = res as ApiResponse;
            this.data = mainData.data as Attraction[];
            this.total = mainData.total ?? 0;
          }
        });
  }

  getCategory () {
    this.loadingService.busy();
    this.attractionsService.getAttractionsCategory().subscribe((res) => {
          if (res) {
            this.loadingService.idle();
            const mainData = res as ApiResponse;
            let categoryAll = new CategoryAll();
            categoryAll =  mainData.data as CategoryAll;
            this.categories = [
              ...categoryAll.Category,
              ...categoryAll.Friendly,
              ...categoryAll.Services,
              ...categoryAll.Target,
            ];

            setTimeout(() => this.scrollToList());
          }
        });
  }
}
