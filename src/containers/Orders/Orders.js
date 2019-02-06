import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../Store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {


    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render () {
        let orders = <Spinner />
        if (!this.props.loading) {
            // console.log('orders', this.props.orders);
            // console.log(this.props.orders.length);
            if (this.props.orders.length <= 0) {
                return ( 
                    <span
                    style={{textAlign: 'center', padding:'40%'}}>
                        <p>There are no orders</p>
                    </span>
                )
            }

            else {
                orders =    this.props.orders.map(order => (
                     <Order 
                         key={order.id}  
                         id={order.id}  
                         ingredients={order.ingredients}
                         price={order.price}/>
                 ))
            }
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));