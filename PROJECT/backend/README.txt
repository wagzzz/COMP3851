Starting the backend database:

- Open the project with any IDE
- Naivgate to the AuthenticationApplication executable 
	(backend/src/main/java/AuthenticationApplication)
- Test connection with "http://localhost:9090/h2-console"
	NOTE: in the event of failed connection, change the JDBC URL to "jdbc:h2:mem:testdb"