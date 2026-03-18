# Epic 1: User & Authentication Management

## Overview
Establish core user accounts, authentication, and role-based access control system.

## Timeline
**Phase:** Phase 1 (Current - March 2026)

## Description
This epic focuses on building the foundation of user management with secure authentication and role-based access control, enabling different user types (Admin, Moderator, Supporter) to have appropriate permissions.

## User Stories

### Authentication
- [ ] **US-1.1:** As a user, I can create an account with username and password
- [ ] **US-1.2:** As a user, I can log in securely to access my courses
- [ ] **US-1.3:** As a user, I can reset my password securely

### Profile Management
- [ ] **US-1.4:** As a user, I can manage my profile (email, full name, avatar)
- [ ] **US-1.5:** As a user, I can view and update my avatar image
- [ ] **US-1.6:** As a user, I can view my profile information

### Role-Based Access
- [ ] **US-1.7:** As an admin, I can assign roles (Admin, Mod, Supporter) to users
- [ ] **US-1.8:** As an admin, I can revoke roles from users
- [ ] **US-1.9:** As a user, I can see what roles I have assigned

### Account Management
- [ ] **US-1.10:** As a moderator, I can activate/deactivate user accounts
- [ ] **US-1.11:** As an admin, I can view all user accounts and their status
- [ ] **US-1.12:** As a user, I can see if my account is activated

## Features

### Core Features
- ✅ User model with email, fullName, avatar
- ✅ Account model with username/password authentication
- ✅ Role-based access control (Admin, Mod, Supporter)
- ✅ Account activation/deactivation
- ✅ User profile management
- ✅ Role model with active status tracking

### Technical Details
**Related Prisma Models:**
- `User` - Core user entity
- `Account` - Authentication credentials
- `Role` - Role definitions
- `Admin` - Admin role assignment
- `Mod` - Moderator role assignment
- `Supporter` - Supporter role assignment

## Acceptance Criteria
- [ ] Users can register with unique username and email
- [ ] Passwords are securely hashed before storage
- [ ] Login returns valid authentication token
- [ ] Roles are correctly enforced in authorization
- [ ] Account activation status prevents login when inactive
- [ ] Users can update their profile information
- [ ] Admin can manage all user accounts and roles