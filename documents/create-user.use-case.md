# UC003. Create the Application User

The application should have a user. For each OS user SUD can have only one application user. All character data linked to this user. As the first action SUD should let the user create the application user.

## Pre-conditions

* The application user is not created yet.

## Post-conditions

- The application user information and a list of his profiles returned to the caller. At least on profile should be present in the list.

## Normal scenario

1. SUD opens the Create the Application user screen. The screen contains fields to enter the user name and password as well as a profile list editor with a "Default profile" already added.
2. The user enters his name, e-mail address, password and edit profile list.
3. The user commands to create the application user. SUD verifies data entered by the user.
4. Data correct. SUD starts the [UC001. Application Startup use case](application-startup.use-case.md).

## Alternative scenarios

### A4.1. Some data entered by the user incorrect.

1. SUD displays error message about incorrect data.
2. The use case continues from the step 2.