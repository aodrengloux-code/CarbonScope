package com.carbonscope.repository;

import com.carbonscope.model.SiteCalculation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SiteCalculationRepository extends JpaRepository<SiteCalculation, Long> {
    List<SiteCalculation> findAllByOrderByCalculatedAtDesc();
}
