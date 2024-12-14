// Import Playwright
const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Load test data from a JSON file
const testData = JSON.parse(fs.readFileSync('./testData.json', 'utf-8'));

test.describe('API Testing with Playwright - Data Driven', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com'; 
  
  testData.forEach((data) => {
    test(`Data Driven Test - ${data.description}`, async ({ request }) => {
      let response;

      // Switch case to handle different request types
      switch (data.method.toUpperCase()) {
        case 'GET':
          response = await request.get(`${baseURL}${data.endpoint}`);
          break;
        case 'POST':
          response = await request.post(`${baseURL}${data.endpoint}`, {
            data: data.body,
          });
          break;
        case 'PUT':
          response = await request.put(`${baseURL}${data.endpoint}`, {
            data: data.body,
          });
          break;
        case 'DELETE':
          response = await request.delete(`${baseURL}${data.endpoint}`);
          break;
        default:
          throw new Error(`Unsupported method: ${data.method}`);
      }

      // Validate response status code
      expect(response.status()).toBe(data.expectedStatus);

      if (data.expectedResponse) {
        const responseData = await response.json();

        // Validate specific response fields if provided
        for (const key in data.expectedResponse) {
          expect(responseData[key]).toBe(data.expectedResponse[key]);
        }
      }
    });
  });
});
