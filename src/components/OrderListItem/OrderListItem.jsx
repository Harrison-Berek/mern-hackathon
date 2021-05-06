export default function OrderListItem({ order, setActiveOrder }){
    return (
    <button onClick={() => setActiveOrder(order)}>
        Order Id: {order.orderId} | {new Date(order.updatedAt).toLocaleDateString()} | 
        <br/>
        {order.totalQty} Items | ${order.orderTotal.toFixed(2)}
        <br/><br/>
    </button>
    )
}