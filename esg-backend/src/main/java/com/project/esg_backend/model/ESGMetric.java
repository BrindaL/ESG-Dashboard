package com.project.esg_backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ESGMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonProperty("companyname")
    private String companyName;
    @JsonProperty("Environmental Pillar Score")
    private double environmentalScore;
    @JsonProperty("Social Pillar Score")
    private double socialScore;
    @JsonProperty("Governance Pillar Score")
    private double governmentScore;
    @JsonProperty("Latest Score Date")
    private String latestScoreDate;
    @JsonProperty("request_id")
    private String requestId;
    private String industry;
    private String country;
    @JsonProperty("exchangename")
    private String exchangeName;
    @JsonProperty("tickersymbol")
    private String tickerSymbol;
    @JsonProperty("Year")
    private int year;
    @JsonProperty("Overall Score")
    private double overallScore;
    @JsonProperty("Overall Transparency Score")
    private double overallTransparencyScore;
    @JsonProperty("Overall Industry Rank")
    private String overallIndustryRank;

    @JsonProperty("Overall Region Rank")
    private String overallRegionRank;

    @JsonProperty("Overall Score Global Rank")
    private String overallScoreGlobalRank;


    public void setId(long id) {
        this.id = id;
    }
    public long getId() {
        return id;
    }

    public void setLatestScoreDate(String latestScoreDate) {
        this.latestScoreDate = latestScoreDate;
    }
    public String getLatestScoreDate() {
        return latestScoreDate;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
    public String getCompanyName() {
        return companyName;
    }

    public void setEnvironmentalScore(double environmentalScore) {
        this.environmentalScore = environmentalScore;
    }
    public double getEnvironmentalScore() {
        return environmentalScore;
    }

    public void setGovernmentScore(double governmentScore) {
        this.governmentScore = governmentScore;
    }
    public double getGovernmentScore() {
        return governmentScore;
    }

    public void setSocialScore(double socialScore) {
        this.socialScore = socialScore;
    }
    public double getSocialScore() {
        return socialScore;
    }

    public void setOverallScore(double overallScore) {
        this.overallScore = overallScore;
    }
    public double getOverallScore() {
        return overallScore;
    }

    public String getRequestId() {
        return requestId;
    }
    public void setRequestId(String requestId) {
        this.requestId = requestId;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public String getCountry() {
        return country;
    }

    public void setExchangeName(String exchangeName) {
        this.exchangeName = exchangeName;
    }
    public String getExchangeName() {
        return exchangeName;
    }

    public void setTickerSymbol(String tickerSymbol) {
        this.tickerSymbol = tickerSymbol;
    }
    public String getTickerSymbol() {
        return tickerSymbol;
    }

    public void setIndustry(String industry) {
        this.industry = industry;
    }
    public String getIndustry() {
        return industry;
    }

    public void setOverallTransparencyScore(double overallTransparencyScore) {
        this.overallTransparencyScore = overallTransparencyScore;
    }
    public double getOverallTransparencyScore() {
        return overallTransparencyScore;
    }

    public void setYear(int year) {
        this.year = year;
    }
    public int getYear() {
        return year;
    }

    public void setOverallIndustryRank(String overallIndustryRank) {
        this.overallIndustryRank = overallIndustryRank;
    }

    public String getOverallIndustryRank() {
        return overallIndustryRank;
    }

    public void setOverallRegionRank(String overallRegionRank) {
        this.overallRegionRank = overallRegionRank;
    }

    public String getOverallRegionRank() {
        return overallRegionRank;
    }

    public void setOverallScoreGlobalRank(String overallScoreGlobalRank) {
        this.overallScoreGlobalRank = overallScoreGlobalRank;
    }

    public String getOverallScoreGlobalRank() {
        return overallScoreGlobalRank;
    }
}

