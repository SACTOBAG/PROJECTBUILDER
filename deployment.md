# Brew Master — Deployment Guide

## Architecture

```
Browser → AWS Amplify (React SPA) → AWS API Gateway + Lambda (Express) → Supabase (Postgres)
```

## Resource IDs (fill in after deployment)

| Resource | Value |
|---|---|
| Amplify App URL | `https://main.d3ltomhjppu686.amplifyapp.com` |
| API Gateway URL | `https://7p3imgld3c.execute-api.us-east-1.amazonaws.com` |
| Lambda Function | `brewmaster-api-prod-api` |
| API Gateway ID | _(from `serverless info`)_ |
| Supabase Project | `racpxolokpixbbtklard` |
| AWS Region | `us-east-1` |
| Secrets Manager | `brewmaster/api/prod` |

## Deployment Commands

### Frontend (AWS Amplify)
Amplify auto-deploys on push to `main`. Manual redeploy via Amplify Console.

### Backend (Serverless Framework)
```bash
cd api
npm run deploy          # deploys Lambda + API Gateway
serverless info         # show endpoints and function names
serverless logs -f api  # tail Lambda logs
serverless rollback --timestamp <ts>  # rollback to previous version
```

### Amplify Environment Variables
Set these in Amplify Console → App settings → Environment variables:

| Variable | Value |
|---|---|
| `VITE_SUPABASE_URL` | `https://racpxolokpixbbtklard.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | _(your anon key)_ |
| `VITE_API_BASE` | `https://7p3imgld3c.execute-api.us-east-1.amazonaws.com` |

### AWS Secrets Manager
Store in secret `brewmaster/api/prod`:
```json
{
  "SUPABASE_URL": "https://racpxolokpixbbtklard.supabase.co",
  "SUPABASE_SERVICE_ROLE_KEY": "<your-service-role-key>"
}
```

Create command:
```bash
aws secretsmanager create-secret \
  --name brewmaster/api/prod \
  --secret-string '{"SUPABASE_URL":"https://racpxolokpixbbtklard.supabase.co","SUPABASE_SERVICE_ROLE_KEY":"YOUR_KEY_HERE"}'
```

## Rollback Procedures

- **Amplify**: Console → Deployments → Redeploy previous version
- **Lambda**: `serverless rollback --timestamp <YYYY-MM-DDTHH:MM:SS>`
- **Supabase**: Auto-backups daily; restore from Supabase Dashboard → Settings → Backups

## Monitoring

- **Lambda logs**: CloudWatch → Log groups → `/aws/lambda/brewmaster-api-prod-api`
- **Amplify build logs**: Amplify Console → Build history
- **Supabase**: Dashboard → Logs
