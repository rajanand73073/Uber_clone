# Uber Clone Project

This project is a comprehensive clone of the Uber application, featuring both frontend and backend components. It aims to replicate the core functionalities of the Uber app, providing a seamless experience for both users and captains.

## Backend

The backend is developed using Node.js, Express, and MongoDB. It is responsible for handling user and captain registration, authentication, profile management, and logout functionalities.

### Dependencies

- **Captain model**: Represents the captain entity in the MongoDB database.
- **User model**: Represents the user entity in the MongoDB database.
- **asyncHandler**: Utility to handle asynchronous operations and errors gracefully.
- **ApiError**: Custom error class to handle API-specific errors.
- **ApiResponse**: Custom response class to standardize API responses.
- **createCaptain**: Service function to create a new captain in the database.
- **userCreate**: Service function to create a new user in the database.

### Functions

- **captainRegister**: Registers a new captain by saving their details in the database.
- **captainLogin**: Authenticates an existing captain and generates a JWT token.
- **captainProfile**: Retrieves the profile information of the logged-in captain.
- **captainLogout**: Logs out the captain by invalidating their session.
- **registerUser**: Registers a new user by saving their details in the database.
- **loginUser**: Authenticates an existing user and generates a JWT token.
- **getUserProfile**: Retrieves the profile information of the logged-in user.
- **logoutUser**: Logs out the user by invalidating their session.

### Routes

- **Captain Routes**:
    - `POST /api/captains/captain-register`: Endpoint to register a new captain.
    - `POST /api/captains/captain-login`: Endpoint to log in an existing captain.
    - `GET /api/captains/captain-details`: Endpoint to retrieve the profile of the logged-in captain.
    - `GET /api/captains/captain-logout`: Endpoint to log out the logged-in captain.
- **User Routes**:
    - `POST /api/users/register`: Endpoint to register a new user.
    - `POST /api/users/login`: Endpoint to log in an existing user.
    - `GET /api/users/user-profile`: Endpoint to retrieve the profile of the logged-in user.
    - `GET /api/users/logout`: Endpoint to log out the logged-in user.
- **Map Routes**:
    - `GET /api/map/get-coordinates`: Endpoint to retrieve coordinates for a given address.

### Middleware

- **verifyJWTCaptain**: Middleware to verify the JWT token for captains, ensuring they are authenticated.
- **verifyJwtUser**: Middleware to verify the JWT token for users, ensuring they are authenticated.

### Usage

To use the backend functionalities, import the necessary functions and integrate them into the routes to handle user and captain-related operations effectively.

## Frontend

The frontend is built using React and Vite, providing an intuitive user interface for both users and captains to interact with the application.

### Dependencies

- **React**: A JavaScript library for building user interfaces.
- **React Router**: A library for handling routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **GSAP**: An animation library for creating smooth animations.

### Components

- **Start**: The landing page of the application.
- **UserLogin**: The login page for users.
- **CaptainLogin**: The login page for captains.
- **UserSignUp**: The registration page for users.
- **CaptainSignUp**: The registration page for captains.
- **UserHome**: The home page for users.
- **CaptainHome**: The home page for captains.
- **Riding**: The page displaying ride details.
- **Logout**: The component for logging out users and captains.
- **LocationsearchPanel**: The component for searching locations.
- **VehiclePanel**: The component for selecting a vehicle.
- **ConfirmRide**: The component for confirming a ride.
- **LookingForDriver**: The component for looking for a driver.
- **WaitingForDriver**: The component for waiting for a driver.
- **RidePopUp**: The component for displaying ride pop-up details.
- **ConfirmRidePopUp**: The component for confirming ride pop-up details.
- **CaptainDetails**: The component for displaying captain details.

### Context

- **UserContext**: Context for managing user data across the application.
- **CaptainContext**: Context for managing captain data across the application.

### Usage

To use the frontend components, import them and integrate them into the routes to handle user and captain-related operations seamlessly.

### Scripts

- `dev`: Starts the development server for the frontend.
- `build`: Builds the frontend application for production.
- `lint`: Runs ESLint to check for linting errors in the code.
- `preview`: Previews the production build of the application.

### Configuration

- **Vite**: Configuration settings for Vite.
- **Tailwind CSS**: Configuration settings for Tailwind CSS.
- **ESLint**: Configuration settings for ESLint.

### Environment Variables

- **VITE_BASE_URL**: The base URL for the backend API, used in API requests.

### Project Structure

- **Backend**: Contains all the backend code and related files.
- **Frontend**: Contains all the frontend code and related files.

### Getting Started

To get started with the project, follow these steps:

1. Clone the repository from GitHub.
2. Install dependencies for both the frontend and backend.
3. Set up the necessary environment variables.
4. Start the development server.

```bash
# Clone the repository
git clone https://github.com/your-repo/uber-clone.git

# Navigate to the backend directory
cd Backend

# Install backend dependencies
npm install

# Navigate to the frontend directory
cd ../Frontend

# Install frontend dependencies
npm install

# Start the development server
npm run dev
```

### License

This project is licensed under the MIT License. See the LICENSE file for more details.