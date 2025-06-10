package in.anshul.billingSoftware.entity;

import jakarta.persistence.*;

@Entity
@Table(name="tbl_order_item")
public class OrderItemEntity {

    public OrderItemEntity(Long id, String itemId, Double price, String name, Integer quantity) {
        this.id = id;
        this.itemId = itemId;
        this.price = price;
        this.name = name;
        this.quantity = quantity;
    }

    public OrderEntity getOrder() {
        return order;
    }

    public void setOrder(OrderEntity order) {
        this.order = order;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public OrderItemEntity(OrderEntity order) {
        this.order = order;
    }

    public OrderItemEntity() {

    }

    @ManyToOne
    @JoinColumn(name = "order_id")
    private OrderEntity order;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Column(unique = true)
    private String itemId;
    private String name;
    private Double price;
    private Integer quantity;


}
