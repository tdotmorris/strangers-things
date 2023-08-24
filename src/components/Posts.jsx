import { FetchAllData } from "../API";
import React, { useState, useEffect } from "react";

const cohort = "2305-FTB-ET-WEB-PT";
const BaseURL = `https://strangers-things.herokuapp.com/api/${cohort}`;

const Posts = ({ token, username }) => {
  console.log("Username inside Posts component:", username);
  const tokenString = localStorage.getItem("authToken");

  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [price, setPrice] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    async function getAllData() {
      const APIResponse = await FetchAllData(`${BaseURL}/posts`);
      if (APIResponse && APIResponse.success) {
        setPost(APIResponse.data.posts);
      } else if (APIResponse) {
        setError(APIResponse.error.message);
      }
    }
    getAllData();
  }, []);

  const makePost = async () => {
    try {
      const response = await fetch(`${BaseURL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          post: {
            title: title,
            description: description,
            price: price,
            willDeliver: willDeliver,
          },
        }),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };
  const handleEdit = (postId) => {
    // Find the post by its ID
    const postToEdit = post.find((p) => p._id === postId);

    // Populate the form fields with the post data
    setTitle(postToEdit.title);
    setDescription(postToEdit.description);
    setPrice(postToEdit.price);
    setWillDeliver(postToEdit.willDeliver);

    // Set the editing state
    setIsEditing(postId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tokenString) {
      setError("You must be logged in to perform this action.");
      return;
    }

    const postDetails = {
      post: {
        title,
        description,
        price,
        willDeliver,
      },
    };

    let result;

    if (isEditing) {
      // Updating a post
      result = await updatePost(isEditing, postDetails);
    } else {
      // Creating a new post
      result = await makePost(postDetails);
    }

    if (result && result.success) {
      setSuccessMessage(
        isEditing ? "Post updated successfully!" : "Post created successfully!"
      );

      // Reset form fields and editing state
      setTitle("");
      setDescription("");
      setPrice("");
      setWillDeliver(false);
      setIsEditing(null);

      // Fetch the updated list of posts
      const APIResponse = await FetchAllData(`${BaseURL}/posts`);
      if (APIResponse.success) {
        setPost(APIResponse.data.posts);
      }
    } else {
      setError(result.error.message);
    }
  };

  const updatePost = async (postId, postData) => {
    try {
      const response = await fetch(`${BaseURL}/posts/${postId}`, {
        method: "PATCH", // or "PUT" depending on your API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      return { success: false, error: error.message };
    }
  };

  const postToDisplay = searchParams
    ? post.filter((p) =>
        p.title.toLowerCase().includes(searchParams.toLowerCase())
      )
    : post;

  const handleSendMessage = async (postId) => {
    const messageContent = prompt("Enter your message:");

    // If the user presses cancel on the prompt, messageContent will be null.
    if (!messageContent) return;

    try {
      const response = await fetch(`${BaseURL}/posts/${postId}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenString}`, // Make sure to have the token string here.
        },
        body: JSON.stringify({
          message: {
            content: messageContent,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Display some feedback, like an alert or update the UI in some way
        alert("Message sent successfully!");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error.message}`);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("An error occurred while sending the message.");
    }
  };

  const handleViewMessages = (postId) => {
    // Assuming you would navigate to another page or open a modal/dialog to view the messages related to the post.
    alert(`Viewing messages for post with ID: ${postId}`);
  };
  const handleDelete = async (postId, postAuthorUsername) => {
    if (username !== postAuthorUsername) {
      setError("You can only delete your own posts!");
      return;
    }

    try {
      const response = await fetch(`${BaseURL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // use token instead of tokenString
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();

      if (result.success) {
        // Remove the post from the local state
        setPost((prevPosts) => prevPosts.filter((post) => post._id !== postId));
      } else {
        setError(result.error.message || "Unexpected error occurred.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      {tokenString && (
        <div className="new-post">
          <h2>Create New Post</h2>
          {successMessage && <p>{successMessage}</p>}
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <br />
            <label>
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Price:
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <br />
            <label>
              Will Deliver:
              <input
                type="checkbox"
                checked={willDeliver}
                onChange={(e) => setWillDeliver(e.target.checked)}
              />
            </label>
            <br />
            <button style={{ border: "2px solid #242424", padding: "5px" }}>
            {isEditing ? "Update Post" : "Submit New Post"}
            </button>
          </form>
        </div>
      )}

      <h1>Posts</h1>
      <div>
        <label>
          Search:
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </label>
      </div>

      {postToDisplay.map((p) => (
        <div key={p._id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>Price: {p.price}</p>
          <p>Will Deliver: {p.willDeliver ? "Yes" : "No"}</p>

          {tokenString && p.author.username !== username && (
            <button onClick={() => handleSendMessage(p._id)}>
              Send Message
            </button>
          )}

          {tokenString && p.author.username === username && (
            <>
              <button onClick={() => handleDelete(p._id, p.author.username)}>
                Delete
              </button>
              <button onClick={() => handleEdit(p._id)}>Edit</button>{" "}
              <button onClick={() => handleViewMessages(p._id)}>
                View Messages
              </button>
            </>
          )}
        </div>
      ))}
    </>
  );
};

export default Posts;
