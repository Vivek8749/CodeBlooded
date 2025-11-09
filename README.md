# CodeBlooded - Riden'Byte 🚗🍔

## Overview
Riden'Byte is a web app designed to help students coordinate shared rides and food orders, reducing costs and minimizing waste. With a focus on simplicity and efficiency, this platform allows users to find or create shared rides and food orders to the same destinations or restaurants. Key features include group chat, payment splitting, live tracking, and verified profiles.

## Features

- **User Dashboard**: After logging in, users are directed to a dashboard with two main sections— *Rides* and *Food Orders*.
- **Ride & Food Sharing**: Users can search for available shared rides and food orders or create their own.
- **Global Chat**: Each shared ride/food order has its own group chat to keep users connected and informed.
- **Real-Time Ride Tracking**: Live tracking for rides, so users know when to expect their ride.
- **Payment Splitting**: Automatically split the cost among participants in a shared ride or food order.
- **Review System**: After completing a ride or food order, users can leave reviews for feedback.
- **Light & Dark Mode**: A seamless experience with different themes for user comfort.

## Tech Stack

- **Frontend**: React.js / HTML5 / CSS3 (For dynamic, user-friendly UI and animations)
- **Backend**: Node.js / Express.js
- **Database**: MongoDB (For storing user profiles, ride and food data)
- **Payment Gateway**: Stripe or PayPal (For secure payment processing)
- **Authentication**: Firebase or JWT (For secure login)
- **Real-Time Features**: Socket.IO (For live chat and updates)
- **Geolocation**: Google Maps API (For ride tracking and location-based services)

## Pages & Components

### 1. **Get Started Page**
- A visually engaging page featuring parallax animations and minimalistic design to introduce users to the platform.

### 2. **Login Page**
- Secure authentication page that allows users to log in and access their dashboard.

### 3. **Dashboard**
- Upon successful login, users are greeted with a dashboard containing two sections:
  - **Rides**: To browse or create shared rides.
  - **Food Orders**: To browse or create shared food orders.

### 4. **Search Page**
- Users can search for shared rides or food orders by location or restaurant name. Filters and suggestions help users find the best options quickly.

### 5. **Ride/Order Detail Page**
- After selecting a ride or food order, users can view real-time details, including live tracking (for rides) and group chat functionality for communication.

### 6. **Payment Page**
- After the ride or food order is completed, users are directed to a payment gateway to split the cost among participants.

### 7. **Thank You & Review Page**
- After payment, users are directed to a page thanking them for using the platform, with an option to leave a review.

## Color Palette

### **Dark Mode:**
- **Base**: #020402 (Deep Black-Green)
- **Accents**: #758173 (Muted Olive), #A9C5A0 (Soft Sage)

### **Light Mode:**
- **Base**: #C5EFCB (Light Green), #C6DEC6 (Pale Mint)
- **Text**: #758173 (Muted Olive)

## How to Use

1. **Create an Account**: Sign up and log in to access your dashboard.
2. **Search or Create**: Search for shared rides or food orders, or create a new one.
3. **Join or Share**: Join an existing shared ride/food order or share your own.
4. **Communicate**: Use the group chat to stay in touch with other participants.
5. **Track and Split**: Track your ride or food order in real-time and split the payment with others.
6. **Leave Feedback**: Once completed, leave a review for the experience.

## Future Enhancements

- **Mobile App**: Develop a mobile version of the platform for easier access on the go.
- **Verified Profiles**: Implement profile verification to enhance trust and security.
- **Enhanced Search Filters**: Improve search functionality with more advanced filters (e.g., ride type, food category).

## Contributing

Contributions are welcome! Feel free to fork this repository, submit issues, and make pull requests to help improve the platform.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

