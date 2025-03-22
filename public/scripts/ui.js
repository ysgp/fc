// 显示模态框
export const showModal = () => {
    document.getElementById('order-modal').classList.remove('hidden');
};

// 关闭模态框
export const closeModal = () => {
    document.getElementById('order-modal').classList.add('hidden');
    document.getElementById('order-form').reset();
};

// 渲染订单列表
export const renderOrderList = (orders) => {
    const container = document.getElementById('order-list');
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>訂單 #${order.id}</h3>
            <p>客戶: ${order.customerName}</p>
            <p>電話: ${order.phoneNumber}</p>
            <p>狀態: <span class="status">${order.status}</span></p>
        </div>
    `).join('');
};

// 关闭按钮事件
document.querySelector('.close').addEventListener('click', closeModal);