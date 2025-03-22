import { db, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from './firebase.js';
import { renderOrderList, showModal, closeModal } from './ui.js';

const ordersCollection = collection(db, 'orders');

// 初始化加载订单
const loadOrders = () => {
    const q = query(ordersCollection, orderBy('createdAt', 'desc'));
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
document.getElementById('order-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const orderData = {
        customerName: document.getElementById('customer-name').value,
        phoneNumber: document.getElementById('customer-phone').value,
        status: '已接單',
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(ordersCollection, orderData);
        closeModal();
    } catch (error) {
        console.error("訂單提交失敗: ", error);
    }
});

// 初始化
document.getElementById('new-order-btn').addEventListener('click', showModal);
loadOrders();