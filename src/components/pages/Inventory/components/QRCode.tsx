import React, { Component } from 'react'
import * as QRCode from 'qrcode.react';

export class PrintableQRCode extends Component<any> {

  render() {
return (
  <div>

<QRCode value={this.props.id} />
  </div>
)
  }
}
