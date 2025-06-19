// Sample Orders Data
let orders = JSON.parse(localStorage.getItem('orders')) || [
    {
        id: 1,
        customer: 'John Doe',
        phone: '254712345678',
        items: [
            { id: 1, name: 'Day-Old Chicks', price: 200, quantity: 10 },
            { id: 2, name: 'Automatic Feeder', price: 1500, quantity: 2 }
        ],
        total: 5000,
        status: 'Pending',
        date: '2024-03-15'
    }
];

// DOM Elements
const ordersTable = document.querySelector('.orders-table tbody');
const orderStatusSelects = document.querySelectorAll('.order-status');

// Display Orders
function displayOrders() {
    if (!ordersTable) return;
    
    ordersTable.innerHTML = orders.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.phone}</td>
            <td>
                <ul>
                    ${order.items.map(item => `
                        <li>${item.name} (${item.quantity} × KSh ${item.price})</li>
                    `).join('')}
                </ul>
            </td>
            <td>KSh ${order.total}</td>
            <td>${order.date}</td>
            <td>
                <select class="order-status" data-id="${order.id}">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Processing" ${order.status === 'Processing' ? 'selected' : ''}>Processing</option>
                    <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </td>
        </tr>
    `).join('');
}

// Update Order Status
document.addEventListener('change', function(e) {
    if (e.target.classList.contains('order-status')) {
        const orderId = parseInt(e.target.getAttribute('data-id'));
        const newStatus = e.target.value;
        
        const order = orders.find(o => o.id === orderId);
        if (order) {
            order.status = newStatus;
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // In a real app, you would send this update to your server
            alert(`Order #${orderId} status updated to ${newStatus}`);
        }
    }
});

// Initialize Admin Dashboard
if (ordersTable) {
    displayOrders();
    
    // Simulate loading
    document.querySelector('.admin-content').style.display = 'block';
    document.querySelector('.loading').style.display = 'none';
}