 return (
      <article className="post">
        <header className="post-header">
          <p className="post-user">
            Posted by {' '}       
              <Link to={`/posts/${post.username}`} >
                {post.username}
            </Link>
              </p>
        </header>
        <div className="post-content">
          <p className="post-message">{post.message}</p>
          {post.postImage && (
            <div className="post-image-container">
              <img 
                className="post-image" 
                src={`http://localhost:3000/${post.postImage}`} 
                alt="Post" 
              />
            </div>
          )}
        <div className="post-actions">
          <LikeButton post_id={post._id} likes={post.likes} />
          <button onClick={() => focusCommentForm(post._id)} className="my-button">Comment</button>
          {showDeleteButton && (
            <>
              <button className="my-button" onClick={onDelete}>Delete Post</button>
              <button className="my-button" onClick={onEdit}>Edit Post</button>
            </>
          )}
          
              <button onClick={toggleChat} className="my-button">Message</button> 

        </div>
        {isChatVisible && <Chat postId={post._id} onClose={() => setIsChatVisible(false)} setIsChatVisible={setIsChatVisible} />}
          <div className="post-comments">
            <h3>Comments</h3>
            <div>
            {post.comments.map((comment, index) => (
              <li key={index} className="comment-item">
              <div className="comment-username">{comment.username}</div>
              <div className="comment-message">{comment.message}</div>
              <div className="comment-date">{comment.date.split("T")[0]}</div>
              <CommentLikeButton comment_id={comment._id} likes={comment.likes} />
                  <button className="my-button" onClick={() => onDeleteComment(comment._id)}>
                    Delete comment
                  </button>
                  <button className="my-button" onClick={()=>handleCommentEdit(comment)}>
                    Edit Comment
                  </button>
              </li>
              ))}
            </div>    
                <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} />
          </div>
          {isEditModalOpen && (
      <div className="edit-post-modal-overlay">
      <div className="edit-post-modal">
      <CommentForm postId={post._id} onCommentSubmit={onCommentSubmit} initialData={selectedComment} />
      <button onClick={() => setIsEditModalOpen(false)}>Close</button>
      </div>
    </div>
    )}
        </div>
      </article>
      
  );


export default Post;







// .post {
//   background-color: white;
//   border: 1px solid #dddfe2;
//   border-radius: 8px;
//   margin-bottom: 15px;
//   padding: 16px;
//   overflow: hidden; /* Ensures that content doesn't spill outside the border */
//   position: relative; /* Sets the position context for absolute positioning of children */
// }

// .post-header {
//   margin-bottom: 10px;
// }

// .post-user {
//   font-weight: bold;
//   color: #365899;
// }

// .post-content {
//   margin-top: 10px;
// }

// .post-image {
//   width: 100%; /* Full width of the post container */
//   height: 100%;/* Fixed height for all images */
//   object-fit: cover; /* Covers the area, cropping the image as needed */
//   border-radius: 8px; /* If you want rounded corners */
//   margin-top: 10px;
//   margin-bottom: 10px;
// }
// .post-image-container {
//   height: 300px; /* Fixed height */
//   width: 600px; /* Full width */
//   overflow: hidden; /* Hides the overflowed part of the image */
//   position: relative; /* Relative to its normal position */
// }
// .post-image-container img {
//   position: absolute; /* Position absolutely within the .post-image-container */
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// .post-actions {
//   display: flex;
//   justify-content: center; /* Align buttons to the center */
//   align-items: center;
//   margin-top: 10px;
//   border-top: 1px solid #dddfe2; /* Thin line above the buttons */
//   border-bottom: 1px solid #dddfe2; /* Thin line below the buttons */
//   padding: 8px 0; /* Padding above and below the buttons */
// }

// .button-style {
//   background-color: #4267b2; /* Default blue color */
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 6px 12px;
//   cursor: pointer;
//   font-weight: bold;
//   margin-right: 8px; /* Add some spacing between buttons if they are next to each other */
// }

// .button-style:hover {
//   background-color: #365899; /* Darker blue on hover */
// }

// /* Additional specific styles for delete button */
// .post {
//   background-color: white;
//   border: 1px solid #dddfe2;
//   border-radius: 8px;
//   margin-bottom: 15px;
//   padding: 16px;
//   overflow: hidden; /* Ensures that content doesn't spill outside the border */
//   position: relative; /* Sets the position context for absolute positioning of children */
// }

// .post-header {
//   margin-bottom: 10px;
// }

// .post-user {
//   font-weight: bold;
//   color: #365899;
// }

// .post-content {
//   margin-top: 10px;
// }

// .post-image {
//   width: 100%; /* Full width of the post container */
//   height: 100%;/* Fixed height for all images */
//   object-fit: cover; /* Covers the area, cropping the image as needed */
//   border-radius: 8px; /* If you want rounded corners */
//   margin-top: 10px;
//   margin-bottom: 10px;
// }
// .post-image-container {
//   height: 300px; /* Fixed height */
//   width: 600px; /* Full width */
//   overflow: hidden; /* Hides the overflowed part of the image */
//   position: relative; /* Relative to its normal position */
// }
// .post-image-container img {
//   position: absolute; /* Position absolutely within the .post-image-container */
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// }

// .post-actions {
//   display: flex;
//   justify-content: center; /* Align buttons to the center */
//   align-items: center;
//   margin-top: 10px;
//   border-top: 1px solid #dddfe2; /* Thin line above the buttons */
//   border-bottom: 1px solid #dddfe2; /* Thin line below the buttons */
//   padding: 8px 0; /* Padding above and below the buttons */
// }

// .button-style {
//   background-color: #4267b2; /* Default blue color */
//   color: white;
//   border: none;
//   border-radius: 4px;
//   padding: 6px 12px;
//   cursor: pointer;
//   font-weight: bold;
//   margin-right: 8px; /* Add some spacing between buttons if they are next to each other */
// }

// .button-style:hover {
//   background-color: #365899; /* Darker blue on hover */
// }

// /* Additional specific styles for delete button */
// .my-button {
//   color: white;
//   background-color: #4267b2; /* Blue color for the button */
//   border: none;
//   border-radius: 4px;
//   padding: 8px 16px; /* Increased padding for better visual */
//   cursor: pointer;
//   font-weight: bold;
//   margin: 0 8px; /* Space between buttons */
//   transition: background-color 0.2s ease; /* Smooth transition for hover */
// }

// .my-button:hover {
//   background-color: #365899;
// }

// .comment-item {
//   list-style: none; /* Remove bullet points */
//   padding: 8px;
//   border-bottom: 1px solid #dddfe2; /* Add a border to separate comments */
// }

// .comment-item:last-child {
//   border-bottom: none; /* Remove border from the last item */
// }

// .comment-username,
// .comment-date {
//   font-size: 0.85rem; /* Smaller font size for username and date */
//   color: #365899; /* A blue color for username and date */
// }

// .post-comments h3 {
//   font-size: 1.5rem; /* Larger font size for headings */
//   color: #365899; /* A deep blue color */
//   margin-bottom: 0.5rem; /* Add some space below the heading */
//   padding-bottom: 0.25rem; /* A bit of padding at the bottom */
//   border-bottom: 2px solid #365899; /* A solid line below the heading for emphasis */
//   display: inline-block; /* Makes the border-bottom only as long as the text */
//   margin-top: rem; /* Add some space above the heading */
// }

// .comment-username {
//   margin-bottom: 4px; /* Space between username and message */
//   font-weight: bold; /* Bold username */
// }

// .comment-message {
//   margin-bottom: 4px; /* Space between message and date */
// }

// .comment-date {
//   text-align: right; /* Align date to the right */
//   color: #777; /* A grey color for the date */
// }

// .post-message {
//   font-size: 2rem; /* Adjust the font size as needed */
//   line-height: 1.5; /* Increase line-height for better readability */
//   color: #333; /* Darker text color for better contrast */
//   margin: 10px 0; /* Add some margin to the top and bottom */
//   padding: 0.5rem; /* Add some padding for visual comfort */
//   background-color: #f8f9fa; /* A light background to highlight the message */
//   border-left: 4px solid #4267b2; /* A left border for a touch of design */
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* A subtle shadow for depth */
// }

// .comment-item {
//   list-style: none; /* Remove bullet points */
//   padding: 8px;
//   border-bottom: 1px solid #dddfe2; /* Add a border to separate comments */
// }

// .comment-item:last-child {
//   border-bottom: none; /* Remove border from the last item */
// }

// .comment-username,
// .comment-date {
//   font-size: 0.85rem; /* Smaller font size for username and date */
//   color: #365899; /* A blue color for username and date */
// }

// .post-comments h3 {
//   font-size: 1.5rem; /* Larger font size for headings */
//   color: #365899; /* A deep blue color */
//   margin-bottom: 0.5rem; /* Add some space below the heading */
//   padding-bottom: 0.25rem; /* A bit of padding at the bottom */
//   border-bottom: 2px solid #365899; /* A solid line below the heading for emphasis */
//   display: inline-block; /* Makes the border-bottom only as long as the text */
//   margin-top: rem; /* Add some space above the heading */
// }

// .comment-username {
//   margin-bottom: 4px; /* Space between username and message */
//   font-weight: bold; /* Bold username */
// }

// .comment-message {
//   margin-bottom: 4px; /* Space between message and date */
// }

// .comment-date {
//   text-align: right; /* Align date to the right */
//   color: #777; /* A grey color for the date */
// }

// .post-message {
//   font-size: 2rem; /* Adjust the font size as needed */
//   line-height: 1.5; /* Increase line-height for better readability */
//   color: #333; /* Darker text color for better contrast */
//   margin: 10px 0; /* Add some margin to the top and bottom */
//   padding: 0.5rem; /* Add some padding for visual comfort */
//   background-color: #f8f9fa; /* A light background to highlight the message */
//   border-left: 4px solid #4267b2; /* A left border for a touch of design */
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* A subtle shadow for depth */
// }