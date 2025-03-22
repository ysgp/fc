import { db, collection, query, where } from './firebase.js';
import { printLabel } from './ui.js';

const ordersCol = collection(db, 'orders');

// 获取今日生产清单
export const getProductionList = () => {
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const q = query(
        ordersCol,
        where('pickupTime', '>=', today),
        where('status', 'in', ['已接单', '制作中'])
    );

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            pickupTime: doc.data().pickupTime.toDate().toLocaleTimeString()
        }));
        renderProductionOrders(orders);
    });
};

// 批量打印标签
document.getElementById('print-all-labels').addEventListener('click', () => {
    const orders = document.querySelectorAll('.production-item');
    orders.forEach(order => printLabel(order.dataset.id));
});