package com.family.system.controller;

import com.family.system.model.MedicalRecord;
import com.family.system.repository.MedicalRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical")
@CrossOrigin
public class MedicalController {
    private final MedicalRepository repository;

    public MedicalController(MedicalRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public MedicalRecord create(@RequestBody MedicalRecord record) {
        return repository.save(record);
    }

    @GetMapping
    public List<MedicalRecord> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}