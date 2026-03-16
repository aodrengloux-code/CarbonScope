package com.carbonscope.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "site_calculation")
@Data
public class SiteCalculation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Double surfaceM2;

    @Column(nullable = false)
    private Integer parkingSpots;

    @Column(nullable = false)
    private Double energyMwh;

    @Column(nullable = false)
    private Integer employees;

    @Column(nullable = false)
    private Integer workstations;

    @Column(nullable = false)
    private Double totalCo2Tons;

    @Column(nullable = false)
    private Double constructionCo2Tons;

    @Column(nullable = false)
    private Double exploitationCo2Tons;

    @Column(nullable = false)
    private Double co2PerM2;

    @Column(nullable = false)
    private Double co2PerEmployee;

    @Column(nullable = false)
    private LocalDateTime calculatedAt;
}
