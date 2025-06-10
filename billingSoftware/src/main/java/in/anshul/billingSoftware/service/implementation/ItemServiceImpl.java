package in.anshul.billingSoftware.service.implementation;

import in.anshul.billingSoftware.cloudinary.CloudinaryService;
import in.anshul.billingSoftware.entity.CategoryEntity;
import in.anshul.billingSoftware.entity.ItemEntity;
import in.anshul.billingSoftware.io.ItemRequest;
import in.anshul.billingSoftware.io.ItemResponse;
import in.anshul.billingSoftware.repository.CategoryRepository;
import in.anshul.billingSoftware.repository.ItemRepository;
import in.anshul.billingSoftware.service.ItemService;
import org.apache.tomcat.util.http.fileupload.FileUpload;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService {

    private final CloudinaryService cloudinaryService;

    public ItemServiceImpl(CloudinaryService cloudinaryService, CategoryRepository categoryRepository, ItemRepository itemRepository) {
        this.cloudinaryService = cloudinaryService;
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
    }

    private final CategoryRepository categoryRepository;

    private final ItemRepository itemRepository;

    @Override
    public ItemResponse add(ItemRequest request, MultipartFile file) throws IOException {
        String imageUrl = cloudinaryService.uploadFile(file);
        ItemEntity newItem = convertToEntity(request);

        CategoryEntity existingCategory =  categoryRepository.findByCategoryId(request.getCategoryId()).orElseThrow();

        newItem.setCategoryEntity(existingCategory);
        newItem.setImageUrl(imageUrl);

        newItem = itemRepository.save(newItem);
        
        return convertToResponse(newItem);

    }

    private ItemResponse convertToResponse(ItemEntity newItem) {
        ItemResponse response = new ItemResponse(
                newItem.getItemId(),
                newItem.getName(),
                newItem.getPrice(),
                newItem.getCategoryEntity().getCategoryId(),
                newItem.getDescription()
        );

        response.setImageUrl(newItem.getImageUrl());
        response.setCreatedAt(newItem.getCreatedAt());
        response.setUpdatedAt(newItem.getUpdatedAt());
        response.setCategoryName(newItem.getCategoryEntity().getName());
        return response;
    }


    private ItemEntity convertToEntity(ItemRequest request) {
        ItemEntity entity = new ItemEntity();
        entity.setItemId(UUID.randomUUID().toString());
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setPrice(request.getPrice());
        return entity;
    }


    @Override
    public List<ItemResponse> fetchItems() {
        return itemRepository.findAll()
                .stream()
                .map(itemEntity -> convertToResponse(itemEntity))
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    public class ItemNotFoundException extends RuntimeException {
        public ItemNotFoundException(String message) {
            super(message);
        }
    }

    @Override
    public void deleteItems(String itemId) {
        ItemEntity existingItem = itemRepository.findByItemId(itemId)
                .orElseThrow(() -> new ItemNotFoundException("Item not found with id: " + itemId));

        itemRepository.delete(existingItem);
    }

}
