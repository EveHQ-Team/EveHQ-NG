# UC011. Gather SSO-related information and register custom URL-protocol in the operation system

To have access to the private characters data the application should be be registered in EVE SSO service. Because the application supports 'SSO-application customization' the information required for SSO authentication and authorization should be collected from the user. This information includes:

- The Client ID - ID of the application in SSO.
- The custom URL-schema - currently should start with 'eveauth-'.
- The Secret Key - the client secret required to get access to ESI API tokens from SSO.

After all required SSO-related data gathered SUD should register this custom URL-schema in the operation system to point to the SSO-authorization component.

## Pre-conditions

1. SSO-related information isn't gathered yet.

## Post-conditions

1. SSO-related information gathered from the user.
2. Custom URL-protocol registered in the operation system and it points to the application SSO-authorization component.

## Normal scenario

1. SUD opens the screen Application SSO-authorization where the user can enter SSO-related data or choose to use the default. The screen as well contains information about SSO-authorization, steps the user required to follow to register a custom application and a link to the page [Manage applications](https://developers.eveonline.com/applications) on the EVE-Online developers site.
2. The user chooses to use custom SSO-application.
3. The user navigates to EVE-Online developers site and register a custom application.
4. The user enters all required data about custom SSO-application in the application.
5. The user commands to register the custom URL-schema.
6. SUD stores provided data in the application data folder.
7. SUD checks which operation system it works on.
8. The OS is Windows.
9. SUD creates a registry file to register a custom URL-schema using template and information provided be the user.
10. SUD informs the user that he should allow the registry change in the following system confirmation dialog and executes created registry file with elevated permissions.
11. The user allows changes to the registry.
12. SUD checks that the custom URL-schema registered correctly.
13. The custom URL-schema registered correctly.

## Alternative scenarios

### A2.1. The user chooses to use the default SSO-application

1. The use case continues from the step 5.

### A8.1. The OS is Linux

1. TBD. Specify the required steps to register a custom URL-schema on Linux.
2. The use case ends.

### A8.1. The OS is Mac OS

1. TBD. Specify the required steps to register a custom URL-schema on Mac OS.
2. The use case ends.

### A13.1. The custom URL-schema isn't registered correctly

1. SUD displays error message "The custom URL-schema isn't registered correctly".
2. The use case continues from the step 10.

## Exceptional scenarios

### A10.1 An error occurred during executing the registry file.

1. SUD displays error message "Unable to register the custom URL-schema".
2. The use case continues from the step 10.