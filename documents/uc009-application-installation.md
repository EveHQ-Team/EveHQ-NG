# UC009. Application installation

The application needs some data and needs to initialize some infrastructure before it can function as expected. Usually it's done during application setup in the application setup package run. But because SUD is an Electron application targeting a few operation systems there are different setup systems used for different OSs. It's just not feasible to support a setup package per OS. It's easer (cheaper) and more flexible to do initial configuration (installation) in the application itself on the first start. It could be extended in the future with update of the application configuration if any configuration changes needed (DB schema for instance).

The best occasion for setup of course is the first application start. This use case starts on each application start and checks conditions to run setup procedure. After that it gathers required information from the user and operation system and initializes required services and entities.

## Pre-conditions

- The application set up in operation system using the setup package.

## Post-conditions

- All required information from the user gathered.
- The application configuration database created and its structure and required data initialized.
- The SDE database created and initialized with downloaded data.
- Custom URL-protocol registered in the operation system.

## Normal scenario

1. SUD checks is the application installation already done.
2. The application installation isn't done.
3. SUD calls [UC010. Gather the application configuration information](uc010-gather-application-configuration-information.md).
4. The application configuration information successfully gathered.
5. SUD calls [UC011. Gather SSO-related information and register custom URL-protocol in the operation system](uc011-gather-sso-related-information-and-register-custom-url-protocol-in-operation-system.md).
6. Custom URL-protocol successfully registered in the operation system.
7. SUD calls [UC012. Create the application database](uc012-create-configuration-database.md).
8. The application configuration database successfully created and populated with required data.
9. SUD calls [UC013. Download SDE data and create the SDE database](uc013-download-sde-data-and-create-sde-database.md).
10. The SDE database successfully created and populated with actual SDE data.

## Alternative scenarios

### A2.1 The application installation and initial configuration done already

1. The use case ends.

## Exceptional scenarios

### E*.1 Some error occurred in any of called use cases

An error message displayed to the user with all required information necessary to solve the concrete problem.