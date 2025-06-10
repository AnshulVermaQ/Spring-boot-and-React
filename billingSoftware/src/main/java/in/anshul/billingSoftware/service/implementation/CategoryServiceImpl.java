package in.anshul.billingSoftware.service.implementation;

import in.anshul.billingSoftware.entity.CategoryEntity;
import in.anshul.billingSoftware.io.CategoryRequest;
import in.anshul.billingSoftware.io.CategoryResponse;
import in.anshul.billingSoftware.repository.CategoryRepository;
import in.anshul.billingSoftware.repository.ItemRepository;
import in.anshul.billingSoftware.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    private final ItemRepository itemRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository, ItemRepository itemRepository) {
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
    }


    @Override
    public CategoryResponse addCategory(CategoryRequest categoryRequest) {
        CategoryEntity newCategory = convertToEntity(categoryRequest);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(CategoryEntity -> convertToResponse(CategoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
       CategoryEntity existingCategory =  categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        categoryRepository.delete(existingCategory);
    }

    private CategoryEntity convertToEntity(CategoryRequest categoryRequest) {
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setCategoryId(UUID.randomUUID().toString());
        categoryEntity.setName(categoryRequest.getName());
        categoryEntity.setDescription(categoryRequest.getDescription());
        categoryEntity.setBgColor(categoryRequest.getBgColor());
        categoryEntity.setImageUrl(categoryRequest.getImageUrl());
        return categoryEntity;
    }

    private CategoryResponse convertToResponse(CategoryEntity entity) {
       Integer itemCount =  itemRepository.countByCategory_Id(entity.getId() );
        CategoryResponse response = new CategoryResponse();
        response.setCategoryId(entity.getCategoryId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        response.setBgColor(entity.getBgColor());
        response.setImageUrl(entity.getImageUrl());
        response.setCreatedAt(entity.getCreatedAt());
        response.setUpdatedAt(entity.getUpdatedAt());
        response.setItems(itemCount);
        return response;
    }
}
