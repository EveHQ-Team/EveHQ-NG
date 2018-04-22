# UC001. Application Startup

When application starts up we need to choose which screen should be shown to the user first as well as prepare environment.

## Pre-conditions

- NONE

## Post-conditions

- The user data saved in the permanent store.
- The authenticated user set in the session store.
- The selected meta-game profile set as the current in the session store.
- The current character from the current profile set in the session store.

## Normal scenario

1. SUD checks is the application user already created.
2. The user is created.
3. SUD checks is the user authenticated.
4. The user isn't authenticated. SUD calls the [UC002. User Login](user-login.use-case.md).
5. The user successfully authenticated. SUD sets the authenticated user in the session store.
6. SUD checks is the current profile selected.
7. The current profile isn't selected. SUD calls the [UC008. Select user profile](select-user-profilie.use-case.md).
8. The user successfully selected the current profile. SUD sets the selected profile as the current in the session store.
9. SUD checks if the current profile has any characters.
10. Profile has added characters.
11. SUD selects the current character and sets it as the current in the session store.
12. SUD clears the navigation history.
13. SUD opens the Character dashboard screen.
14. The use case ends.

## Alternative scenarios

### A2.1. The user isn't created.

1. SUD calls the [UC003. Create the Application User](create-user.use-case.md).
2. The user successfully created and returned from the called use case. SUD stores the created user in the permanent store.
3. The use case continues from the step 3.

### A4.1. The user is authenticated.

1. The use case continues from the step 6.

### A7.1. The current profile selected.

1. The use case continues from the step 9.

### A10.1. The profile has no added characters.

1. SUD calls the [UC004. Manage profile characters](manage-profile-characters.use-case.md).
2. The user successfully added some characters.
3. The use case continues from the step 11.

## Open questions

- Specify the way of selecting the current character on the step 11.