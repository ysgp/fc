import { db, collection, query, where, onSnapshot } from './firebase.js';
import { renderProductionList, printLabel } from './ui.js';

const ordersCollection = collection(db, 'orders');

export const loadProductionOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
        ordersCollection,
        where('pickupTime', '>=', today),
        where('status', 'in', ['已接單', '製作中'])
    );

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            pickupTime: doc.data().pickupTime.toDate().toLocaleString()
        }));
        renderProductionList(orders);
    });
};

document.getElementById('refresh-btn').addEventListener('click', loadProductionOrders);