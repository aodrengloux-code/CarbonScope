package com.carbonscope.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CalculationResponse {
    private Long id;
    private String name;
    private Double surfaceM2;
    private Integer parkingSpots;
    private Double energyMwh;
    private Integer employees;
    private Integer workstations;
    private Double totalCo2Tons;
    private Double constructionCo2Tons;
    private Double exploitationCo2Tons;
    private Double co2PerM2;
    private Double co2PerEmployee;
    private LocalDateTime calculatedAt;
}
