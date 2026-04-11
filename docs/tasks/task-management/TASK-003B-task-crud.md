# TASK-003B: Task CRUD Operations

## Status
done

## Parent Task
- **TASK-003**: [Task Management Backend](./TASK-003-task-management.md)

## Feature
- **FT-003**: [Task Management](../features/task-management/index.md)

## Description
Implement task CRUD operations in Firestore.

## Scope
- [x] Create task service
- [x] Implement createTask function
- [x] Implement getTasks function
- [x] Implement updateTask function
- [x] Implement updateTaskStatus function
- [x] Implement deleteTask function
- [x] Connect Tasks page to service
- [x] Add real-time listener for tasks

## Dependencies
- Task interface (from TASK-003A)
- Firebase Firestore

## Estimated Effort
1.5 hours

## Implementation Notes
- Enhanced taskService with updateTaskStatus function
- Added real-time listeners for tasks
- Updated Tasks page to use actual service instead of mock data
- Updated KanbanColumn and TaskCard components to support drag-and-drop for status changes
- Updated useTasks hook to include real-time updates