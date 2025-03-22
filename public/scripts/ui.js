// 订单列表渲染
export const renderOrderList = (orders) => {
    const container = document.getElementById('order-list');
    container.innerHTML = orders.map(order => `
        <div class="order-card" data-id="${order.id}">
            <div class="order-header">
                <span class="order-id">#${order.id}</span>
                <span class="status-badge ${order.status}">${order.status}</span>
            </div>
            <div class="order-body">
                <p>${order.customerName} | ${order.phoneNumber}</p>
                <p>${order.items.map(item => `${item.name}×${item.qty}`).join(' ')}</p>
                <p class="notes">${order.notes || '无备注'}</p>
            </div>
            <div class="order-footer">
                <button class="btn small" onclick="handleStatusChange('${order.id}', '制作中')">开始制作</button>
                <button class="btn small" onclick="printLabel('${order.id}')">打印标签</button>
            </div>
        </div>
    `).join('');
};

// 标签打印功能
export const printLabel = (orderId) => {
    const order = getOrderById(orderId); // 从数据库获取订单数据
    const printContent = `
        <div class="label">
            <h2>${order.customerName}</h2>
            <p>订单号: ${orderId}</p>
            <p>取货时间: ${order.pickupTime}</p>
            <hr>
            <div class="items">
                ${order.items.map(item => `
                    <p>${item.name} ${item.size} ×${item.qty}</p>
                `).join('')}
            </div>
        </div>
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
            <head>
                <title>订单标签 - ${orderId}</title>
                <link rel="stylesheet" href="/styles/print.css">
            </head>
            <body>${printContent}</body>
        </html>
    `);
    printWindow.print();
};