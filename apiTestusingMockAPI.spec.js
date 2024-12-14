const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Load test data
const jsonData = JSON.parse(fs.readFileSync('./user_data.json', 'utf-8'));

test.describe('API Automation Testing - User and Post Management', () => {
    test('Create and Update User with Chained API Requests', async ({ request }) => {
        
        const userBaseURL = 'https://67592c1260576a194d13630d.mockapi.io/api/v2/user';

        // Step 1: Create a new user using data from the JSON file
        console.log('Starting: Create User');
        const createUserResponse = await request.post(userBaseURL, {
            data: jsonData.createUserPayload,
        });

        // Log and validate the response of the Create User request
        expect(createUserResponse.ok()).toBeTruthy();
        const createdUser = await createUserResponse.json();
        console.log('User Created Successfully:', createdUser);

        // Step 2: Use the ID from the Create User response to update the user
        const userId = createdUser.id;
        console.log(`User ID Retrieved: ${userId}`);

        console.log('Starting: Update User');
        const updateUserResponse = await request.put(`${userBaseURL}/${userId}`, {
            data: jsonData.updateUserPayload,
        });

        // Log and validate the response of the Update User request
        expect(updateUserResponse.ok()).toBeTruthy();
        const updatedUser = await updateUserResponse.json();
        console.log('User Updated Successfully:', updatedUser);

        // Step 3: Validate the updated user details
        expect(updatedUser.name).toBe(jsonData.updateUserPayload.name);
        expect(updatedUser.email).toBe(jsonData.updateUserPayload.email);
        console.log('Validation Passed: User details updated correctly');

        // Define base URL for posts
        const postBaseURL = 'https://67592c1260576a194d13630d.mockapi.io/api/v2/post';

        // Step 4: Create a post for the user
        console.log('Starting: Create Post');
        const createPostResponse = await request.post(postBaseURL, {
            data: {
                userId: userId,
                title: jsonData.createPostPayload.title,
                content: jsonData.createPostPayload.content,
            },
        });

        // Log and validate the response of the Create Post request
        expect(createPostResponse.ok()).toBeTruthy();
        const createdPost = await createPostResponse.json();
        console.log('Post Created Successfully:', createdPost);

        // Step 5: Use the ID from the Create Post response to update the post
        const postId = createdPost.id;
        console.log(`Post ID Retrieved: ${postId}`);

        console.log('Starting: Update Post');
        const updatePostResponse = await request.put(`${postBaseURL}/${postId}`, {
            data: {
                title: jsonData.updatePostPayload.title,
                content: jsonData.updatePostPayload.content,
            },
        });

        // Log and validate the response of the Update Post request
        expect(updatePostResponse.ok()).toBeTruthy();
        const updatedPost = await updatePostResponse.json();
        console.log('Post Updated Successfully:', updatedPost);

        // Step 6: Validate the updated post details
        expect(updatedPost.title).toBe(jsonData.updatePostPayload.title);
        expect(updatedPost.content).toBe(jsonData.updatePostPayload.content);
        console.log('Validation Passed: Post details updated correctly');
    });
});
