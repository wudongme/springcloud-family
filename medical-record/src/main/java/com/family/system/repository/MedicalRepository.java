package com.family.system.repository;

import com.family.system.model.MedicalRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MedicalRepository extends MongoRepository<MedicalRecord, String> {
}