package com.family.system.repository;

import com.family.system.model.BodyCheckRecord;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BodyCheckRepository extends MongoRepository<BodyCheckRecord, String> {
}