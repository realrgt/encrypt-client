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

      this.encrypted = encrypted
        .toString()
        .replace(/\+/g, 'p1L2u3S')
        .replace(/\//g, 's1L2a3S4h')
        .replace(/=/g, 'e1Q2u3A4l');
    }
  }

  decryptUsingAES256(): void {
    const key = CryptoJS.enc.Utf8.parse(this.token);
    const iv = CryptoJS.enc.Utf8.parse(this.token);

    const regularEncrypted = this.encrypted
      .replace(/p1L2u3S/g, '+')
      .replace(/s1L2a3S4h/g, '/')
      .replace(/e1Q2u3A4l/g, '=');

    this.decrypted = CryptoJS.AES.decrypt(regularEncrypted, key, {
      keySize: 5,
      iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  }

  copyText(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
