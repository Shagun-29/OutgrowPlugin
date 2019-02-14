// // editor
editorShortcode="[outgrow][/outgrow]";
var showExacte=5, repeatTimee=10, showExactDe='0';
// heights
var ecustomHeightD=620, ecustomHeightDDim="px";
var ecustomHeightT=620, ecustomHeightTDim="px";
var ecustomHeightM=620, ecustomHeightMDim="px";
// width
var ecustomWidthD=100, ecustomWidthDDim="px";
var ecustomWidthT=100, ecustomWidthTDim="px";
var ecustomWidthM=100, ecustomWidthMDim="px";
var   custom_url2;
var editorId="";
var calc_url0="",short_url0="";
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
        if(this.apiSet.indexOf(element)==-1){
          // console.log("----",element);
          this.apiSet.push(element);
        }
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
                  id : 'copy-id',
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

    document.getElementById('copy-id').style.display = "none";

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
      calc_url0=`${element.calc_url}`;
      short_url0=`${element.short_url}`;
      document.getElementById("api-card").insertAdjacentHTML(`afterend`,`<div class="shortcodecard-row" id="shortcodecard-row-id">
        <div id="shortcodecard-col">
          <div id="shortcode-card-body">
            <div class="shortcodecard-content" id="${element.parentapp}-view" onclick='viewDetails("${element.parentapp}")'><i class="material-icons">
            extension
            </i>${element.meta_data.title}</div>
              
            <div id="${element.parentapp}-div-section" class="hide" style="float:left;width:100%;margin-left: 0px!important;border-top: 1px solid rgb( 226, 226, 226 );">
              <div id="section-div-1">
                <div id="embed1" class="embed cir white" onclick="getEmbedCode('embed1','${element.parentapp}','${element.calc_url}','${element.short_url}')">EMBED + MOBILE FULL SCREEN<i class="la la-info-circle"></i></div>
                <div id="embed2" class="embed cir" onclick="getEmbedCode('embed2','${element.parentapp}','${element.calc_url}','${element.short_url}')">EMBED + MOBILE IN PAGE<i class="la la-info-circle"></i></div>
                <div id="embed3" class="embed" onclick="getEmbedCode('embed3','${element.parentapp}','${element.calc_url}','${element.short_url}')">POP UP</div>
                <div id="embed4" class="embed" onclick="getEmbedCode('embed4','${element.parentapp}','${element.calc_url}','${element.short_url}')">CHAT</div>
                <div id="embed5" class="embed" onclick="getEmbedCode('embed5','${element.parentapp}','${element.calc_url}','${element.short_url}')">CUSTOM EMBED</div>
              </div>
              <div id="section-div-2">
                <div id="embed-menu-${element.parentapp}" style="float: left;
                width: 100%;margin-left: 0px!important;margin-bottom: 20px;"></div>
                <div id="textarea-div">
                  <textarea id="${element.parentapp}" cols="40" rows="10" readonly>text here</textarea>
                  <button id="copyiing-text" onclick="getCode('${element.parentapp}')">COPY</button>
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

function viewDetails(id){
  getEmbedCode('embed1',id,calc_url0,short_url0);
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

function getEmbedCode(type,passid,url,short_url){
  editorId=passid;
  custom_url2=url;
  ex=url.split("?");
  url2=ex[0]+"?vHeight=1";
  url3=ex[0]+"?q=1";
  // document.getElementById(id).innerText=type; 
  jQuery(document).ready(function(){
      
    jQuery('.embed').click(function(){
      jQuery('.embed').removeClass('white');
      jQuery(this).addClass('white');
    });
  });

  if(type=="embed1"){
    // document.getElementById("embed-menu-"+passid).classList.add('hide');
    document.getElementById("embed-menu-"+passid).innerHTML=`<div class='editor-facebook-link'><div class='editor-fb-link-text'>Facebook Comments</div><div class='editor-span-fb-text'><i class='la la-question-circle la-2x'></i></div><div class='editor-facebook-div' id='editor-facebook-div' onclick='toggleSwitchFecebook()'><input type='text'  class='editor-facebook-input-type' ><span class='editor-facebook-span' id='editor-facebook-span'></span></div></div>`;
    document.getElementById(passid).innerText='[outgrow type="mobile_full_screen" id="'+passid+ '" data_url="'+url+'" short_url="'+short_url_used+'"][/outgrow]';  
  } 
  if(type=="embed2"){
    document.getElementById("embed-menu-"+passid).classList.add('hide');
    // document.getElementById("embed-menu-"+id).innerHTML="";

    document.getElementById(passid).innerText='[outgrow type="mobile_in_page" id="'+passid+ '" data_url="'+url2+'" short_url="'+short_url_used+'"][/outgrow]';
  } 
  if(type=="embed3"){

    // var passid=id;
    document.getElementById(passid).innerText='[outgrow type="pop_up" id="'+passid+ '" data_url="'+url3+'" ][/outgrow]';
    document.getElementById("embed-menu-"+passid).classList.remove('hide');
    console.log("--embed3--",passid);

    document.getElementById("embed-menu-"+passid).innerHTML=`<div class='main-div-option'>
    <div class='extra-option-button' onclick='getEmbedCode("classic","${passid}","${url}","${short_url_used}")' id='cat031'>
        <div class='classic-img'><img src='https://cdn.filestackcontent.com/oCNA05WS3GwmTbYX7yn2'></div>
        <div class='classic-text'>Classic</div>
    </div>
    <div onclick='getEmbedCode("drawerl","${passid}","${url}","${short_url_used}")' class='extra-option-button' id='cat032'>
        <div class='drawerl-img'><img src='https://cdn.filestackcontent.com/PBcvjT9Rhi6PEIXB8IGG'></div>
        <div class='drawerl-text'>Drawer (L)</div>
    </div>
    <div onclick='getEmbedCode("drawerr","${passid}","${url}","${short_url_used}")' class='extra-option-button' id='cat033'>
        <div class='drawerr-img'><img src='https://cdn.filestackcontent.com/Z45pnQBoQdWcRU6YU7NM'></div>
        <div class='drawerr-text'>Drawer (R)</div>
    </div></div>
    <div class='time-link'><div class='time-link-text'>TIMED & EXIT INTENT<div class='time-div' id='time-div' onclick='toggleSwitchEditor()'><input type='text' class='time-input-type' ><span class='time-span' id='time-span'></span></div></div></div>
    <div class='time-option' id='time-option'></div>`;
    
  } 
  if(type=="embed4"){
    // document.getElementById("embed-menu-"+id).classList.remove('hide');
    document.getElementById("embed-menu-"+passid).innerHTML=`<div class='extra-option-chat-button' onclick='getEmbedCode("chatLeft","${passid}","${url}","${short_url_used}")' id='chatLeft'><div class='bottom-img'><img class='bottom-min' src='https://dlvkyia8i4zmz.cloudfront.net/o1PZBSLiQuq5HTCCyrMt_bottom_left.png'></div><div class='bottom-text'>Bottom Left</div></div><div onclick='getEmbedCode("chatRight","${passid}","${url}","${short_url_used}")' class='extra-option-chat-button' id='bottomRight'><div class='bottom-img'><img class='bottom-min' class='bottom-img' src='https://dlvkyia8i4zmz.cloudfront.net/5uGcgvoRIie2dwQNk9kv_bottom_right.png'></div><div class='bottom-text'>Bottom Right</div></div>`;
  } 
  if(type=="embed5"){
    curl=url.split("?");
    console.log("----",curl);
    document.getElementById(passid).innerText='[outgrow type="custom_type" " data_url="'+curl[0]+'" "dh"="'+ecustomHeightD+'" dhd="'+ecustomHeightDDim+'" "dw"="'+ecustomWidthD+'" dwd="'+ecustomWidthDDim+'" "th"="'+ecustomHeightT+'" thd="'+ecustomHeightTDim+'" "tw"="'+ecustomWidthT+'" twd="'+ecustomWidthTDim+'" "mh"="'+ecustomHeightM+'" mhd="'+ecustomHeightMDim+'" "mw"="'+ecustomWidthM+'" mwd="'+ecustomWidthMDim+'"][/outgrow]';
    // document.getElementById("embed-menu-"+id).classList.remove('hide');
    document.getElementById("embed-menu-"+passid).innerHTML="<div class='extra-option-context'><div class='extra-option-custom ex' id='desktop'>"+
    "<p>Desktop </p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' id='heightDesktop' name='heightDesktop' onkeypress='return getDesktopHeightEditor(event)' placeholder='620'>"+
      "<select class='select-custom' name='selecthDesktop' id='selecthDesktop' onchange='getHeightEditorD()'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='widthDesktop' id='widthDesktop' onkeypress='return getDesktopWidthEditor(event)' placeholder='100'>"+
      "<select name='selectwDesktop' id='selectwDesktop' class='select-custom' onchange='getWidthEditorD()'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div>"+
    // tablet
    "<div class='extra-option-custom ex' id='tablet' ><p>Tablet</p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='heightTablet' id='heightTablet' onkeypress='return getTabletHeightEditor(event)' placeholder='620'>"+
      "<select class='select-custom' onchange='getHeightEditorT()' id='selecthTablet' name='selecthTablet'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='widthTablet' id='widthTablet' onkeypress='return getTabletWidthEditor(event)' placeholder='100'>"+
      "<select class='select-custom' id='selectwTablet' onchange='getWidthEditorT()' name='selectwTablet'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div>"
    // mobile
    +"<div class='extra-option-custom ex' id='mobile'><p>Mobile</p>"+
    "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Height</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' name='heightMobile' id='heightMobile' onkeypress='return getMobileHeightEditor(event)' placeholder='620'>"+
      "<select class='select-custom' id='selecthMobile' onchange='getHeightEditorM()' name='selectwMobile'><option>%</option><option selected>px</option><option>vh</option></select>"+
    "</div>"+
  "</div>"+

  "<div class='custom-dim-head'>"+
    "<div class='super-dim'>Width</div>"+
    "<div class='super-input-dim'>"+
      "<input type='text' class='input-dim' id='widthMobile' onkeypress='return getMobileWidthEditor(event)' name='widthMobile' placeholder='100'>"+
      "<select class='select-custom' id='selectwMobile' onchange='getWidthEditorM()' name='selectwMobile'><option>%</option><option selected>px</option ><option>vh</option></select>"+
    "</div>"+
  "</div>"+
    "</div></div>";
  } 
  // document.getElementById(type).style.backgroundColor="red";
  if(type=="classic"){
    jQuery('#cat031').addClass("active-span1");
    jQuery('#cat032').removeClass("active-span1");
    jQuery('#cat033').removeClass("active-span1");

        console.log("----------inside classic part-------------",passid);
    document.getElementById(passid).innerText='[outgrow type="pop_up_classic" id="'+passid+ '" data_url="'+url3+'" ][/outgrow]';
  }
  if(type=="drawerl"){
    jQuery('#cat032').addClass("active-span1");
    jQuery('#cat031').removeClass("active-span1");
    jQuery('#cat033').removeClass("active-span1");

    console.log("----------inside classic part-------------",passid);
    document.getElementById(passid).innerText='[outgrow type="pop_up_l" id="'+passid+ '" data_url="'+url3+'" ][/outgrow]';
  }
  if(type=="drawerr"){
    jQuery('#cat033').addClass("active-span1");
    jQuery('#cat032').removeClass("active-span1");
    jQuery('#cat031').removeClass("active-span1");

    console.log("----------inside classic part-------------",passid);
    document.getElementById(passid).innerText='[outgrow type="pop_up_r" id="'+passid+ '" data_url="'+url3+'" ][/outgrow]';
  }
  if(type=="chatLeft"){
    jQuery('#chatLeft').addClass("active-span1");
    jQuery('#bottomRight').removeClass("active-span1");
    document.getElementById(passid).innerText='[outgrow type="chat_left" " data_url="'+url3+'" ][/outgrow]';
  }
  if(type=="chatRight"){
    jQuery('#bottomRight').addClass("active-span1");
    jQuery('#chatLeft').removeClass("active-span1");
    document.getElementById(passid).innerText='[outgrow type="chat_right" " data_url="'+url3+'" ][/outgrow]';
  }
}


function showSelectOptions(){
  document.getElementById('selectAPI').classList.toggle('toggle-on');
  $(document).ready(function(){
    if ( $('#selectAPI').hasClass('toggle-on') ) {
      document.getElementById("selectAPI").classList.remove("hide");
    }else{
      document.getElementById("selectAPI").classList.add("hide");    
    }
  });  
}

function getCode(id){
  // tinymce.PluginManager.add( 'custom_class2', function(editor) {
  //   editor.insertContent("SHGN");   
  // });
  
  var copyText = document.getElementById(id);
  copyText.setAttribute('readonly', '');
  copyText.select();
  document.execCommand("copy");
  // removeHide('click-copy-text'); 


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
// function classic(id,url){
//   console.log("------------id----------",id,"--------url--------",url);
//   document.getElementById("textarea-text").innerText='[outgrow type="pop_up_classic" id="'+id+ '" data_url="'+url+'" ][/outgrow]';
// }
// function chatLeftEditor(){

// }

function getDesktopHeightEditor(e){
  var count1=0;
  if(e.which >=48 && e.which <=57 || e.which == 8 || e.which == 46){
    window.onclick=function(){
      if(count1==0){
        var heightD=document.getElementById("heightDesktop").value;
        textcustom=document.getElementById('text-inside');
        ecustomHeightD=heightD;
        // custom='[outgrow type="custom_desktop_height" " data_url="'+url3+'" "height"="'+heightD+'"][/outgrow]';
        // document.getElementById('text-inside').innerText='[outgrow type="custom_desktop_height" " data_url="'+url3+'" "height"="'+heightD+'"][/outgrow]';
        customOutputEditor();
        count1++; 
      }
      return true;
    }
  }else{
    return false;
  }
    
}

function getTabletHeightEditor(e){
  var count2=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(count2==0){
        var heightD=document.getElementById("heightTablet").value;
         count2++; 
        ecustomHeightT=heightD;
        customOutputEditor();

      }
      return true;

    }
  }else{
    return false;
  }
    
}

function getMobileHeightEditor(e){
  var count3=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(count3==0){
        var heightD=document.getElementById("heightMobile").value;
         ecustomHeightM=heightD;
        customOutputEditor();

        count3++; 
      }
      return true;
    }
  }else{
    return false;
  }
    
}

function getDesktopWidthEditor(e){
  var count4=0;
  if(e.which >=48 && e.which <=57){
  window.onclick=function(){
    if(count4==0){
      var widthD=document.getElementById("widthDesktop").value;
       ecustomWidthD=widthD;
      customOutputEditor();

      count4++;
    }
      return true;
    }
  }else{
  return false;
}
}

function getTabletWidthEditor(e){
  var count5=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(count5==0){
        var widthD=document.getElementById("widthTablet").value;
         ecustomWidthT=widthD;
        customOutputEditor();

        count5++;
      }
      return true;
    }
  }else{
    return false;
  }
}

function getMobileWidthEditor(e){
  var count6=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(count6==0){
        var widthD=document.getElementById("widthMobile").value;
        ecustomWidthM=widthD;
        customOutputEditor();

        count6++;
      }
      return true;
    }
  }else{
    return false;
  }
}

function getHeightEditorD(){
  hdim=document.getElementById("selecthDesktop").value;
  ecustomHeightDDim=hdim;
  customOutputEditor();
}
function getHeightEditorT(){
  hdim=document.getElementById("selecthTablet").value;
  ecustomHeightTDim=hdim;
  customOutputEditor();
}
function getHeightEditorM(){
  hdim=document.getElementById("selecthMobile").value;
  ecustomHeightMDim=hdim;
  customOutputEditor();
}
function getWidthEditorD(){
  wdim=document.getElementById("selectwDesktop").value;
  ecustomWidthDDim=wdim;
  customOutputEditor();
}
function getWidthEditorT(){
  wdim=document.getElementById("selectwTablet").value;
  ecustomWidthTDim=wdim;
  customOutputEditor();
}
function getWidthEditorM(){
  wdim=document.getElementById("selectwMobile").value;
  ecustomWidthMDim=wdim;
  customOutputEditor();
 }

 function customOutputEditor(){
  curl=custom_url2.split("?");
  document.getElementById(editorId).innerText='[outgrow type="custom_type" " data_url="'+curl[0]+'" "dh"="'+ecustomHeightD+'" dhd="'+ecustomHeightDDim+'" "dw"="'+ecustomWidthD+'" dwd="'+ecustomWidthDDim+'" "th"="'+ecustomHeightT+'" thd="'+ecustomHeightTDim+'" "tw"="'+ecustomWidthT+'" twd="'+ecustomWidthTDim+'" "mh"="'+ecustomHeightM+'" mhd="'+ecustomHeightMDim+'" "mw"="'+ecustomWidthM+'" mwd="'+ecustomWidthMDim+'"][/outgrow]';
}

function toggleSwitchEditor(){
  document.getElementById('time-span').classList.toggle('toggle-on-editor');
  $(document).ready(function(){
    if ( $('#time-span').hasClass('toggle-on-editor') ) {
      document.getElementById('time-div').style.backgroundColor="#fb5f66";
      document.getElementById(editorId).innerText='[outgrow type="pop_up_custom" id="'+editorId+ '"  data_url="'+url3+'" ][/outgrow]';
      // document.getElementById('text-inside-1').innerText='[outgrow type="pop_up_custom" id="'+editorId+ '"  data_url="'+url3+'" ][/outgrow]';
    
    }else{
      document.getElementById('time-option').classList.add('hide');
      document.getElementById('time-div').style.backgroundColor="#a8a8a8";
      document.getElementById(editorId).innerText='[outgrow type="pop_up" id="'+editorId+ '" data_url="'+url3+'" ][/outgrow]'; 
      // document.getElementById('text-inside-1').innerText='[outgrow type="pop_up" id="'+editorId+ '" data_url="'+url3+'" ][/outgrow]';   

    }
  });  
timeOption = document.getElementById('time-option');
timeOption.innerHTML="<div id='input-time'><label><input type='radio' name='selectOptionName' onclick='timedEditor()' value='timed'>Timed (Control exactly when your popup appears.)</label></div>"+ 
  "<div id='timed-div' style='display:none'><div id='set-time-div'><div id='set-time'>Show exactly after</div><div id='set-after'><input type='text' id='timeAfter' onkeypress='return updatePopTimeEditor(event)' placeholder='5'><select id='select-time-after' onchange='getOptionPopEditor()'><option value='0'>Secs</option><option value='1'>Mins</option></select></div></div>"+
  "<div id='set-time-div'><div id='set-time'>Repeat After</div><div id='set-after'><input type='text' class='dayAfter' id='get-day' onkeypress='return updatePopDayEditor(event)' placeholder='10'><input type='text' id='day-value'  placeholder='Days' disabled></div></div></div></div></div>"+
  
  "<div id='exit-intent'><div id='exit-intent-text'><label><input type='radio' onclick='exitIntendEditor()' name='selectOptionName' value='exit'>Exit Intend</label></div>"+
  "<div id='exit-input-value' style='display:none'><label id='exit-option-text'>Show before a user leaves your page</label>"+
  "<div id='exit-input-cover'><div id='exit-repeat-day'>Repeat After</div><div id='input-exit'><input type='text' class='exit-day-input' id='get-day2'  onkeypress='return updatePopDayEditor2(event)' placeholder='10'><input type='text' id='exit-day' placeholder='Days' disabled></div></div></div>"+
  "</div>";
}
function timedEditor(){
  displayBlock("timed-div");
  displayNone("exit-input-value");
}
function exitIntendEditor(){
  displayNone("timed-div");
  displayBlock("exit-input-value");
}
function updatePopDayEditor(e){
  var countd=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(countd==0){
        var popDay=document.getElementById("get-day").value;
        repeatTimee=popDay;
        customPopEditor();

        countd++;
      }
      return true;
    }
  }else{ 
    return false;
  }
}

function updatePopDayEditor2(e){
  var countd=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(countd==0){
        var popDay=document.getElementById("get-day2").value;
        repeatTimee=popDay;
        customPopEditor();

        countd++;
      }
      return true;
    }
  }else{ 
    return false;
  }
}

function updatePopTimeEditor(e){
  var countp=0;
  if(e.which >=48 && e.which <=57){
    window.onclick=function(){
      if(countp==0){
        var popTime=document.getElementById("timeAfter").value;
       showExacte=popTime;
        customPopEditor();

        countp++;
      }
      return true;
    }
  }else{ 
    return false;
  }
}

function getOptionPopEditor(){
  showExactDe=document.getElementById('select-time-after').value;
  customPopEditor();
}

function customPopEditor(){
  document.getElementById(editorId).innerText='[outgrow type="pop_up_custom" id="'+editorId+ '" data_url="'+url3+'" "showExact"="'+showExacte+'" "showExactD"="'+showExactDe+'" "repeatTime"="'+repeatTimee+'" ][/outgrow]';
  document.getElementById(editorId).innerText='[outgrow type="pop_up_custom" id="'+editorId+ '" data_url="'+url3+'" "showExact"="'+showExacte+'" "showExactD"="'+showExactDe+'" "repeatTime"="'+repeatTimee+'" ][/outgrow]';

}


  jQuery(document).ready(function(){
    jQuery('.extra-option-button').click(function(){
      jQuery('.extra-option-button').removeClass("active-span1");
      jQuery(this).addClass("active-span1");
  });
  });


  function toggleSwitchFecebook(){
    document.getElementById('editor-facebook-span').classList.toggle('toggle-on-editor');
    $(document).ready(function(){
      if ( $('#editor-facebook-span').hasClass('toggle-on-editor') ) {
        document.getElementById('editor-facebook-div').style.backgroundColor="#fb5f66";
        document.getElementById(editorId).innerText='[outgrow type="mobile_full_screen_facebook" id="'+editorId+ '" data_url="'+calc_url0+'" short_url="'+short_url0+'"][/outgrow]';
        // document.getElementById('text-inside-1').innerText='[outgrow type="mobile_full_screen_facebook" id="'+id_used+ '" data_url="'+url+'" short_url="'+short_url_used+'"][/outgrow]';
      
      }else{
        document.getElementById('editor-facebook-div').style.backgroundColor="#a8a8a8";
        document.getElementById(editorId).innerText='[outgrow type="mobile_full_screen" id="'+editorId+ '" data_url="'+calc_url0+'" short_url="'+short_url0+'"][/outgrow]';
        // document.getElementById('text-inside-1').innerText='[outgrow type="mobile_full_screen" id="'+id_used+ '" data_url="'+url+'" short_url="'+short_url_used+'"][/outgrow]';
      
      }
    });  
  }