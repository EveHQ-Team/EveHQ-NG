# UC012. Create the application database

## Pre-conditions

1. The application database isn't created yet.

## Post-conditions

1. The application database created in the application data folder.
2. The application database schema is initialized.
3. The required initial data stored in the application database.

## Normal scenario

1. SUD creates an empty SQLite-database file in the application data folder with name ```evehq-ng-data.sqlite```.
2. SUD opens connection to the file created.
3. SUD creates all required database objects. 
4. SUD writes required initial data into the application database.