# UC008. Select user profile

The user can have a few meta-game profiles but at least one which created during the user creation. In this use case the user selects the current profile if he has a few of them. If there is the only one profile SUD selects it as the current.

## Pre-conditions

- The application user is created.
- The user is authenticated.

## Post-conditions

- The current profile selected.

## Normal scenario

1. SUD checks if the user has multiply profiles.
2. The user has multiply profiles.
3. SUD opens the Select user profile screen.
4. The user selects the current profile.
5. The use case returns the selected profile as the result. The use case ends.

## Alternative scenarios

### A2.1. The user has single profile.

1. SUD uses the single profile as selected.
2. The use case continues from the step 5.