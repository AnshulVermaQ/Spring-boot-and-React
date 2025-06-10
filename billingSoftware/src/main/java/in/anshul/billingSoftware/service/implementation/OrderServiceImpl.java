package in.anshul.billingSoftware.service.implementation;

import in.anshul.billingSoftware.entity.OrderEntity;
import in.anshul.billingSoftware.entity.OrderItemEntity;
import in.anshul.billingSoftware.io.OrderRequest;
import in.anshul.billingSoftware.io.OrderRequest.OrderItemRequest;
import in.anshul.billingSoftware.io.OrderResponse;
import in.anshul.billingSoftware.io.PaymentDetails;
import in.anshul.billingSoftware.io.PaymentMethod;
import in.anshul.billingSoftware.repository.OrderEntityRepository;
import in.anshul.billingSoftware.service.OrderService;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderEntityRepository orderEntityRepository;

    public OrderServiceImpl(OrderEntityRepository orderEntityRepository) {
        this.orderEntityRepository = orderEntityRepository;
    }

    @Override
    @Transactional
    public OrderResponse createOrder(OrderRequest orderRequest) {

        OrderEntity newOrder = convertToOrderEntity(orderRequest);

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(
                PaymentDetails.PaymentStatus.COMPLETED
        );
        newOrder.setPaymentDetails(paymentDetails);


        OrderEntity finalNewOrder = newOrder;
        List<OrderItemEntity> orderItems = orderRequest.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .peek(item -> item.setOrder(finalNewOrder))
                .collect(Collectors.toList());

        newOrder.setItems(orderItems);

        newOrder = orderEntityRepository.save(newOrder);

        return convertToResponse(newOrder);
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderEntityRepository.deleteById(orderId);
    }

    @Override
    public List<OrderResponse> getLatestOrders() {
        List<OrderEntity> orders = orderEntityRepository.findAll();
        return orders.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Double sumSaleByDate(LocalDate date) {
        return orderEntityRepository.sumSalesByDate(date);
    }

    @Override
    public Long countOrdersByDate(LocalDate date) {
        return orderEntityRepository.countOrdersByDate(date);
    }

    @Override
    public List<OrderResponse> getRecentOrders() {
        return orderEntityRepository.findRecentOrders(PageRequest.of(0, 5))
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    private OrderEntity convertToOrderEntity(OrderRequest orderRequest) {
        OrderEntity orderEntity = new OrderEntity();
        orderEntity.setCustomerName(orderRequest.getCustomerName());
        orderEntity.setPhoneNumber(orderRequest.getPhoneNumber());
        orderEntity.setSubTotal(orderRequest.getSubtotal());
        orderEntity.setTax(orderRequest.getTax());
        orderEntity.setGrandTotal(orderRequest.getGrandTotal());
        orderEntity.setPaymentMethod(orderRequest.getPaymentMethod());
        return orderEntity;
    }

    private OrderItemEntity convertToOrderItemEntity(OrderItemRequest itemRequest) {
        OrderItemEntity item = new OrderItemEntity();
        item.setName(itemRequest.getName());
        item.setPrice(itemRequest.getPrice());
        item.setQuantity(itemRequest.getQuantity());
        return item;
    }

    private OrderResponse convertToResponse(OrderEntity order) {
        OrderResponse response = new OrderResponse(order.getOrderId(), order.getPaymentDetails());
        response.setCustomerName(order.getCustomerName());
        response.setPhoneNumber(order.getPhoneNumber());
        response.setSubtotal(order.getSubTotal());
        response.setTax(order.getTax());
        response.setGrandTotal(order.getGrandTotal());
        response.setPaymentMethod(order.getPaymentMethod());

        List<OrderItemRequest> itemRequests = order.getItems().stream().map(item -> {
            OrderItemRequest request = new OrderItemRequest();
            request.setName(item.getName());
            request.setPrice(item.getPrice());
            request.setQuantity(item.getQuantity());
            return request;
        }).collect(Collectors.toList());

        response.setCartItems(itemRequests);

        return response;
    }
}
