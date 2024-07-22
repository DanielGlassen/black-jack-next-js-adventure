# Blackjack Buster: A Next.js Adventure 🚀

<br/>
<p align="center">
    <img src="https://raw.githubusercontent.com/ArmanAryanpour/blackjack/main/public/logo.png" alt="Logo" width="160" height="80">
</p>


- **Firebase Authentication**: Set up user signup and login features easily
- **State Management**: Utilizes React's Context API for state management
- **Prettier Integration**: Format code effortlessly with `npm run format`
- **Jest Testing**: Includes Jest for unit and integration testing
- **Node.js 18**: Requires Node.js version 18 or higher
- **Firebase Realtime Database**: Easily integrate Firebase Realtime Database for data storage

## 🎯 Usage

### 💻 Project Setup

1. Clone the repo, open it in your code editor, and install dependencies with `npm install`.
2. Create a `.env.local` file in the root directory and add:

    ```env
    NEXT_PUBLIC_Firebase_API_Key=YOUR_API_KEY
    NEXT_PUBLIC_Auth_Domain=YOUR_AUTH_DOMAIN
    NEXT_PUBLIC_Project_Id=YOUR_PROJECT_ID
    NEXT_PUBLIC_Storage_Bucket=YOUR_STORAGE_BUCKET
    NEXT_PUBLIC_Message_Sender_Id=YOUR_MESSAGE_SENDER_ID
    NEXT_PUBLIC_App_Id=YOUR_APP_ID
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
    ```
3. Create a Firebase project and set up a web app within it to obtain API keys and authentication settings.
   
4. Save these configuration keys securely for future use.

### 🏗 Firebase Setup

1. Create a Firebase project and add a web app to obtain API keys and configuration.
2. Enable `Email/Password` authentication in Firebase Authentication.
3. Make RealTime Database and add database configurations.

4. Click on Authentication from the left sidebar, go to `Sign-in method`, and enable `Email/Password`.

5. Add Firebase Database Rules. For security and data integrity, we've configured Firebase Realtime Database rules as follows:

    ```json
    {
      "rules": {
        ".read": true,
        ".write": true,
        "balance": {
          ".read": true,
          ".write": true,
          "$uid": {
            ".write": "auth.uid === $uid"
          }
        }
      }
    }
    ```

## 🚀 Future Work

- **Stripe Payments** 💳: Integrate Stripe for handling payments and transactions.
- **Dynamic UI Animations** 🎨: Enhance the user experience with interactive and dynamic animations.
- **Microservices Architecture** 🏗️: Refactor the application to utilize a microservices architecture for better scalability and maintainability.
- **Improved Testing** 🔍: Expand test coverage and include more end-to-end testing scenarios.
- **Enhanced Security Features** 🔐: Implement additional security measures to protect user data and ensure a secure environment.

Feel free to contribute or suggest more features! 🎉
