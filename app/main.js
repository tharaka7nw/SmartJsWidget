require(["jquery", 'templates', 'text!compile/css/styles.min.css'], function($, templates, css) {
 
    "use strict";

    $(function() {

        //Attach css file to DOM
        var $style = $("<style></style>", {type: "text/css"});
	    $style.text(css);
	    $("head").append($style);

	    //Apply 'cleanslate' class
	    var $widgetContainer = $("#smart_widget");
	    $widgetContainer.addClass("cleanslate");    

	    //Loading widget	    
	    var widgetTemplate = templates["app/templates/widget.html"];
	    $widgetContainer.append(widgetTemplate({ message: "Widget message goes here" }));
	    
    });
});