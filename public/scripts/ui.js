export const showCounterView = () => {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('counter-view').classList.remove('hidden');
};

export const showProductionView = () => {
    document.getElementById('login-view').classList.add('hidden');
    document.getElementById('production-view').classList.remove('hidden');
};

export const renderOrderList = (orders) => {
    const container = document.getElementById('order-list');
    container.innerHTML = orders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <h3>訂單 #${order.id}</h3>
            <p>客戶: ${order.customerName}</p>
            <p>狀態: <span class="status">${order.status}</span></p>
            <button class="btn btn-small" onclick="handlePrint('${order.id}')">列印標籤</button>
        </div>
    `).join('');
};

export const renderProductionList = (orders) => {
    const container = document.getElementById('production-list');
    container.innerHTML = orders.map(order => `
        <div class="production-item">
            <h4>${order.customerName} - ${order.pickupTime}</h4>
            <p>產品: ${order.items.join(', ')}</p>
            <p class="status-badge ${order.status}">${order.status}</p>
        </div>
    `).join('');
};

export const printLabel = (orderId) => {
    const order = orders.find(o => o.id === orderId);
    const printContent = `
        <div class="label">
            <h2>${order.customerName}</h2>
            <p>訂單號: ${orderId}</p>
            <p>電話: ${order.phoneNumber}</p>
        </div>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.print();
};