# IP Logger

IP Logger is a simple web application built with Next.js and Firebase that logs IP addresses of visitors. This project serves as a basic demonstration of how to use Next.js and Firebase together to create a functioning web application.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.11.\* or higher)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/newQuery/firebase-nextjs-ip-logger.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd firebase-nextjs-ip-logger
   ```

3. **Create a Firebase project:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add project" and follow the prompts to create a new project.
   - Once your project is created, navigate to Project settings > General and locate your Firebase config object.

4. **Copy environment variables:**

   - Duplicate the `.env.example` file and rename it to `.env`.
   - Update the `.env` file with your Firebase project's configuration values.

5. **Update Firebase configuration:**

   - Open `config/firebase.ts` file.
   - Replace the dummy values with the actual values from your Firebase project's configuration.

6. **Install dependencies:**

   ```bash
   npm install
   ```

## Usage

To start the development server, run:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Deployment

For deployment, you can use platforms like Vercel, Netlify, or Firebase Hosting. Follow their respective documentation for deployment instructions.

## Contributing

Contributions are welcome! Feel free to submit pull requests or open issues if you encounter any problems or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Happy logging! 📝🌐
