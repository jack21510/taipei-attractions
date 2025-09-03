import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export type ModalKind = 'error' | 'info' | 'confirm';

export interface ModalState {
  open: boolean;
  kind: ModalKind;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  // 關閉事件：Host 關閉時會 next(void) 並 complete
  closed$?: Subject<void>;
}

@Injectable({ providedIn: 'root' })
export class MessageService {
  private _state$ = new BehaviorSubject<ModalState | null>(null);
  readonly state$ = this._state$.asObservable();

  /** 關閉目前的 Modal（若有） */
  close(): void {
    const st = this._state$.value;
    if (st?.closed$ && !st.closed$.closed) {
      st.closed$.next();
      st.closed$.complete();
    }
    this._state$.next(null);
  }

  /** 關所有（別名） */
  dismissAll(): void {
    this.close();
  }

  /** 開一個錯誤 Modal*/
  openError(message: string, title = '系統錯誤'): { closed$: Observable<void> } {
    const closed$ = new Subject<void>();
    this._state$.next({
      open: true,
      kind: 'error',
      title,
      message,
      confirmText: '確定',
      closed$
    });
    return { closed$: closed$.asObservable() };
  }

}
