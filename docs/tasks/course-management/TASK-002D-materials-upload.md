# TASK-002D: Course Materials File Upload

## Status
done

## Parent Task
- **TASK-002**: [Course CRUD Operations](./TASK-002-course-crud.md)

## Feature
- **FT-002**: [Course Management](../features/course-management/index.md)

## Description
Implement file upload for course materials using Firebase Storage.

## Scope
- [x] Enable Firebase Storage in Firebase Console
- [x] Create storage service
- [x] Implement uploadFile function
- [x] Implement deleteFile function
- [x] Implement getFileUrl function
- [x] Add file upload UI to Materials tab
- [x] Add file list with download buttons
- [x] Add progress indicator during upload
- [x] Add file type/size validation

## Dependencies
- Firebase Storage
- Course interface (from TASK-002A)

## Estimated Effort
1.5 hours

## Implementation Notes
- Created storageService.ts with uploadFile, deleteFile, and getFileUrl functions
- Implemented MaterialsTab component with drag-and-drop file upload
- Integrated MaterialsTab with CourseDetail page
- Added file validation for type and size
- Connected file operations to Firestore course records