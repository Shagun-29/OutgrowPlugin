// // editor
editorShortcode="[outgrow][/outgrow]";
// apiSet=["bc4c5eaac967061516d56310cb0002","fdb023359c49a0f2cd0a34242c9f1a"];
// (function(){
//   apiSet=[];
//   cookies=document.cookie;
  
//   // js logic
//   console.log(cookies);
//   cookiesArray=cookies.split(";");
//   // console.log(cookiesArray);
//   if(cookiesArray.length>0){
//     for(i=0;i<cookiesArray.length;i++){
//       key=cookiesArray[i].split("=")[0];
//       if(key=="username"){
//         value=cookiesArray[i].split("=")[1];
//         console.log("::--values--::",value);
//       }
//     }
//     apiValues=value.split(",");
//       apiValues.forEach(element => {
//         console.log("-------",element);
//         apiSet.push(element);
//       });
//   }else{
//     apiSet=[];
//   }

  
// })();

// php lpogic
(function(){
  APIset=[];
  cookies=document.cookie;
  // console.log(cookies);
  cookiesArray=cookies.split(";");
  // console.log(cookiesArray);
  if(cookiesArray.length>0){
    for(i=0;i<cookiesArray.length;i++){
      key=cookiesArray[i].split("=")[0];
      // console.log("--keys--",key);
      if(key == " API"){
        value=cookiesArray[i].split("=")[1];
        // console.log(value.split('+'));
        // value=cookiesArray[i];
        // console.log("::--values--::",value);
      }
    }
    apiValues=value.split("+");
      apiValues.forEach(element => {
        // console.log("-------",element);
        apiSet.push(element);
      });
  }else{
    // apiSet=[];
  }

  
})();

// php logic ends
console.log("--------API SET------",apiSet);



(function() {

  // for ( var i = 0; i < scriptParams.users.length; i++ ) {
  //   alert( scriptParams.users[i] );
  // }

  tinymce.PluginManager.add( 'custom_class', function( editor, url ) {
      // alert("========-----------------==========-----------------==========-------------------========");
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
              height:400,
              id:"tiny-mce-custom-og",
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
          // alert('Button clicked!');
          document.getElementById("tiny-mce-custom-og-body").innerHTML="<div id='getAPI'><div id='selectAPI'><form method='post'><select name='inptProduct' id='select-custom-api' onclick='selectAPI()'>"
    // "+<option id='select-option-api'>"+ apiSet[0] +"</option><option id='select-option-api'>"+ apiSet[1] +
    // "</option>"
    +"</select></form></div></div>";

    if(apiSet.length>0){
 apiSet.forEach(element => {
      console.log("----inside----",element);
      document.getElementById("select-custom-api").insertAdjacentHTML('afterbegin',"<option>"+element+"</option>")
    });
    }
   
      });

      
          // var optionsAsString = "";
          // for(var i = 0; i < apiSet.length; i++) {
          //   optionsAsString += "<option value='" + apiSet[i] + "'>" + apiSet[i] + "</option>";
          // }
          // $("#select-custom-api").append( optionsAsString );


      

  });

})();


function selectAPI(){
  api=document.getElementById('select-custom-api').value;
  console.log(api);
  $.ajax({
    url:'https://api-calc.outgrow.co/api/v1/calculator?status=Live&type=All&sort=alpha_as',
    headers: {'API-KEY': api},
     type: 'get',
   success: function(response){
   var refinedResponse=response.data;
  //  console.log(refinedResponse.id);

  //  console.log(response.data);
  document.getElementById("tiny-mce-custom-og-body").insertAdjacentHTML("beforeend","<div id='api-card'>");

  if(response.success==true){
    refinedResponse.forEach(element => {
      console.log(element.meta_data.title);
      document.getElementById("api-card").insertAdjacentHTML(`afterend`,`<div class="calci-card-row" id="calci-card-row-id"><div class="calci-card-col" onclick="viewDetails('${element.id}','${element.calc_url}','${element.short_url}')">
      <div class="calci-card-body">
       <div class="calci-card-content" id="div-content">${element.meta_data.title}<div id=${element.id}></div></div>
       </div>
      </div></div>`);
      
      // document.getElementById("api-card").insertAdjacentHTML(`afterend`,`<div class="calci-card-row" id="calci-card-row-id"><div class="calci-card-col">
      // <div class="calci-card-body">editor
      //  <div class="calci-card-conteeditor}</div>
      //  </div>
      // </div></div>`);
      

    });
  
      
   }
   document.getElementById("tiny-mce-custom-og-body").insertAdjacentHTML("afterend","</div>");
   },

   error: function(err){
     // console.log('error',err.responseJSON.code);
     if(err.responseJSON.code==401){
       console.log('error',err.responseJSON.code);
     }
   }
  });
}

function viewDetails(id,url,s_url){
  console.log("----------------------------=-----------------------------=--------------------------=-----------------------------",id,url,s_url);
  document.getElementById(id).classList.toggle('toggle-on');
  $(document).ready(function(){
    if ( $('#'+id).hasClass('toggle-on') ) {
      // document.getElementById("div-content").innerHTML="<div id='copy-shortcode'></div>";
  document.getElementById(id).innerHTML=`<div class="section-header"><div id="section-div-1"><div id="embed1" class="embed" onclick="getEmbedCode('embed-1')">embed1</div><div id="embed2" class="embed" onclick="getEmbedCode('embed-2')">embed2</div><div id="embed3" class="embed" onclick="getEmbedCode('embed-3')">embed3</div><div id="embed4" class="embed" onclick="getEmbedCode('embed-4')">embed4</div><div id="embed5" class="embed" onclick="getEmbedCode('embed-5')">embed5</div></div>`+
  `<div class="section-code" id="shortcode-div">---------------Welcome--------------- </div></div>`;
  // editor.insertContent('[wdm_shortcode 1]');
  // alert("Copy");
    }else{
      document.getElementById(id).innerHTML="";
    }
  });  
    
}


function getEmbedCode(type){
  console.log("Clicked",document.getElementById('shortcode-div'),type);
  document.getElementById('shortcode-div').innerText=type;
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
