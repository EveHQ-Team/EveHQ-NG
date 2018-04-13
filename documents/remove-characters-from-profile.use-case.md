# UC007. Remove characters from profile

The removing character from the profile characters list could be destructive. A lot of historical and statistics data could bound to the character. The user should be able to backup this information and restore it later.

## Pre-conditions

* The user is authenticated.
* The current profile is chosen.

## Post-conditions

* The characters removed from the current profile.
* If user chosen to backup characters data they are backed up in a safe place and accessible for SUD at anytime.

## Normal scenario

1. SUD opens the Removing characters from profile screen. This screen contains a list of characters that user chosen to remove. Each item in list has an option to backup the character information.
2. The user change the backup options as required.
3. The user commands to remove all characters in the list from the current profile.
4. SUD backups data for relevant characters.
5. SUD removes all characters in the list from the current profile.
6. SUD navigates to the previous screen.
7. The use case ends.