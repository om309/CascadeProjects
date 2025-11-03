package com.ilms.backend.web;

import com.ilms.backend.domain.Supplier;
import com.ilms.backend.repo.SupplierRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {
    private final SupplierRepository repo;
    public SupplierController(SupplierRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Supplier> all() { return repo.findAll(); }

    @PostMapping
    public Supplier create(@RequestBody Supplier s) { return repo.save(s); }

    @GetMapping("/{id}")
    public ResponseEntity<Supplier> one(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
