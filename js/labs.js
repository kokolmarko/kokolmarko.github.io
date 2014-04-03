$(document).ready(function(){

	semLabs.initMenu();
	
	try{
		convertEmails();
		}catch(e){
			//alert(e.message);
		}

	
	$("#homepage").parent().attr("id", "homepagebody");
	
	$("#hamMenu").click(function(){
		if($("#nav").hasClass("menu-opened")){
			$("#nav").css("max-height","0");
			$("#nav").removeClass("menu-opened");
			$("#homepage #banner").show();
		}else{
			
			$("#nav").css("max-height","999px");
			$("#nav").addClass("menu-opened");
			$("#homepage #banner").hide();
		}
	});
	
	$("#homepage ul.nav-footer").append("<br class='clear'/>");
	
	if(document.referrer.indexOf("/search") != -1 && document.URL.indexOf("/search")==-1){
		//$("#search").append("<a style='display:block; font-size:0.8em; text-align:center;' href='"+document.referrer+"'>Back to search results</a>");
		
		$("div.tabs ul").prepend("<li>"+"<a href='"+document.referrer+"'>← Back to search results</a>"+"</li>");
	}
	
	if($("#homepage").length <= 0){
		$("footer").attr("id", "nothomepagefooter");
	}
	
	//select gallery tag if selected
	

	sortTagsListOneLevel();
	
	initApiMenu();
		 
});

function repageDatasets()
{
		$("div.pagination-holder").jPages({
	    	containerID : "SpacesList",
	    	perPage: 5
	    });;
		
}

function extractEmails (text)
{
    return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
}

function GetUnique(inputArray)
{
    var outputArray = [];
    
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) == -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
   
    return outputArray;
}


function convertEmails() {
	
	var bodyHtml = $("body").html();	
	var emails = extractEmails($("body").html());
	
	$.each(emails, function( index, value ) {
	  bodyHtml = bodyHtml.replace("<a href=\"mailto:"+value+"\">"+value+"</a>", value);
	});
	
	var Uniqemails = GetUnique(emails);
	
	$.each(Uniqemails, function( index, value ) {
	  bodyHtml = bodyHtml.replace(value, "<a href='mailto:"+value+"'>"+value+"</a>");
	});
	
	$("body").html(bodyHtml);

}

var semLabs = {
	initMenu:function(){
		$("nav a").removeClass("current");
		
		var baseUrl = $("a.logo").attr("href").toString();
		var currentUrl = window.location.pathname;
		
		$("nav a").each(function(){
			if(currentUrl.match("^"+$(this).attr("href"))){
				$(this).addClass("current");
			}
		});
		
		if($("nav a.current").length>1){
			$("nav a:first").removeClass("current");
		}	
	}
};

function sortTagsListOneLevel(){
  var mylist = $('ul.tags');
  var listitems = mylist.children('li').get();

  listitems.sort(function(a, b) {
    var compA = $(a).find("a").text().toUpperCase();
    var compB = $(b).find("a").text().toUpperCase();
    return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
  });
  $.each(listitems, function(idx, itm) { 
    mylist.append(itm); 
  });
}


function initApiMenu()
{
			
			$("ul a.menuTrigger").click(function(e){
				//alert("OK");
				$(this).parent().find("ul.notabs").slideToggle();
				return e.preventDefault();
			});
			
			
			$("ul.notabs li a").removeClass("current");
			var baseUrl = $("a.logo").attr("href").toString();
			var currentUrl = window.location.pathname;
			
			$("ul.notabs li a").each(function(){
				if(currentUrl.match("^"+$(this).attr("href")+"(/?)$")){
					$(this).addClass("current");
					$(this).parent().parent().parent().find("a:first").click();
				}
			});	


}

