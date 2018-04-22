# UC007. Remove characters from profile

The removing character from the profile characters list could be destructive. A lot of historical and statistics data could bound to the character. The user should be able to backup this information and restore it later.

## Pre-conditions

* The user is authenticated.
* The current profile is selected.
* The current profile has any characters added.

## Post-conditions

* The list of characters to remove with backup options returned to the caller.

## Normal scenario

1. SUD opens the Removing characters from profile screen. This screen contains a list of characters that user chosen to remove. Each item in the list has an option to backup the character information.
2. The user change the backup options as required.
3. The user commands to remove all characters in the list from the current profile.
4. SUD returns the list of characters with backup flags to the caller. The use case ends.

## Alternative scenarios

### A2.1. The user removes some characters from the list.

1. SUD removes selected characters from the list.
2. The use case continues from the step 2.