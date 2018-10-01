# EveHQ NG

There is a MMORPG EVE Online by CCP Games. It is a send box game where everything done by the players from collecting resources through research, manufacturing, trade and much more to the final point - PvP and its glory large-scale wars. This game is rightfully referred to as "Excel Online" or "Excel in the space" due to incredible amount of calculations the player should do to be productive or effective. There are and were many tools to automate these repetitive and complicative calculations and support gameplay in general.

Many of capsuleers (in game name of the players) know such a tool EveHQ. About 2 years ago I became the maintainer of it but unfortunately been forced to discontinue its maintaining after CCP discontinued support of old APIs. I will write more about the reasons behind in the project WiKi (TBD). In short it was easer to rewrite the application than change anything (a common story but in this case it's true). You can still find the source code of "Legacy EveHQ" (as I call it) in this repository and try your skills to update it to the new SSO authorization and Swagger API.

So I've decided to start development of the new version of this excellent tool I name EveHQ New Generation or shorter EveHQ NG. It should be more than swiss-knife like Legacy EveHQ. In my vision it should be a platform for building new EVE-related tools supporting the following features:

- Tight integration of different tools through common APIs and components for game subdomains (fitting, resource processing, map and navigation etc.).
- Easy plug-in like integration of the tools into the application shell.
- Implemented general services like SSO authentication/authorization, logging, L18N, data access and so on.
- TBD

Currently I'm in the process of choosing the details of application architecture and implementing the very first use case (The first application start) as a playground for this architecture. I try different approaches but still not happy with any of them. So currently I'm not looking for collaborators or any ideas how to implement some part of the application.
