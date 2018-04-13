# UC002. User Login

If the application user decided to restrict access to his application data he can require to authenticate user on the application startup. In this use case the user authenticate himself to the application using password.

## Pre-conditions

* The application user is created.
* The user is not authenticated yet.
* The user authentication is required.

## Normal scenario

1. The application opens the Login screen with the application user name and a field to input the password.
2. User enters the password.
3. SUD verifies the password.
4. Password is correct. SUD starts the [UC001. Application Startup use case](application-startup.use-case.md).
5. The use case ends.

## Alternative scenarios

A4.1. The password entered isn't correct.

1. SUD displays an error message.
2. The use case continues from the step 2.