import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://movieapi-2cmo.onrender.com';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   *
   * @param {HttpClient} http - Angular's client to make http requests
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user by making an API call to the server.
   * @param {any} userDetails The details of the user to be registered.
   * @returns {Observable<any>} An observable for the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/users', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Logs in an existing user by making an API call to the server.
   * @param {any} userDetails The login credentials of the user.
   * @returns {Observable<any>} An observable for the API response containing user details.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + '/login', userDetails)
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves all movies from the server.
   * @returns {Observable<any>} An observable for all movies obtained using the authorized token.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Retrieves details of a specific movie from the server.
   * @param {string} title The title of the movie to be retrieved while verifying the user token.
   * @returns {Observable<any>} An observable for the API response containing movie details.
   */
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Retrieves details of a director from the server.
   * @param {string} directorName The name of the director to be retrieved.
   * @returns {Observable<any>} An observable for the API response containing director details.
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/directors/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Retrieves details of a genre from the server.
   * @param {string} genreName The name of the genre to be retrieved.
   * @returns {Observable<any>} An observable for the API response containing genre details.
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/movies/genres/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Calls username while verifying token
   * @param username {string} - Calls for user's username
   * @returns {Observable<any>} - API response to retrieve one user's username
   */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Retrieves the username and email of the user from localStorage.
   * @returns {object | null} An object containing the username and email of the user if found in localStorage, otherwise returns null.
   */
  getUserFromLocalStorage() {
    // Retrieve user data string from localStorage
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      // Parse the user data string to convert it into an object
      const userData = JSON.parse(userDataString);
      // Extract username and email from user data
      const { Username, Email } = userData;
      // Return an object containing username and email
      return { Username, Email };
    } else {
      // Return null if no user data is found in localStorage
      return null;
    }
  }

  /**
   * @description Retrieves user data for a single user from localStorage and sends a request to the server to fetch additional user details.
   * @returns {Observable<any>} An observable that emits the user data fetched from the server.
   */
  public getOneUser(): Observable<any> {
    // Retrieve user data from localStorage
    const userData = this.getUserFromLocalStorage();
    if (userData) {
      // Extract username from user data
      const { Username } = userData;
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      return this.http
        .get(apiUrl + '/users/' + Username, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    } else {
      return throwError('User data not found in localStorage');
    }
  }

  /**
   * @description updates user data on the server.
   * @param {any} updatedUserData The updated user data to be sent to the server.
   * @returns {Observable<any>} An observable that emits the response data from the server.
   */
  public updateUser(updatedUserData: any): Observable<any> {
    // Retrieve user data from localStorage
    const userData = this.getUserFromLocalStorage();
    if (userData) {
      // Extract username from user data
      const { Username } = userData;
      // Retrieve token from localStorage
      const token = localStorage.getItem('token');
      return this.http
        .put(apiUrl + '/users/' + Username, updatedUserData, {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        })
        .pipe(map(this.extractResponseData), catchError(this.handleError));
    } else {
      return throwError('User data not found in localStorage');
    }
  }

  /**
   * @description Adds a movie to the user's list of favorite movies on the server.
   * @param {string} movieID The ID of the movie to be added to favorites.
   * @returns {Observable<any>} An observable that emits the response data from the server.
   */
  public addFavoriteMovies(movieID: string): Observable<any> {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    // Add the movieID to the user's list of favorite movies
    user.FavoriteMovies.push(movieID);
    // Update user data in localStorage
    localStorage.setItem('user', JSON.stringify(user));
    return this.http
      .post(
        apiUrl + '/users/' + user.Username + '/movies/' + movieID,
        // Empty body since the movie is already added via user.FavoriteMovies array
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
          responseType: 'text',
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Deletes a movie from the user's list of favorite movies on the server.
   * @param {string} movieID The ID of the movie to be deleted from favorites.
   * @returns {Observable<any>} An observable that emits the response data from the server.
   */
  public deleteFavoriteMovie(movieID: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');

    const index = user.FavoriteMovies.indexOf(movieID);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete(apiUrl + '/users/' + user.Username + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
        responseType: 'text',
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Checks if a movie is in the user's list of favorite movies.
   * @param {string} movieID The ID of the movie to check.
   * @returns {boolean} True if the movie is in favorites, otherwise false.
   */
  isFavoriteMovie(movieID: string): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.FavoriteMovies.indexOf(movieID) >= 0;
  }

  /**
   * @description Get user's favorite movies.
   * @param {string} userName The username of the user.
   * @returns {Observable<any>} An observable that emits the response data from the server.
   */
  getFavoriteMovies(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + '/users/' + userName + '/movies/favorites', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Delete a user by username.
   * @returns {Observable<any>} An observable that emits the response data from the server.
   */
  public deleteUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + '/users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * @description Extracts the response data from the HTTP response.
   * @param {Response | Object} res The HTTP response object.
   * @returns {any} The extracted response data.
   */
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * @description Handles HTTP errors.
   * @param {HttpErrorResponse} error The HTTP error response.
   * @returns {Observable<any>} An observable that emits the error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
