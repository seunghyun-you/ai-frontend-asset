### Quick Start

Run in terminal this command:

```bash
npm install
```

Then run this command to start your local server

```bash
npm start
```

### Deploy Server (prod)

Run in terminal this command:

```bash
npm run build
```

Then run this command to start your local server

```bash
cp -rf ./build /usr/share/nginx/html/
systemctl restart nginx
```