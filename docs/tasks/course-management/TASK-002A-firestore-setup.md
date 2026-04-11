# TASK-002A: Firestore Setup & Course Type

## Status
done

## Parent Task
- **TASK-002**: [Course CRUD Operations](./TASK-002-course-crud.md)

## Feature
- **FT-002**: [Course Management](../features/course-management/index.md)

## Description
Set up Firestore and create Course type.

## Scope
- [x] Create Course interface/type in TypeScript
- [ ] Enable Firestore in Firebase Console *(manual environment step, not verified in this code change)*
- [x] Create courses collection schema (application-level document structure in service converter)
- [ ] Add Firestore indexes if needed *(requires Firebase Console/indexes check when running queries in real project data)*

## Verification Note
Manual Firebase Console operations were **not** performed as part of this commit. This task documents code-level setup only; Console setup/index verification should be completed in deployment environment.

## Dependencies
- Firebase Firestore

## Estimated Effort
30 minutes

## Implementation Details
- Updated `src/services/firebase/courseService.ts` with write operations:
  - `createCourse()`
  - `updateCourse()`
  - `deleteCourse()`
  - `deleteCourses()` (batch)
  - `fetchCoursesSorted()`
- Fixed `toFirestore` converter that was previously throwing an error
- All operations properly typed with TypeScript
