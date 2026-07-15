import axios from 'axios';

// Function to get bearer token
export async function getBearerToken(): Promise<string> {
    const tokenEndpoint = 'https://login.salesforce.com/services/oauth2/token';
    const clientId = process.env.SF_CLIENT_ID;
    const clientSecret = process.env.SF_CLIENT_SECRET;
    const username = process.env.SF_USERNAME;
    const password = process.env.SF_PASSWORD;

    if (!clientId || !clientSecret || !username || !password) {
        throw new Error('Missing required Salesforce OAuth credentials in environment variables. Set SF_CLIENT_ID, SF_CLIENT_SECRET, SF_USERNAME, and SF_PASSWORD.');
    }

    const payload = new URLSearchParams({
        grant_type: 'password',
        client_id: clientId,
        client_secret: clientSecret,
        username,
        password
    });

    try {
        const response = await axios.post(tokenEndpoint, payload.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        // Extract the bearer token from the response
        const bearerToken = response.data.access_token;
        //console.log('Bearer Token:', bearerToken);

        return bearerToken;
    } catch (error) {
        console.error('Error fetching bearer token:', error);
        throw error;
    }
    
}

