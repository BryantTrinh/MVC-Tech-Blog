// form handler for comment, 
// DONE

const commentForm = async function(event) {
  event.preventDefault();
}

const postId = document.querySelector('input[name="post-id"]').value;

const body = document.querySelector('textarea[name="comment-body"]').value;


// if statement for body, we need to fetch api/comment annd our method is POST, stringify json object, the postId and body

if (body) {
  await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postId,
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.reload();
}

document.querySelector('#new-comment-form').addEventListener('submit', commentForm);