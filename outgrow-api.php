<?php
/*
Plugin Name: Outgrow API 
description: Outgrow provides Calculators, Quizzes and Polls which you have created at your account.
Setting up configurable fields for our plugin.
Author:  Outgrow
Version: 1.0.0
*/

//  include_once "callingDb.php";

// $apis=array();

// static $cArray=[];
 class Outgrow_API_Class {
 
    /**
    * Constructor. Called when the plugin is initialised.
    */
    function __construct() {
 
 		if ( is_admin() ) {
			add_action( 'init', array( &$this, 'setup_tinymce_plugin' ) );
		    add_action( 'admin_enqueue_scripts', array( &$this, 'admin_scripts_css' ) );
		}

		static $header_script1;
    }

    /**
	* Check if the current user can edit Posts or Pages, and is using the Visual Editor
	* If so, add some filters so we can register our plugin
	*/
	function setup_tinymce_plugin() {
	 
	    // Check if the logged in WordPress User can edit Posts or Pages
	    // If not, don't register our TinyMCE1 plugin
	    if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
	        return;
	    }
	 
	    // Check if the logged in WordPress User has the Visual Editor enabled
	    // If not, don't register our TinyMCE1 plugin
	    if ( get_user_option( 'rich_editing' ) !== 'true' ) {
	        return;
	    }
	 
	    // Setup some filters
	    add_filter( 'mce_external_plugins', array( &$this, 'add_tinymce_plugin' ) );
	    add_filter( 'mce_buttons', array( &$this, 'add_tinymce_toolbar_button' ) );
        add_action( 'wp_enqueue_scripts', 'wpse_tinymce_scripts' );

	}

	/**
	 * Adds a TinyMCE1 plugin compatible JS file to the TinyMCE1 / Visual Editor instance
	 *
	 * @param array $plugin_array Array of registered TinyMCE1 Plugins
	 * @return array Modified array of registered TinyMCE1 Plugins
	 */
	function add_tinymce_plugin( $plugin_array ) {
	 
	    $plugin_array['custom_class'] = plugin_dir_url( __FILE__ ) . 'tinymce-custom-class.js';
	    return $plugin_array;
	 
	}

	/**
	 * Adds a button to the TinyMCE1 / Visual Editor which the user can click
	 * to insert a custom CSS class.
	 *
	 * @param array $buttons Array of registered TinyMCE1 Buttons
	 * @return array Modified array of registered TinyMCE1 Buttons
	 */
	function add_tinymce_toolbar_button( $buttons ) {
	 
	    array_push( $buttons, 'custom_class' );
	    return $buttons;
	 
	}

	/**
	* Enqueues CSS for TinyMCE1 Dashicons
	*/
	function admin_scripts_css() {

		wp_enqueue_style( 'TinyMCE1-custom-class', plugins_url( 'tinymce-custom-class.css', __FILE__ ) );
		// add_menu_page("Outgrow", "Outgrow", "manage_options", 'final_outgrow_calci_menu', "og_outgrow_calci_script_page", "dashicons-cake", 50);
	}

}


// add_action( 'calling_db_script_enq', 'calling_db_scripts');

$outgrow_api_class = new Outgrow_API_Class;


// ....others....
// static $header_script1;
static $cookie_value;

// static $apiArray="API";
static $apiArray=array();
// include_once "fetch.php";
add_action("admin_menu", "og_outgrow_calci");

wp_register_script('my_plugin_script', plugins_url('/js/script.js', __FILE__), array(
    'jquery'
));
wp_enqueue_script('my_plugin_script');

wp_register_style('my-plugin-style4', 'https://fonts.googleapis.com/icon?family=Material+Icons');
wp_enqueue_style('my-plugin-style4');

wp_register_style('my-plugin-style', plugins_url('outgrowPlugin/css/style.css'));
wp_register_style('my-plugin-style2', plugins_url('outgrowPlugin/css/line-awesome/css/line-awesome-font-awesome.css'));
wp_register_style('my-plugin-style3', plugins_url('outgrowPlugin/css/line-awesome/css/line-awesome.css'));
wp_enqueue_style('my-plugin-style');
wp_enqueue_style('my-plugin-style2');
wp_enqueue_style('my-plugin-style3');
wp_register_script( 'my_plugin_script2', 'https://code.jquery.com/jquery-3.3.1.min.js', array(), null, false );
wp_enqueue_script('my_plugin_script2');
wp_register_script( 'my_plugin_script3', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', array(), null, false );
wp_enqueue_script('my_plugin_script3');
// fonts
wp_register_style('fonts1','https://fonts.googleapis.com/css?family=Montserrat',array(),null,false);
wp_enqueue_style('fonts1');
wp_register_style('fonts2','https://fonts.googleapis.com/css?family=Montserrat:300',array(),null,false);
wp_enqueue_style('fonts2');
// font ends

register_activation_hook(__FILE__, 'og_outgrow_calci_api_table');
register_activation_hook(__FILE__, 'og_outgrow_calci_table');
register_deactivation_hook(__FILE__, 'og_deactivation_table');

function og_enqueue_script(){
	wp_enqueue_script('ajax', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'); 
}
add_action('wp_enqueue_scripts','og_enqueue_script');
// add_action('wp_enqueue_styles','og_enqueue_stylesheets');

// ends
function og_outgrow_calci(){
    add_menu_page("Outgrow", "Outgrow", "manage_options", 'final_outgrow_calci_menu', "og_outgrow_calci_script_page", "dashicons-cake", 50);
    // add_menu_page("Outgrow", "Outgrow", "manage_options", 'final_outgrow_calci_menu', "og_outgrow_calci_script_page",'', 50);

}

// ..................adding dropdown buttons...................
function wdm_add_mce_button() {
    // check user permissions
    if ( !current_user_can( 'edit_posts' ) &&  !current_user_can( 'edit_pages' ) ) {
               return;
       }
   // check if WYSIWYG is enabled
   if ( 'true' == get_user_option( 'rich_editing' ) ) {
       add_filter( 'mce_external_plugins', 'wdm_add_tinymce_plugin' );
       add_filter( 'mce_buttons', 'wdm_register_mce_button' );
       }
}
add_action('admin_head', 'wdm_add_mce_button');


// register new button in the editor
function wdm_register_mce_button( $buttons ) {
    array_push( $buttons, 'wdm_mce_dropbutton' );
    return $buttons;
}


// declare a script for the new button
// the script will insert the shortcode on the click event
function wdm_add_tinymce_plugin( $plugin_array ) {
  $plugin_array['wdm_mce_dropbutton'] =  plugins_url('outgrowPlugin/tinymce-custom-class.js');
  return $plugin_array;
}

// ........................ends...................



// include_once "database.php"; 

if(isset($_POST['ajax']) && isset($_POST['show_data'])){
    //  echo $_POST['name']; 
    // abc();
     exit;
}
	
// Cookies area
    include_once "cookies.php";
// cookies area ends

if (isset($_POST['header_script1'])) {
    if($_POST['header_script1']!=""){
        $out=checkRepeat($_POST['header_script1']);
        if($out!="present"){
        global $wpdb;
        $apiKey     = sanitize_text_field($_POST['header_script1']);
        $table_name = 'wp_outgrow_calci_table';
        $headers    = array(
            'API-KEY' => $apiKey
        );
        // live api
        $request    = Requests::get('https://api-calc.outgrow.co/api/v1/calculator?status=Live&type=All&sort=alpha_as', $headers);
        $res        = json_decode($request->body);
        $res2       = json_encode($res->data);
        $res3       = json_decode($res2);
        $meta        = array();
        if($res->data){
            $calci_count = count($res->data);
        }
       

        if ($res->success == "true" || $res->code != 401 && $calci_count>0) {
            if ($wpdb->insert('wp_outgrow_calci_api_table', array(
                'api_key' => $apiKey
            )) == false ) {
            } 
            $count=0;
            for ($i = 0; $i < $calci_count; $i++) {
                $url1=explode('{',$res3[$i]->calc_url);
                    $final_url=$url1[0].$res3[$i]->$res3->parentapp.'?sLead=1';
                if ($wpdb->insert('wp_outgrow_calci_table', array(
                    'name' => $res3[$i]->name,
                    'api_key' => $apiKey,
                    'id' => $res3[$i]->id,
                    'data_url' => $final_url,
                    'short_url' => $res3[$i]->short_url,
                    'calci_type' => $res3[$i]->type,
                    'url' => $res3[$i]->meta_data->url,
                    'title' => $res3[$i]->meta_data->title,
                    'image_url' => $res3[$i]->meta_data->image_url
                )) == false) {
                    
                }else{
           
                } 
    
            }
           
        }else{
            apiWarning("No API Found - Please add your API to view Calculators.");
        } 
    }   
    }
}

function og_outgrow_calci_script_page($api){
    global $wpdb;
    $db_result = $wpdb->get_results('select * from wp_outgrow_calci_api_table');
    if(!$db_result){
       apiWarning("Please add API Key"); 
    }else{
        // for api-check at db
        foreach($db_result as $db_row){
            $headers    = array(
                'API-KEY' => $db_row->api_key
            );
            // live api
            $request    = Requests::get('https://api-calc.outgrow.co/api/v1/calculator?status=Live&type=All&sort=alpha_as', $headers);
            $res        = json_decode($request->body);
            if ($res->code == 401 ) {
                $wpdb->delete('wp_outgrow_calci_api_table', array(
                    'api_key' => $db_row->api_key
                ));
                $wpdb->delete('wp_outgrow_calci_table', array(
                    'api_key' => $db_row->api_key
                ));
                apiWarning("Expired Key - $db_row->api_key");
            }else{
                
            }
           
            // apiCheckDb('gjfcgsjdfgcjdshfj');
        }
    }
?>
  
    <div class="super-class">
    <!-- <div id="loader-div-class" class="loader-class" > -->

    <div id="loader-div-class" style="display:none;position:absolute;z-index:1;margin-left:45%;margin-top:20%;">
        <img class="loader-image" src="https://d1httwb3aso1fd.cloudfront.net/logoAnim.gif" alt="">
    </div>
    <div class="main-section" style="position: static;background-image:url(<?php echo plugins_url('./images/og-banner.png', __FILE__) ?>); background-size: cover;background-repeat: no-repeat;background-position: center;">
        <p class="main-heading">Outgrow Quizzess</p>

        <!-- start -->
    <div class="main-div-section">
    <form name="form1" method="post" style="margin-bottom:0em;" >
        <div class="main-text-area" >
            <input type="text" name="header_script1"  class="select-box" id="header_script" Placeholder="Enter/Select API KEY" autocomplete="off">
                <span class="select-img" onclick="showOption()">
                    <img src="<?php echo plugins_url('./images/select.png', __FILE__) ?>"  alt="arrow">
                </span>
        </div>
    </form>
    
    <div id="main-section-option" style="display: none;">
    <form name="form1" style="margin-bottom:0em;" method="post">
        <ul class="main-list">           
            <?php
                global $wpdb;
                $db_result = $wpdb->get_results('select * from wp_outgrow_calci_api_table');
                if($db_result){
                    foreach ($db_result as $db_row) {
                        ?>
                        <li id="api-list">
                       
                        <input type="button" class="option" id="select-api-key" onclick="selectKey('<?php echo $db_row->api_key ?>')" name ="show_data" value="<?php echo $db_row->api_key ?>">
                        <button name="delete_data" class="list-close" value="<?php echo $db_row->api_key ?>">x</button>
                        </li>
                        <?php
                    }
                }
            ?>
            
        </ul>
    </div>
        <!-- ends -->

       <br>
    </div>
    
    <?php
    
    
    global $wpdb;
    $optionAPI = "";
    $db_result = $wpdb->get_results('select * from wp_outgrow_calci_api_table');
    if ($db_result) {
?> 
     
        <div id="content" class="hide">
        </div> 
<?php
    }

     
?>
   </form>
                    
    </select>
    </div>
        <!-- <hr> -->
    
    <div class="super-class">
        <div class="section-1" id="section-1" style="display:none">
            <div class="section-1-round" id="section-round">
                <div class="calci-view-icon">
                    <div class="align-icon">
                        <i class="la la-calculator la-3x" id="icon-la-calc" onclick="result('Calculator')"></i>
                        <!-- <img class="icon-class" src= "<?php echo plugins_url('./images/icon-1.png', __FILE__) ?>" alt="outgrow"  onclick="result('Calculator')"> -->
                    </div>
                    <div class="align-icon">
                        <i class="la la-check-circle la-3x" id="icon-la-quiz" onclick="result('Quiz')"></i>
                        <!-- <img class="icon-class" src= "<?php echo plugins_url('./images/icon-2.png', __FILE__) ?>" alt="outgrow"  onclick="result('Quiz')"> -->
                    </div>
                    <div class="align-icon">
                        <i class="la la-bar-chart-o la-3x" id="icon-la-poll" onclick="result('Poll')"></i>
                        <!-- <img class="icon-class" src= "<?php echo plugins_url('./images/icon-3.png', __FILE__) ?>" alt="outgrow"  onclick="result('Poll')"> -->
                    </div>
                    <!-- <div>
                        <img class="icon-class" src= "<?php echo plugins_url('./images/icon-4.png', __FILE__) ?>" alt="outgrow"  onclick="result('Calculator')">
                    </div>
                    <div>
                        <img class="icon-class" src= "<?php echo plugins_url('./images/icon-4.png', __FILE__) ?>" alt="outgrow"  onclick="result('Calculator')">
                    </div> -->
                </div>
      
        </div>
        </div>
        <!-- <hr> -->
        <div class="section-2" id="section-2">
        <div id="get-calci-name"></div>
<?php
        
        include_once "view.php";                
    
?>
      
     </div>
             
    </div>

    </div>   

    </div>

<!--  modal open -->
    <?php
        include_once "modal.html";
    ?> 

<!-- modal ennd -->
   <?php
}

// delete API

if (isset($_POST['delete_data'])) {
    global $wpdb;

    $item = sanitize_text_field($_POST['delete_data']);
    
    if ($_POST['delete_data'] != "") {
       
        $wpdb->delete('wp_outgrow_calci_api_table', array(
            'api_key' => $item
        ));
        $wpdb->delete('wp_outgrow_calci_table', array(
            'api_key' => $item
        ));
        if(count($apiArray)==1){
            setcookie('API', null, -1, '/');
        }
    $dataGot=explode(" ",$_COOKIE["API"]);
    foreach($dataGot as $data){
        if($dataGot == $_POST['delete_data']){
            array_pop($apiArray,$_POST['delete_data']);
        }
    }
    }
}


// delete API ends


// shortcode starts

function og_display_outgrow_calci($atts,$content,$tag){
    $custom="<style>
    @media screen and (max-width: 640px){#og_iframe{height: 620px;width:100%;}}
    @media screen and (min-width: 641px) and (max-width: 1024px){#og_iframe{height: 620px;width:100%;}}
    @media screen and (min-width: 1025px){#og_iframe{height: 620px;width:100%;}}
</style>
<iframe id='og_iframe' src='$values[data_url]' style='border: none; overflow: hidden;' scrolling='yes'></iframe>";
	$values = shortcode_atts(array(
        "type" => "",
        "id" => "",
        "data_url" => "",
        "short_url" => "",
        "dh" => "",
        "dhd" => "",
        "th" => "",
        "thd" => "",
        "mh" => "",
        "mhd" => "",
        "dw" => "",
        "dwd" => "",
        "tw" => "",
        "twd" => "",
        "mw" => "",
        "mwd" => "",
        "showExact" => "",
        "repeatTime" => "",
        "showExactD" => ""
	),$atts);  
	//based on input determine what to return
	$output = '';
        $data="";
        if($values["type"] == "mobile_full_screen" ){
             $output="<div><div class='op-interactive' id='$values[id]' data-url='$values[data_url]' data-surl='$values[short_url]' data-width='100%'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/sloader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "mobile_full_screen_facebook" ){
            $output="<div><div class='op-interactive' id='$values[id]' data-url='$values[data_url]' data-surl='$values[short_url]' data-width='100%'></div>
            <script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/sloader.js'></script><script>initIframe('$values[id]');</script></div>
            <div id='fb-root'></div><script>(function(d, s, id){var js, fjs=d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js=d.createElement(s); js.id=id; js.src='//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10'; fjs.parentNode.insertBefore(js, fjs);}(document, 'script', 'facebook-jssdk'));</script>
            <div class='fb-comments' data-href='https://bnb22.outgrow.us/5c02208bdf06b53edca20231' data-width='100%' data-numposts='5'></div>";
        }
        else if($values["type"] == "mobile_in_page" ){
          $output = "<div><div class='op-interactive' id='$values[id]' data-url='$values[data_url]' data-surl='$values[short_url]' data-width='100%'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "pop_up"){
            $output="<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-p' data-type='outgrow-l'  data-url='$values[data_url]' data-text='Get Started'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "pop_up_classical"){
            $output="<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-p' data-type='outgrow-l'  data-url='$values[data_url]' data-text='Get Started'></div><script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/nloader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "pop_up_l"){
            $output="<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5'
            data-isLDrawer='true' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-d' data-type='outgrow-l' 
           data-url='$values[data_url]' data-text='Get Started'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/nploader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "pop_up_r"){
            $output="<div><div id='$values[id]' data-embedCookieDays='10' data-embedScheduling='false' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='0' data-embedTimeValue='5' 
            data-isLDrawer='false' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-d' data-type='outgrow-l' 
            data-url='$values[data_url]' data-text='Get Started'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/nploader.js'></script><script>initIframe('$values[id]');</script></div>";
        }else if($values["type"] == "pop_up_custom"){
            $output="<div><div id='$values[id]' data-embedCookieDays='$values[repeatTime]' data-embedScheduling='true' data-embedTimed='true' data-embedExit='false' data-embedTimeFormat='$values[showExactD]' data-embedTimeValue='$values[showExact]' 
            data-isLDrawer='false' data-embedBorderRadius='0' data-embedFontSize='12' data-textcolor='#fb5f66' data-bgcolor='#fb5f66' data-prop='outgrow-d' data-type='outgrow-l' 
            data-url='$values[data_url]' data-text='Get Started'></div><script src='//dyv6f9ner1ir9.cloudfront.net/assets/js/nploader.js'></script><script>initIframe('$values[id]');</script></div>";
        }
        else if($values["type"] == "chat"){
            $output="<link href='https://dyv6f9ner1ir9.cloudfront.net/assets/css/shared/chat.css' rel='stylesheet'><link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
            <a href='javascript:void(0);' style='background-color: #FF3C5D' class='bot-circle right' id='bot-circle' onclick='ogAnimationInit()'>
                <div class='bot-circle-icon-open'><i style='color: #ffffff' class='material-icons'>chat</i></div>
                <div class='bot-circle-icon-close'><i style='color: #ffffff' class='material-icons'>close</i></div>
                <div class='og-chat-tooltip'><p>Whats your future like ?</p></div>
            </a>
            <div class='og-chat-box no-animation' id='og-chat-box'>
                <div class='og-chat-box-top' style='background-color: #FF3C5D'>
                    <a href='javascript:void(0);' class='bot-circle-mobile' id='bot-circle-mobile' onclick='ogAnimationClose()'>
                        <div class='bot-circle-icon-close'><i style='color: #ffffff' class='material-icons'>close</i></div>
                    </a>
                </div>
                <iframe src='$values[data_url]' width='100%' height='100%'></iframe>
            </div>
            <script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/chat.js'></script>";
       }
       else if($values["type"] == "chat_left"){
           $output="<link href='https://dyv6f9ner1ir9.cloudfront.net/assets/css/shared/chat.css' rel='stylesheet'>
           <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
           <a href='javascript:void(0);' style='background-color: #FF3C5D' class='bot-circle left' id='bot-circle' onclick='ogAnimationInit()'>
           <div class='bot-circle-icon-open'><i style='color: #ffffff' class='material-icons'>chat</i></div>
           <div class='bot-circle-icon-close'><i style='color: #ffffff' class='material-icons'>close</i></div>
           <div class='og-chat-tooltip'><p>Whats your future like ?</p></div></a><div class='og-chat-box no-animation' id='og-chat-box'>
           <div class='og-chat-box-top' style='background-color: #FF3C5D'><a href='javascript:void(0);' class='bot-circle-mobile' id='bot-circle-mobile'
            onclick='ogAnimationClose()'><div class='bot-circle-icon-close'><i style='color: #ffffff' class='material-icons'>close</i></div></a></div>
            <iframe src='$values[data_url]' width='100%' height='100%'></iframe></div>
                <script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/chat.js'></script>";
       }
       else if($values["type"]== "chat_right"){
           $output="<link href='https://dyv6f9ner1ir9.cloudfront.net/assets/css/shared/chat.css'
            rel='stylesheet'><link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>
            <a href='javascript:void(0);' style='background-color: #FF3C5D' class='bot-circle right' id='bot-circle' onclick='ogAnimationInit()'>
            <div class='bot-circle-icon-open'><i style='color: #ffffff' class='material-icons'>chat</i></div><div class='bot-circle-icon-close'>
            <i style='color: #ffffff' class='material-icons'>close</i></div><div class='og-chat-tooltip'><p>Whats your future like ?</p></div></a>
            <div class='og-chat-box no-animation' id='og-chat-box'><div class='og-chat-box-top' style='background-color: #FF3C5D'>
            <a href='javascript:void(0);' class='bot-circle-mobile' id='bot-circle-mobile' onclick='ogAnimationClose()'>
            <div class='bot-circle-icon-close'><i style='color: #ffffff' class='material-icons'>close</i></div></a></div>
            <iframe src='$values[data_url]' width='100%' height='100%'></iframe></div>
                <script src='https://dyv6f9ner1ir9.cloudfront.net/assets/js/chat.js'></script>";
       }
        else if($values["type"] == "custom_type"){
            $output="<style>
            @media screen and (max-width: 640px){#og_iframe{height: `$values[mh]$values[mhd]`;width:$values[mw]$values[mwd];}}
            @media screen and (min-width: 641px) and (max-width: 1024px){#og_iframe{height: `$values[th]$values[thd]`;width:$values[tw]$values[twd];}}
            @media screen and (min-width: 1025px){#og_iframe{height: `$values[dh]$values[dhd]`;width:$values[dw]$values[dwd];}}
        </style>
        <iframe id='og_iframe' src='$values[data_url]' style='border: none; overflow: hidden;' scrolling='yes'></iframe>";
        }  
        print("---------------shortcode editing-----------");
}
add_shortcode('outgrow','og_display_outgrow_calci');

// shortcode ends

// add_action('wp_before_admin_bar_render', 'wpb_custom_logo');


// for api key
function og_outgrow_calci_api_table(){
    global $wpdb;
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    if (count($wpdb->get_var('SHOW TABLE LIKE "wp_outgrow_calci_api_table"') < 0)) {
        $sql_query_to_create_table = "CREATE TABLE `wp_outgrow_calci_api_table` (
            `api_key` varchar(160) NOT NULL ,
            PRIMARY KEY (api_key)
           ) ENGINE=InnoDB DEFAULT CHARSET=utf8";
        dbDelta($sql_query_to_create_table);
    }
}


// data table
function og_outgrow_calci_table(){
    global $wpdb;
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    if (count($wpdb->get_var('SHOW TABLE LIKE "wp_outgrow_calci_table"') < 0)) {
        $sql_query_to_create_table = "CREATE TABLE `wp_outgrow_calci_table` (
            `name` varchar(50) NOT NULL,
            `api_key` varchar(160) NOT NULL ,
            `id` varchar(160),
            `data_url` varchar(160) NOT NULL UNIQUE,
            `short_url` varchar(160) NOT NULL,
            `calci_type` varchar(50) NOT NULL,
            `url` varchar(100) NOT NULL,
            `title` varchar(50) NOT NULL,
            `image_url` varchar(150) NOT NULL,
            PRIMARY KEY (data_url)
           ) ENGINE=InnoDB DEFAULT CHARSET=utf8";
        dbDelta($sql_query_to_create_table);
    }
}


// deactivation 

function og_deactivation_table(){
    global $wpdb;
    $wpdb->query('DROP table IF Exists wp_outgrow_calci_table');
    $wpdb->query('DROP table IF Exists wp_outgrow_calci_api_table');
}

// icon
add_action('admin_menu', 'my_custom_favicon');


function my_custom_favicon() {
        
    echo '
        <style>
        .dashicons-cake {
            background-image: url("'.plugins_url().'/outgrowPlugin/images/logo.png");
            background-repeat: no-repeat;
            background-position: center; 
        }
        </style>
    '; 
}


//repeated apis

function checkRepeat($api){
    global $wpdb;
    $db_result = $wpdb->get_results('select * from wp_outgrow_calci_api_table');
    if($db_result){
        foreach ($db_result as $db_row) {
            if($db_row->api_key  == $api){
                apiWarning("API Already Exists - Please add new API.");    
            ?>
        <?php
        return "present";
            }else{
            }
        } 
    }else{  

    }
}

function apiWarning($msg){
    ?>
     <div class="no-api" id="api-warning" style="display:block">
                
                <strong> <?php echo $msg; ?></strong> 
            </div>
    <?php
}


?>

