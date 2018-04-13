# UC006. Add known characters to profile

Some of characters of the user could be shared between profiles. By the end a fleet commander can farm anomalies with the same character. It would be nice to cut off the procedure of authentication on SSO if you did it before.

## Pre-conditions

* The user is authenticated.
* The current profile is chosen.
* The user has multiple meta-game profiles.
* Any other profile has any characters added.

## Post-conditions

- Selected characters added to the current profile.
- Selected characters not removed from the original profiles.

## Normal scenario

1. SUD collects all the characters from all user profiles and displays this list to the user.
2. The user selects characters he wants to add to the current profile from the list.
3. The user commands to add them.
4. SUD adds characters to the current profile.
5. SUD navigates to the previous screen.
6. The use case ends.

## Alternative scenarios

A2-3.1. The user commands to cancel addition.

1. SUD throws away character information and tokens.
2. The use case continues from the step 5.

## Further ideas

* If the user adds a character that had been known to be bound to this profile early, SUD can restore backed up data.