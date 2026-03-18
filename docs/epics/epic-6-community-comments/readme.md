# Epic 6: Community & Comments

## Overview
Enable community engagement through video comments and discussions.

## Timeline
**Phase:** Phase 3-4 (June - August 2026)

## Description
This epic builds a vibrant learning community by enabling students to discuss course content, ask questions, and engage with peers through threaded comments with reactions and mentions.

## User Stories

### Post Comments
- [ ] **US-6.1:** As a student, I can post comments on videos
- [ ] **US-6.2:** As a student, I can edit my own comments
- [ ] **US-6.3:** As a student, I can delete my own comments
- [ ] **US-6.4:** As a student, I can see my comment creation timestamp

### Comment Threading
- [ ] **US-6.5:** As a student, I can reply to existing comments
- [ ] **US-6.6:** As a student, I can view comment threads with nested replies
- [ ] **US-6.7:** As a student, I can understand comment hierarchy
- [ ] **US-6.8:** As a student, I can collapse/expand comment threads

### Comment Reactions
- [ ] **US-6.9:** As a student, I can like comments
- [ ] **US-6.10:** As a student, I can dislike comments
- [ ] **US-6.11:** As a student, I can see like/dislike counts
- [ ] **US-6.12:** As a student, I can remove my reactions

### User Mentions
- [ ] **US-6.13:** As a student, I can tag other users in comments using @mentions
- [ ] **US-6.14:** As a tagged user, I receive notification of being mentioned
- [ ] **US-6.15:** As a student, I can search for mentions of my username
- [ ] **US-6.16:** As a student, I can see all users who mentioned me

### Moderation
- [ ] **US-6.17:** As a moderator, I can delete inappropriate comments
- [ ] **US-6.18:** As a moderator, I can flag comments for review
- [ ] **US-6.19:** As a moderator, I can bulk manage comments
- [ ] **US-6.20:** As an admin, I can set comment moderation policies

### Discovery & Search
- [ ] **US-6.21:** As a student, I can search comments for keywords
- [ ] **US-6.22:** As a student, I can sort comments by newest/popular
- [ ] **US-6.23:** As a student, I can filter comments by author
- [ ] **US-6.24:** As a student, I can view most liked/discussed videos

## Features

### Comment System
- ✅ Comment model with content and video association
- ✅ Comment creation and modification tracking
- ✅ Author information and tracking
- ✅ Comment deletion capability

### Threading
- ✅ Comment threading (parent-child relationships)
- ✅ Recursive comment structure
- ✅ Reply count tracking
- ✅ Thread preservation on comment deletion

### Reactions
- ✅ Like/dislike functionality
- ✅ CommentReactions model for extensible reactions
- ✅ Reaction count aggregation
- ✅ Unique reactions per user

### User Mentions
- ✅ CommentTag model for user mentions
- ✅ @ mention syntax support
- ✅ User tag tracking
- ✅ Notification system integration

### Moderation
- ✅ Comment deletion by moderators
- ✅ Author deletion of own comments
- ✅ Comment flagging system
- ✅ Moderation audit trail

## Technical Details
**Related Prisma Models:**
- `Comment` - Comment entity with threading
- `CommentTag` - User mentions in comments
- `CommentReactions` - Comment reactions (likes, dislikes)
- `User` - Comment authors and tagged users
- `Video` - Comments belong to videos

**Relationships:**
- Comment self-reference for threading
- Multi-user comment reactions
- Multiple tags per comment

## Acceptance Criteria
- [ ] Comments are properly stored and retrievable
- [ ] Comment threading is maintained correctly
- [ ] Reactions are accurately counted
- [ ] User mentions are detected and stored
- [ ] Moderation actions don't break comment threads
- [ ] Notification system alerts mentioned users
- [ ] Comment search is performant
- [ ] Reactions are unique per user per comment