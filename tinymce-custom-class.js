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
                  onclick:function(){
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
      document.getElementById("api-card").insertAdjacentHTML(`afterend`,`<div class="shortcodecard-row" id="shortcodecard-row-id"><div id="shortcodecard-col">
      <div id="shortcode-card-body">
       <div class="shortcodecard-content" id="${element.id}" onclick="viewDetails('${element.id}','${element.calc_url}','${element.short_url}')">${element.meta_data.title}</div>
       </div>
      </div></div>`);
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
  document.getElementById(id).innerHTML=`<div id="shortcode-header"></div>`+
      `<div id="main-div-section"><div id="section-div-1">`+
      `<div id="embed1" class="embed" onclick="getEmbedCode('embed1')"><i class="material-icons">extension</i>EMBED + MOBILE FULL SCREEN</div>`+
      `<div id="embed2" class="embed" onclick="getEmbedCode('embed2')">EMBED + MOBILE IN PAGE</div>`+
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
    // document.getElementById(id).classList.toggle('toggle-on');
    // $(document).ready(function(){
    //   if ( $('#'+id).hasClass('toggle-on') ) {
    //     document.getElementById("div-content").innerHTML="<div id='copy-shortcode'></div>";
    // document.getElementById(id).innerHTML=`<div class="section-header">`+
    //   `<div id="section-div-1">`+
    //   `<div id="embed1" class="embed" onclick="getEmbedCode('embed1')">EMBED + MOBILE FULL SCREEN</div>`+
    //   `<div id="embed2" class="embed" onclick="getEmbedCode('embed2')">EMBED + MOBILE IN PAGE</div>`+
    //   `<div id="embed3" class="embed" onclick="getEmbedCode('embed3')">POP UP</div>`+
    //   `<div id="embed4" class="embed" onclick="getEmbedCode('embed4')">CHAT</div>`+
    //   `<div id="embed5" class="embed" onclick="getEmbedCode('embed5')">CUSTOM EMBED</div>`+
    //   `</div></div>`
    // `<div id="shortcode-text"><div id="shgn">---------------Welcome---------------</div></div>`;
      //   }else{
      //     document.getElementById(id).innerHTML="";
      //   }
      // });
  //toggle ends 
    
}

function getEmbedCode(type){
  console.log("-----------------------",type,"-----------------------");
  console.log(document.getElementById("shortcode-text"));
  document.getElementById("shortcode-text").innerText=type;  
  // document.getElementById(type).style.backgroundColor="red";
}

// dropbutton starts

// (function() {
//   tinymce.PluginManager.add('wdm_mce_dropbutton', function( editor, url ) {
//      editor.addButton( 'wdm_mce_dropbutton', {
//            text: 'Outgrow',
//           //  icon: 'icon dashicons-wordpress',
//            type: 'menubutton',
//            menu: [
//                  {
//                   text: apiSet[0],
//                   onclick: function() {
//                      editor.insertContent('[wdm_shortcode 1]');
//                   }
//                   },
//                  {
//                   text: apiSet[1],
//                   onclick: function() {
//                      editor.insertContent('[wdm_shortcode 2]');
//                   }
//                  }
//                  ]
//         });
//   });
// })();

// dropbutton ends
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