import { Component, OnInit, HostListener } from '@angular/core';
import { PaymentService } from '../payment/payment.service';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  handler: any;
  amount = 500;
  constructor(private paymentSvc: PaymentService ) {
  }
  ngOnInit() {

console.log('key', environment.stripeKey);
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: 'https://firebasestorage.googleapis.com/v0/b/projetia-8a0f1.appspot.com/o/uploads%2Fadno' +
      '.svg?alt=media&token=2992a291-6958-4155-9282-6d37084d3b76',
      locale: 'auto',
      token: token => {
        this.paymentSvc.processPayment(token, this.amount)
      }
    });
  }
  handlePayment() {
    this.handler.open({
      name: 'FireStarter',
      excerpt: 'Deposit Funds to Account',
      amount: this.amount
    });
  }
  @HostListener('window:popstate')
  onPopstate() {
    this.handler.close()
  }
}
