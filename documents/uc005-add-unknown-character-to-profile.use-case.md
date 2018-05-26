# UC005. Add an unknown character to profile

EVE Online characters is the crucial part of the application. Almost everything bounds to a character. The character is the authentication root for CCP [ESI services for developers](http://eveonline-third-party-documentation.readthedocs.io/en/latest/esi/). The authentication implemented using another CCP service - SSO ([Single Sign-On](http://eveonline-third-party-documentation.readthedocs.io/en/latest/sso/)). This multi-step process of initial authentication ends with obtaining Access Key and Refresh Key that can be used later to authorize the user actions to the ESI. As a part of authentication process the application should supply the list of so called scopes which determine the parts of ESI functionality the user allowed to access.

## Pre-conditions

* The user is authenticated.
* The current profile is chosen.

## Post-conditions

* A new character information and both tokens returned to the caller.
* If the user canceled the operation the caller notified about it.

## Normal scenario

1. SUD opens the Add character screen.
2. SUD informs the user what he should do on the CCP site and opens in the default web-browser link to [SSO authorization page](https://login.eveonline.com/oauth/authorize).
3. The user on the SSO-page logins with the account containing the required character, selects character and gives access to the scopes selected by SUD.
4. SSO redirects the browser to the URI, provided by the SUD on the step 2.
5. SUD intercepts redirection from SSO-page and extracts the authorization code from the redirection URL.
6. SUD exchange the authorization code to access and refresh tokens from SSO.
7. SSO verifies the authorization code and returns tokens.
8. SUD retrieves character ID and basic character information, displays it to the user on the Add character screen.
9. The user commands to add this character to the current profile.
10. SUD returns character information and tokens to the caller. The use case ends.

## Alternative scenarios

### A2.1, A9.1. The user commands to cancel addition.

1. SUD throws away character information and tokens.
2. SUD informs the caller about cancelation of the operation. The use case ends.

## Further ideas

* If the user adds a character that had been known to be bound to this profile early, SUD can restore backed up data.