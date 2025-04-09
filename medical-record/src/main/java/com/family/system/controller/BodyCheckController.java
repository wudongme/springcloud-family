package com.family.system.controller;

import com.family.system.model.BodyCheckRecord;
import com.family.system.model.MedicalRecord;
import com.family.system.repository.BodyCheckRepository;
import com.family.system.repository.MedicalRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/bodyCheck")
@CrossOrigin
public class BodyCheckController {
    private final BodyCheckRepository repository;

    public BodyCheckController(BodyCheckRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public BodyCheckRecord create(@RequestBody BodyCheckRecord record) {
        return repository.save(record);
    }

    @GetMapping
    public List<BodyCheckRecord> getAll() {
        return repository.findAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        repository.deleteById(id);
    }
}