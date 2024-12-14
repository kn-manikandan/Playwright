const { test, expect } = require('@playwright/test');

test.describe('Enhanced API Testing with Playwright', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com'; // Test API endpoint

  test('API Automation with Requests and Logging', async ({ request }) => {
    console.log('Starting API Automation Tests ');

    // Step 1: GET Request (Fetch all posts)
    console.log('1. Sending GET request to fetch all the posts ');
    const getResponse = await request.get(`${baseURL}/posts`);
    expect(getResponse.status()).toBe(200);
    const posts = await getResponse.json();
    console.log(`GET Response Data: ${JSON.stringify(posts[0])}`); // Print the first post

    // Extract data from the first post for automation
    const postId = posts[0].id;

    // Step 2: POST Request (Create a new post with extracted data)
    console.log('2. Sending POST request to create a new post ');
    const newPost = {
      title: `Post Title Derived from ID ${postId}`,
      body: `Body content using Post ID: ${postId}`,
      userId: 1,
    };

    const postResponse = await request.post(`${baseURL}/posts`, {
      data: newPost,
    });

    expect(postResponse.status()).toBe(201);
    const createdPost = await postResponse.json();
    console.log(`POST Response Data: ${JSON.stringify(createdPost)}`); // Print the second post

    // Extract ID of the new post for the next step
    const newPostId = createdPost.id;

    // Step 3: PUT Request (Update the newly created post)
    console.log('3. Sending PUT request to update the new post ');
    const updatedPost = {
      ...newPost,
      title: `Updated Title for Post ${newPostId}`,
    };

    const putResponse = await request.put(`${baseURL}/posts/${newPostId}`, {
      data: updatedPost,
    });

    //await(5000);
    //expect(putResponse.status()).toBe(200);
    //const updatedPostData = await putResponse.json();
    //console.log(`PUT Response Data: ${JSON.stringify(updatedPostData)}`);

    // Step 4: DELETE Request (Delete the updated post)
    console.log('4.  Sending DELETE request to delete the updated post ');
    const deleteResponse = await request.delete(`${baseURL}/posts/${newPostId}`);
    expect(deleteResponse.status()).toBe(200);
    console.log(`DELETE Response Status: ${deleteResponse.status()}`);

    console.log('API Automation Tests Completed Successfully ');
  });

  test('Authentication : Bearer Token and Basic Auth', async ({ request }) => {
    // Bearer Token Authentication
    console.log('5. Sending GET request with Bearer Token ');
    const bearerToken = 'd5b903eb9d8c4c3492f434d40b3739e1'; // Replace with an actual token

    const bearerResponse = await request.get('https://httpbin.org/bearer', {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    console.log(`Bearer Token Response Status: ${bearerResponse.status()}`);
    console.log(`Bearer Token Response Data: ${await bearerResponse.text()}`);
    expect(bearerResponse.status()).toBe(200);

    // Basic Authentication
    console.log('6. Sending GET request with Basic Authentication');
    const basicAuthResponse = await request.get('https://httpbin.org/basic-auth/user/pass', {
      headers: {
        Authorization: `Basic ${Buffer.from('user:pass').toString('base64')}`,
      },
    });

    console.log(`Basic Auth Response Status: ${basicAuthResponse.status()}`);
    console.log(`Basic Auth Response Data: ${await basicAuthResponse.text()}`);
    expect(basicAuthResponse.status()).toBe(200);
  });
});
