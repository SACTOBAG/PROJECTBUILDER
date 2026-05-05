import serverless from 'serverless-http';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

let app;

async function loadSecrets() {
  // In offline/local mode, dotenv handles env vars
  if (process.env.IS_OFFLINE === 'true') return;

  const client = new SecretsManagerClient({ region: process.env.AWS_REGION || 'us-east-1' });
  const secretName = process.env.SECRET_NAME || 'brewmaster/api/prod';

  try {
    const response = await client.send(
      new GetSecretValueCommand({ SecretId: secretName })
    );
    const secrets = JSON.parse(response.SecretString);
    process.env.SUPABASE_URL = secrets.SUPABASE_URL;
    process.env.SUPABASE_SERVICE_ROLE_KEY = secrets.SUPABASE_SERVICE_ROLE_KEY;
  } catch (err) {
    console.error('Failed to load secrets:', err.message);
    throw err;
  }
}

async function getApp() {
  if (!app) {
    await loadSecrets();
    // Dynamic import so env vars are set before Express app initializes
    const mod = await import('./src/index.js');
    app = mod.app;
  }
  return app;
}

export const handler = async (event, context) => {
  const expressApp = await getApp();
  const wrappedHandler = serverless(expressApp);
  return wrappedHandler(event, context);
};
