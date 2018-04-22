# UC002. User Login

If the application user decided to restrict access to his application data he can require to authenticate user on the application startup. In this use case the user authenticate himself to the application using password.

## Pre-conditions

* The application user is created.
* The user is not authenticated yet.

## Post-conditions

- The user successfully authenticated.

## Normal scenario

1. Check if the user should authenticate before access to the user data.
2. The user should authenticate.
3. SUD opens the Login screen with the application user name and a field to input the password.
4. User enters the password.
5. SUD verifies the password. 
6. Password is correct. 
7. The use case returns that the user successfully authenticated. The use case ends.

## Alternative scenarios

### A1.1. The user shouldn't authenticate.

1. The use case continues from the step 7.

### A4.1. The entered password isn't correct.

1. SUD displays an error message.
2. The use case continues from the step 4.