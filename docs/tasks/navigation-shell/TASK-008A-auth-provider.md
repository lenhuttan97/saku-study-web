# TASK-008A: Auth Provider Integration

## Status
done

## Parent Task
- **TASK-008**: [Auth Guard & Route Protection](./TASK-008-auth-guard.md)

## Feature
- **FT-008**: [Navigation Shell](../features/navigation-shell/index.md)

## Description
Integrate AuthProvider with Layout and protected routes.

## Scope
- [x] Wrap App with AuthProvider
- [x] Add auth state check in App.tsx
- [x] Add redirect to /login if not authenticated
- [x] Persist auth state across page refresh

## Out of Scope (handled by TASK-005C)
- [ ] Add setup status check
- [ ] Add redirect to /setup if setup not completed
- [ ] Redirect to dashboard after setup completion

## Dependencies
- Firebase Auth
- AuthProvider (TASK-001D)

## Estimated Effort
1 hour
