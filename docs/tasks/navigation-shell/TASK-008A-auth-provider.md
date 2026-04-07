# TASK-008A: Auth Provider Integration

## Status
pending

## Parent Task
- **TASK-008**: [Auth Guard & Route Protection](./TASK-008-auth-guard.md)

## Feature
- **FT-008**: [Navigation Shell](../features/navigation-shell/index.md)

## Description
Integrate AuthProvider with Layout and protected routes.

## Scope
- [ ] Wrap App with AuthProvider
- [ ] Add auth state check in App.tsx
- [ ] Add redirect to /login if not authenticated
- [ ] Add setup status check
- [ ] Add redirect to /setup if setup not completed
- [ ] Persist auth state across page refresh

## Dependencies
- Firebase Auth
- AuthProvider (TASK-001D)

## Estimated Effort
1 hour
