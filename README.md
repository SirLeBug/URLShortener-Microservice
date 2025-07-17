## Overview

This is a simple URL Shortener Microservice built with Node.js and Express. It accepts a URL submitted via a POST request, validates the URL, and returns a JSON response containing the original URL and a shortened URL identifier.

Users can then visit the shortened URL path to be redirected to the original URL.

If the URL submitted is invalid, the service responds with an error message.

---

## About

This project is part of the [freeCodeCamp](https://www.freecodecamp.org/) Backend Development and APIs curriculum. It helped me practice working with Express, routing, URL validation, and handling redirects in JavaScript.

---

## Usage

- **POST** `/api/shorturl` — Submit a URL to be shortened.  
  The URL should be sent in the request body as URL-encoded form data with the key `url`.

- **GET** `/api/shorturl/:short_url` — Redirects to the original URL corresponding to the short URL ID.

---

### Examples

- **POST** `/api/shorturl` with body `url=https://www.google.com`  
  Returns:  
  `{ "original_url": "https://www.google.com", "short_url": 1 }`

- **GET** `/api/shorturl/1`  
  Redirects to: `https://www.google.com`

- **GET** `/api/shorturl/9999` (nonexistent short URL)  
  Returns:  
  `{ "error": "No short URL found" }`
