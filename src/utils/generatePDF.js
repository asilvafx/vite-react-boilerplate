import { jsPDF } from 'jspdf';

export const generatePDF = (order) => {
    const doc = new jsPDF();

    let address;
    try {
        const parsed = JSON.parse(order.shipping_address);
        address = parsed && typeof parsed === 'object' ? parsed : order.shipping_address;
    } catch {
        address = order.shipping_address;
    }

    let items;
    try {
        const parsed = JSON.parse(order.items);
        items = parsed && typeof parsed === 'object' ? parsed : order.items;
    } catch {
        items = order.items;
    }

    doc.setFontSize(20);
    doc.text("ALATAG", 20, 20);
    doc.setFontSize(10);
    doc.text("www.alatag.net", 20, 40);
    doc.line(20, 45, 190, 45);

    doc.setFontSize(16);
    doc.text("Invoice", 20, 60);
    doc.setFontSize(12);
    doc.text(`Invoice #${order.uid}`, 20, 70);
    doc.text(`Date: ${order.created_at}`, 120, 70);

    doc.text("Billing Information:", 20, 85);
    doc.text(`Name: ${order.cst_name}`, 20, 95);
    doc.text(`Email: ${order.cst_email}`, 20, 100);
    doc.text(`Phone: ${address.phone}`, 20, 105);
    doc.text(`Address: ${address.street}, ${address.city}, ${address.state}, ${address.country}`, 20, 110);

    doc.text("Shipping Information:", 120, 85);
    doc.text(`Name: ${order.cst_name}`, 120, 95);
    doc.text(`Email: ${order.cst_email}`, 120, 100);
    doc.text(`Phone: ${address.phone}`, 120, 105);
    doc.text(`Address: ${address.street}, ${address.city}, ${address.state}, ${address.country}`, 120, 110);

    let yPosition = 130;
    doc.setFontSize(12);
    doc.text("Items", 20, yPosition);
    yPosition += 10;

    doc.text("Description", 20, yPosition);
    doc.text("Price", 120, yPosition);
    doc.text("Quantity", 160, yPosition);
    doc.text("Total", 180, yPosition);
    yPosition += 10;
    doc.line(20, yPosition, 190, yPosition);

    items.forEach(item => {
        doc.text(item.name, 20, yPosition + 10);
        doc.text(`${item.price} ${order.currency.toUpperCase()}`, 120, yPosition + 10);
        doc.text(`${item.quantity}`, 160, yPosition + 10);
        doc.text(`${(item.price * item.quantity).toFixed(2)} ${order.currency.toUpperCase()}`, 180, yPosition + 10);
        yPosition += 10;
    });

    doc.line(20, yPosition, 190, yPosition);
    yPosition += 10;

    doc.text(`Subtotal: ${order.amount} ${order.currency.toUpperCase()}`, 120, yPosition);
    yPosition += 10;

    const shippingCost = 0;
    doc.text(`Shipping: ${shippingCost} ${order.currency.toUpperCase()}`, 120, yPosition);
    yPosition += 10;

    //const tax = (order.amount * 0.10).toFixed(2);
    const tax = 0;
    doc.text(`Tax (20%): Included`, 120, yPosition);
    yPosition += 10;

    const total = (parseFloat(order.amount) + parseFloat(shippingCost) + parseFloat(tax)).toFixed(2);
    doc.text(`Total: ${total} ${order.currency.toUpperCase()}`, 120, yPosition);
    yPosition += 10;

    doc.text(`Payment Method: ${order.method}`, 120, yPosition);
    yPosition += 10;
    doc.text(`Order Status: ${order.status}`, 120, yPosition);
    yPosition += 10;

    doc.text(`Thank you for your purchase!`, 20, yPosition);
    doc.text(`Order ID: ${order.uid}`, 120, yPosition);

    doc.save(`invoice-${order.uid}.pdf`);
};
