# TechBytes

This is a blog application built with React, TypeScript, Zustand, and Firebase. Users can browse and read posts, while admins have the ability to update, create, and delete posts.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshot](#screenshot)

## Features

- **User**:
  - Browse and read posts
- **Admin**:
  - Create new posts
  - Update existing posts
  - Delete posts

## Tech Stack

- **Frontend**:
  - React
  - TypeScript
  - Zustand (state management)
- **Backend**:
  - Firebase (Firestore, Authentication)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aviorkahalani/techbytes/

   cd techbytes
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up Firebase:

   - Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
   - Add a web app to your Firebase project and copy the Firebase config.
   - Create a `.env` file in the root directory of your project and add your Firebase configuration:

     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. Start the development server:

   ```bash
   npm start
   ```

## Screenshot

![blog](https://res.cloudinary.com/avior-projects/image/upload/v1716393655/896a0118-fc78-4e66-ada3-bfa31005f97c.png)
