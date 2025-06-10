package in.anshul.billingSoftware.controller;

import in.anshul.billingSoftware.cloudinary.CloudinaryService;
import in.anshul.billingSoftware.io.CategoryRequest;
import in.anshul.billingSoftware.io.CategoryResponse;
import in.anshul.billingSoftware.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping(consumes = {"multipart/form-data"})
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestPart("category") CategoryRequest categoryRequest,
            @RequestPart("file") MultipartFile file) {

        try {
            String imageUrl = cloudinaryService.uploadFile(file);

            categoryRequest.setImageUrl(imageUrl);

            return categoryService.addCategory(categoryRequest);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to create category", e);
        }
    }

    @GetMapping
    public List<CategoryResponse> fetchCategories() {
        return categoryService.read();
    }

    @DeleteMapping("/{categoryId}")
    public void remove(@PathVariable String categoryId) {
        try {
            categoryService.delete(categoryId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
    }
}
