<?php
if (isset($_POST['show_data'])) {
       print_r("--------xx--------");
           $optionAPI=$_POST['show_data'];
           // print_r("================--------------===============--------->");
           // print_r($optionAPI);
           // $optionAPI = sanitize_text_field($_POST['delete_item']);
          $value=og_api_call($optionAPI);
          if($value == 401){
              $repeatedAPI=1;
          }else{
           $repeatedAPI=0;
          }
       //    addActive();
       } 
       ?>