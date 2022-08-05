# UChat Client

This is the frontend client for the UChat app. 

## Version History

### v2.1.0

- Moved component files into their own folders
- Created a rooms panel to display all available rooms

### v2.0.0

Converted the entire app to a single-page app. 

- Menu removed
- User Input shifted from separate element to child of Chat Window
- Removed rounded edges from Chat Window and Users List
- Expanded Chat Window and Users List to fill screen

### v1.0.0

First official build of the cyberavian-chat-app.

## Pages:
- Login
  - First screen loaded
  - Only requests a username
    - Usernames do not have to be unique
    - Usernames are not verified
    - Username is required to continue
- Chat
  - One room that all active users join
  - ~~Menu~~ [removed in v2.0.0]
    - ~~Exit Button to exit chat~~ [removed in v2.0.0]
    - ~~Greeting~~ [removed in v2.0.0]
  - Rooms [added in v2.1.0]
    - Displays active rooms
  - Users
    - Displays active users in chat
  - Chat Window
    - Displays chat messages
    - Messages sent by user on the right, messages sent by others on the left
    - Messages are matched to username, which can lead to confusion if other people use the same username
    - Chat message colors randomly determined upon connecting
      - If a user disconnects and reconnects with the same username, a new color gets generated anyway
  - User Input
    - Consists of an ~~separated~~ editable div for text entry and submit button to send messages. 

## Issues:
1. ~~Chat Bubble Text-Wrap~~ [Fixed]
  - https://github.com/CyberAvian/uchat/issues/1
  - Text doesn't wrap correctly within text bubbles
  - Addressed in a bug fix
2. ~~Exit Chat button doesn't always work~~ [Fixed]
  - https://github.com/CyberAvian/uchat/issues/2
  - Exit Chat button disconnects user without redirecting to the sign in page
  - Addressed in a bug fix
3. Reconnect Issues
  - https://github.com/CyberAvian/uchat/issues/3
  - Must refresh page on sign in screen after disconnecting to reconnect
4. User List has spacing issues on mobile
  - https://github.com/CyberAvian/uchat/issues/4
  - Usernames overflow the user list on mobile/small screens
5. Getting Disconnected and Reconnected with new colors
 - https://github.com/CyberAvian/uchat/issues/5
 - While chatting, the socket will sometimes disconnect and reconnect giving the user a new color and erasing the username from the user list
6. Refreshing chat breaks connection
  - https://github.com/CyberAvian/uchat/issues/6
  - Refreshing the chat should result in the user returning to the login screen (until authentication is implemented)
  - Currently, either a 404 error is thrown or the user just can no longer chat
