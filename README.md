# EduCase - React Authentication App

EduCase is a modern authentication application built with React, TypeScript, and Vite. It provides a clean and responsive user interface for user registration, login, and profile management.

## Features

- **User Authentication**: Complete signup and login functionality
- **Profile Management**: View and edit user profile information
- **Responsive Design**: Mobile-friendly interface using Tailwind CSS
- **Form Validation**: Client-side validation for all input fields
- **Persistent Sessions**: Local storage-based authentication persistence

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) (Build tool)
- [React Router v7](https://reactrouter.com/) (Page routing)
- [Tailwind CSS v4](https://tailwindcss.com/) (Styling)
- [Lucide React](https://lucide.dev/) (Icons)
- [ESLint](https://eslint.org/) (Code quality)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd educase

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`
   You should see the EduCase application running.



## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality
- `npm test` - Run the test suite


## Authentication Flow

- **Registration**: Users can create an account with their personal details
- **Login**: Existing users can log in with their email and password
- **Profile**: After successful authentication, users are redirected to their profile page
- **Session Management**: Authentication state is persisted in local storage

## Form Validation

The application includes comprehensive client-side validation for all forms:

- Email format validation
- Password strength requirements
- Phone number format validation
- Required field validation