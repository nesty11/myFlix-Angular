# Welcome to myFlix-Angular 🎬

This is yet another app created to use my very own movie-api, but this time using Angular. This is the first Angular project I have generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.10.

## Project Overview 🌟

myFlix-Angular is another take on the original myFlix-client I designed, but this time using, you guessed it, Angular as the main language.
Here is the original project link: https://github.com/nesty11/myFlix-client

## Features ✨

- **Welcome View:** Where users are welcomed to Sign-Up or welcome back to Login

- **Movies View:** Where users see the list of movies from the API

- **Movie Cards:** Users can see the synopsis, genre and director information. They can also favorite and unfavorite movies.

- **Information Cards:** When clicking the buttons on the movie card, users can find detailed information about the synopsis, genre and director of said movie.

- **User Profile:** Users can see and update their current username and email. Also, they can delete their profile.

### Custom Movie API 🎥

- **API:**
  The backend API used for this project was another project I created in my beginning steps of becoming a Web Developer. 
- Check it out on [GitHub](https://github.com/nesty11/movie_api).

## Fixed Challenges 🛠️

### User Data Retrieval Error:
- **Challenge:**
  When trying to retrieve the user's username, was actually retrieving all of the user's data.
- **Solution:**
  Conducted a review of the updateUser method in the fetch-api-data.service, and found error with how I was retrieving user data from api.

### User Credential Update Error:
- **Challenge:**
  User could not update their username or email.
- **Solution:**
  Once the updateUser method error was fixed, then I had to restructure the user-profile component's updateUser method.

## Installation 🚀

To get started with myFlix-Angular, follow these steps:

1. Clone the repository:

```
   git clone https://github.com/your-username/nvflix-angular.git
```

2. Navigate to the project directory::
```
   cd nvflix-angular
```

3. Install dependencies::
```
   npm install
```

4. Start the development server::
```
   npm start
```

5. Open your browser and visit http://localhost:4200 to access myFlix-Angular and start exploring!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
