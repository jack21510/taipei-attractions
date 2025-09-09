import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Attraction } from '../../../core/models/attraction.model';


@Component({
  selector: 'app-edit-favorite-modal',
  standalone: true,
  templateUrl: './edit-favorite-modal.component.html',
  styleUrls: ['./edit-favorite-modal.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class EditFavoriteModalComponent implements OnChanges {

  constructor(
    private fb: FormBuilder
  ) {this.initForm()}

  @Input() isOpen = false;
  @Input() item?: Attraction & { note?: string; phone?: string };
  @Output() save = new EventEmitter<{ id: number; name: string; note: string; phone: string }>();
  @Output() cancel = new EventEmitter<void>();

  validateForm!: FormGroup;


  ngOnChanges(changes: SimpleChanges): void   {
    console.log(changes);
    if (changes['item'] && this.item) {
      this.validateForm.patchValue({
        name: this.item.name,
        introduction: this.item.introduction || '',
        address: this.item.address || '',
        tel: this.item.tel || '',
      });
    }
  }

  onSave() {
    if (this.validateForm.valid && this.item) {
      this.save.emit({ id: this.item.id, ...this.validateForm.value });
    }
  }

  onCancel() {
    this.cancel.emit();
  }


  private initForm() {
    this.validateForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(80)]],
      introduction: [Validators.required, Validators.maxLength(300)],
      address: [Validators.required, Validators.maxLength(80)],
      tel: [Validators.required, [Validators.maxLength(50),Validators.pattern(/^[0-9+\- ]*$/) ]],
    });
  }

  /** 取得欄位錯誤訊息 */
  getErrorMessage(field: string): string {
    const control = this.validateForm.get(field);
    if (!control || !control.errors) return '';

    if (control.hasError('required')) return '此欄位為必填';
    if (control.hasError('maxlength')) return `長度不可超過 ${control.getError('maxlength').requiredLength} 字`;
    if (control.hasError('pattern')) return '格式不正確，僅能輸入數字或 - ';

    return '';
  }

  /** 是否要顯示錯誤 */
  showError(field: string): boolean {
    const control = this.validateForm.get(field);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }


}
