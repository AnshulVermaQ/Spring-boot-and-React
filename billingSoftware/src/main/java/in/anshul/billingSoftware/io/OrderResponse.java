package in.anshul.billingSoftware.io;

import java.util.List;

public class OrderResponse {

    private String customerName;
    private String orderId;
    private String phoneNumber;
    private List<OrderRequest.OrderItemRequest> cartItems;
    private PaymentDetails paymentDetails;


    public OrderResponse(String phoneNumber, String customerName, List<OrderRequest.OrderItemRequest> cartItems, Double subtotal, Double tax, Double grandTotal, PaymentMethod paymentMethod) {
        this.phoneNumber = phoneNumber;
        this.customerName = customerName;
        this.cartItems = cartItems;
        this.subtotal = subtotal;
        this.tax = tax;
        this.grandTotal = grandTotal;
        this.paymentMethod = paymentMethod;
    }


    public OrderResponse(String orderId, PaymentDetails paymentDetails) {
        this.orderId = orderId;
        this.paymentDetails = paymentDetails;
    }


    public PaymentDetails getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(PaymentDetails paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public List<OrderRequest.OrderItemRequest> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<OrderRequest.OrderItemRequest> cartItems) {
        this.cartItems = cartItems;
    }

    public Double getTax() {
        return tax;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public Double getGrandTotal() {
        return grandTotal;
    }

    public void setGrandTotal(Double grandTotal) {
        this.grandTotal = grandTotal;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    private Double subtotal;

    public void OrderRequest(String phoneNumber, String customerName, List<OrderRequest.OrderItemRequest> cartItems, Double subtotal, Double tax, Double grandTotal, PaymentMethod paymentMethod) {
        this.phoneNumber = phoneNumber;
        this.customerName = customerName;
        this.cartItems = cartItems;
        this.subtotal = subtotal;
        this.tax = tax;
        this.grandTotal = grandTotal;
        this.paymentMethod = paymentMethod;
    }

    private Double tax;
    private Double grandTotal;
    private PaymentMethod paymentMethod;

    public static class OrderItemRequest {
        public String name;
        public Double price;
        public Integer quantity;
    }

}
