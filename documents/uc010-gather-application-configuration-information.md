# UC010. Gather the application configuration information

The application need to know where to store the application configuration and characters related data. The user should choose the location for them: the application data folder. This folder should be created and path to it should be stored in a well-known place the default application data folder because it is the common denominator for all supported operation systems.

Same like the backend service TCP port should be chosen and set because on different machines different ports are free or occupied by other network services.

**TBD: Is there any other configuration information that should be gathered and stored before the application can work as expected?** 

## Pre-conditions

1. The application configuration information isn't gathered and stored yet.

## Post-conditions

1. The application data folder path and backend service port number gathered from the user and stored in the default application data folder.
2. The application data folder created in the persisted storage.
3. Backend service started to work on chosen port.

## Normal scenario

1. SUD tries to open ```application-configuration.json``` file placed in the default application data folder.
2. This file can not be open.
3. SUD constructs application configuration using path to the default application data folder and a random not occupied port number and puts it into session storage.
4. SUD opens the Specify application configuration screen. The screen contains a input to enter path to the application data folder, input to enter backend service port number and a button to display default operation system folder selection dialog. Inputs are populated with data from application configuration object from session storage.
5. The user provides the path to the application data folder using select folder system dialog and backend service port number and commands to save data.
6. SUD stores provided data into ```application-configuration.json``` file, placed in the default application data folder.
7. SUD checks that the path provided isn't exists yet.
8. The path provided isn't exists yet.
9. SUD creates the application data folder with the provided path.
10. SUD checks that backend service port specified by the user isn't used by some other network service on the local machine.
11. The port specified isn't used yet.
12. SUD restarts backend service.
13. Backend service restarts and starts to listen on port provided by the user.

## Alternative scenarios

### A2.1. The ```application-configuration.json``` open. 

1. SUD reads its contents and constructs application configuration using data from this file.
2. The use case continues from the step 4.

### A5.1. The user decides to use the default application data folder.

1. The use case continues from the step 6.

### A7.1. The path provided exists and the folder is empty.

The use case continues from the step 10.

### 7.2. The path provided exists and the folder isn't empty (```application-configuration.json``` file in the default application folder doesn't count).

1. SUD checks if the folder contains the application data files.
2. The folder doesn't contain the application data files.
3. SUD informs the user that the selected data folder isn't empty and should be cleaned to continue and requires confirmation from the user to clean the folder.
4. The user confirms folder cleaning.
5. SUD cleans the folder.
6. The use case continues from the step 10.

### A7.2.2. The folder seams like contains the application data files.

1. SUD calls UC014. Import present application data files.
2. The use case continues from the step 10.

### A7.2.4. The user rejects folder cleaning.

1. SUD displays error message "The data folder should be empty before to proceed."
2. The use case continues from the step 4.

### A10.1 The port specified occupied by some other network service.

1. SUD displays error message "The port specified is occupied by some other service. Please choose another one."
2. The use case continues from the step 4.

### A10.2. The port specified is out of range ```1-65535```.

1. SUD displays error message "The port number ${portNumber} not in valid range."
2. The use case continues from the step 4.

## Exceptional scenarios

### E2.1.1. The  file ```application-configuration.json``` format is wrong.

1. SUD removes the file ```application-configuration.json``` from disk.
2. The use case continues from the step 3.

### E2.1.2. The file contents can not be read.

1. SUD informs the user about the fatal error: "The file '<full folder path>/application-configuration.json' can not be read. Please remove it from disk yourself."

### E9.1. Error occurred during creating the application data folder.

1. SUD displays error message "The data folder can't be created."
2. The use case continues from the step 4.