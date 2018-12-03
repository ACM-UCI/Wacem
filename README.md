# WACeM - Whip of ACM

In ACM@UCI, board members are required to provide solutions to at least two
problems per week. WACeM allows an "enforcer" to remind board members who have
not submitted their problems by sending Facebook messages to all of them.

## Usage
```
node bot.js <email_to_facebook> <password_to_facebook> <message_type>
```
Where `<email_to_facebook>` and `<password_to_facebook>` are the email and
password of the account being used to send the message, and `<message_type>` is
one of:
* `HELLO`
* `NICE`
* `MEAN`
* `TEST`

The names of the ~~victims~~ board members to send to are stored in a CSV file
called `ids.csv` with the following format:
```
submitted,id,name
```
Where `submitted` is `0` or `1`, `id` is the person's Facebook ID, and `name` is
the person's name.

## Credits
* Ronak Shah's [SpamBot](https://github.com/ronakdev/spambot)
