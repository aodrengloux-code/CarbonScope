package com.carbonscope.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
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
}
