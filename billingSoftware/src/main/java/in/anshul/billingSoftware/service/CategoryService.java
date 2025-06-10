package in.anshul.billingSoftware.service;

import in.anshul.billingSoftware.io.CategoryRequest;
import in.anshul.billingSoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse addCategory(CategoryRequest categoryRequest);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
