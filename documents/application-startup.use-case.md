# UC001. Application Startup

When application starts up we need to choose which screen should be shown to the user first as well as prepare environment.

## Normal scenario

1. Check if the application user is created already.
2. The user is created. Check is login for the user required and it isn't logged in.
3. Login isn't required or the user is already authenticated. Check if the user has multiply profiles.
4. User has a single profile. Select the profile as the current.
5. Check if the profile has added characters.
6. Profile has added characters. Select the current character in some way.
7. SUD clears the navigation history.
8. SUD opens the character dashboard screen.
9. The use case ends.

## Alternative scenarios

A2.1. The user isn't created.

1. Start [UC003. Create the Application User](create-user.use-case.md).
2. The use case ends.

A3.1. Login for the user is required.

1. Start [UC002. User Login](user-login.use-case.md).
2. The use case ends.

A4.1. User has multiply profiles.

1. Open the Select profile screen to let the user choose the meta-game profile.
2. The User choose some profile as the current profile.
3. The use case continues from the step 5.

A5.1. The profile has no added characters.

1. Start [UC004. Manage profile characters](manage-profile-characters.use-case.md).
2. The use case ends.