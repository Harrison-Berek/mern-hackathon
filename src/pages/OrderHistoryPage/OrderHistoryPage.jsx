import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderHistoryPage.css';
import * as usersService from '../../utilities/users-service';
import * as ordersAPI from '../../utilities/orders-api';
import Logo from '../../components/Logo/Logo';
import UserLogOut from '../../components/UserLogOut/UserLogOut';
import OrderList from '../../components/OrderList/OrderList';
import OrderDetail from '../../components/OrderDetail/OrderDetail';

export default function OrderHistoryPage({ user, setUser }) {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(function() {
    async function getOrders() {
      const orders = await ordersAPI.getAll();
      const paidOrders = orders.filter(order => order.isPaid);
      setCompletedOrders(paidOrders);
    }
    getOrders(); 
  }, []);
  return (
    <main className="OrderHistoryPage">
      <aside>
        <Logo />
        <Link to="/orders/new" className="button btn-sm">NEW ORDER</Link>
        <UserLogOut user={user} setUser={setUser} />
      </aside>
      <OrderList user={user} setUser={setUser} setActiveOrder={setActiveOrder} completedOrders={completedOrders} />
      <OrderDetail order={activeOrder} />

    </main>
  );
}