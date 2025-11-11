# Dating App Admin CMS

Full-featured React admin dashboard for managing the dating/matrimonial web app.

## Features

- **User Management**: View, edit, block/unblock, and delete users
- **Content Moderation**: Review user profiles and moderate content
- **Analytics Dashboard**: Comprehensive statistics and charts
- **Reports Management**: Handle user reports and complaints
- **Messages Viewer**: View all conversations between users
- **Matches Overview**: Monitor all matches in the system
- **Blocked Users**: Manage blocked users list

## Tech Stack

- React 18 with React Router
- Material-UI components and icons
- Recharts for data visualization
- Date-fns for date formatting
- Protected routes with authentication

## Installation

```bash
npm install
```

## Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the API URL in `.env`:
```
REACT_APP_API_URL=https://datingapp.m17h4n.workers.dev/api
```

## Running the App

```bash
npm start
```

The app will be available at http://localhost:3000

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**Important**: Change these credentials in production!

## Pages

### Dashboard
Overview with key statistics:
- Total Users
- Total Matches
- Total Messages
- Total Swipes
- Recent activity metrics

### Users
Complete user management interface:
- View all registered users
- Search and filter users
- View detailed user profiles
- Block/unblock users
- Delete users (with cascade delete of related data)

### Messages
Chat viewer with conversation list:
- View all conversations
- Search conversations
- Read message history between users
- Monitor chat activity

### Matches
All matches between users:
- View match pairs
- See when matches were created
- Monitor matching activity

### Reports
User reports management system:
- View all user reports
- Update report status (pending, reviewed, resolved, dismissed)
- Take action on reported users

### Analytics
Charts and detailed statistics:
- Bar charts for user activity
- Pie charts for gender distribution
- Detailed breakdowns by category

### Blocked Users
View and manage blocked users:
- List all blocked users
- Unblock users with one click
- Monitor blocked user count

## API Integration

The CMS connects to the Cloudflare Workers API backend with D1 database. All endpoints are prefixed with `/api/admin/`.

### Available API Endpoints

- `POST /api/admin/login` - Admin authentication
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id` - Get user details
- `POST /api/admin/users/:id/block` - Block/unblock user
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/matches` - Get all matches
- `GET /api/admin/messages` - Get all messages
- `GET /api/admin/messages/:id1/:id2` - Get conversation
- `GET /api/admin/reports` - Get all reports
- `PUT /api/admin/reports/:id` - Update report status
- `GET /api/admin/swipes` - Get all swipes

## Building for Production

```bash
npm run build
```

The build will be created in the `build/` directory.

## Deployment

The CMS can be deployed to any static hosting service:

- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Make sure to set the `REACT_APP_API_URL` environment variable in your hosting provider's settings.

## Security Notes

1. **Change default admin credentials** in production
2. Implement proper JWT-based authentication
3. Add role-based access control (RBAC)
4. Use HTTPS only
5. Implement rate limiting on admin endpoints
6. Add audit logging for admin actions

## License

MIT
