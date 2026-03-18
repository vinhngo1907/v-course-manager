# Epic 2: Course & Lesson Management

## Overview
Enable instructors to create, publish, and organize courses with lessons.

## Timeline
**Phase:** Phase 1-2 (March - May 2026)

## Description
This epic enables content creators to build and manage complete courses organized into lessons with proper categorization and publication workflows.

## User Stories

### Course Creation
- [ ] **US-2.1:** As an instructor, I can create a new course with title and description
- [ ] **US-2.2:** As an instructor, I can upload course thumbnail image
- [ ] **US-2.3:** As an instructor, I can update course information
- [ ] **US-2.4:** As an instructor, I can delete my own courses

### Course Organization
- [ ] **US-2.5:** As an instructor, I can categorize courses
- [ ] **US-2.6:** As an instructor, I can browse available categories
- [ ] **US-2.7:** As a student, I can filter courses by category

### Lesson Management
- [ ] **US-2.8:** As an instructor, I can organize lessons within a course
- [ ] **US-2.9:** As an instructor, I can add lesson descriptions and metadata
- [ ] **US-2.10:** As an instructor, I can reorder lessons within a course
- [ ] **US-2.11:** As an instructor, I can delete lessons from courses

### Publication Workflow
- [ ] **US-2.12:** As an instructor, I can publish/unpublish courses
- [ ] **US-2.13:** As an instructor, I can publish/unpublish lessons
- [ ] **US-2.14:** As a student, I can only see published courses

### Discovery
- [ ] **US-2.15:** As a student, I can browse and view published courses
- [ ] **US-2.16:** As a student, I can search for courses
- [ ] **US-2.17:** As a student, I can view course details before enrolling

## Features

### Course Management
- ✅ Course CRUD operations (Create, Read, Update, Delete)
- ✅ Course metadata (title, description, thumbnail)
- ✅ Course creator tracking (createdBy field)
- ✅ Publication status tracking
- ✅ Course categorization

### Lesson Management
- ✅ Lesson CRUD operations
- ✅ Lesson ordering within courses
- ✅ Lesson metadata (name, description)
- ✅ Lesson publication status

### Category System
- ✅ Category creation and management
- ✅ Category assignment to courses
- ✅ Unique category names

## Technical Details
**Related Prisma Models:**
- `Course` - Course entity with metadata
- `Lesson` - Lesson within courses
- `Category` - Course categorization

## Acceptance Criteria
- [ ] Instructors can create courses with all required fields
- [ ] Course thumbnails are properly stored and accessible
- [ ] Courses are properly categorized
- [ ] Only published courses are visible to students
- [ ] Course creators can modify their courses
- [ ] Lesson order is preserved and editable
- [ ] Categories are unique and manageable