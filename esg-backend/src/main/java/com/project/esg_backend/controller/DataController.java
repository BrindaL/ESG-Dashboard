package com.project.esg_backend.controller;

import com.project.esg_backend.model.ESGMetric;
import com.project.esg_backend.repository.ESGMetricRepository;
import com.project.esg_backend.service.ESGService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/esg")
public class DataController {

    @Autowired
    private ESGService esgService;

    @GetMapping("/company")
    public ResponseEntity<?> getESGDataByCompany(@RequestParam String companyName) {
        return esgService.getESGData(companyName);
    }

    @GetMapping("/score")
    public ResponseEntity<List<ESGMetric>> getESGScore(@RequestParam String companyName) {
        List<ESGMetric> metrics = (List<ESGMetric>) esgService.getESGScores(companyName);
        if (metrics.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if not found
        }
        return ResponseEntity.ok(metrics); // Return the found metrics
    }


}
