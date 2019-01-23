
<?php
global $wpdb;
$db_result = $wpdb->get_results('select * from wp_outgrow_calci_api_table');
if(!$db_result){
//    apiWarning("Please add API Key"); 
}else{
    // for api-check at db
    foreach($db_result as $db_row){
        array_push($apiArray,$db_row->api_key);
    }
      setcookie('API',implode(" ",$apiArray), time() + (172800* 30), "/");
}
?>