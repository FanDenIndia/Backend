# Fan Den API Documentation

## **User APIs**

### - Login 
```
http://localhost:5001/api/user/login       (POST) 
```
### - Register an account
```
http://localhost:5001/api/user/register       (POST) 
```
### - Current User Details
```
http://localhost:5001/api/user/current       (GET) 
```

## **Events APIs**

### - Get Events by city
```
http://localhost:5001/api/event?city=<city_name>       (GET) 
```
### - Get Event by ID
```
http://localhost:5001/api/event?_id=<event's _id>       (GET) 
```

## **Event Registration APIs**

### - Create Event Registration
```
http://localhost:5001/api/eventregis/neweventregis       (POST) 
```
### - Get User Event Registrations
```
http://localhost:5001/api/eventregis/userevents?email=<user's_email_id>       (GET)
```

## **Admin APIs**

### - Login
```
http://localhost:5001/api/admin/login      (POST) 
```
### - Register an admin
```
http://localhost:5001/api/admin/register       (POST)
```
### - Current Admin Details
```
http://localhost:5001/api/admin/current      (GET) 
```
### - Add an Event
```
http://localhost:5001/api/admin/addEvent       (POST)
```
### - Get All Events
```
http://localhost:5001/api/admin/allevents      (GET) 
```
### - Update an Event
```
http://localhost:5001/api/admin/updateEvent/<event's _id>       (PUT)
```
### - Delete an Event
```
http://localhost:5001/api/admin/deleteEvent/<event's _id>      (DELETE) 
```
### - Get All Event Registrations
```
http://localhost:5001/api/admin/alleventregis       (GET)
```
### - Update Event Registration
```
http://localhost:5001/api/admin/updateeventregis/?id=<event registrations's _id>       (PUT)
```
### - Particular Event Registrations
```
http://localhost:5001/api/admin/particulareventregis?eventID=<eventID>      (GET) 
```
### - Update Coordinator Events
```
http://localhost:5001/api/admin/updatecoordinator?id=<coordinator's _id>       (GET)
```
### - Get Coordinator By ID
```
http://localhost:5001/api/admin/getcoordinator?id=<coordinator's _id>       (GET)
```
### - Get Coordinator Events
```
http://localhost:5001/api/admin/coordinatorevents       (GET)
```

## **Coordinator APIs**

### - Login
```
http://localhost:5001/api/coordinator/login      (POST) 
```
### - Register a coordinator
```
http://localhost:5001/api/coordinator/register       (POST)
```
### - Current coordinator Details
```
http://localhost:5001/api/coordinator/current      (GET) 
```
### - Get coordinator Events Registrations
```
http://localhost:5001/api/coordinator/particulareventregis?id=<coordinator's _id>       (GET)
```
### - Update Event Registrations
```
http://localhost:5001/api/coordinator/updateeventregis/?id=<event registrations's _id>      (PUT) 
```

