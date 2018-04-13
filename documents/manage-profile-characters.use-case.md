# UC004. Manage profile characters

The meta-game profile is a way to organize character sets. For instance if the user plays solo sometimes and sometimes as a fleet commander he probably needs two profiles to not overhead himself with irrelevant characters for the current activities.

## Pre-conditions

* The user is authenticated.
* The current profile is chosen.

## Post-conditions

* The character list of the current profile changed according to the user expectations.

## Normal scenario

1. SUD opens the Character list screen for the current profile. The screen contains the character list and commands to manage it.
2. The user commands to add a character unknown for SUD. SUD starts the [UC005. Add an unknown character to profile](add-unknown-character-to-profile.use-case.md).
3. The user decides that all necessary changes to the profile character list made and commands to store data and end the use case.
4. SUD checks if the navigation history has previous open screen.
5. SUD navigates to the previous screen.
6. The use case ends.

## Alternative scenarios

A2.1. The user commands to add a known character.

1. SUD starts [UC006. Add known characters to profile](add-known-characters-to-profile.use-case.md).
2. When UC006 ends this use case continues from the step 2.

A2.2. The user commands to remove selected characters from the list.

1. SUD starts [UC007. Remove characters from profile](remove-characters-from-profile.use-case.md).
2. When UC007 ends this use case continues from the step 2.

A2.2. The user chosen to select a character as the default on application startup.

1. SUD marks the chosen character as the default on application startup.
2. The use case continues from the step 2.