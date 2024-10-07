package com.project.esg_backend;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.json.JSONObject;
import org.json.JSONArray;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
class EsgBackendApplicationTests {

	@Test
	void contextLoads() {}

	@Test
	public void testFetchStockData() throws Exception {
//		String id = "a4f8a58b-e458-44fe-b304-04af382a364e"; // Example ID
//		StockService stockService = new StockService();
//		String response = stockService.fetchStockData(id);
//
//		// Check that response is not null
//		assertNotNull(response, "Response should not be null");
//
//		// Parse response to check for quotes
//		JSONObject jsonResponse = new JSONObject(response);
//
//		// Ensure the "data" key exists and is an array
//		assertTrue(jsonResponse.has("data"), "Response should contain 'data' key");
//		JSONArray dataArray = jsonResponse.getJSONArray("data");
//		assertTrue(dataArray.length() > 0, "Data array should not be empty");
//
//		// Extract quotes from the first item in the data array
//		JSONObject firstDataItem = dataArray.getJSONObject(0);
//		assertTrue(firstDataItem.has("quotes"), "First data item should contain 'quotes' key");
//
//		JSONArray quotesArray = firstDataItem.getJSONArray("quotes");
//		assertTrue(quotesArray.length() > 0, "Quotes array should not be empty");
//
//		// Extract latest data from the first quote
//		JSONObject latestData = quotesArray.getJSONObject(0);
//		String latestPrice = latestData.optString("regularMarketPrice");
//		long latestTimestamp = latestData.optLong("regularMarketTime");
//
//		// Convert timestamp to a readable date (optional)
//		String latestDate = new java.util.Date(latestTimestamp * 1000).toString(); // Convert seconds to milliseconds
//
//		// Print the results
//		System.out.println("Latest Data:");
//		System.out.println("Date: " + latestDate + ", Price: " + latestPrice);
	}

}
