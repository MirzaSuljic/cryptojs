import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plainText: String = '';
  signature: String = '';
  publicKey: string = '';
  $encrypt: any;
  constructor() {
    this.$encrypt = new JSEncrypt({
      default_key_size: '2048'
    });
    this.publicKey = this.$encrypt.getPublicKeyB64();
  }
  sign() {
    const text: String = `${this.plainText}`.trim();
    const hexText: String = this.ascii_to_hex(text);
    this.signPrivate(hexText);
  }
  signPrivate(str: String) {
    this.signature = this.$encrypt.sign(str, CryptoJS.SHA256, 'sha256');
  }
  ascii_to_hex(str: String) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex.toUpperCase());
    }
    return arr1.join('');
  }
}
