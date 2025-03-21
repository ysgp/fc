import { auth } from "./firebase-config.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { loadCounterView, loadProductionView } from "./ui.js";

export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // 根据用户角色加载界面
        if (userCredential.user.email?.includes('factory')) {
            loadProductionView();
        } else {
            loadCounterView();
        }
    } catch (error) {
        alert('登录失败: ' + error.message);
    }
};