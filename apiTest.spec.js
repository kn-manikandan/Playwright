const { test, expect } = require('@playwright/test');

test.describe('API Testing using Playwright', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com'; 
  
  test('GET Request - Fetch Posts', async ({ request }) => {
    const response = await request.get(`${baseURL}/posts`);
    expect(response.status()).toBe(200); // Check the status code
    const responseData = await response.json();
    expect(responseData.length).toBeGreaterThan(0); // Ensure the response has data
  });

  test('POST Request - Create a New Post', async ({ request }) => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const response = await request.post(`${baseURL}/posts`, {
      data: newPost,
    });

    expect(response.status()).toBe(201); // Check if the resource was created
    const responseData = await response.json();
    expect(responseData.title).toBe(newPost.title);
  });

  test('PUT Request - Update a Post', async ({ request }) => {
    const updatedPost = {
      id: 1,
      title: 'updated food',
      body: 'updated barbique',
      userId: 1,
    };

    const response = await request.put(`${baseURL}/posts/1`, {
      data: updatedPost,
    });

    expect(response.status()).toBe(200); // Check if the resource was updated
    const responseData = await response.json();
    expect(responseData.title).toBe(updatedPost.title);
  });

  test('DELETE Request - Delete a Post', async ({ request }) => {
    const response = await request.delete(`${baseURL}/posts/1`);
    expect(response.status()).toBe(200); // Check if the resource was deleted
  });
});
