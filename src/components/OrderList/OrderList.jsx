import OrderListItem from '../OrderListItem/OrderListItem';

export default function OrderList ({ completedOrders, user, setUser, setActiveOrder }) {
    return (
        <div>
            {completedOrders.map((c, idx) => 
                <OrderListItem order={c} key={idx} setActiveOrder={setActiveOrder}/>)}
        </div>
    )
}