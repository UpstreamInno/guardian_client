

# Documentation Index

* [Detailed](https://github.com/tomjoro/guardian/blob/master/details.md)
* [Client Application](https://github.com/tomjoro/guardian/blob/master/specifications/application.md)
* [Backend and Protocol](https://github.com/tomjoro/guardian/blob/master/specifications/backend.md)
* [Healthcare Portal](https://github.com/tomjoro/guardian/blob/master/specifications/healthcare_portal.md)


 # Guardian

![Image](https://github.com/tomjoro/guardian/blob/master/guardian.png)


A Practical, Privacy Focused, Scalable, Community and Consent Driven, Verifiable Infection Risk Alert System

The goal of this system is to give users some peace of mind that there is something they can do with very little effort that can have a large impact on the outcome of the pandemic. 

This system is based on the premise that the rapid spread of COVID-19 is primarily due to people moving about with they have mild systems and are unaware that they are infected.

 # Background

 We are already tracked by big companies like Facebook and Google. They know when we have an illness by tracking our interests and locations. Futhermore, the consent to track is mostly given willingfully by users, but also determined using aggregate data. 

We are running out of time. We all agree that tracking is an invasion of privacy and something we'd rather not have. Cities are being locked down, and citizens are prevented from moving freely. 

We are developing a lightweight tracking and alert/contact system that can integrate with verified test results. This system must do everything possible to preserve a high level of privacy and be simple enough that everyone and anyone can use it - with their consent. But, it should be recommended by government and healthcare officials. If we do this now, work with privacy and security experts to come up with the best solution.

*Gates called for a "national tracking system similar to South Korea, saying that "in Seattle, the [University of Washington] is providing thousands of tests per day but no one is connected to a national tracking system" and that "Whenever there is a positive test it should be seen to understand where the disease is and whether we need to strengthen the social distancing."*


We need to get a system onto users mobile phones that be extended in the future. 

# Description

This system needs to work anywhere in the world. The easiest way to do this is to just use mobile phone numbers. 

## Users 
Users install Guardian application on their mobile phone, and then they mostly forget about it. 

Here's what they can do with the application:
* **Receive alerts** when they have been in proximity to someone who has reported symptoms, or has been verified to have tested positive,
* **Report: Self-report symptoms** 
* **Report: Confirm a positive or negative test result**  by Healthcare officials and a Healthcare portal
* **Be contacted** 

What do alerts look like? Initially they will be very simple: "Alert, yesterday for 10 minutes you were in proximity of someone who tested positive" 

Consent and Privacy:
1. **To anonymously track** users large-scale movement inside of regions. Precise location data is *only stored on users local mobile phone* and not shared (unless separate consent is given). This is required to use the application.
1. **When reporting** (self, or confirmed result), users can consent to "do the right thing and warn others who might have been exposed". The user's more precise location track is shared anonymously and everything possible is done to prevent identifying individual persons.
1. **To be contacted**  

*Note: users only need to consent to share their large scale movements unless they are reporting.*


Some key points:
* **Alerts are calls-to-action**. They ask the user to do a self-inspection. They remind the user to follow instructions - social distance, handwashing, etc. They ask you to report if you are sick.
* **Historic proximity data is important** - we have to stop staring at maps. What is important your historic location track - who were you close to, and who was close to you. 

## Officials (Healthcare and Officials)

A portal is provided where aggregate location track data can be seen by healthcare workers and officials. This can show areas of high transmission rates. This data is not available to users.

The healthcare portal also provides a simple means to confirm test results. Again, user consent is required to share this infromation anonymously.

This system can also be used to prioritize testing and to have a contact point to healthcare workers. For example, if you were in the proximity of another person who tested positive *and* you have a high fever today, then you would be contacted and a test arranged possibly automatically.

## Assumptions

* **People want to do the right thing**, when they are sick they will stay home, 
* **If given the opportunity** they would be willing to anonymously warn others who they might have put at risk. 

We do not plan to track infected persons - because they probably wouldn't give consent anyways.

We do not plan showing maps to users - because the risk is that people will start to think some location is bad, such as a business. It's not the location, it's just random - you were in the wrong place at the wrong time!

# Criticisms

Invasion of privacy:
* Only large movements are tracked by default and only with consent.
* When reporting the actualy proximity anlysis is done on the non-reporting users phone. The service (server) will not have precise track of users who are passive in the system.
* Regions are defined to always have a minimum number of users as to try to prevent idenitying individual.
* Proximity is not precise. This is a question of privacy and could be adjusted based on the recommendations of authorities and applicable privacy laws.

People will spoof it:
* You must be registered. This limits some amount of spoofing. 
* Your entire time-location track is uploaded when you report you are infected.
* Your time-location track is encrypted and must be believable.
* Moderation could limit spoofs
* We could use healthcare verification of testing (some sort of test-id, etc., that can be verified or entered by healthcare worker). 

It uselessly alerts people. We should leave it up to authorities to trace contacts. True.

It creates panic. Potentially. But because the alert you receive is for your movements on previous days, there is nothing you can immediately do to change the situation. Also, the location itself is not the problem - this is not a chemical spill.

GPS is not very accurate. 
What use is it in an apartment for example? True. But then again, it's just letting you know that this is indeed real and peopel are still being diagnosed. It seems that a lot of systems are focusing on targeting the subject (infected person) too closely and trying to single an individual which is very privacy invasive, and works against the goal of communicating the pandemic to the larger public and getting participation in such a system. As such, accuracy is actually working against broad usage of such applications.


# Development Plan

This system can be developed in 2 weeks - it is simple enough, and it can be scaled to millions of users rapidly.

It can be used with any healthcare system in the world without any integrations. It can be used to share verified test results, and to prioritize testing.

It is secure by using built-in privacy preserving data exposure limiting. 

Take a look at the specifications directory

## Client Applications
* iOS Application
* Android Application

## Server Backend
* Scalable backend
             
(c) 2020 Thomas O'Rourke
 
 