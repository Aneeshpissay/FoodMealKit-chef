import { EnhancedTable } from '../../utils/table';
import React from 'react';

const Orders = () => {
    return (
        <div>
            <EnhancedTable title="New Orders" />
            <EnhancedTable title="Packed Orders" />
            <EnhancedTable title="Out for Delivery Orders" />
            <EnhancedTable title="Delivered Orders" />
        </div>
    )
}

export default Orders;