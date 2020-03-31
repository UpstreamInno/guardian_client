# Documentation Index

* [Detailed](https://github.com/UpstreamInno/guardian_client/blob/master/docs/details.md)
* [Client Application](https://github.com/UpstreamInno/guardian_client/blob/master/docs/application.md)

 # Guardian

![Image](https://github.com/UpstreamInno/guardian_client/blob/master/guardian.png)


A Practical, Privacy Focused, Scalable, Community and Consent Driven, Verifiable Infection Risk Alert System

The goal of this system is to give users some peace of mind that there is something they can do with very little effort that can have a large impact on the outcome of the pandemic. 

This system is based on the premise that the rapid spread of COVID-19 is primarily due to **people moving about when are unaware that they are infected.**

Countries that have controlled spread have employed mainly two methods in combination:
* historic tracking
* testing

Our goals:
* Preserve privacy,
* Community driven, but can also utilize verified data,

Can be extended, but the core product is very simple.

 # Background

We need to get a system onto users mobile phones that be extended in the future. 

We are developing a lightweight tracking and alert/contact system that can integrate with verified test results. This system must do everything possible to preserve a high level of privacy and be simple enough that everyone and anyone can use it - with their consent and ensuring security by using private data models which limits transmitting or storing private data on the Guardian servers.

We work with both healthcare, privacy/security and bahavior experts to come up with the best solution.

Guardian will be especially useful as we enter the "long tail" of this pandemic. People will want to get out of their houses and start moving around again. Testing will be increasing. Guardian will help eliminate this pandemic. 

Guardian employes an innovative adjustable privacy model. During a pandemic, and declared emergency, privacy can be reduced to some **extent** - but there still must be limits even if users give consent! **Guardian allows privacy controls to be adjusted to different jurisdictions so as to comply with rapidly changing privacy laws and regulations.** After the emergency is over, privacy must be increased again - but that doesn't mean the pandemic will be over.

*Gates called for a "national tracking system similar to South Korea, saying that "in Seattle, the [University of Washington] is providing thousands of tests per day but no one is connected to a national tracking system" and that "Whenever there is a positive test it should be seen to understand where the disease is and whether we need to strengthen the social distancing."*

# Description

This system needs to work anywhere in the world. The easiest way to do this is to just use mobile phone numbers. 

## Users 
Users install Guardian application on their mobile phone, and then they mostly forget about it. 

Here's what they can do with the application:
* **Receive alerts** when they have been in proximity to someone who has reported symptoms, or has been verified to have tested positive,
* **Report: Self-report symptoms** 
* **Report: Confirm a positive or negative test result**  by Healthcare officials and a Healthcare portal
* **Be contacted** 


Some key points:
* **Alerts are calls-to-action**. They ask the user to do a self-inspection. They remind the user to follow instructions - social distance, handwashing, etc. They ask you to report if you are sick.
* **Historic proximity data is important** - we have to stop staring at maps. What is important your historic location track - who were you close to, and who was close to you. 

## Assumptions

* **People want to do the right thing**, when they are sick they will stay home, 
* **If given the opportunity** they would be willing to anonymously warn others who they might have put at risk. 

We do not plan to track infected persons - because they probably wouldn't give consent anyways.

# Development Plan

This system is going to be developed fast.

## Client Applications
* iOS Application
* Android Application

## Server Backend
* Scalable backend
             
 
## Setup

* `npm i -g expo-cli`
* `npm i -g react-native-cli`
* `expo start`

### Running ios

* We need background location support https://docs.expo.io/versions/latest/guides/adhoc-builds/
* Install custom expo client to allow that location support
* `yarn ios`

### Running android

* Install android emulator https://docs.expo.io/versions/latest/workflow/android-studio-emulator/

### Run Web

* `npm run web`

### Running on device

* Install expo on mobile device
* `expo start`
* Scan QR code provided

### test

* `npm run test`
* `npm run test:watch`
 

(c) 2020 Thomas O'Rourke
