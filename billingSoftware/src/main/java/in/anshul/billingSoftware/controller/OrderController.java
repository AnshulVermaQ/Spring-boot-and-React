package in.anshul.billingSoftware.controller;

import in.anshul.billingSoftware.io.OrderRequest;
import in.anshul.billingSoftware.io.OrderResponse;
import in.anshul.billingSoftware.service.OrderService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;


    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request){
        return orderService.createOrder(request);
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable String orderId){
        orderService.deleteOrder(Long.valueOf(orderId));
    }

    @GetMapping
    public List<OrderResponse> getAllOrders(){
        return orderService.getLatestOrders();
    }

}
