package com.carbonscope.dto;

import java.util.List;

public class DashboardSummary {
    private int totalSites;
    private double totalCo2Tons;
    private double avgCo2PerM2;
    private double avgCo2PerEmployee;
    private double totalConstructionCo2;
    private double totalExploitationCo2;
    private List<SiteBreakdown> sites;

    public int getTotalSites() { return totalSites; }
    public void setTotalSites(int totalSites) { this.totalSites = totalSites; }

    public double getTotalCo2Tons() { return totalCo2Tons; }
    public void setTotalCo2Tons(double totalCo2Tons) { this.totalCo2Tons = totalCo2Tons; }

    public double getAvgCo2PerM2() { return avgCo2PerM2; }
    public void setAvgCo2PerM2(double avgCo2PerM2) { this.avgCo2PerM2 = avgCo2PerM2; }

    public double getAvgCo2PerEmployee() { return avgCo2PerEmployee; }
    public void setAvgCo2PerEmployee(double avgCo2PerEmployee) { this.avgCo2PerEmployee = avgCo2PerEmployee; }

    public double getTotalConstructionCo2() { return totalConstructionCo2; }
    public void setTotalConstructionCo2(double totalConstructionCo2) { this.totalConstructionCo2 = totalConstructionCo2; }

    public double getTotalExploitationCo2() { return totalExploitationCo2; }
    public void setTotalExploitationCo2(double totalExploitationCo2) { this.totalExploitationCo2 = totalExploitationCo2; }

    public List<SiteBreakdown> getSites() { return sites; }
    public void setSites(List<SiteBreakdown> sites) { this.sites = sites; }

    public static class SiteBreakdown {
        private Long id;
        private String name;
        private double totalCo2Tons;
        private double constructionCo2Tons;
        private double exploitationCo2Tons;
        private double co2PerM2;
        private double co2PerEmployee;

        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public double getTotalCo2Tons() { return totalCo2Tons; }
        public void setTotalCo2Tons(double totalCo2Tons) { this.totalCo2Tons = totalCo2Tons; }

        public double getConstructionCo2Tons() { return constructionCo2Tons; }
        public void setConstructionCo2Tons(double constructionCo2Tons) { this.constructionCo2Tons = constructionCo2Tons; }

        public double getExploitationCo2Tons() { return exploitationCo2Tons; }
        public void setExploitationCo2Tons(double exploitationCo2Tons) { this.exploitationCo2Tons = exploitationCo2Tons; }

        public double getCo2PerM2() { return co2PerM2; }
        public void setCo2PerM2(double co2PerM2) { this.co2PerM2 = co2PerM2; }

        public double getCo2PerEmployee() { return co2PerEmployee; }
        public void setCo2PerEmployee(double co2PerEmployee) { this.co2PerEmployee = co2PerEmployee; }
    }
}
