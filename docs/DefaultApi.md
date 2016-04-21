# ProductOfferings.DefaultApi

All URIs are relative to *http://api.amaysim.com.au/api*

| Method                              | HTTP request           | Description |
|:------------------------------------|:-----------------------|:------------|
| [**productsGet**](#productsGet)     | **GET** /products/     |             |
| [**productsIdGet**](#productsIdGet) | **GET** /products/{id} |             |


<a name="productsGet"></a>
# **productsGet**
> [ProductV1] productsGet(opts)



The complete Amaysim product catalog. This is a full non-paginated array. Order is non-deterministic

### Example
```javascript
var ProductOfferings = require('product-offerings');

var apiInstance = new ProductOfferings.DefaultApi()

var opts = { 
  'acceptVersion': "acceptVersion_example" // {String} Support for [semver](http://semver.org/) versioning in an `Accept-Version` header. The Api will choose the highest matching value if none is supplied.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.productsGet(opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **acceptVersion** | **String**| Support for [semver](http://semver.org/) versioning in an &#x60;Accept-Version&#x60; header. The Api will choose the highest matching value if none is supplied. | [optional] 

### Return type

[**[ProductV1]**](ProductV1.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

<a name="productsIdGet"></a>
# **productsIdGet**
> ProductV1 productsIdGet(id, opts)



Amaysim product catalogue by code.\n

### Example
```javascript
var ProductOfferings = require('product-offerings');

var apiInstance = new ProductOfferings.DefaultApi()

var id = "id_example"; // {String} Extract a specific product offering by it's unique id.\n

var opts = { 
  'acceptVersion': "acceptVersion_example" // {String} Support for [semver](http://semver.org/) versioning in an `Accept-Version` header. The Api will choose the highest matching value if none is supplied.
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.productsIdGet(id, opts, callback);
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Extract a specific product offering by it&#39;s unique id.\n | 
 **acceptVersion** | **String**| Support for [semver](http://semver.org/) versioning in an &#x60;Accept-Version&#x60; header. The Api will choose the highest matching value if none is supplied. | [optional] 

### Return type

[**ProductV1**](ProductV1.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

