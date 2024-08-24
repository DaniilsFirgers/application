### Config toml

[server]
host = "<host-here>"
port = 1234
protocol = "<protocol-here>"

[database]
[database.postgres]
host = "<host-here>"
name = "<name-here>"
port = 1234

[credentials]
[credentials.database.postgres]
password = "<password_here>"
user = "<username_here>"

[credentials.google_auth]
callback_url = "/callback"
client_id = "<client_id_here>"
client_secret = "<client_secret_here>"
cookie_secret = "<cookie_secret_here>"
