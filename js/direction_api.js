//Directions Api-> draw route between two selected points

var clickedCoords; //coords of clicked place

(function(){ //START IIFE (Immediately Invoked Function Expression)

  $(document).ready(function(){
	
	
	
	
    //
    // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	var start_end_array = [];
	
	
    $(document).on("click", '#addRoute', function() {   // this  click  is  used  to   react  to  newly generated cicles;
	    console.log(clickedCoords);
	    var res = clickedCoords.toString().match(/\(.*?\)/g); //{toString()} is a must // finds anything in ();
		var res2 = res.toString().replace(/\(/g, "").replace(/\)/g, ""); //removes ()
		//alert(res2);
		
		var clearArrayText = "<span id='clearArray'>X</span>";
		
		if(typeof start_end_array[0] === 'undefined'){
			start_end_array[0] = res2;
			var t = "from: " + start_end_array[0] + clearArrayText;
		} else {
			start_end_array[1] = res2;
			var t = "from: " + start_end_array[0] + clearArrayText + "<br> to___: " + start_end_array[1];
		}
		
		
		$("#start_end_direction_info").stop().fadeOut("slow",function(){ $(this).html(t)}).fadeIn(2000);
	});//end click
		
		
		
	






     $(document).on("click", '#start_end_direction_info', function() {   // this  click  is  used  to   react  to  newly generated cicles;	
	     $("#start_end_direction_info").stop().fadeOut("slow",function(){ $(this).html("")}).fadeIn(2000); //clears 
		 start_end_array = [];
     });//end click


  });
  // end ready	
	
	
	
}()); //END IIFE (Immediately Invoked Function Expression)
