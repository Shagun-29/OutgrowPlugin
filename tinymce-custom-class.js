// // editor
editorShortcode="[outgrow][/outgrow]";

// reading cookies
(function(){
  APIset=[];
  cookies=document.cookie;
  cookiesArray=cookies.split(";");
  if(cookiesArray.length>0){
    for(i=0;i<cookiesArray.length;i++){
      key=cookiesArray[i].split("=")[0];
      if(key == " API"){
        value=cookiesArray[i].split("=")[1];
      }
    }
    apiValues=value.split("+");
      apiValues.forEach(element => {
        apiSet.push(element);
      });
  }else{
  }

  
})();

//read cookies end

(function() {
  tinymce.PluginManager.add( 'custom_class', function( editor, url ) {
      // // Add Button to Visual Editor Toolbar
      editor.addButton('custom_class', {
          title: 'Insert CSS Class',
          cmd: 'custom_class',
          id:'custom-shgn',
          // icon: 'icon dashicons-wordpress',
          image : "https://dzvexx2x036l1.cloudfront.net/og-apple.png",
          
      });

      editor.addCommand('custom_class', function() {
        var win = editor.windowManager.open({
              title:'Outgrow API',
              width:800,
              height:465,
              id:"tiny-mce-custom-og",
              class:"editor-window",
              buttons:{
                  text:'Cancel',
                  onclick: function() {
                    win.close();
                  },
                  text : 'Copy',
                  onclick:function getCopy(){
                    editor.insertContent(editorShortcode);
                  },
              }
        });

          document.getElementById("tiny-mce-custom-og-body").innerHTML="<div id='getAPI'><div id='selectAPI'><form method='post'><label class='Api-selct'>Enter / Select Api Key</label><select name='inptProduct' Placeholder='Enter API KEY' id='select-custom-api' onclick='selectAPI()'>"
       +"</select></form></div></div>";
      
      // document.getElementById("tiny-mce-custom-og-body").innerHTML="<div id='getAPI'>"+
      // "<div class='div-input-field'><input type='text' class='input-field-text' onclick='showSelectOptions()' placeholder='ENTER API KEY' ></div>"+
      // "<div id='selectAPI' class='hide'><form method='post'><select name='inputProduct' Placeholder='Enter API KEY' id='select-custom-api' onclick='selectAPI()'></select></form></div>"+
      // "</div>";


    if(apiSet.length>0){
    apiSet.forEach(element => {
      document.getElementById("select-custom-api").insertAdjacentHTML('afterbegin',"<option>"+element+"</option>")
    });
    }
   
      });  

  });

})();


function selectAPI(){
  // var data="";
  // document.getElementById("api-card").innerHTML=data;
  api=document.getElementById('select-custom-api').value;
  $.ajax({
    url:'https://api-calc.outgrow.co/api/v1/calculator?status=Live&type=All&sort=alpha_as',
    headers: {'API-KEY': api},
    type: 'get',
    success: function(response){
    var refinedResponse=response.data;
   document.getElementById("tiny-mce-custom-og-body").insertAdjacentHTML("beforeend","<div id='api-card'>");

  if(response.success==true){
    refinedResponse.forEach(element => {

      
      console.log("--------",element.short_url);
      document.getElementById("api-card").insertAdjacentHTML(`afterend`,`<div class="shortcodecard-row" id="shortcodecard-row-id">
        <div id="shortcodecard-col">
          <div id="shortcode-card-body">
            <div class="shortcodecard-content" id="${element.id}-view" onclick='viewDetails("${element.id}")'><i class="material-icons">
            extension
            </i>${element.meta_data.title}</div>
              
            <div id="${element.id}-div-section" class="hide" style="float:left;width:100%;margin-left: 0px!important;border-top: 1px solid rgb( 226, 226, 226 );">
              <div id="section-div-1">
                <div id="embed1" class="embed white" onclick="getEmbedCode('embed1','${element.dev_app}','${element.calc_url}','${element.short_url}')">EMBED + MOBILE FULL SCREEN<i class="la la-info-circle"></i></div>
                <div id="embed2" class="embed" onclick="getEmbedCode('embed2','${element.dev_app}','${element.calc_url}','${element.short_url}')">EMBED + MOBILE IN PAGE<i class="la la-info-circle"></i></div>
                <div id="embed3" class="embed" onclick="getEmbedCode('embed3','${element.dev_app}','${element.calc_url}','${element.short_url}')">POP UP</div>
                <div id="embed4" class="embed" onclick="getEmbedCode('embed4','${element.dev_app}','${element.calc_url}','${element.short_url}')">CHAT</div>
                <div id="embed5" class="embed" onclick="getEmbedCode('embed5','${element.dev_app}','${element.calc_url}','${element.short_url}')">CUSTOM EMBED</div>
              </div>
              <div id="section-div-2">
                <div id="embed-menu-${element.id}" style="float: left;
                width: 100%;margin-left: 0px!important;margin-bottom: 20px;"></div>
                <div id="textarea-div">
                  <textarea id="${element.id}" cols="40" rows="10">text here</textarea>
                  <button id="copyiing-text" onclick="getCopy">COPY</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>`);

    });
  
      
   }
  //  document.getElementById("").insertAdjacentHTML("afterend","</div>");
   },

   error: function(err){
     if(err.responseJSON.code==401){
     }
   }
  });
}

function viewDetails(id,url,s_url){

  console.log("::id::",id,"::url::",url,"::surl::",s_url);
  document.getElementById(id).innerHTML=`<div id="shortcode-header"></div>`+
      `<div id="main-div-section"><div id="section-div-1">`+
      `<div id="embed1" class="embed" onclick="getEmbedCode('embed1')">EMBED + MOBILE FULL SCREEN <i class="la la-info-circle"></i></div>`+
      `<div id="embed2" class="embed" onclick="getEmbedCode('embed2')">EMBED + MOBILE IN PAGE <i class="la la-info-circle"></i></div>`+
      `<div id="embed3" class="embed" onclick="getEmbedCode('embed3')">POP UP</div>`+
      `<div id="embed4" class="embed" onclick="getEmbedCode('embed4')">CHAT</div>`+
      `<div id="embed5" class="embed" onclick="getEmbedCode('embed5')">CUSTOM EMBED</div>`+
      `</div>`+
    `</div></div>`;

      // editor.addButton('myblockquotebtn', {
      //   title: 'My Blockquote',
      //   cmd: 'myBlockquoteBtnCmd'
      //   // image: url + '/img/quote.png'
      // });

  // toggle starts
  $(document).ready(function(){
    document.getElementById(id+'-div-section').classList.toggle("toggle-on");   
    document.getElementById("embed-menu-"+id).classList.toggle("toggle-on");   

    if ( $('#'+id+'-div-section').hasClass('toggle-on') ) {
      document.getElementById(id+'-div-section').classList.remove("hide");
      // document.getElementById("embed-menu-"+id).classList.remove("hide");   
    }else{
      document.getElementById(id+'-div-section').classList.add("hide");
      // document.getElementById("embed-menu-"+id).classList.remove("hide");    
    }

    if ( $('#'+id+'-div-section').hasClass('toggle-on') ) {
      // document.getElementById(id+'-div-section').classList.remove("hide");
      document.getElementById("embed-menu-"+id).classList.remove("hide");   
    }else{
      // document.getElementById(id+'-div-section').classList.add("hide"); 
      document.getElementById("embed-menu-"+id).classList.remove("hide");    
    }

  });  
  //toggle ends 
    
}

function getEmbedCode(type,id,url,short_url){
  ex=url.split("?");
  url2=ex[0]+"?vHeight=1";
  url3=ex[0]+"?q=1";
  console.log("-----------------------",type,"-----------------------");
  console.log(document.getElementById(id));
  // document.getElementById(id).innerText=type; 
  jQuery(document).ready(function(){
      
    jQuery('.embed').click(function(){
      jQuery('.embed').removeClass('white');
      jQuery(this).addClass('white');
    });
  });
  if(type=="embed1"){




    document.getElementById("embed-menu-"+id).classList.add('hide');
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    // document.getElementById("embed-menu-"+id).innerHTML="";
    document.getElementById(id).innerText=type;  
  } 
  if(type=="embed2"){
    document.getElementById("embed-menu-"+id).classList.add('hide');
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url2+'" short_url="'+short_url+'"][/outgrow]');
    // document.getElementById("embed-menu-"+id).innerHTML="";

    document.getElementById(id).innerText='[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url2+'" short_url="'+short_url+'"][/outgrow]';
  } 
  if(type=="embed3"){
    document.getElementById("embed-menu-"+id).classList.remove('hide');
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById("embed-menu-"+id).innerHTML="<div class='main-div-option'>"+
    "<div class='extra-option-button' onclick='classic()' id='cat031'>"+
        "<div class='classic-img'><img src='https://cdn.filestackcontent.com/oCNA05WS3GwmTbYX7yn2'></div>"+
        "<div class='classic-text'>Classic</div>"+
    "</div>"+
    "<div onclick='drawerL()' class='extra-option-button' id='cat032'>"+
        "<div class='drawerl-img'><img src='https://cdn.filestackcontent.com/PBcvjT9Rhi6PEIXB8IGG'></div>"+
        "<div class='drawerl-text'>Drawer (L)</div>"+
    "</div>"+
    "<div onclick='drawerR()' class='extra-option-button' id='cat033'>"+
        "<div class='drawerr-img'><img src='https://cdn.filestackcontent.com/Z45pnQBoQdWcRU6YU7NM'></div>"+
        "<div class='drawerr-text'>Drawer (R)</div>"+
    "</div></div>"+
    "<div class='time-link'><div class='time-link-text'>TIMED & EXIT INTENT<div class='time-div' id='time-div' onclick='toggleSwitch2()'><input type='text'  class='time-input-type' ><span class='time-span' id='time-span'></span></div></div></div>"+
    "<div class='time-option' id='time-option'></div>";;
  } 
  if(type=="embed4"){
    document.getElementById("embed-menu-"+id).classList.remove('hide');
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById("embed-menu-"+id).innerHTML="<div class='extra-option-chat-button' onclick='chatLeft()' id='chatLeft'><div class='bottom-img'><img class='bottom-min' src='https://dlvkyia8i4zmz.cloudfront.net/o1PZBSLiQuq5HTCCyrMt_bottom_left.png'></div><div class='bottom-text'>Bottom Left</div></div><div onclick='chatRight()' class='extra-option-chat-button' id='bottomRight'><div class='bottom-img'><img class='bottom-min' class='bottom-img' src='https://dlvkyia8i4zmz.cloudfront.net/5uGcgvoRIie2dwQNk9kv_bottom_right.png'></div><div class='bottom-text'>Bottom Right</div></div>";
  } 
  if(type=="embed5"){
    document.getElementById("embed-menu-"+id).classList.remove('hide');
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById("embed-menu-"+id).innerHTML="<div class='extra-option-context'><div class='extra-option-custom' id='desktop'>"+
    "<p>Desktop </p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' id='heightDesktop' name='heightDesktop' onkeypress='return getDesktopHeight(event)' placeholder='620'>"+
      "<select class='select-custom' name='selecthDesktop' id='selecthDesktop' onchange='getHeightD()'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='widthDesktop' id='widthDesktop' onkeypress='return getDesktopWidth(event)' placeholder='100'>"+
      "<select name='selectwDesktop' id='selectwDesktop' class='select-custom' onchange='getWidthD()'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div>"+
    // tablet
    "<div class='extra-option-custom' id='tablet' ><p>Tablet</p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='heightTablet' id='heightTablet' onkeypress='return getTabletHeight(event)' placeholder='620'>"+
      "<select class='select-custom' onchange='getHeightT()' id='selecthTablet' name='selecthTablet'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='widthTablet' id='widthTablet' onkeypress='return getTabletWidth(event)' placeholder='100'>"+
      "<select class='select-custom' id='selectwTablet' onchange='getWidthT()' name='selectwTablet'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div>"
    // mobile
    +"<div class='extra-option-custom' id='mobile'><p>Mobile</p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='heightMobile' id='heightMobile' onkeypress='return getMobileHeight(event)' placeholder='620'>"+
      "<select class='select-custom' id='selecthMobile' onchange='getHeightM()' name='selectwMobile'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' id='widthMobile' onkeypress='return getMobileWidth(event)' name='widthMobile' placeholder='100'>"+
      "<select class='select-custom' id='selectwMobile' onchange='getWidthM()' name='selectwMobile'><option>%</option><option selected>px</option ><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div></div>";
  } 
  // document.getElementById(type).style.backgroundColor="red";
}


function showSelectOptions(){
  console.log("---------Inside--------------"); 

  document.getElementById('selectAPI').classList.toggle('toggle-on');
  $(document).ready(function(){
    if ( $('#selectAPI').hasClass('toggle-on') ) {
      document.getElementById("selectAPI").classList.remove("hide");
    }else{
      document.getElementById("selectAPI").classList.add("hide");    
    }
  });  
}

function getCopy(){
  console.log("getCopy works");
  // editor.insertContent("editorShortcode");
      tinymce.PluginManager.add( 'custom_class2', function(editor) {
      editor.insertContent("editorShortcode");
        
    });
  
 


}

// $(document).ready(function(){
//   $('#embed1').click(function() {
//    if(onclick){
//      $(this).css('background','#fff');
//      onclick  = false;
//  } else {
//      $(this).css('background','#ddd');
//      onclick  = true;
//  }   

//   })
// });