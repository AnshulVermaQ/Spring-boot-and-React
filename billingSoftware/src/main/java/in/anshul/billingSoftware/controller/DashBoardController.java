package in.anshul.billingSoftware.controller;

import in.anshul.billingSoftware.io.DashBoardResponse;
import in.anshul.billingSoftware.io.OrderResponse;
import in.anshul.billingSoftware.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashBoardController {

    private final OrderService orderService;

    public DashBoardController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public DashBoardResponse getDashBoardData(){
        LocalDate today = LocalDate.now();
        Double todaySales = orderService.sumSaleByDate(today);
        Long todayOrderCount = orderService.countOrdersByDate(today);
        List<OrderResponse> recentOrders = orderService.getRecentOrders();
        return new DashBoardResponse(
                todaySales,
                todayOrderCount,
                recentOrders
        );
    }
}
