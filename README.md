This is a api based , simple backend project , based on blog posting. It works on single URL and all the various components are loaded into it asynchronously.

# Blog Posting App

## **Setting up the database on local machine for development:**

## _Using MySQL Database_

### _1. Install Mysql Database and add it to path_

### _2.Setup the Database_

-   Using shell, login in as root user

```
 $ mysql -u root -p
```

-   Create a database

```
$ create database  socialmediadb;
```

-   Create a user and assign a password

```
$ create user socialuser identified by 'socialpass';
```

-   Grant privileges on new user

```
$ grant all privileges on socialmediadb.* to socialuser;
```

-   Flush privileges for changes to take effect

```
$ flush privileges;
```

## _Using SQLite Database_

#### This project by default uses SQLite Database on development server, which does needs to be set up. It works on directly.

## **Starting the project:**

### _Clone the codebase from github_

-   Open the editor terminal

```
$ npm install
$ npm start
```

-   Project Structure

```
SRC
│   server.js
│
├───controllers
│       comments.js
│       posts.js
│       users.js
│
├───db
│       models.js
│       socialmediadb.db
│
├───public
│   │   index.html
│   │
│   ├───app
│   │       all-articles.js
│   │       comment.js
│   │       common.css
│   │       common.js
│   │       login.js
│   │       my-post.js
│   │       navbar.js
│   │       profle.js
│   │       signup.js
│   │       write-post.js
│   │
│   ├───components
│   │       all-articles.html
│   │       comments.html
│   │       footer.html
│   │       login.html
│   │       my-post.html
│   │       navbar.html
│   │       profile.html
│   │       signup.html
│   │       write-post.html
│   │
│   ├───css
│   ├───fonts
│   └───js
│           jquery-3.5.1.js
│
└───routes
    ├───posts
    │       comment.js
    │       index.js
    │
    └───users
            index.js
```

## API Documentation

-   GET : _/api/users/{userId or username}_ - Finds the user with given username or id , passed in the params of the request.

-   POST : _/api/users/_ - Creates a new user with name,username,email and password , passed in the body of the request.

-   GET : _/api/posts/_ - Returns all the posts that have been already created.

-   POST : _/api/posts/_ - Creates a new post with following fields in the body(title,body,userId)

-   GET : _/api/posts/comments/_ - shows comments with either a userId or postId passed in the query of the request . If want to get all comments by a particular user pass the userId with postId as null. If want to get all comments under a post pass the userId as null and postId with a value.
    {userId: _ , postId: _ }

-   POST : _/api/posts/comments/_ - post a comment under a particular post with a given user . The body of the post , userId and postId are to be passed in the body of the req

-   POST : _/api/posts/delete/_ - deletes a post with a postId passed in query of request

-   GET : _/api/posts/post/_ - sends a post with a postId passed in query of request

-   POST : _/api/posts/post/_ - updates a post with a postid , title and body passed in body of request
