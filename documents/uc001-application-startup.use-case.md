# UC001. Application Startup

When application starts up we need to choose which screen should be shown to the user first as well as prepare environment.

## Pre-conditions

- The application set up in operation system using the setup package.

## Post-conditions

- The user data saved in the permanent store.
- The authenticated user set in the session store.
- The selected meta-game profile set as the current in the session store.
- The current character from the current profile set in the session store.

## Normal scenario

0. SUD calls [UC009. Application installation](uc009-application-installation.md).
1. SUD checks is the application user already created.
2. The user is created.
3. SUD calls the [UC002. User Login](user-login.use-case.md).
4. The user successfully authenticated. SUD sets the authenticated user in the session store.
5. SUD calls the [UC008. Select user profile](select-user-profilie.use-case.md).
6. The user successfully selected the current profile. SUD sets the selected profile as the current in the session store.
7. SUD checks if the current profile has any characters.
8. Profile has added characters.
9. SUD selects the current character and sets it as the current in the session store.
10. SUD clears the navigation history.
11. SUD opens the Character dashboard screen.
12. The use case ends.

## Alternative scenarios

### A2.1. The user isn't created.

1. SUD calls the [UC003. Create the Application User](create-user.use-case.md).
2. The user successfully created and returned from the called use case. SUD stores the created user in the permanent store.
3. The use case continues from the step 3.

### A8.1. The profile has no added characters.

1. SUD calls the [UC004. Manage profile characters](manage-profile-characters.use-case.md).
2. The user successfully added some characters.
3. The use case continues from the step 9.

## Open questions

- Specify the way of selecting the current character on the step 9[[[[.