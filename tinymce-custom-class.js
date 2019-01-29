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

          document.getElementById("tiny-mce-custom-og-body").innerHTML="<div id='getAPI'><div id='selectAPI'><form method='post'><select name='inptProduct' Placeholder='Enter API KEY' id='select-custom-api' onclick='selectAPI()'>"
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
            <div class="shortcodecard-content" id="${element.id}-view" onclick='viewDetails("${element.id}")'>${element.meta_data.title}</div>
              
            <div id="${element.id}-div-section" class="hide">
              <div id="section-div-1">
                <div id="embed1" class="embed" onclick="getEmbedCode('embed1','${element.dev_app}','${element.calc_url}','${element.short_url}')"><i class="material-icons">extension</i>EMBED + MOBILE FULL SCREEN</div>
                <div id="embed2" class="embed" onclick="getEmbedCode('embed2','${element.dev_app}','${element.calc_url}','${element.short_url}')">EMBED + MOBILE IN PAGE</div>
                <div id="embed3" class="embed" onclick="getEmbedCode('embed3','${element.dev_app}','${element.calc_url}','${element.short_url}')">POP UP</div>
                <div id="embed4" class="embed" onclick="getEmbedCode('embed4','${element.dev_app}','${element.calc_url}','${element.short_url}')">CHAT</div>
                <div id="embed5" class="embed" onclick="getEmbedCode('embed5','${element.dev_app}','${element.calc_url}','${element.short_url}')">CUSTOM EMBED</div>
              </div>
              <div id="section-div-2">
                <div onclick="getCopy()"><textarea id="${element.id}" cols="40" rows="10">text here</textarea>
                <button onclick="getCopy()">COPY</button>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>`);
    });
  
      
   }
   document.getElementById("tiny-mce-custom-og-body").insertAdjacentHTML("afterend","</div>");
   },

   error: function(err){
     if(err.responseJSON.code==401){
     }
   }
  });
}

function viewDetails(id,url,s_url){

  console.log("::id::",id,"::url::",url,"::surl::",s_url);
      // editor.addButton('myblockquotebtn', {
      //   title: 'My Blockquote',
      //   cmd: 'myBlockquoteBtnCmd'
      //   // image: url + '/img/quote.png'
      // });

  // toggle starts
  $(document).ready(function(){
    document.getElementById(id+'-div-section').classList.toggle("toggle-on");    
    if ( $('#'+id+'-div-section').hasClass('toggle-on') ) {
      document.getElementById(id+'-div-section').classList.remove("hide");   
    }else{
      document.getElementById(id+'-div-section').classList.add("hide");    
    }
  });  
  //toggle ends 
    
}

function getEmbedCode(type,id,url,short_url){
  console.log("-----------------------",type,"-----------------------");
  console.log(document.getElementById(id));
  document.getElementById(id).innerText=type; 
  if(type=="embed1"){
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById(id).innerText=type;
  } 
  if(type=="embed2"){
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById(id).innerText=type;
  } 
  if(type=="embed3"){
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById(id).innerText=type;
  } 
  if(type=="embed4"){
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById(id).innerText=type;
  } 
  if(type=="embed5"){
    console.log('[outgrow type="mobile_full_screen" id="'+id+ '" data_url="'+url+'" short_url="'+short_url+'"][/outgrow]');
    document.getElementById(id).innerText=type;
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