package com.ilms.backend.web;

import com.ilms.backend.domain.Location;
import com.ilms.backend.repo.LocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {
    private final LocationRepository repo;
    public LocationController(LocationRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Location> all() { return repo.findAll(); }

    @PostMapping
    public Location create(@RequestBody Location l) { return repo.save(l); }

    @GetMapping("/{id}")
    public ResponseEntity<Location> one(@PathVariable Long id) {
        return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
