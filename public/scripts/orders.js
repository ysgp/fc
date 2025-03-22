import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from './firebase.js';
import { renderOrderList } from './ui.js';

const ordersCollection = collection(db, 'orders');

export const createOrder = async (orderData) => {
    try {
        const docRef = await addDoc(ordersCollection, {
            ...orderData,
            status: '已接單',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("訂單建立失敗: ", error);
        throw error;
    }
};

export const loadOrders = () => {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (snapshot) => {
        const orders = [];
        snapshot.forEach(doc => {
            orders.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate().toLocaleString()
            });
        });
        renderOrderList(orders);
    });
};

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        await updateDoc(doc(ordersCollection, orderId), {
            status: newStatus,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error("狀態更新失敗: ", error);
    }
};