package com.carbonscope.controller;

import com.carbonscope.dto.CalculationRequest;
import com.carbonscope.dto.CalculationResponse;
import com.carbonscope.service.CarbonService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CarbonController {

    private final CarbonService carbonService;

    public CarbonController(CarbonService carbonService) {
        this.carbonService = carbonService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<CalculationResponse> calculate(
            @Valid @RequestBody CalculationRequest request) {
        return ResponseEntity.ok(carbonService.calculate(request));
    }

    @GetMapping("/history")
    public ResponseEntity<List<CalculationResponse>> history() {
        return ResponseEntity.ok(carbonService.getHistory());
    }
}
