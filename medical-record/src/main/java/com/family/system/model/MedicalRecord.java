package com.family.system.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "medical_records")
@Data
public class MedicalRecord {
    @Id
    private String id;
    private String familyMember;
    private Date recordDate;
    private String description;
    private Map<String, Object> details; // 扩展字段
    
    private String diagnosis; // 新增诊断字段
    private List<ExamItem> examItems; // 新增检查项目
    
    // 嵌套类
    @Data
    public static class ExamItem {
        private String name;
        private String value;
    }

}