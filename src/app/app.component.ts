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
    const hexText: String = this.toHexString(text);
    this.signPrivate(hexText);
  }
  signPrivate(str: String) {
    this.signature = this.$encrypt.sign(str, CryptoJS.SHA256, 'sha256');
  }
  // ascii_to_hex(str: String) {
  //   var arr1 = [];
  //   for (var n = 0, l = str.length; n < l; n++) {
  //     var hex = Number(str.charCodeAt(n)).toString(16);
  //     arr1.push(hex.toUpperCase());
  //   }
  //   return arr1.join('');
  // }

  toHexString(str: String) {
    const byteArray = this.toUTF8Array(str);
    return Array.prototype.map
      .call(byteArray, function(byte) {
        return ('0' + (byte & 0xff).toString(16)).slice(-2);
      })
      .join('')
      .toUpperCase();
  }

  toUTF8Array(str: String) {
    let utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charCode = str.charCodeAt(i);
      if (charCode < 0x80) utf8.push(charCode);
      else if (charCode < 0x800) {
        utf8.push(0xc0 | (charCode >> 6), 0x80 | (charCode & 0x3f));
      } else if (charCode < 0xd800 || charCode >= 0xe000) {
        utf8.push(
          0xe0 | (charCode >> 12),
          0x80 | ((charCode >> 6) & 0x3f),
          0x80 | (charCode & 0x3f)
        );
      } else {
        i++;
        charCode = ((charCode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff);
        utf8.push(
          0xf0 | (charCode >> 18),
          0x80 | ((charCode >> 12) & 0x3f),
          0x80 | ((charCode >> 6) & 0x3f),
          0x80 | (charCode & 0x3f)
        );
      }
    }
    return utf8;
  }
}
