# Epic 5: Course Registration & Progress Tracking

## Overview
Enable students to register for courses and track their learning progress comprehensively.

## Timeline
**Phase:** Phase 2-3 (April - June 2026)

## Description
This epic provides a complete learning journey tracking system allowing students to enroll in courses, monitor their progress through lessons and videos, and view detailed completion statistics.

## User Stories

### Course Enrollment
- [ ] **US-5.1:** As a student, I can register for available courses
- [ ] **US-5.2:** As a student, I can view my enrolled courses
- [ ] **US-5.3:** As a student, I can unregister from courses
- [ ] **US-5.4:** As a student, I can see when I enrolled in a course

### Course Progress
- [ ] **US-5.5:** As a student, I can see overall course completion percentage
- [ ] **US-5.6:** As a student, I can view course progress timeline
- [ ] **US-5.7:** As a student, I can see completion date for completed courses
- [ ] **US-5.8:** As an instructor, I can view student enrollment numbers

### Lesson Progress
- [ ] **US-5.9:** As a student, I can track my progress through lessons
- [ ] **US-5.10:** As a student, I can mark lessons as complete
- [ ] **US-5.11:** As a student, I can see which lessons I've completed
- [ ] **US-5.12:** As a student, I can access my lesson completion history

### Video Progress
- [ ] **US-5.13:** As a student, I can track my progress through individual videos
- [ ] **US-5.14:** As a student, I can see how many seconds I've watched in a video
- [ ] **US-5.15:** As a student, I can resume videos from where I left off
- [ ] **US-5.16:** As a student, I can see video completion status
- [ ] **US-5.17:** As a student, I can view my watch history with timestamps

### Analytics & Reporting
- [ ] **US-5.18:** As an instructor, I can view student progress reports
- [ ] **US-5.19:** As an instructor, I can export progress data
- [ ] **US-5.20:** As an instructor, I can identify at-risk students
- [ ] **US-5.21:** As a student, I can download my learning transcript

## Features

### Course Registration
- ✅ CourseRegistration model for enrollment tracking
- ✅ Enrollment date tracking
- ✅ Completion status and timestamps
- ✅ Multiple course enrollment support

### Lesson Progress Tracking
- ✅ UserLessonProgress model
- ✅ Lesson completion status
- ✅ Completion timestamp recording
- ✅ Per-student, per-lesson tracking

### Video Progress Tracking
- ✅ UserVideoProgress model with detailed metrics
- ✅ Watch time tracking (watched seconds)
- ✅ Video duration storage
- ✅ Last watched timestamp
- ✅ Completion status per video
- ✅ Resume functionality support

### Analytics
- ✅ Progress aggregation and calculation
- ✅ Completion rate metrics
- ✅ Time-based analytics
- ✅ Student performance insights

## Technical Details
**Related Prisma Models:**
- `CourseRegistration` - Student course enrollments
- `UserLessonProgress` - Lesson completion tracking
- `UserVideoProgress` - Video watching progress
- `User`, `Course`, `Lesson`, `Video` - Related entities

**Relationships:**
- One student can register for many courses
- One course can have many registrations
- One lesson completion per student-lesson pair
- One video progress record per student-video pair

## Acceptance Criteria
- [ ] Students can register for courses successfully
- [ ] Course registration prevents duplicates
- [ ] Progress is updated in real-time during video playback
- [ ] Completion dates are recorded accurately
- [ ] Watch time is tracked and resumable
- [ ] Progress aggregation is accurate
- [ ] Analytics queries are performant
- [ ] Progress data is secure and user-specific