import { Component } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  constructor(private http: Http) { }
  sendEmail() {
    const url = `https://us-central1-inf1183-a4ebc.cloudfunctions.net/httpEmail/function`
    const params: URLSearchParams = new URLSearchParams();
    const headers = new Headers({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    params.set('to', 'neronpascal001@gmail.com');
    params.set('from', 'neronpascal001@gmail.com');
    params.set('subject', 'test-email');
    params.set('content', 'Hello World');
    return this.http.post(url, params, headers)
      .toPromise()
      .then( res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
