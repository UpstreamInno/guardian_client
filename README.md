This application concept could be developed to Beta in as little as 2 (intense) weeks by an estimate of 5 persons. It could save lives by:
Communicating the social-distance concept.


# Motivation

Social media works. Social distancing is hard to communicate to people. Draconian big-brother measures of citizen tracking is doesn't feel good. We can make a system that enforces a high level of privacy, is scalable, and primarily community driven. Over time it can get better, and use more verifiable healthcare submitted information.

Unlike other applications, this application does not show things on a map and expect you to figure out if you were near an infected person. It mostly does nothing unless an infection was reported and you happened to be close to this person. In this way it will serve to remind you (scare you) that we have to understand social distancing is real.

If this virus has a long tail, then even after we start lifting travel restrictions we will see cases popping up at various locations almost seemingly at random. In this way, a warning system like this can be very effective and cause rapid reaction by users, i.e. you can put it in your pocket and forget about it until you need it! Think about it: showing on a map where infectious persons were is not very useful, because a) they are not there anymore, and b) do you really expect people to be glued to their phones looking at maps for the next 18 months? 


# Architecture

Regions are basically a predefined grid that is more dense in higher population areas (similar to cell in a phone network).

# Tracker Application 

User has smartphone application which tracks their position throughout the day - every 5 minutes it checks your position and stores locally your position track
Application reports to cloud service when a user enters a region during the day, and at beginning and end of day

Note: your position data is stored encrypted on your phone. Only the server can decrypt your position information (and you position information is only sent to the server when you report yourself as being infected).

Reporting from Tracker Application

User can report COVID case (or suspecting him/herself):
* Confirmed by test (test# should be entered)
* Strongly suspected (self-assessed against high fever)

When a user is confirming a COVID case their entire location track is uploaded to cloud service (with permission). This data is for the last 5 days and all location time-data points. Your location data is encrypted so only the server can decrypt (this is done with public/private keypair generated when you signed up for the service)

Server then checks which users have intersected time and region with you (the infected subject)

If interested region/time is found, the server sends intersected region time-location track to that users application

The application compares time-location of own time-location with those of the infected subject and tells the user, e.g.:
You were 20m from infected person at 15:35 yesterday, or
Alert! You were < 5m from infected person at 11:15

# Advantages of approach:
## There is a high degree of privacy because 
My full time-location track is only sent to the server if I confirm that I was infected (otherwise the only thing sent to the server is the region time-track)

The users own exposure warning is only shown to the user and not known by the server - there could be a permission that would allow my application to report “collisions” if we wanted to know how many people were close in that track, but maybe not initially

This feels good. I feel good about letting other people know when I am infected. Otherwise I really don’t like sharing my position with a random cloud service

## This is a very scalable approach, 
it limits the data tracked on the server to “region” tracking

Traffic to the server is limited to region entering, which means if people are not moving much there is not a lot of data transmitted!

Also, since the general infection rate is fairly low (at least for the time being) there may be only several hundred infections per day in Finland.
During social distancing this is even more scalable because people aren’t moving much.

# Criticisms:
People will spoof it. 

You must be registered. This limits spoofing. 

Your entire time-location track is uploaded when you report you are infected.

Your time-location track is encrypted and must be believable.

Moderation could limit spoofs

If enough people use it we could use healthcare verification of testing (some sort of test-id, etc., that can be verified or entered by healthcare worker).



# Estimates on data storage/traffic:


Position tracked: once every 5 minutes? = 288 stored in application positions: 

Regions in Finland: 5000 (average person per region 1000) - grid based regions

Average size of region?: 1km sz? 

Movements between region on given day: 10% of people move 5 regions on a day = 1million * 5 = 5 million region events a day

Infections a day: 500. Generating 1440 data points down to intersecting time/region. Might be several hundred at most. 


In a country the size/population of Finland, this is easily doable on a single server with a single database!

The population of the use is about 100x that of in Finland. Also much bigger geographically. Probably would require 30 or 40 AWS instances. Maybe $40K a month operating.

# Development Plan
* iOS Application
* Signup API and verify email (or Facebook auth)
* Background location tracking
* Region crossings report to server (using REST API)
* Infection reporting UI
* Infection alert processing:
*  Interest regional time-location track received
*  Alert user how close they were to infection
* Android Application
* Same as iOS basically


# Server Backend
* Signup api
* public/private key per signed up user
* Geo-partioning
* Collecting geo-region entering times for a user
* Infection report
* Geo-region (using PostgreSQL GEO search) can find all time-locations that intersect when user was in that region
* Creating infection report (estimate of infection date)
* Push data to clients 
* Push region intersect time-location track to clients
             


 
