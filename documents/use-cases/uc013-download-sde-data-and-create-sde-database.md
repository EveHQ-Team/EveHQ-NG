# UC013. Download SDE data and create the SDE database

SDE stands for ```Static Data Export```. It contains all required data describing game related objects and their relations to each other. SDE occasionally updates with new versions of the game releasing. Original SDE published on EVE developers site's [Resources](https://developers.eveonline.com/resource/resources) page in YAML format files zipped into a ZIP-archive. YAML-files are big and not easy to use. There are a few conversions of YAML format SDE into different database formats. For the sake of compatibility the best format is SQLite SDE the latest version of which could be downloaded from [Fuzzwork](https://www.fuzzwork.co.uk/dump/latest/eve.db.bz2). It's packed into a BZ2-file.

Not all data present in the SDE are used be the application. In the future it could be useful to convert only required SDE-data and publish it by ourselves.

In this use case the application downloads the latest SQLite SDE from Fuzzwork, extracts the database file from the BZ2 -archive and stores the database file into the application data folder.

## Pre-conditions

1. Connection to the Net is functional.

## Post-conditions

1. The latest version of SQLite SDE stored in the application data folder.

## Normal scenario

1. SUD opens the screen Download SDE database. The screen contains information message about possibly long operation, a progress bar and a disabled button "Start using application".
2. SUD downloads the latest SDE file to the temp-folder. During download SUD updates progress bar with the progress.
3. SUD finishes SDE download, extracts database file from the downloaded archive into the application data folder with the name ```sde.sqlite``` and enables the button.
4. The user commands to start using application.