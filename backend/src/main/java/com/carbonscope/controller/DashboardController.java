package com.carbonscope.controller;

import com.carbonscope.dto.DashboardSummary;
import com.carbonscope.model.SiteCalculation;
import com.carbonscope.repository.SiteCalculationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    private final SiteCalculationRepository repository;

    public DashboardController(SiteCalculationRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/summary")
    public ResponseEntity<DashboardSummary> summary() {
        List<SiteCalculation> all = repository.findAllByOrderByCalculatedAtDesc();

        DashboardSummary summary = new DashboardSummary();
        summary.setTotalSites(all.size());

        if (all.isEmpty()) {
            summary.setTotalCo2Tons(0);
            summary.setAvgCo2PerM2(0);
            summary.setAvgCo2PerEmployee(0);
            summary.setTotalConstructionCo2(0);
            summary.setTotalExploitationCo2(0);
            summary.setSites(List.of());
            return ResponseEntity.ok(summary);
        }

        double totalCo2 = 0, totalConstruction = 0, totalExploitation = 0;
        double sumCo2PerM2 = 0, sumCo2PerEmployee = 0;

        List<DashboardSummary.SiteBreakdown> breakdowns = new java.util.ArrayList<>();

        for (SiteCalculation sc : all) {
            totalCo2 += sc.getTotalCo2Tons();
            totalConstruction += sc.getConstructionCo2Tons();
            totalExploitation += sc.getExploitationCo2Tons();
            sumCo2PerM2 += sc.getCo2PerM2();
            sumCo2PerEmployee += sc.getCo2PerEmployee();

            DashboardSummary.SiteBreakdown b = new DashboardSummary.SiteBreakdown();
            b.setId(sc.getId());
            b.setName(sc.getName());
            b.setTotalCo2Tons(sc.getTotalCo2Tons());
            b.setConstructionCo2Tons(sc.getConstructionCo2Tons());
            b.setExploitationCo2Tons(sc.getExploitationCo2Tons());
            b.setCo2PerM2(sc.getCo2PerM2());
            b.setCo2PerEmployee(sc.getCo2PerEmployee());
            breakdowns.add(b);
        }

        summary.setTotalCo2Tons(round(totalCo2));
        summary.setAvgCo2PerM2(round(sumCo2PerM2 / all.size()));
        summary.setAvgCo2PerEmployee(round(sumCo2PerEmployee / all.size()));
        summary.setTotalConstructionCo2(round(totalConstruction));
        summary.setTotalExploitationCo2(round(totalExploitation));
        summary.setSites(breakdowns);

        return ResponseEntity.ok(summary);
    }

    private double round(double value) {
        return Math.round(value * 1000.0) / 1000.0;
    }
}
