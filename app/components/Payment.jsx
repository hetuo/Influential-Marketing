import React from 'react';
import { Link, browserHistory } from 'react-router';
import Pay from './Pay';

export default class Payment extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      payment: {}
    };
  }

  render() {
      const { payment } = this.props;
      console.log('666666666666', this.props.payment.payment.name);
    //  console.log('6666666', this.props.payment.name);
      if (payment.payment.name != undefined){
        console.log('abcded');
        return (
          <div>
            <div className="login-wrapper">
              <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="active">Payment</li>
              </ol>
            </div>
            <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
              <div className='grid-cell animate-top'  style={{maxWidth: '700px', minWidth: '280px'}}>
                <Pay
                  name={payment.payment.name}
                  description={payment.payment.description}
                  amount={payment.payment.amount}
                  pk={payment.payment.public_key}
                  sk={payment.payment.secret_key}
                />
              </div>
            </div>
          </div>
        );
      } else{
        console.log('123243');
        return (
          <div>
            <div className="login-wrapper">
              <ol className="breadcrumb">
                <li><Link to="/">Home</Link></li>
                <li className="active">Payment</li>
              </ol>
            </div>
            <div className='grid grid__gutters grid__1of2 grid__space-around animate-top'>
              <div className='grid-cell animate-top'  style={{maxWidth: '700px', minWidth: '280px'}}>
              </div>
            </div>
          </div>
        );
      }

  }
}
