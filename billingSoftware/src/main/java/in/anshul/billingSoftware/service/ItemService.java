package in.anshul.billingSoftware.service;

import in.anshul.billingSoftware.io.ItemRequest;
import in.anshul.billingSoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file) throws IOException;

    List<ItemResponse> fetchItems();

    void deleteItems(String itemId);
}
