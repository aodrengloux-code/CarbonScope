package com.carbonscope.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

public class CalculationRequest {

    @NotBlank(message = "Le nom du site est obligatoire")
    private String name;

    @Positive(message = "La surface doit être positive")
    private Double surfaceM2;

    @PositiveOrZero(message = "Le nombre de places de parking doit être positif ou nul")
    private Integer parkingSpots;

    @PositiveOrZero(message = "La consommation énergétique doit être positive ou nulle")
    private Double energyMwh;

    @Positive(message = "Le nombre d'employés doit être positif")
    private Integer employees;

    @PositiveOrZero(message = "Le nombre de postes de travail doit être positif ou nul")
    private Integer workstations;

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
}
