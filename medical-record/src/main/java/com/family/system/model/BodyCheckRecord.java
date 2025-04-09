package com.family.system.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Document(collection = "body_check_records")
@Data
public class BodyCheckRecord {
    @Id
    private String id;
    private String checker;
    private LocalDate checkDate;
	private String hospitalName;
    private String description;
	private String checkProject;
	private boolean normal;
	private Double checkValue;

	private List<String> imageUrls;

	// 新增检查项目
    private List<ExamItem> examItems;
    
    // 嵌套类
    @Data
    public static class ExamItem {
        private String name;
        private String value;
    }

}