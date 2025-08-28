
if (typeof ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString !== "undefined") {
  ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.registeredGdjsCallbacks.forEach(callback =>
    ByteZhenWenn._unregisterCallback(callback)
  );
}

ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString = {};


ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.userFunc0x6ffa18 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
const valueToBeRounded = eventsFunctionContext.getArgument("ValueToBeRounded");
const numberOfDecimalPlaces = eventsFunctionContext.getArgument("NumberOfDecimalPlaces");
eventsFunctionContext.returnValue = valueToBeRounded.toFixed(numberOfDecimalPlaces);
};
ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
}

}


{


ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.userFunc0x6ffa18(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.func = function(runtimeScene, ValueToBeRounded, NumberOfDecimalPlaces, parentEventsFunctionContext) {
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
if (argName === "ValueToBeRounded") return ValueToBeRounded;
if (argName === "NumberOfDecimalPlaces") return NumberOfDecimalPlaces;
    return "";
  },
  getOnceTriggers: function() { return runtimeScene.getOnceTriggers(); }
};


ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.eventsList0(runtimeScene, eventsFunctionContext);


return "" + eventsFunctionContext.returnValue;
}

ByteZhenWenn.evtsExt__ExtendedMath__ToFixedString.registeredGdjsCallbacks = [];