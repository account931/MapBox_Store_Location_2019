$(document).ready(function(){
	//audio is PLAYER 
	 var audio = document.getElementById("audio"); //gets player html el ID //make this var global to pass to $("#myCheck").click(function() + $(".control_play").click(function()
	 var trackID;
	 
	 
	 
	 
	
    //Click on play/puase button in  song lists
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	$(".control_play").click(function() {   // $(document).on("click", '.circle', function() {   // this  click  is  used  to   react  to  newly generated cicles;	
	
	    //If u click on "Pause" button to stop the song
	    if ($(this).hasClass('fa-pause')){   //if is playing
		    audio.pause();
            audio.currentTime = 0;
		    $(this).removeClass("fa-pause").addClass("fa-play"); //sets icons to "PLAY" icon
		    $(".eqSmall").remove();  //removes any eqs
		
		    return false; //stop further
		
	    } else { //paused, do Play it 
	  
	        trackID = this.id;  //global varibale to use in code
            playThisTrack(this.id); // function to play the clicked track
	        //changePlayPauseIcon($(this));  // function to change play/pause icons in song list,  works when u change songs in all song list -> reassigned to {function universalFunctionChange_Play_Pause_Icon_hideShow_EQ()}
            //showOrHideCustomEQinAllSongList($(this));	//show/hide EQ in a current  song all song list	  -> reassigned to {function universalFunctionChange_Play_Pause_Icon_hideShow_EQ()}
	        
			//Universal function to Show/hide EQ <img> + to change Play/Pause Icons, works on Click on class="control-play-pause-EQ', that is embeded both in audio.Player and Play Button in all songs list
	        universalFunctionChange_Play_Pause_Icon_hideShow_EQ();
		}
		
		
		
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
    //Click on class="control-play-pause-EQ" in audio.PLAYER      //FALSE->  that is embeded both in audio.Player and Play Button in all songs list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	$(".control-play-pause-EQ").click(function() {     // this  click  is  used  to   react  to  newly generated cicles;
	
       //Universal function to Show/hide EQ <img> + to change Play/Pause Icons, works on Click on class="control-play-pause-EQ', that is embeded both in audio.Player and Play Button in all songs list
	    universalFunctionChange_Play_Pause_Icon_hideShow_EQ();
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function playThisTrack(idX)
	{
       ///*var*/ audio = document.getElementById("audio"); //gets player html el ID //make this var global to pass to $("#myCheck").click(function() { 
	   audio.src='mp3/' + idX;   //gets the id of clicked song that is also the path
       audio.load();
       audio.play();
	   
	   //function sets Player Song title
	   setPlayerSongTitle(idX);
     }
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Playing one song on RELOOP  -> Changing Checkbox for reloop, checks if to repeat one song
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	$("#myCheck").click(function() { 
	    if ($("#myCheck").is(':checked') ){  //if u selected looping in Checkbox
	        audio.loop = true;    
	    } else {
		   audio.loop = false; 
	    }
	});
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	//Creates an JS array with all songs to use in PlayAll function-> in {$("#audio").bind('ended', function()
	var js_AllSongsArray = [];
	
	//iterates over all class="songCount", adding every song to array
	 $(".songCount").each(function(){   //every song has a button class="songCount", we use it as a marker to find all songs generated by Php-> Classes/MpServerList.php
		 var song = $(this).children(":first").attr('id'); //gets the id of 1st child in <button> tag, which contains song's name
		 js_AllSongsArray.push(song);  //adds song to array
	 });
	
	
	
	
	//Play next songs
	// Happens/Triggered When Player Song ENDS
	//Makes Playing all songs in a queque, if reloop (repeat one song) Checkbox is OFF. Event happens when the song ends!!!!!!!
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	window.trackName;  //must be global window to use in scrollResults()
	$("#audio").bind('ended', function(){
        // done playing 
		
		if ($("#myCheck").is(':checked')== false ){  //if Reloop is OFF -Play all songs 
		   var trackID = audio.src.split('/mp3/');  //gets current song in Player and splits the path(folder/mp3/song55.mp3) by  '/mp3/'
           var trackName = trackID[trackID.length - 1];  //gets the last array elem (i.e song name itself)
		   
		   var number = js_AllSongsArray.indexOf(trackName); //found the position/number of the current playing song in js_AllSongsArray[]
		   //alert(number);
		   
		   //Play next songaudio.src='mp3/' + idX;   //gets the id of clicked song that is also the path
		   audio.src='mp3/' + js_AllSongsArray[number + 1];
           audio.load();
           audio.play();
		   
		   //function sets Player Song title
		   setPlayerSongTitle(js_AllSongsArray[number + 1]);
		   
		   // change current song icon to "Play", next song icon to "Pause" in all songs list---------
		   //alert(audio.src);
		   /*
		    var trackID = audio.src.split('/mp3/');  //gets current song in Player and splits the path(folder/mp3/song55.mp3) by  '/mp3/'
            var trackName = trackID[trackID.length - 1]; //alert(trackName ); //gets the last array elem (i.e song name itself)
		    //Mega ERROR FIX-> some songs(and therefore their ids) contain "." which cause crash when trying to address those ids without using escape strings "\\"
		    trackName = trackName.split('.').join('\\.');  //changes {6-calf-doubleR.mp3} to {6-calf-doubleR\\.mp3}
			$(".control_play").removeClass("fa-pause").addClass("fa-play"); //sets all icon to "Play"
		    $("#" + trackName).removeClass("fa-play").addClass("fa-pause"); //sets now next playing to "Pause"
			// END change current song icon to "Play", next song icon to "Pause" in all songs list ------
			*/
			
			universalFunctionChange_Play_Pause_Icon_hideShow_EQ();
			
			//functions removes all EQs images from all_song_list and set EQ image to current song only
			//showOrHideCustomEQinAllSongList($("#" + trackName));
			//PUT NEW HERE!!!!!!!!!!!
			
			
			//function to scroll down to current song, window is a must
		   scrollResults( "#" + window.trackName, ".parent().parent().");  //arg(DivID, levels to go up from DivID)
		  
		}
    });
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	//sets song name in Player
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function setPlayerSongTitle(name)
	{
		$("#playerSongTitle").stop().fadeOut(/*"slow"*/ 600,function(){ $(this).html(  name )}).fadeIn(800);
	}
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	//Universal function to Show/hide EQ <img> + to change Play/Pause Icons, works on Click on class="control-play-pause-EQ', that is embeded both in audio.Player and Play Button in all songs list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	   
	
	   function  universalFunctionChange_Play_Pause_Icon_hideShow_EQ()
	   {
		   //if no mp3 loaded in Player(i.e if clicked on Player play button right after page load)
		   if(audio.src==""){
			   alert("No mp3 selected");
			   return false;
		   }
		   
		   //finding current audio Player song (i.e id which equils song name)
		    var trackID = audio.src.split('/mp3/');  //gets current song in Player and splits the path(folder/mp3/song55.mp3) by  '/mp3/' -> gets [folder, song55.mp3]
	        /*var*/ trackName = trackID[trackID.length - 1];  //gets the last array elem (i.e song name itself) //GLOBALLY declared before {$("#audio").bind('ended',} to be visible in {scrollResults()}
			//alert(trackName);
		    //Mega ERROR FIX-> some songs(and therefore their ids) contain "." which cause crash when trying to address those ids without using escape strings "\\"
		    trackName = trackName.split('.').join('\\.');  //adds escape slashes, changes {6-calf-doubleR.mp3} to {6-calf-doubleR\\.mp3}
		   //finding current audio Player song (i.e id which equils song name)
		   //alert(trackName);
		   
		    //If player is playing now, so after clicking it stops playing. Makes all icons with "Play" Icon
	        if (audio.duration > 0 && !audio.paused) {
            //Its playing...do your job
			    //change current song icon to "Pause",  in all songs list
			    $(".control_play").removeClass("fa-pause").addClass("fa-play"); //sets all icon to "Play" icon
				//$("#" + trackName).removeClass("fa-play").addClass("fa-pause"); //sets only playing song with "Pause" Icon // ERROR in this line
				
				
				//remove all EQs
		        $(".eqSmall").remove(); //removes any eqs
				
				
            } else {  
			//Not playing...maybe paused now, stopped or never played.
		    //set 'Play' icon in all song list, according to Id of song playing in Player
            
			
			    // change current song icon to "Pause",  in all songs list------------
				$(".control_play").removeClass("fa-pause").addClass("fa-play"); //sets all icon to "Play" icon
		        $("#" + trackName).removeClass("fa-play").addClass("fa-pause");
                // END change current song icon to "Pause",  in all songs list---------
		  
		        //adds EQ 
				//{passedThis} is $(this), we go up 2 levels to parent div {parent().parent()} and append inside in the end of it image
				$(".eqSmall").remove();  //removes any eqs
				//adds eq to a specific song
		        $("#" + trackName).parent().parent().append("<img class='eqSmall' src='images/eq.gif' alt='eq' />");

        }
		//return trackName;
	   }
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	/*
	
	
	//RECONSTRUCT!!!!!!!!!!!!!!!!! -> reassigned to {function universalFunctionChange_Play_Pause_Icon_hideShow_EQ()}
	//function to change play/pause icons in song list, works when u change songs in all song list
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function changePlayPauseIcon(thisObject)
	{
        $(".control_play").removeClass("fa-pause").addClass("fa-play");
        thisObject.removeClass("fa-play").addClass("fa-pause");
	}
	 
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	//RECONSTRUCT!!!!!!!!!!!!!!!!! -> reassigned to {function universalFunctionChange_Play_Pause_Icon_hideShow_EQ()}
	//function to change play/pause icons in song list, works when u click play/pause in player itself
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	$("#audio").click(function() { 
	    //If player is playing now, so after clicking it stops playing. Makes all icons with "Play" Icon
	    if (audio.duration > 0 && !audio.paused) {
            //Its playing...do your job
			$(".control_play").removeClass("fa-pause").addClass("fa-play");

        } else {  
		    //set 'Play' icon in all song list, according to Id of song playing in Player
            //Not playing...maybe paused, stopped or never played.
			
			// change current song icon to "Play", next song icon to "Pause" in all songs list------------
            var trackID = audio.src.split('/mp3/');  //gets current song in Player and splits the path(folder/mp3/song55.mp3) by  '/mp3/'
            var trackName = trackID[trackID.length - 1];  //gets the last array elem (i.e song name itself)
		    //Mega ERROR FIX-> some songs(and therefore their ids) contain "." which cause crash when trying to address those ids without using escape strings "\\"
		    trackName = trackName.split('.').join('\\.');  //changes {6-calf-doubleR.mp3} to {6-calf-doubleR\\.mp3}
		    $("#" + trackName).removeClass("fa-play").addClass("fa-pause");
            // END  change current song icon to "Play", next song icon to "Pause" in all songs list---------
		  
		  //show equalizer
		  //$("#equalizer").attr("src","images/eq.gif");
        }
	
	});
	
	
	
	
	
	
	
	// RECONSTRRUCT!!!!!!!!!!!!!!! -> reassigned to {function universalFunctionChange_Play_Pause_Icon_hideShow_EQ()}
	////functions removes all EQs images from all_song_list and set EQ image to current song only
	////remove all EQs images from all song list and set EQ image to current song only
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function showOrHideCustomEQinAllSongList(passedThis){
		
		//remove all EQs
		$(".eqSmall").remove();
		
	    //{passedThis} is $(this), we go up 2 levels to parent div and append inside in the end of it image
		passedThis.parent().parent().append("<img class='eqSmall' src='images/eq.gif' alt='eq' style='width:10%;margin-left:2em;'/>");
		
	}
	
	
	
	
	
	*/
	
	
	
	
	
	
	
	//======================================================== DONOR ===============================================================
	
	
	
	
	
	
	
	
	// Scroll the page to results  #resultFinal
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	function scrollResults(divName, parent)  //arg(DivID, levels to go up from DivID)
	{   //if 2nd arg is not provided while calling the function with one arg
		if (typeof(parent)==='undefined') {
		
            $('html, body').animate({
                scrollTop: $(divName).offset().top
                //scrollTop: $('.your-class').offset().top
             }, 'slow'); 
		     // END Scroll the page to results
		} else {
			//if 2nd argument is provided
			var stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
			$('html, body').animate({
                scrollTop: eval(stringX)         //eval is must-have, crashes without it
                }, 'slow'); 
		}
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	 // **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	
	function scroll_toTop() 
	{
	    $("html, body").animate({ scrollTop: 0 }, "slow");	
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************

});
// end ready	
	