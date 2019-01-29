<?php
    function og_display_outgrow_calci($atts,$content,$tag){
        
	$values = shortcode_atts(array(
        'type' => '',
        'id' => '',
        'data_url' => '',
        'short_url' => ''
	),$atts);  
    

	
	//based on input determine what to return
	$output = '';
	  // $a=$values['id'];
        // $b=$values['data_url'];
        // $c=$values['_url']
        // print_r("-----------------------------.$values[id].--------------------.$values[data_url].---------------$values[short_url]");
        if($values["type"] == "mobile_full_screen" ){
            $output = "<div><div class='op-interactive' id='$values[id]' data-url='$values[data_url]' data-surl='$values[short_url]' data-width='100%'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/sloader.js'></script><script>initIframe('$values[id]');</script></div>";
            print_r(console.log('$values[id]'));
        }else if($values["type"] == "mobile_in_page" ){
            $output = "<div><div class='op-interactive' id='$values[id]' data-url='$values[data_url]' data-surl='$values[short_url]' data-width='100%'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";
        }else if($values["type"] == "pop_up" ){
            // $output = "<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-p' data-type='outgrow-l' data-url= data-url='$values[data_url]' data-text='Get Started'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";
            $output="<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-p' data-type='outgrow-l'  data-url='$values[data_url]' data-text='Get Started'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";

        }
		print_r("----Shortcode editing----")
	return $output;
	
}

add_shortcode('outgrow','og_display_outgrow_calci');

?>