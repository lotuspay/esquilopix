
if (typeof ByteZhenWenn.evtsExt__ExtendedMath__E !== "undefined") {
  ByteZhenWenn.evtsExt__ExtendedMath__E.registeredGdjsCallbacks.forEach(callback =>
    ByteZhenWenn._unregisterCallback(callback)
  );
}

ByteZhenWenn.evtsExt__ExtendedMath__E = {};


ByteZhenWenn.evtsExt__ExtendedMath__E.userFunc0x9dad68 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
eventsFunctionContext.returnValue = Math.E;
};
ByteZhenWenn.evtsExt__ExtendedMath__E.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


ByteZhenWenn.evtsExt__ExtendedMath__E.userFunc0x9dad68(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

ByteZhenWenn.evtsExt__ExtendedMath__E.func = function(runtimeScene, parentEventsFunctionContext) {
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
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


ByteZhenWenn.evtsExt__ExtendedMath__E.eventsList0(runtimeScene, eventsFunctionContext);


return Number(eventsFunctionContext.returnValue) || 0;
}

ByteZhenWenn.evtsExt__ExtendedMath__E.registeredGdjsCallbacks = [];