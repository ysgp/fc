export const loadProductionView = () => {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('production-view').classList.remove('hidden');
};

export const loadCounterView = () => {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('counter-view').classList.remove('hidden');
};

// 渲染生产清单
export const renderProductionList = (orders) => {
    const container = document.getElementById('production-list');
    container.innerHTML = orders.map(order => `
        <div class="order-card">
            <h3>订单 #${order.id}</h3>
            <p>客户: ${order.customerName}</p>
            <p>取货时间: ${order.pickupTime.toDate().toLocaleString()}</p>
        </div>
    `).join('');
};