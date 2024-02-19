import express  from 'express';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import connectToMongo from './config/db.js';
import cors from "cors"

import router from './routes/router.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectToMongo().catch((error) => {
  console.error('Could not connect to MongoDB:', error.message);
  process.exit(1);
});

const SCOPES = ['https://www.googleapis.com/auth/fitness.activity.read'];

// Credentials come from Google Cloud Console and are read from server/.env
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/oauth2callback';


// Create an OAuth 2.0 client with the given credentials
const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

app.use(cors())
app.use(express.json());
app.use("/api/v1/", router)


app.get('/', (req, res) => {
  // Generate the URL for the consent screen
  // const authUrl = oAuth2Client.generateAuthUrl({
  //   access_type: 'offline',
  //   scope: SCOPES,
  // });

  // res.redirect(authUrl);
  res.send("API working")
});

// app.get('/oauth2callback', async (req, res) => {
//   const code = req.query.code;

//   try {
//     // Get the access token using the authorization code
//     const { tokens } = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(tokens);

//     // Create a fitness API instance
//     const fitness = google.fitness({ version: 'v1', auth: oAuth2Client });

//     const endTimeMillis = Date.now();
//     const startTimeMillis = endTimeMillis - 7 * 24 * 60 * 60 * 1000; // Fetch data for the last 7 days

//     const response = await fitness.users.dataset.aggregate({
//         userId: 'me',
//         requestBody: {
//           aggregateBy: [
//             { dataTypeName: 'com.google.step_count.delta' },
//             { dataTypeName: 'com.google.calories.expended' },
//             // Add more data types as needed
//           ],
//           bucketByTime: { durationMillis: 86400000 }, // 1 day interval
//           startTimeMillis: startTimeMillis.toString(),
//           endTimeMillis: endTimeMillis.toString(),
//         },
//       });
  
//       console.log('Aggregated Fitness Data:', response.data);

//     // You can perform other operations as needed based on the Google Fit API documentation
//     // For example, fetching user's fitness data, activities, etc.

//     res.send('Google Fit data fetched. Check console for details.');
//   } catch (error) {
//     console.error('Error retrieving Google Fit data:', error.message);
//     res.status(500).send('Internal Server Error');
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});