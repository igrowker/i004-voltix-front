import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RecoverService {
  http = inject(HttpClient);

  resetPassword(email: any): Observable<any> {
    return this.http.post<any>(environment.API_URL + 'api/auth/password/reset/', email);
  }
}
