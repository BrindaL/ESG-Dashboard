package com.project.esg_backend.repository;

import com.project.esg_backend.model.ESGMetric;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ESGMetricRepository extends JpaRepository<ESGMetric, Long> {
    List<ESGMetric> findByCompanyName(String companyName);
}
