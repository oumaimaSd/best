import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private testsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public tests$: Observable<any[]> = this.testsSubject.asObservable();

  constructor() { }

  getTests(): any[] {
    return this.testsSubject.getValue();
  }
getMembres():any []{
  return this.testsSubject.getValue();}
  addTest(test: any): void {
    const currentTests = this.getTests();
    const updatedTests = [...currentTests, test];
    this.testsSubject.next(updatedTests);
  }

getTeamware():any  []{

  return this.testsSubject.getValue();
}

}
