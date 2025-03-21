import { auth } from './firebase-config.js';
import { login } from './auth.js';
import { listenTodayOrders, createOrder } from './firestore.js';
import { renderProductionList } from './ui.js';

// 初始化事件监听
document.addEventListener('DOMContentLoaded', () => {
    // 登录按钮
    document.getElementById('login-btn').addEventListener('click', () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        login(email, password);
    });

    // 实时监听订单
    listenTodayOrders((orders) => {
        renderProductionList(orders);
    });
});