ByteZhenWenn.SplashScreenCode = {};
ByteZhenWenn.SplashScreenCode.localVariables = [];
ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects1= [];
ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects2= [];
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects1= [];
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects2= [];
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects1= [];
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects2= [];
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects1= [];
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects2= [];


ByteZhenWenn.SplashScreenCode.userFunc0xc0b3f8 = function GDJSInlineCode(runtimeScene) {
"use strict";
/** DOC: Bind message listener once and set a scene flag instead of switching here */
if (!runtimeScene._messageBound) {
  runtimeScene._messageBound = true;

  window.addEventListener("message", (event) => {
    /** DOC: Same-origin guard */
    if (event.origin !== window.location.origin) return;
    console.log('Mensagem recebida do site principal:', event.data);
 
    const data = event.data || {};
    if (data.action === "auth_info") {
      /** DOC: Set scene variable flag to be consumed on the next events step */
      runtimeScene.getGame().getVariables().get("userbalance").setString(event.data.data.balance);
      runtimeScene.getGame().getVariables().get("userid").setString(event.data.data.id);
      runtimeScene.getVariables().get("GoLobby").setBoolean(true);

      /** DOC: Optional UI tweak outside game */
      setTimeout(() => {
       const splash = document.querySelector(".splash");
       if (splash) splash.style.display = "none";
      }, 200);
    }
  });
}

};
ByteZhenWenn.SplashScreenCode.eventsList0 = function(runtimeScene) {

{


ByteZhenWenn.SplashScreenCode.userFunc0xc0b3f8(runtimeScene);

}


};ByteZhenWenn.SplashScreenCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(14758644);
}
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.SplashScreenCode.eventsList0(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getScene().getVariables().getFromIndex(0).getAsBoolean();
}
if (isConditionTrue_0) {
{ByteZhenWenn.evtTools.runtimeScene.replaceScene(runtimeScene, "LobbyUI", true);
}}

}


};

ByteZhenWenn.SplashScreenCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects2.length = 0;

ByteZhenWenn.SplashScreenCode.eventsList1(runtimeScene);
ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSpriteObjects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite2Objects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDNewSprite3Objects2.length = 0;
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects1.length = 0;
ByteZhenWenn.SplashScreenCode.GDStartButtonObjects2.length = 0;


return;

}

ByteZhenWenn['SplashScreenCode'] = ByteZhenWenn.SplashScreenCode;
