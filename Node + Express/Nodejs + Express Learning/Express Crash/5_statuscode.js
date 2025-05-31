const express = require("express");
const path = require("path");

const app = express();

let posts = [
  { id: 1, title: "post one" },
  { id: 2, title: "post two" },
  { id: 3, title: "post three" },
  { id: 4, title: "post four" },
  { id: 5, title: "post five" },
];

app.get("/api/posts", (req, res) => {
  const limit = parseInt(req.query.limit);

  if (!isNaN(limit) && limit > 0) {
    return res.status(200).json(posts.slice(0, limit));
  }
  res.status(200).json(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);

  if (!post) {
    res.status(404).json({ msg: `A post with the id of ${id} was not found` });
  } else {
    res.status(200).json(post);
  }
});

app.listen(5000, () => {
  console.log(`server is running on port 5000`);
});

// ✅ HTTP Status Codes Reference

// -------------------------
// 1xx: Informational
// -------------------------

// 100 Continue
// The server has received the request headers and the client should proceed to send the request body.

// 101 Switching Protocols
// The requester has asked the server to switch protocols and the server has agreed to do so.

// -------------------------
// 2xx: Success
// -------------------------

// 200 OK
// The request has succeeded. Default for successful GET, PUT, DELETE, etc.

// 201 Created
// The request has been fulfilled and has resulted in a new resource being created.

// 202 Accepted
// The request has been accepted for processing, but the processing has not been completed.

// 204 No Content
// The server successfully processed the request, but is not returning any content.

// -------------------------
// 3xx: Redirection
// -------------------------

// 301 Moved Permanently
// The requested resource has been moved to a new permanent URL.

// 302 Found
// The requested resource resides temporarily under a different URL.

// 304 Not Modified
// The resource has not been modified since the last request.

// -------------------------
// 4xx: Client Errors
// -------------------------

// 400 Bad Request
// The server cannot process the request due to client error (e.g., malformed request syntax).

// 401 Unauthorized
// The request requires user authentication.

// 403 Forbidden
// The server understood the request but refuses to authorize it.

// 404 Not Found
// The server can’t find the requested resource.

// 405 Method Not Allowed
// The request method is not supported for the requested resource.

// 409 Conflict
// The request could not be completed due to a conflict with the current state of the resource.

// 422 Unprocessable Entity
// The request was well-formed but was unable to be followed due to semantic errors (e.g., validation).

// -------------------------
// 5xx: Server Errors
// -------------------------

// 500 Internal Server Error
// A generic error message, given when no more specific message is suitable.

// 501 Not Implemented
// The server does not support the functionality required to fulfill the request.

// 502 Bad Gateway
// The server was acting as a gateway or proxy and received an invalid response from the upstream server.

// 503 Service Unavailable
// The server is currently unable to handle the request due to maintenance or overload.

// ✅ Example usage in Express:
// res.status(200).json({ message: "Success" });
// res.status(404).json({ message: "Not Found" });
// res.status(500).json({ message: "Server Error" });

// ✅ Port number in Express:
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });

// You can change the port to any available number like 3000, 4000, 8080 etc.
