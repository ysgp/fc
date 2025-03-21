import { db } from "./firebase-config.js";
import { collection, addDoc, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

// 创建新订单
export const createOrder = async (orderData) => {
    const ordersRef = collection(db, 'Orders');
    await addDoc(ordersRef, {
        ...orderData,
        orderDate: new Date(),
        status: '已接单'
    });
};

// 实时监听今日订单
export const listenTodayOrders = (callback) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const q = query(
        collection(db, 'Orders'),
        where('pickupTime', '>=', today)
    );
    
    return onSnapshot(q, (snapshot) => {
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({ id: doc.id, ...doc.data() });
        });
        callback(orders);
    });
};