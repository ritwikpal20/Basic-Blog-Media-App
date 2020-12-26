Here there , this is my first api based , simple backend project , based on blog posting.
Being a beginner , there may be many flaws in the project and much improvements could be made, still i tried my best to complete it. This website looks like a single url website and all the various components are loaded into it asynchronously.


# Social Media App

## **Setting up the database in local machine**

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

## **Starting the project**

### _1.Inital package setup_

-   Open the editor terminal and install the following packages

```
$ npm init
$ npm install mysql2 sequelize express
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

-   GET : _/api/users/{userId or username}_ - Sends the user with given username or id

-   POST : _/api/users/_ - Creates a random new user

-   GET : _/api/posts/_ - Returns all the posts created

-   POST : _/api/posts/_ - Creates a new post with following fields in the body(title,body,userId)

-   GET : _/api/posts/comments/_ - shows comments with either a userId or postId passed as query parameters . If want to get all comments by a particular user pass the userId with postId as null. If want to get all comments under a post pass the userId as null and postId with a value.
    {userId: _ , postId: _ }

-   POST : _/api/posts/comments/_ - post a comment under a particular post with a given user . The body of the post , userId and postId are to be passed in the body of the req
