// 初始化商品数据
const products = [
    { name: "巧克力蛋糕", basePrice: 600, sizes: ["S", "M", "L"] },
    { name: "草莓蛋糕", basePrice: 650, sizes: ["S", "M"] },
    // 更多商品...
];

// 动态生成商品选项
function renderProducts() {
    const container = document.getElementById("product-list");
    container.innerHTML = products.map(product => `
        <div class="product-item">
            <input type="checkbox" name="product" 
                   value="${product.name}" 
                   data-baseprice="${product.basePrice}">
            <label>${product.name}</label>
            ${product.sizes.map(size => `
                <select class="size-select" data-product="${product.name}">
                    ${size === "S" ? `<option value="S">S (+0)</option>` : ""}
                    ${size === "M" ? `<option value="M">M (+100)</option>` : ""}
                    ${size === "L" ? `<option value="L">L (+200)</option>` : ""}
                </select>
            `).join("")}
            <input type="number" class="quantity" value="1" min="1">
        </div>
    `).join("");
}

// 实时计算总价
function calculateTotal() {
    let total = 0;
    document.querySelectorAll('input[name="product"]:checked').forEach(checkbox => {
        const basePrice = parseInt(checkbox.dataset.baseprice);
        const sizeSelect = checkbox.closest('.product-item').querySelector('.size-select');
        const quantity = parseInt(checkbox.closest('.product-item').querySelector('.quantity').value);
        
        const sizePrice = {
            S: 0,
            M: 100,
            L: 200
        }[sizeSelect.value];
        
        total += (basePrice + sizePrice) * quantity;
    });
    document.getElementById("total-amount").textContent = `總金額：$${total}`;
}

// 初始化表单事件
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    
    // 动态绑定事件
    document.querySelectorAll('input[name="product"], .size-select, .quantity').forEach(element => {
        element.addEventListener("change", calculateTotal);
    });

    // 提交订单
    document.getElementById("order-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const orderItems = [];
        document.querySelectorAll('input[name="product"]:checked').forEach(checkbox => {
            const productName = checkbox.value;
            const size = checkbox.closest('.product-item').querySelector('.size-select').value;
            const quantity = parseInt(checkbox.closest('.product-item').querySelector('.quantity').value);
            const price = parseInt(checkbox.dataset.baseprice) + (size === "M" ? 100 : size === "L" ? 200 : 0);
            
            orderItems.push({ productName, size, quantity, price });
        });

        const orderData = {
            customerName: document.getElementById("customer-name").value,
            phoneNumber: document.getElementById("customer-phone").value,
            items: orderItems,
            notes: document.getElementById("notes").value,
            status: "已接單",
            totalAmount: orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            createdAt: serverTimestamp()
        };

        try {
            await addDoc(ordersCollection, orderData);
            closeModal();
        } catch (error) {
            console.error("訂單提交失敗:", error);
            alert("訂單提交失敗，請檢查網絡連接");
        }
    });
});