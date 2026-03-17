package com.carbonscope.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "site_calculation")
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

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Double getSurfaceM2() { return surfaceM2; }
    public void setSurfaceM2(Double surfaceM2) { this.surfaceM2 = surfaceM2; }

    public Integer getParkingSpots() { return parkingSpots; }
    public void setParkingSpots(Integer parkingSpots) { this.parkingSpots = parkingSpots; }

    public Double getEnergyMwh() { return energyMwh; }
    public void setEnergyMwh(Double energyMwh) { this.energyMwh = energyMwh; }

    public Integer getEmployees() { return employees; }
    public void setEmployees(Integer employees) { this.employees = employees; }

    public Integer getWorkstations() { return workstations; }
    public void setWorkstations(Integer workstations) { this.workstations = workstations; }

    public Double getTotalCo2Tons() { return totalCo2Tons; }
    public void setTotalCo2Tons(Double totalCo2Tons) { this.totalCo2Tons = totalCo2Tons; }

    public Double getConstructionCo2Tons() { return constructionCo2Tons; }
    public void setConstructionCo2Tons(Double constructionCo2Tons) { this.constructionCo2Tons = constructionCo2Tons; }

    public Double getExploitationCo2Tons() { return exploitationCo2Tons; }
    public void setExploitationCo2Tons(Double exploitationCo2Tons) { this.exploitationCo2Tons = exploitationCo2Tons; }

    public Double getCo2PerM2() { return co2PerM2; }
    public void setCo2PerM2(Double co2PerM2) { this.co2PerM2 = co2PerM2; }

    public Double getCo2PerEmployee() { return co2PerEmployee; }
    public void setCo2PerEmployee(Double co2PerEmployee) { this.co2PerEmployee = co2PerEmployee; }

    public LocalDateTime getCalculatedAt() { return calculatedAt; }
    public void setCalculatedAt(LocalDateTime calculatedAt) { this.calculatedAt = calculatedAt; }
}
