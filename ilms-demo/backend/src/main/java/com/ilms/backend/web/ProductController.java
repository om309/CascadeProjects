package com.ilms.backend.web;

import com.ilms.backend.domain.Product;
import com.ilms.backend.repo.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository repo;
    public ProductController(ProductRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Product> all() { return repo.findAll(); }

    @PostMapping
    public Product create(@RequestBody Product p) { return repo.save(p); }

    @GetMapping("/{id}")
    public ResponseEntity<Product> one(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody Product incoming) {
        return repo.findById(id)
                .map(existing -> {
                    existing.setCode(incoming.getCode());
                    existing.setName(incoming.getName());
                    existing.setType(incoming.getType());
                    existing.setState(incoming.getState());
                    existing.setCategory(incoming.getCategory());
                    existing.setMaterialClass(incoming.getMaterialClass());
                    existing.setGroupName(incoming.getGroupName());
                    existing.setUom(incoming.getUom());
                    return ResponseEntity.ok(repo.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repo.existsById(id)) return ResponseEntity.notFound().build();
        repo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
