# Blogify

A simple blogging app where you can create, read, and comment on posts. Built with Node.js, Express, MongoDB, and EJS.

## Quick Start

1. Make sure MongoDB is running
2. `npm install`
3. `npm run dev`
4. Open http://localhost:8000

## What You Can Do

- Sign up and log in
- Create blog posts with cover images
- View all blogs on the homepage
- Comment on posts
- Log out when you're done

## How It Works

**Sign up:** Click "Create Account" → fill in your name, email, password → done

**Create a post:** Log in → click "Add Blog" → add title, content, and image → publish

**Comment:** Go to any post → write a comment → submit

**Log out:** Click your name in the top right → logout

## Tech Stack

- Node.js, Express
- MongoDB
- EJS templates
- Bootstrap 5
- JWT for authentication

## File Structure

```
YouTube-Blog/
├── index.js
├── routes/
│   ├── user.js (login/signup)
│   └── blog.js (posts)
├── model/
│   ├── user.js
│   ├── blog.js
│   └── comment.js
├── middlewares/
│   └── authentication.js
├── views/
│   ├── home.ejs
│   ├── signin.ejs
│   ├── signup.ejs
│   ├── addBlog.ejs
│   └── partials/ (nav, head, etc)
└── public/
    └── images/uploads/
```

## Notes

- Images get uploaded to `public/images/uploads/`
- User names now show in the navbar after login
- Change the JWT secret in `services/authentication.js` before going to production
