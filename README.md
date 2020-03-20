


There are other applications like this. How is this one different?
* Privacy
* Scalability
* Community driven, but verifiable


# Motivation

Social media works. Social distancing and other preventive measures is hard to communicate to people. Draconian big-brother measures of citizen location tracking doesn't feel good. We can make a system that has a high level of privacy, is scalable, and primarily community driven. Over time it can get better, and use more verifiable healthcare submitted information can be incorportated.

This application mostly does nothing! You install it, and forget you are using it. Occasionally you get an alert. If you unfortunately contract COVID-19 then you can report it and alert others. But it is as accurate as possible. It will compare your locations to others down to 5 minutes and within the accuracy of GPS.

Unlike other applications, this application does not show things on a map and expect you to figure out if you were near an infected person. It mostly does nothing unless an infection was reported and you happened to be close to this person. In this way it will serve to remind you (scare you a little bit) that this is still real, and social distancing and other measures are important. 

Note: showing on a map where infectious persons were is not very useful, because a) they are not there anymore, and b) do you really expect people to be glued to their phones looking at maps for the next 18 months? 

If this virus has a long tail, then even after we start lifting travel restrictions we will see cases popping up at various locations almost seemingly at random. In this way, a warning system like this can be very effective and tigger rapid reaction by users. What reaction? You might think twice about going to work if you feel sick or have a fever, you might wash your hands, you might maintain 2 meters apart, etc.

You can put it in your pocket and forget about it until you need it! 


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

When a user is confirming a COVID-19 case their entire location track is uploaded to cloud service (with permission). This data is for the last 5 days and all location time-data points. Your location data is encrypted so only the server can decrypt (this is done with public/private keypair generated when you signed up for the service)

Server then checks which users have intersected time and region with you (the infected subject)

If interested region/time is found, the server sends intersected region time-location track to that users application

The application compares time-location of own time-location with those of the infected subject and tells the user, e.g.:
You were 20m from infected person at 15:35 yesterday, or
Alert! You were < 5m from infected person at 11:15

# Advantages of approach

## Easy of Use

Anybody can use it (young and old). No complicated setups or data to enter. And if we get the healthcare plugin working, then a healthcare worker can do it on your behalf.

## Community driven

Do your part without giving up too much privacy.

## Privacy

My full time-location track is only sent to the server if I confirm that I was infected (otherwise the only thing sent to the server is the region time-track)

My tracking data based on regions is communicated to other user application only to the extent of intersection of regions. An infected persons true location is *never* shown to the other user. The other user just sees that they were "close" to someone infected.

This feels good. 
* I feel good about letting other people know if I am diagnosed as being infected - I'd feel really bad if I killed someone. 
* If someone else is infected and I was near them, I'd like to know.

Otherwise, I really don’t like sharing my exact location with a random cloud service.

## Scalable
it limits the data tracked on the server to “region” tracking

Traffic to the server is limited to region entering, which means if people are not moving much there is not a lot of data transmitted!

Also, since the general infection rate is fairly low (at least for the time being) there may be only several hundred infections per day in Finland.
During social distancing this is even more scalable because people aren’t moving much.

# Criticisms:
People will spoof it. 
* You must be registered. This limits spoofing. 
* Your entire time-location track is uploaded when you report you are infected.
* Your time-location track is encrypted and must be believable.
* Moderation could limit spoofs
* We could use healthcare verification of testing (some sort of test-id, etc., that can be verified or entered by healthcare worker). 

It uselessly alerts people. We should leave it up to authorities to trace contacts. True.

GPS is not very accurate. What use is it in an apartment for example. True. But then again, it's just letting you know that this is indeed real.

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
             


 
