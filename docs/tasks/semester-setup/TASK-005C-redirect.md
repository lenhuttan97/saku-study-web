# TASK-005C: Redirect Logic

## Status
in_progress

## Parent Task
- **TASK-005**: [Semester Setup Data Persistence](./TASK-005-semester-setup.md)

## Feature
- **FT-005**: [Semester Setup](../features/semester-setup/index.md)

## Description
Add redirect logic after setup completion.

## Scope
- [ ] Add setupCompleted flag to user profile in Firestore
- [ ] Check setup status on app load
- [ ] Add redirect to /setup if not completed
- [ ] Add redirect to / (dashboard) after completion
- [ ] Mark setup as complete in Firestore
- [ ] Add setup-completed check in AuthProvider
- [ ] Add skip/setup later option (optional)
- [ ] Add "Edit Setup" option in Settings

## Dependencies
- Firebase Firestore
- Firebase Auth (TASK-001)

## Estimated Effort
30 minutes
