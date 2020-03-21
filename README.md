

 # Guardian
 
A Privacy Focused, Scalable, Community Driven but Verifiable Infection Risk Alert System

Code name: *Guardian*

Guardian is strongly authenticated mobile phone application, which works in conjunction with a secure data collection backend server.

Users install Guardian on their mobile phone, and then they forget about it.  *I want to install this application on my mother-in-laws mobile phone.*

They can do two things with Guardian:
* They will get alerts when they have been close to someone who has reported symptoms, or has been verified to have tested positive.
* They can report symptoms, or confirm a positive or negative test result.


This system can save lives with the potential for mass installations because:
* It is simple,
* It is secure,
* It is scalable,
* It enforces user privacy and anonymity
* It can be integrated to healthcare systems doing widescale testing.


Furthermore, it serves to reinforce and remind the user of the important instructions we have been given from healthcare professionals, e.g. social distancing and hand-washing hygiene. 

*Real time reporting of symptoms don't help things much because you will usually report them from home! What's important is knowing who you might have had close contact with over the last few days, often before you were showing symptoms! The only way to achieve this is with a passive background location tracker requiring no interactions from the user.*


# Specifications
* [Client Application](https://github.com/tomjoro/save_the_world/blob/master/specifications/application.md)
* [Backend and Protocol](https://github.com/tomjoro/save_the_world/blob/master/specifications/backend.md)
* [Healthcare Portal](https://github.com/tomjoro/save_the_world/blob/master/specifications/healthcare_portal.md)


# Background

The goal of this system is to give users some peace of mind that there is something they can do with very little effort that can have a large impact on the outcome of the pandemic. 

This system does use gps location tracking, however, the motivation is simply to alert users when they have been close to someone who has been verified to have COVID-19. It also has a mechanism to report themselves as being diagnosed with COVID-19 (and verified by healthcare workers).

This system is based on the premise that the rapid spread of COVID-19 is primarily due to people moving about with they have mild systems and are untested. It further assumes that when diagnosed, a person will self-quarantine. This diagnosed person will feel remorse for potentially putting others at risk, and hence will be willing to share more detailed information about their movements during the pre-dianosis timeframe.

However, even though the information is shared, no other users will know your name or know exactly where you have been - it's really non of their business. A users movement is their own private information. What it will show is a risk factor based upon you own movement.  (see diagrams)

These alerts will serve to remind persons that there are still new cases of COVID-19 being diagnosed. Their reaction should be to continue preventive measures such as social distancing and proper hand washing hygiene - an alert that you were close to someone recently diagnosed will make you think twice about going to work when you feel sick.

What do alerts look like? Initially they will be very simple: "Alert, yesterday at 9:00 you were 20 meters from someone who was diagnosed yesterday".

There are other applications like this. How is this one different?
* Privacy
* Scalability
* Community driven, but verifiable

# Motivation


Social media works. Social distancing and other preventive measures is hard to communicate to people. Over time people get lax with their personal preventive measures. At the same time draconian big-brother measures of citizen location tracking doesn't feel good. We can make a system that has a high level of privacy, is scalable, and primarily community driven. Over time it can get better, and use more verifiable healthcare submitted information can be incorportated.

This application mostly does nothing! You install it, and forget you are using it. Occasionally you get an alert. If you unfortunately contract COVID-19 then you can report it and alert others. But it is as accurate as possible. It will compare your locations to others down to 5 minutes and within the accuracy of GPS.

 It would be possible to show this information on a map, but a map is not really actionable information in this case - it's just sensationalism. This may go on for 18 months and people are not going to want to stare at their phone everyday. 

# Architecture

Regions are basically a predefined grid that is more dense in higher population areas (similar to cell in a phone network).

The client *only* communicate region-transitions times when a user moves from one region to the next. In normal use the server never receives preceise location information from the client (mobile phone). In the case of reporting a symptom or infection, it then does communicate precise information, but only on users consent, and only to the extent that you have overlaps in regions with other users. 

![The Grid](/specifications/the_grid.png)

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

# Criticisms
People will spoof it. 
* You must be registered. This limits some amount of spoofing. 
* Your entire time-location track is uploaded when you report you are infected.
* Your time-location track is encrypted and must be believable.
* Moderation could limit spoofs
* We could use healthcare verification of testing (some sort of test-id, etc., that can be verified or entered by healthcare worker). 

It uselessly alerts people. We should leave it up to authorities to trace contacts. True.

It creates panic. Potentially. But because the alert you receive is for your movements on previous days, there is nothing you can immediately do to change the situation. Also, the location itself is not the problem - this is not a chemical spill.

GPS is not very accurate. What use is it in an apartment for example? True. But then again, it's just letting you know that this is indeed real and peopel are still being diagnosed. It seems that a lot of systems are focusing on targeting the subject (infected person) too closely and trying to single an individual which is very privacy invasive, and works against the goal of communicating the pandemic to the larger public and getting participation in such a system. As such, accuracy is actually working against broad usage of such applications.

# Data Estimates

Position tracked: once every 5 minutes? = 288 stored in application positions: 

Regions in Finland: 5000 (average person per region 1000) - grid based regions

Average size of region?: 1km sz? 

Movements between region on given day: 10% of people move 5 regions on a day = 1million * 5 = 5 million region events a day

Infections a day: 500. Generating 1440 data points down to intersecting time/region. Might be several hundred at most. 


In a country the size/population of Finland, this is easily doable on a single server with a single database!

The population of the use is about 100x that of in Finland. Also much bigger geographically. Probably would require 30 or 40 AWS instances. Maybe $40K a month operating.


# Development Plan

Take a look at the specifications directory

* iOS Application
    * Signup API and verify email (or Facebook auth)
    * Background location tracking
    * Region crossings report to server (using REST API)
    * Infection reporting UI
* Infection alert processing:
    *  Intersect regional time-location track received
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
             


 

(c) 2020 Thomas O'Rourke