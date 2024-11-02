# Team-9

## Getting Started

Follow these instructions to set up and run the project on your local machine for development and testing purposes.


# About our Project
For our project, we've decided to work with Opportunity International. For our tech stack we used: Node.js, Firebase, and the Google Gemini API. 
We utilized a Gemini API in order to utilize AI to help the teachers create the necessary resources to teach a class better.


#Our Problem Statement
- Improving school culture, school management and teaching and learning
- Upgrading teaching practices to improve student performance
- Enhancing school management practices to make the most of scarce resources


## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: npm is the package manager for Node.js. It is installed with Node.js, but you can update it with the following command:
- Please install the following modules
  


## Installation

Clone the Repository:

` git clone https://github.com/your-username/cfgcolumbus24/Team-9.git`

`cd adaptED`

## Install Dependencies:

`npm install`

`npm install firebase`

  `npm install dotenv` (make sure to keep all API keys secure inside the dotenv file)

## Environment Variables

Create a .env file in the root directory of your project and add the following:

`VITE_GEMINI_KEY=your-google-api-key`
`VITE_FIREBASE_KEY=your-firebase-api-key`

Replace your-google-api-key with your actual Google Generative AI API key.

Replace your-firebase-api-key with your actual Firebase API key.

## Running the Project

Start the Development Server:

`npm run dev` (the console will let you know which server your code will be running on ex:localhost:5173

Open Your Browser:

localhost:5173
