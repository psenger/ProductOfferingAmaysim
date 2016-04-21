# Product Offering Amaysim

Written by Philip A Senger

[philip.a.senger@cngrgroup.com](mailto:philip.a.senger@cngrgroup.com) | mobile: 0404466846 | [CV/Resume](http://www.visualcv.com/philipsenger) | [blog](http://www.apachecommonstipsandtricks.blogspot.com/) | [LinkedIn](http://au.linkedin.com/in/philipsenger) | [twitter](http://twitter.com/PSengerDownUndr)

This application is a simple NodeJS REST application designed to distribute Product Offering for Amaysim Technical Examine. Amaysim has a number of different plans that they offer to customers. These are currently curated and managed across multiple different systems and data sources. We have identified that this is a prime candidate to be extracted into a centralised product catalogue micro-service. This service will expose product (plan) data out to multiple clients, internal and external. It should be accessed via an API over HTTP.

[![Build Status](https://travis-ci.org/psenger/product-offering-amaysim.svg?branch=master)](https://travis-ci.org/psenger/product-offering-amaysim)

- API version: 1.0.0
- Package version: 1.0.0
- Build date: 2016-04-21T06:11:09.193Z

## Installation

### For [Node.js](https://nodejs.org/)

- requires 4.2 or higher

### For [NPM](https://www.npmjs.com/)

- requires 3.0 or higher

### For [Git](https://github.com/)

- This product is hosted at a github, and you need to download it [product-offering-amaysim](https://github.com/psenger/product-offering-amaysim)

### For [Travis-ci](https://travis-ci.org/)

- This product uses Continuous Integration / Testing on [Travis CI](https://travis-ci.org/psenger/product-offering-amaysim)

## Environment Variables

Running this product requires two environment variables to be set. In produciton you will set the container or vm environment variables. However, in dev you will edit the [.env](https://github.com/psenger/product-offering-amaysim/blob/master/.env) file. Refer to the file for documentation and instructions on how to use it. 

| Property | Required | Type    | values                                 | Description                                                                                                                           |
|:---------|:---------|:--------|:---------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------| 
| NODE_ENV | false    | string  | 'development', 'production', or 'test' | Defaults to development. The environment setting 'development', 'production', or 'test'                                               |
| PORT     | false    | integer |  3000                                  | The Port to run the server on, 80 is usually a good port :) In production it is 3000 because nginx is configured to talk to that port |


## Documentation for API Endpoints

All URIs are relative to *http://api.amaysim.com.au/api*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*ProductOfferings.DefaultApi* | [**productsGet**](docs/DefaultApi.md#productsGet) | **GET** /products/ | 
*ProductOfferings.DefaultApi* | [**productsIdGet**](docs/DefaultApi.md#productsIdGet) | **GET** /products/{id} | 


## Documentation for Models

 - [ProductOfferings.Error](docs/Error.md)
 - [ProductOfferings.IsA](docs/IsA.md)
 - [ProductOfferings.Link](docs/Link.md)
 - [ProductOfferings.ProductV1](docs/ProductV1.md)


## Documentation for Authorization

 All endpoints do not require authorization.



## Items to be address before release

### X-rate anti-ddos 

If this product is to be public facing, it will require a x-rate 

### SSL needs to be done

SSL was never discussed as a requirement but should be considered. Usually, not always, REST services are by default are served with SSL. This is simply done so if there is confidential information in the payload it will not be compromised. 

### do we need a API-Key or is this open?

### Missing values for the terms and conditions

### pagination ?

### Cross-origin resource sharing (CORS)

There was no requirement for CORS, this means the application will only work in a http domain from whence it is deployed. I decided to turn it on.

### Cache

I suggest we build a LRU Map, or some strategy, this data looks like it changes very little. 

## Design Factors

I decided to use Restify because Express is targeted at browser applications and contains functionality not needed, such as templating and rendering. Additionally, Restify has mechanisms in place to handle error rest clients.. reducing the amount of code I needed to create.

# Running 

There are two environment variables that determine the configuration files hierarchy and user overrides. They are: