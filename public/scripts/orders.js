import { db, collection, addDoc, deleteDoc, updateDoc, onSnapshot, serverTimestamp } from './firebase.js';
import { renderOrder, closeModal, calculateTotal } from './ui.js';

const ordersCol = collection(db, 'orders');

// 实时订单监听
export const initOrders = () => {
    const q = query(ordersCol, orderBy('createdAt', 'desc'));
    
    onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toLocaleString()
        }));
        renderOrderList(orders);
    });
};

// 提交新订单
export const submitOrder = async (orderData) => {
    try {
        const docRef = await addDoc(ordersCol, {
            ...orderData,
            status: '已接单',
            paymentStatus: '未付款',
            createdAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error("订单提交失败:", error);
        throw error;
    }
};

// 更新订单状态
export const updateOrder = async (orderId, newStatus) => {
    await updateDoc(doc(ordersCol, orderId), {
        status: newStatus,
        updatedAt: serverTimestamp()
    });
};