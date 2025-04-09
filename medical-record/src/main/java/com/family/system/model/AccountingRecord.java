package com.family.system.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.Map;

@Document(collection = "accounting_records")
public class AccountingRecord {
    @Id
    private String id;
    private String category;
    private Double amount;
    private Date transactionDate;
    private Map<String, Object> extraFields; // 扩展字段
    
    // 省略getter/setter
}