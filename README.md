# Team-9

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is the package manager for Node.js. It is installed with Node.js, but you can update it with the following command:
  `npm install -g npm`

## Installation

Clone the Repository:

` git clone https://github.com/your-username/lesson-plan-generator.git`

`cd lesson-plan-generator`

## Install Dependencies:

`npm install`

## Install Additional Packages:

Google Generative AI:
`npm install @google/generative-ai`

jsPDF:
`npm install jspdf`

## Environment Variables

Create a .env file in the root directory of your project and add the following:

`VITE_GEMINI_KEY=your-google-api-key`

Replace your-google-api-key with your actual Google Generative AI API key.

## Running the Project

Start the Development Server:

`npm run dev`

Open Your Browser:

Navigate to http://localhost:3000 (or the port specified in your terminal).
