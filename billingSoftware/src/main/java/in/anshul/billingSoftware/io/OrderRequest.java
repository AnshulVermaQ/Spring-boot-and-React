package in.anshul.billingSoftware.io;

import java.util.List;

public class OrderRequest {

    private String customerName;
    private String phoneNumber;
    private List<OrderItemRequest> cartItems;

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

    public List<OrderItemRequest> getCartItems() {
        return cartItems;
    }

    public void setCartItems(List<OrderItemRequest> cartItems) {
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

    public OrderRequest(String phoneNumber, String customerName, List<OrderItemRequest> cartItems, Double subtotal, Double tax, Double grandTotal,PaymentMethod paymentMethod) {
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
        private String name;
        private Double price;

        public OrderItemRequest() {

        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public Double getPrice() {
            return price;
        }

        public void setPrice(Double price) {
            this.price = price;
        }

        public OrderItemRequest(String name, Double price, Integer quantity) {
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }

        private Integer quantity;
    }
}
