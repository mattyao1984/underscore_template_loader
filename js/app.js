/* Global object to load external templates */
var templateLoader = (function($,host){
    //Loads external templates from path and injects in to page DOM
    return{
        //Method: loadExtTemplate
        //Params: (string) path: the relative path to a file that contains template definition(s)
        loadExtTemplate: function(path){
            //Use jQuery Ajax to fetch the template file
            var tmplLoader = $.get(path)
                .success(function(result){
                    //On success, Add templates to DOM (assumes file only has template definitions)
                    $("body").append(result);
                })
                .error(function(result){
                });

            tmplLoader.complete(function(){
                //Publish an event that indicates when a template is done loading
                $(host).trigger("TEMPLATE_LOADED", [path]);
            });
        }
    };
})($, document);

/* Main app functions */
var myApp = (function(){
	var obj = {
		init: function(){
			templateLoader.loadExtTemplate("./templates/homeTemplate.html");

			$(document).bind("TEMPLATE_LOADED", function(e, path) {
				var homeTemplate = $("#page-home").html();
				var data = {
					name: 'Matt Yao',
					date: '2015.03.02'
				};
				var compiledTemplate = _.template(homeTemplate, data);
				$("#template-loader").html(compiledTemplate);
			});
		}
	};

	return obj;
}());

$(function(){
	myApp.init();
}());