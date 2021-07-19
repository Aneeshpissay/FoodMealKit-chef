import { OrderTable } from '../../utils/orderTable';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_ORDERS } from '../../api';
import { Backdrop, CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { primary } from '../../constants/Colors';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: primary,
    },
}));

const Orders = () => {
    const [newOrder, setNewOrder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [statusTitle, setStatusTitle] = useState('');
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const getOrders = () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        axios.get(GET_ORDERS, {
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer " + token
            }
        }).then((res) => {
            setNewOrder(res.data);
        }).finally(() => setLoading(false));
    }
    useEffect(() => {
        getOrders();
    }, [open]);
    const columns = [
        { id: 'id', label: 'Order ID' },
        { id: 'name', label: 'User Name' },
        { id: 'phone', label: 'Phone number'},
        { id: 'item', label: 'Item' },
        { id: 'servings', label: 'Servings' },
        { id: 'quantity', label: 'Quantity' },
        { id: 'price', label: 'Price' },
        { id: 'status', label: 'Status' },
        { id: 'paid', label: 'Paid' },
        { id: 'orderDate', label: 'Order Date' },
    ];
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };
    return (
        <div>
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'right' }} bodyStyle={{backgroundColor: primary}} open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                   {statusTitle}
                </Alert>
            </Snackbar>
            {loading ? <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop> : 
                <div>
                    <OrderTable title="New Orders" data={newOrder.filter((order) => order.status === 'Ordered')} columns={columns} status="Confirmed" setLoading={setLoading} setStatusTitle={setStatusTitle} setOpen={setOpen} />
                    <OrderTable title="Confirmed Orders" data={newOrder.filter((order) => order.status === 'Confirmed')} columns={columns} status="Shipped" setLoading={setLoading} setStatusTitle={setStatusTitle} setOpen={setOpen}/>
                    <OrderTable title="Shipped Orders" data={newOrder.filter((order) => order.status === 'Shipped')} columns={columns} status="Out for delivery" setLoading={setLoading} setStatusTitle={setStatusTitle} setOpen={setOpen} />
                    <OrderTable title="Out for delivery Orders" data={newOrder.filter((order) => order.status === 'Out for delivery')} columns={columns} status="Delivered" setLoading={setLoading} setStatusTitle={setStatusTitle} setOpen={setOpen} />
                    <OrderTable title="Delivered Orders" data={newOrder.filter((order) => order.status === 'Delivered')} status="Done" columns={columns} setLoading={setLoading} setStatusTitle={setStatusTitle}/>
                    <OrderTable title="Cancelled Orders" data={newOrder.filter((order) => order.status === 'Cancelled')} status="Cancelled" columns={columns} setLoading={setLoading} setStatusTitle={setStatusTitle}/>
                </div>
            }
        </div>
    )
}

export default Orders;