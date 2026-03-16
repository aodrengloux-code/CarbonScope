package com.carbonscope.service;

import com.carbonscope.dto.CalculationRequest;
import com.carbonscope.dto.CalculationResponse;
import com.carbonscope.model.SiteCalculation;
import com.carbonscope.repository.SiteCalculationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class CarbonService {

    // Facteurs d'émission ADEME
    private static final double MATERIAL_FACTOR    = 0.500;  // tCO₂e/m² (béton/acier/vitrage)
    private static final double PARKING_FACTOR     = 2.000;  // tCO₂e/place
    private static final double ENERGY_FACTOR      = 0.0571; // tCO₂e/MWh (réseau électrique FR 2024)
    private static final double WORKSTATION_FACTOR = 0.1;    // tCO₂e/poste/an

    private final SiteCalculationRepository repository;

    public CarbonService(SiteCalculationRepository repository) {
        this.repository = repository;
    }

    public CalculationResponse calculate(CalculationRequest req) {
        double construction = (req.getSurfaceM2() * MATERIAL_FACTOR)
                            + (req.getParkingSpots() * PARKING_FACTOR);
        double exploitation = (req.getEnergyMwh() * ENERGY_FACTOR)
                            + (req.getWorkstations() * WORKSTATION_FACTOR);
        double total = construction + exploitation;

        SiteCalculation entity = new SiteCalculation();
        entity.setName(req.getName());
        entity.setSurfaceM2(req.getSurfaceM2());
        entity.setParkingSpots(req.getParkingSpots());
        entity.setEnergyMwh(req.getEnergyMwh());
        entity.setEmployees(req.getEmployees());
        entity.setWorkstations(req.getWorkstations());
        entity.setConstructionCo2Tons(round(construction));
        entity.setExploitationCo2Tons(round(exploitation));
        entity.setTotalCo2Tons(round(total));
        entity.setCo2PerM2(round(total / req.getSurfaceM2()));
        entity.setCo2PerEmployee(round(total / req.getEmployees()));
        entity.setCalculatedAt(LocalDateTime.now());

        return toResponse(repository.save(entity));
    }

    public List<CalculationResponse> getHistory() {
        return repository.findAllByOrderByCalculatedAtDesc()
                         .stream()
                         .map(this::toResponse)
                         .toList();
    }

    private double round(double value) {
        return Math.round(value * 1000.0) / 1000.0;
    }

    private CalculationResponse toResponse(SiteCalculation e) {
        CalculationResponse res = new CalculationResponse();
        res.setId(e.getId());
        res.setName(e.getName());
        res.setSurfaceM2(e.getSurfaceM2());
        res.setParkingSpots(e.getParkingSpots());
        res.setEnergyMwh(e.getEnergyMwh());
        res.setEmployees(e.getEmployees());
        res.setWorkstations(e.getWorkstations());
        res.setTotalCo2Tons(e.getTotalCo2Tons());
        res.setConstructionCo2Tons(e.getConstructionCo2Tons());
        res.setExploitationCo2Tons(e.getExploitationCo2Tons());
        res.setCo2PerM2(e.getCo2PerM2());
        res.setCo2PerEmployee(e.getCo2PerEmployee());
        res.setCalculatedAt(e.getCalculatedAt());
        return res;
    }
}
