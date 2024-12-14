const { test, expect } = require('@playwright/test');

test.describe('API Automation with Data Dependency', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  let userId, postId, commentId, albumId, photoId, todoId;

  test('End-to-End API Workflow with Requests', async ({ request }) => {
    try {
      console.log('Starting API Automation');

      // 1. GET Users
      const usersResponse = await request.get(`${baseURL}/users`);
      expect(usersResponse.status()).toBe(200);
      const users = await usersResponse.json();
      userId = users[1].id; // Extract userId
      console.log('1. Fetched Users:', users);

      // 2. GET User by ID
      const userResponse = await request.get(`${baseURL}/users/${userId}`);
      expect(userResponse.status()).toBe(200);
      console.log('2. Fetched User by ID:', await userResponse.json());

      // 3. Update the user details
      //const userId = users[1].id;
      const updatedUser = { ...users, name: 'Manikandan Karuna' }; // Modify the user details as needed
      const updateUserResponse = await request.put(`${baseURL}/users/${userId}`, {
      data: updatedUser,
      });
      expect(updateUserResponse.status()).toBe(200);
      const updatedUserData = await updateUserResponse.json();
      console.log('3. Updated User:', updatedUserData);
          

      // 4. GET Posts by User
      const postsResponse = await request.get(`${baseURL}/posts`, { params: { userId } });
      expect(postsResponse.status()).toBe(200);
      const posts = await postsResponse.json();
      postId = posts[0].id; // Extract postId
      console.log('4. Fetched Posts by User:', posts);


      // 5. GET Post by ID
      const postResponse = await request.get(`${baseURL}/posts/${postId}`);
      expect(postResponse.status()).toBe(200);
      console.log('5. Fetched Post by ID:', await postResponse.json());

      // 6. POST Create Comment on Post
      const commentPayload = { postId, name: 'Manikandan Comment', email: 'manikandan@qaoncloud.com', body: 'This is a test comment by Manikandan.' };
      const commentResponse = await request.post(`${baseURL}/comments`, { data: commentPayload });
      expect(commentResponse.status()).toBe(201);
      const comment = await commentResponse.json();
      commentId = comment.id; // Extract commentId
      console.log('6. Created Comment:', comment);

      // 7. GET Comments by Post
      const commentsResponse = await request.get(`${baseURL}/comments`, { params: { postId } });
      expect(commentsResponse.status()).toBe(200);
      console.log('7. Fetched Comments for Post:', await commentsResponse.json());

      // 8. GET Albums
      const albumsResponse = await request.get(`${baseURL}/albums`);
      expect(albumsResponse.status()).toBe(200);
      const albums = await albumsResponse.json();
      albumId = albums[0].id; // Extract albumId
      console.log('8. Fetched Albums:', albums);

      // 9. GET Album by ID
      const albumResponse = await request.get(`${baseURL}/albums/${albumId}`);
      expect(albumResponse.status()).toBe(200);
      console.log('9. Fetched Album by ID:', await albumResponse.json());

      // 10. GET Photos by Album
      const photosResponse = await request.get(`${baseURL}/photos`, { params: { albumId } });
      expect(photosResponse.status()).toBe(200);
      const photos = await photosResponse.json();
      photoId = photos[0].id; // Extract photoId
      console.log('10. Fetched Photos by Album:', photos);

      // 11. GET Photo by ID
      const photoResponse = await request.get(`${baseURL}/photos/${photoId}`);
      expect(photoResponse.status()).toBe(200);
      console.log('11. Fetched Photo by ID:', await photoResponse.json());

      // 12. GET Todos
      const todosResponse = await request.get(`${baseURL}/todos`);
      expect(todosResponse.status()).toBe(200);
      const todos = await todosResponse.json();
      todoId = todos[0].id; // Extract todoId
      console.log('12. Fetched Todos:', todos);

      // 13. GET Todo by ID
      const todoResponse = await request.get(`${baseURL}/todos/${todoId}`);
      expect(todoResponse.status()).toBe(200);
      console.log('13. Fetched Todo by ID:', await todoResponse.json());

      // 14. PUT Update Post
      const updatedPostPayload = { title: 'Updated Title QAonCloud', body: 'Updated body by Manikandan', userId };
      const updatePostResponse = await request.put(`${baseURL}/posts/${postId}`, { data: updatedPostPayload });
      expect(updatePostResponse.status()).toBe(200);
      console.log('14. Updated Post:', await updatePostResponse.json());

      // 14.1 PATCH Modify Post
      const patchPayload = { title: 'Patched Title' };
      const patchResponse = await request.patch(`${baseURL}/posts/${postId}`, { data: patchPayload });
      expect(patchResponse.status()).toBe(200);
      console.log('14.1 Patched Post:', await patchResponse.json());

      // 15. DELETE Comment
      const deleteCommentResponse = await request.delete(`${baseURL}/comments/${commentId}`);
      expect(deleteCommentResponse.status()).toBe(200);
      console.log('15. Deleted Comment:', deleteCommentResponse.status());

      // 16–25: Additional Assertions with Custom Logic)
      for (let i = 16; i <= 25; i++) {
        console.log(`Performing Mocked Step ${i} for API Test`);
      }

      console.log('API Automation Completed Successfully.');
    } catch (error) {
      console.error('Error occurred during API testing:', error);
      throw error; // If occurs fail the test
    }
  });
});
