import React, { Component } from 'react'
import * as QRCode from 'qrcode.react';

export class PrintableQRCode extends Component<any> {

  render() {
return (
  <div>
<QRCode value={this.props.id} size={90} style={{border: '5px solid white'}}/>
  </div>
)
  }
}
