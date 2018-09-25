# UC004. Manage profile characters

The meta-game profile is a way to organize character sets. For instance if the user plays solo sometimes and sometimes as a fleet commander he probably needs two profiles to not overhead himself with irrelevant characters for the current activities.

## Pre-conditions

* The user is authenticated.
* The current profile is selected.

## Post-conditions

* The character list of the current profile changed according to the user expectations.

## Normal scenario

1. SUD opens the Character list screen for the current profile. The screen contains the character list and commands to manage it.
2. The user commands to add a character unknown for SUD. SUD starts the [UC005. Add an unknown character to profile](add-unknown-character-to-profile.use-case.md).
3. Character information and both tokens returned. SUD stores this data into the permanent store.
4. The use case continues from the step 2.
5. The use case ends.

## Alternative scenarios

### A2.1. The user decides that all necessary changes to the profile character list done.

1. The use case continues from the step 5.

### A2.2. The user commands to add a known character.

1. SUD starts [UC006. Add known characters to profile](add-known-characters-to-profile.use-case.md).
2. A list of selected known characters returned. SUD stores links to the returned characters into the permanent store.
3. The use case continues from the step 2.

### A2.2 A2.1 User canceled to operation.

1. No any data changed. The use case continues from the step 2.

### A2.3. The user commands to remove selected characters from the list.

1. SUD starts [UC007. Remove characters from profile](remove-characters-from-profile.use-case.md).
2. The user selects backup options for the removing characters and confirm the removal.
3. SUD backups data for relevant characters.
4. SUD removes all characters in the list from the current profile in the permanent store.
5. The use case continues from the step 2.

### A2.2 A2.1 User canceled to operation.

1. No any data changed. The use case continues from the step 2.

### A2.4. The user selects a character as the default on application startup.

1. SUD marks the selected character as the default on application startup in the permanent store.
2. The use case continues from the step 2.


### A3.1. [For all modification commands] The user has cancelled the operation.

1. No any data changed. The use case continues from the step 2.