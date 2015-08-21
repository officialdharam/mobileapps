var app;

(function () {
    var timeout = 10000;
    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        $("#homePage").slideDown(function () {

        });

        app = new kendo.mobile.Application(document.body, {
            skin: 'flat',
            transition: 'slide'
        });
    }, false);

    var d = new kendo.data.DataSource({
        transport: {
            read: {
                // the remote service url
                url: "http://techieme.in/mobile-app/categories.json",

                // the request type
                type: "GET",

                // the data type of the returned result
                dataType: "json",
            }
        },
        schema: {
            model: {
                fields: {
                    name: {
                        from: "name",
                        type: "string"
                    }
                }
            }
        }

    });

    window.getCategories = function () {
        var t = kendo.template($("#category-template").html());
        var loaded = false;
        if (app)
            app.showLoading();
        setTimeout(function () {
            if (!loaded) {
                app.hideLoading();
                $("#goback").data("kendoMobileModalView").open();
            }
        }, timeout);

        d.fetch(function () {
            var books = d.data();
            app.hideLoading();
            loaded = true;
            $("#category-list").html(kendo.render(t, books));
        });

    }

    window.getSubCategories = function (e) {
        var id = e.view.params.slug;
        var subCategory;
        var categories = d.data();
        for (var i = 0; i < categories.length; i++) {
            if (categories[i].id == id) {
                subCategory = categories[i].subcategories;
                break;
            }
        }
        var t = kendo.template($("#subcategory-template").html());
        $("#sub-category-list").html(kendo.render(t, subCategory));
    }

    window.getPosts = function (e) {
        var t = kendo.template($("#posts-template").html());
        var id = e.view.params.slug;
        var posts;
        var found = false;
        var categories = d.data();
        for (var i = 0; i < categories.length; i++) {
            var subCat = categories[i].subcategories;
            for (var j = 0; j < subCat.length; j++) {
                var sub = subCat[j];
                if (sub.id == id) {
                    posts = sub.posts;
                    found = true;
                    break;
                }
            }
            if (found === true)
                break;
        }
        $("#post-list").html(kendo.render(t, posts));
    }

    var de;

    function readPost(urlTest) {
        de = new kendo.data.DataSource({
            transport: {
                read: {
                    // the remote service url
                    url: urlTest,

                    // the request type
                    type: "GET",

                    // the data type of the returned result
                    dataType: "json",
                }
            },
            schema: {
                model: {
                    fields: {
                        title: {
                            from: "title",
                            type: "string"
                        },
                        content: {
                            from: "content",
                            type: "string"
                        },
                        slug: {
                            from: "slug",
                            type: "string"
                        },
                        excerpt: {
                            from: "excerpt",
                            type: "string"
                        }
                    }
                }
            }

        });
    }

    window.getPostSingular = function (posturl) {
        var loaded = false;
        if (app)
            app.showLoading();
        setTimeout(function () {
            if (!loaded) {
                app.hideLoading();
                $("#goback").data("kendoMobileModalView").open();
            }
        }, timeout);
        de = null;

        $("#post").html("");
        var BASEURL = "http://techieme.in/mobile-app/" + posturl;
        readPost(BASEURL);
        de.fetch(function (e) {
            var post = de.data()[0];
            $("#navbar").data("kendoMobileNavBar").title(post.title);
            $("#post").html(post.content);
            app.hideLoading();
            loaded = true;
            var scroller = app.view().scroller;
            if (scroller.scrollTop) {
                scroller.scrollTo(0, 0);
            }
        });
    }

    window.getPost = function (e) {
        var url = e.view.params.slug;
        window.getPostSingular(url);
    }
}());