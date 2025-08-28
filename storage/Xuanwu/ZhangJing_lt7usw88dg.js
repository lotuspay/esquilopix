
if (typeof ByteZhenWenn.evtsExt__ExtendedMath__Hypot !== "undefined") {
  ByteZhenWenn.evtsExt__ExtendedMath__Hypot.registeredGdjsCallbacks.forEach(callback =>
    ByteZhenWenn._unregisterCallback(callback)
  );
}

ByteZhenWenn.evtsExt__ExtendedMath__Hypot = {};


ByteZhenWenn.evtsExt__ExtendedMath__Hypot.userFunc0x80dbb0 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const a = eventsFunctionContext.getArgument("a");
const b = eventsFunctionContext.getArgument("b");

eventsFunctionContext.returnValue = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
};
ByteZhenWenn.evtsExt__ExtendedMath__Hypot.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


ByteZhenWenn.evtsExt__ExtendedMath__Hypot.userFunc0x80dbb0(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

ByteZhenWenn.evtsExt__ExtendedMath__Hypot.func = function(runtimeScene, a, b, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("ExtendedMath"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("ExtendedMath"),
  localVariables: [],
  getObjects: function(objectName) {
    return eventsFunctionContext._objectArraysMap[objectName] || [];
  },
  getObjectsLists: function(objectName) {
    return eventsFunctionContext._objectsMap[objectName] || null;
  },
  getBehaviorName: function(behaviorName) {
    return eventsFunctionContext._behaviorNamesMap[behaviorName] || behaviorName;
  },
  createObject: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    if (objectsList) {
      const object = parentEventsFunctionContext ?
        parentEventsFunctionContext.createObject(objectsList.firstKey()) :
        runtimeScene.createObject(objectsList.firstKey());
      if (object) {
        objectsList.get(objectsList.firstKey()).push(object);
        eventsFunctionContext._objectArraysMap[objectName].push(object);
      }
      return object;    }
    return null;
  },
  getInstancesCountOnScene: function(objectName) {
    const objectsList = eventsFunctionContext._objectsMap[objectName];
    let count = 0;
    if (objectsList) {
      for(const objectName in objectsList.items)
        count += parentEventsFunctionContext ?
parentEventsFunctionContext.getInstancesCountOnScene(objectName) :
        runtimeScene.getInstancesCountOnScene(objectName);
    }
    return count;
  },
  getLayer: function(layerName) {
    return runtimeScene.getLayer(layerName);
  },
  getArgument: function(argName) {
if (argName === "a") return a;
if (argName === "b") return b;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


ByteZhenWenn.evtsExt__ExtendedMath__Hypot.eventsList0(runtimeScene, eventsFunctionContext);


return Number(eventsFunctionContext.returnValue) || 0;
}

ByteZhenWenn.evtsExt__ExtendedMath__Hypot.registeredGdjsCallbacks = [];