package in.anshul.billingSoftware.service;


import in.anshul.billingSoftware.io.OrderRequest;
import in.anshul.billingSoftware.io.OrderResponse;

import java.awt.print.Pageable;
import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest orderRequest);
    void deleteOrder(Long orderId);
    List<OrderResponse> getLatestOrders();

    Double sumSaleByDate(LocalDate date);

    Long countOrdersByDate(LocalDate date);

    List<OrderResponse> getRecentOrders();

}
