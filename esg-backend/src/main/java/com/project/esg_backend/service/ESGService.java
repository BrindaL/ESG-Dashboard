package com.project.esg_backend.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.esg_backend.model.ESGMetric;
import com.project.esg_backend.repository.ESGMetricRepository;
import org.springframework.http.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import javax.swing.text.html.parser.Entity;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;

@Service
public class ESGService {
    private final String API_URL = "https://gaialens-esg-scores.p.rapidapi.com/scores?companyname=";
    private final String HOST = "gaialens-esg-scores.p.rapidapi.com";
    private final String KEY = "68bbf49698msh38fdcb90ae35d44p1eb96djsn15ea47b664ec";

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ESGMetricRepository esgMetricRepository;

    public ResponseEntity<?> getESGData(String companyName) {
        List<ESGMetric> esgData = esgMetricRepository.findByCompanyName(companyName);

        if (esgData.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ESG data not found for: " + companyName);
        } else {
            return ResponseEntity.ok(esgData);
        }
    }

    public List<ESGMetric> getESGScores(String companyName) {
        String url = API_URL + companyName;
        HttpHeaders headers = new HttpHeaders();

        headers.set("x-rapidapi-host", HOST);
        headers.set("x-rapidapi-key", KEY);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            List<ESGMetric> newMetrics = (List<ESGMetric>) parseResponse(response.getBody());
            System.out.println("API Response: " + response.getBody());

            for (ESGMetric newMetric : newMetrics) {
                List<ESGMetric> existingMetrics = esgMetricRepository.findByCompanyName(newMetric.getCompanyName());
                if (!existingMetrics.isEmpty()) {
                    ESGMetric existingMetric = existingMetrics.get(0); // Assuming one record per company

                    LocalDate latestScoreDate = LocalDate.parse(newMetric.getLatestScoreDate(), DateTimeFormatter.ofPattern("dd MMM yyyy"));
                    LocalDate existingScoreDate = LocalDate.parse(existingMetric.getLatestScoreDate(), DateTimeFormatter.ofPattern("dd MMM yyyy"));

                    if (latestScoreDate.isAfter(existingScoreDate)) {
                        esgMetricRepository.save(newMetric);
                    }
                } else {
                    esgMetricRepository.save(newMetric);
                }
            }

            return newMetrics;

        } catch (RestClientException e) {
            System.err.println("Error fetching ESG data: " + e.getMessage());
            return Collections.emptyList();

        } catch (JsonProcessingException e) {
            System.err.println("Error parsing JSON response: " + e.getMessage());
            return Collections.emptyList();

        } catch (Exception e) {
            // Handle any other unexpected errors
            System.err.println("Unexpected error: " + e.getMessage());
            return Collections.emptyList();
        }
    }

    private List<ESGMetric> parseResponse(String body) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(body, new TypeReference<List<ESGMetric>>(){});
    }

}
