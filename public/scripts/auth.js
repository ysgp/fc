import { auth, signInWithEmailAndPassword, signOut } from './firebase.js';
import { showCounterView, showProductionView } from './ui.js';
import { loadOrders } from './orders.js';

export const initAuth = () => {
    document.getElementById('login-btn').addEventListener('click', async () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // 根据邮箱后缀判断角色
            if (user.email.endsWith('@factory.com')) {
                showProductionView();
                loadProductionOrders();
            } else {
                showCounterView();
                loadOrders();
            }
        } catch (error) {
            alert('登入失败: ' + error.message);
        }
    });
};