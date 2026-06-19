# LinkGhosta Hostinger VPS Deployment

Target architecture:

- `https://linkghosta.com` and `https://www.linkghosta.com`: static Vite build served by Nginx.
- `https://api.linkghosta.com`: Nginx reverse proxy to the Express API on `127.0.0.1:5001`.
- PM2 manages the API process.
- MongoDB Atlas, Cloudinary, and Resend remain external managed services.

## 1. DNS

In Hostinger hPanel, point these A records to the VPS IPv4 address:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `VPS_IP` |
| A | `www` | `VPS_IP` |
| A | `api` | `VPS_IP` |

Remove conflicting A, AAAA, or CNAME records for the same names. Wait for DNS propagation before requesting certificates.

## 2. VPS baseline

Use Ubuntu 24.04 LTS. Log in as root once, create a deployment user, and enable the firewall:

```bash
apt update && apt upgrade -y
adduser deploy
usermod -aG sudo deploy
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

Add your SSH public key to `/home/deploy/.ssh/authorized_keys`, confirm a second SSH session works as `deploy`, then use that account for deployment.

## 3. Install runtime software

As `deploy`, install NVM and Node.js 22 LTS:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.2/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
nvm alias default 22
npm install -g pm2
```

Install Nginx, Git, and Certbot:

```bash
sudo apt install -y nginx git certbot python3-certbot-nginx
```

## 4. Upload the application

Clone the repository into the path expected by the supplied configuration:

```bash
sudo mkdir -p /var/www/linkghosta
sudo chown -R deploy:deploy /var/www/linkghosta
git clone YOUR_GIT_REPOSITORY_URL /var/www/linkghosta
cd /var/www/linkghosta
```

If the repository is private, use an SSH deploy key. Never upload local `.env` files through Git.

## 5. Configure production secrets

Create `/var/www/linkghosta/backend/.env`:

```env
NODE_ENV=production
HOST=127.0.0.1
PORT=5001
CLIENT_URL=https://linkghosta.com,https://www.linkghosta.com
MONGODB_URI=YOUR_MONGODB_ATLAS_URI
JWT_SECRET=GENERATE_A_LONG_RANDOM_SECRET
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=YOUR_VALUE
CLOUDINARY_API_KEY=YOUR_VALUE
CLOUDINARY_API_SECRET=YOUR_VALUE
RESEND_API_KEY=YOUR_VALUE
EMAIL_FROM=LinkGhosta <hello@linkghosta.com>
ADMIN_EMAIL=YOUR_ADMIN_EMAIL
INQUIRY_NOTIFICATION_EMAIL=YOUR_ADMIN_EMAIL
ADMIN_NAME=YOUR_ADMIN_NAME
ADMIN_PASSWORD=YOUR_INITIAL_STRONG_PASSWORD
```

Generate the JWT secret and protect the file:

```bash
openssl rand -hex 64
chmod 600 backend/.env
```

Create `/var/www/linkghosta/frontend/.env.production`:

```env
VITE_API_URL=https://api.linkghosta.com/api
VITE_APP_NAME=LinkGhosta
VITE_CALENDLY_URL=YOUR_CALENDLY_URL
```

In MongoDB Atlas, create a dedicated database user and allow the VPS public IP in Network Access. In Resend, verify `linkghosta.com` and use an address on that verified domain for `EMAIL_FROM`.

## 6. Install, build, and seed

```bash
cd /var/www/linkghosta
npm ci --omit=dev --prefix backend
npm ci --prefix frontend
npm audit --omit=dev --prefix backend
npm audit --omit=dev --prefix frontend
npm run build --prefix frontend
npm run seed:admin --prefix backend
```

After the first successful seed, remove `ADMIN_PASSWORD` from `backend/.env` and restart the API. The seeded password is stored hashed in MongoDB.

## 7. Start the API with PM2

```bash
cd /var/www/linkghosta
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup
```

Run the exact `sudo ... pm2 startup ...` command printed by PM2, then run `pm2 save` again.

## 8. Enable Nginx

```bash
sudo cp deploy/nginx-linkghosta.conf /etc/nginx/sites-available/linkghosta
sudo ln -s /etc/nginx/sites-available/linkghosta /etc/nginx/sites-enabled/linkghosta
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Verify HTTP before adding TLS:

```bash
curl -I http://linkghosta.com
curl http://api.linkghosta.com/api/health
```

## 9. Add HTTPS

After all three DNS names resolve to the VPS:

```bash
sudo certbot --nginx -d linkghosta.com -d www.linkghosta.com
sudo certbot --nginx -d api.linkghosta.com
sudo certbot renew --dry-run
```

Certbot updates Nginx and configures HTTPS redirects. Confirm:

```bash
curl -I https://linkghosta.com
curl https://api.linkghosta.com/api/health
```

## 10. Future deployments

Make the included deployment script executable once:

```bash
chmod +x /var/www/linkghosta/deploy/deploy.sh
```

For each release:

```bash
/var/www/linkghosta/deploy/deploy.sh
```

Check runtime health with:

```bash
pm2 list
pm2 logs linkghosta-api --lines 100
sudo nginx -t
sudo systemctl status nginx
```

Back up MongoDB separately, monitor `https://api.linkghosta.com/api/health`, keep Ubuntu packages updated, and rotate secrets immediately if they are ever exposed.
