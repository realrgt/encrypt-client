import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  encrypted: any = '';
  decrypted: string = '';

  request: string = '';
  responce: string = '';

  token: string = environment.secret;

  constructor() {
    this.encryptUsingAES256();
  }

  ngOnInit(): void {}

  encryptUsingAES256(): void {
    // console.log(JSON.stringify(this.token));
    // console.log(JSON.stringify(this.token));

    const key = CryptoJS.enc.Utf8.parse(this.token);
    const iv = CryptoJS.enc.Utf8.parse(this.token);

    if (this.request === '') {
      this.encrypted = '';
    } else {
      const encrypted = CryptoJS.AES.encrypt(this.request, key, {
        keySize: 5,
        iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });

      this.encrypted = encrypted.toString();
    }
  }

  decryptUsingAES256(): void {
    const key = CryptoJS.enc.Utf8.parse(this.token);
    const iv = CryptoJS.enc.Utf8.parse(this.token);

    this.decrypted = CryptoJS.AES.decrypt(this.encrypted, key, {
      keySize: 5,
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }
}
