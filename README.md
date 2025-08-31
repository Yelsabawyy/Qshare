# Quiz App

A simple Quiz Application built with **Next.js 13**, **TypeScript**, and **Tailwind CSS**.  
Users can take quizzes and submit their answers via email to the quiz creator.

## Features

- Take quizzes and answer questions.
- Enter your email when taking the quiz.
- Sends the quiz answers and your email to the quiz creator.
- Responsive and simple UI.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/quiz-app.git
cd quiz-app
Install dependencies:

bash
Copy code
npm install
# or
yarn
Add environment variables in .env:

env
Copy code
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=yourapppassword
NEXT_PUBLIC_BASE_URL=http://localhost:3000
Start the development server:

bash
Copy code
npm run dev
# or
yarn dev
Open http://localhost:3000 and go to a quiz page.

Usage
Fill in your email and answer all questions.

Click Submit.

The quiz creator will receive your answers via email.