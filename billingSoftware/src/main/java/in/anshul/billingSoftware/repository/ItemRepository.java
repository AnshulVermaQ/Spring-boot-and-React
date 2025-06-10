package in.anshul.billingSoftware.repository;

import in.anshul.billingSoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<ItemEntity,Long> {

    Optional<ItemEntity> findByItemId(String id);
    Integer countByCategory_Id(Long categoryId);


}
