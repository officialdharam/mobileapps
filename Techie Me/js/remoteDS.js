var d = new kendo.data.DataSource({
    transport: {
        read: {
            // the remote service url
            url: "http://techieme.in/wp-json/taxonomies/category/terms",

            // the request type
            type: "get",

            // the data type of the returned result
            dataType: "json",

            /*// additional custom parameters sent to the remote service
            data: {
                lat: 42.42,
                lon: 23.20,
                cnt: 10
            }*/
        }
    },
    // describe the result format
    schema: {
        // the data, which the data source will be bound to is in the "list" field of the response
        data: ""
    }
});