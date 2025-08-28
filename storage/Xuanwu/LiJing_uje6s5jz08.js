
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite || {};

/**
 * Behavior generated from Animate backwards (For sprite objects)
 */
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite = class AnimateBackwards_Sprite extends ByteZhenWenn.RuntimeBehavior {
  constructor(instanceContainer, behaviorData, owner) {
    super(instanceContainer, behaviorData, owner);
    this._runtimeScene = instanceContainer;

    this._onceTriggers = new ByteZhenWenn.OnceTriggers();
    this._behaviorData = {};
    this._sharedData = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.getSharedData(
      instanceContainer,
      behaviorData.name
    );
    
    this._behaviorData.Animatable = behaviorData.Animatable !== undefined ? behaviorData.Animatable : "ABC";
    this._behaviorData.AnimateBackwards = behaviorData.AnimateBackwards !== undefined ? behaviorData.AnimateBackwards : true;
    this._behaviorData.BackwardsType = behaviorData.BackwardsType !== undefined ? behaviorData.BackwardsType : "Linear";
    this._behaviorData.CurrentSpeed = behaviorData.CurrentSpeed !== undefined ? behaviorData.CurrentSpeed : Number("0.08") || 0;
    this._behaviorData.LoopAnimation = behaviorData.LoopAnimation !== undefined ? behaviorData.LoopAnimation : false;
    this._behaviorData.HasFinished = false;
    this._behaviorData.Boomerang = false;
    this._behaviorData.InitialAnimation = "";
    this._behaviorData.HasChangedAnimation = false;
    this._behaviorData.InitialType = "";
    this._behaviorData.HasChangedType = false;
    this._behaviorData.DefaultType = "Linear";
    this._behaviorData.DefaultSpeed = Number("0.08") || 0;
    this._behaviorData.SpeedScale = Number("1") || 0;
  }

  // Hot-reload:
  updateFromBehaviorData(oldBehaviorData, newBehaviorData) {
    
    if (oldBehaviorData.Animatable !== newBehaviorData.Animatable)
      this._behaviorData.Animatable = newBehaviorData.Animatable;
    if (oldBehaviorData.AnimateBackwards !== newBehaviorData.AnimateBackwards)
      this._behaviorData.AnimateBackwards = newBehaviorData.AnimateBackwards;
    if (oldBehaviorData.BackwardsType !== newBehaviorData.BackwardsType)
      this._behaviorData.BackwardsType = newBehaviorData.BackwardsType;
    if (oldBehaviorData.CurrentSpeed !== newBehaviorData.CurrentSpeed)
      this._behaviorData.CurrentSpeed = newBehaviorData.CurrentSpeed;
    if (oldBehaviorData.LoopAnimation !== newBehaviorData.LoopAnimation)
      this._behaviorData.LoopAnimation = newBehaviorData.LoopAnimation;
    if (oldBehaviorData.HasFinished !== newBehaviorData.HasFinished)
      this._behaviorData.HasFinished = newBehaviorData.HasFinished;
    if (oldBehaviorData.Boomerang !== newBehaviorData.Boomerang)
      this._behaviorData.Boomerang = newBehaviorData.Boomerang;
    if (oldBehaviorData.InitialAnimation !== newBehaviorData.InitialAnimation)
      this._behaviorData.InitialAnimation = newBehaviorData.InitialAnimation;
    if (oldBehaviorData.HasChangedAnimation !== newBehaviorData.HasChangedAnimation)
      this._behaviorData.HasChangedAnimation = newBehaviorData.HasChangedAnimation;
    if (oldBehaviorData.InitialType !== newBehaviorData.InitialType)
      this._behaviorData.InitialType = newBehaviorData.InitialType;
    if (oldBehaviorData.HasChangedType !== newBehaviorData.HasChangedType)
      this._behaviorData.HasChangedType = newBehaviorData.HasChangedType;
    if (oldBehaviorData.DefaultType !== newBehaviorData.DefaultType)
      this._behaviorData.DefaultType = newBehaviorData.DefaultType;
    if (oldBehaviorData.DefaultSpeed !== newBehaviorData.DefaultSpeed)
      this._behaviorData.DefaultSpeed = newBehaviorData.DefaultSpeed;
    if (oldBehaviorData.SpeedScale !== newBehaviorData.SpeedScale)
      this._behaviorData.SpeedScale = newBehaviorData.SpeedScale;

    return true;
  }

  // Network sync:
  getNetworkSyncData() {
    return {
      ...super.getNetworkSyncData(),
      props: {
        
    Animatable: this._behaviorData.Animatable,
    AnimateBackwards: this._behaviorData.AnimateBackwards,
    BackwardsType: this._behaviorData.BackwardsType,
    CurrentSpeed: this._behaviorData.CurrentSpeed,
    LoopAnimation: this._behaviorData.LoopAnimation,
    HasFinished: this._behaviorData.HasFinished,
    Boomerang: this._behaviorData.Boomerang,
    InitialAnimation: this._behaviorData.InitialAnimation,
    HasChangedAnimation: this._behaviorData.HasChangedAnimation,
    InitialType: this._behaviorData.InitialType,
    HasChangedType: this._behaviorData.HasChangedType,
    DefaultType: this._behaviorData.DefaultType,
    DefaultSpeed: this._behaviorData.DefaultSpeed,
    SpeedScale: this._behaviorData.SpeedScale,
      }
    };
  }
  updateFromNetworkSyncData(networkSyncData) {
    super.updateFromNetworkSyncData(networkSyncData);
    
    if (networkSyncData.props.Animatable !== undefined)
      this._behaviorData.Animatable = networkSyncData.props.Animatable;
    if (networkSyncData.props.AnimateBackwards !== undefined)
      this._behaviorData.AnimateBackwards = networkSyncData.props.AnimateBackwards;
    if (networkSyncData.props.BackwardsType !== undefined)
      this._behaviorData.BackwardsType = networkSyncData.props.BackwardsType;
    if (networkSyncData.props.CurrentSpeed !== undefined)
      this._behaviorData.CurrentSpeed = networkSyncData.props.CurrentSpeed;
    if (networkSyncData.props.LoopAnimation !== undefined)
      this._behaviorData.LoopAnimation = networkSyncData.props.LoopAnimation;
    if (networkSyncData.props.HasFinished !== undefined)
      this._behaviorData.HasFinished = networkSyncData.props.HasFinished;
    if (networkSyncData.props.Boomerang !== undefined)
      this._behaviorData.Boomerang = networkSyncData.props.Boomerang;
    if (networkSyncData.props.InitialAnimation !== undefined)
      this._behaviorData.InitialAnimation = networkSyncData.props.InitialAnimation;
    if (networkSyncData.props.HasChangedAnimation !== undefined)
      this._behaviorData.HasChangedAnimation = networkSyncData.props.HasChangedAnimation;
    if (networkSyncData.props.InitialType !== undefined)
      this._behaviorData.InitialType = networkSyncData.props.InitialType;
    if (networkSyncData.props.HasChangedType !== undefined)
      this._behaviorData.HasChangedType = networkSyncData.props.HasChangedType;
    if (networkSyncData.props.DefaultType !== undefined)
      this._behaviorData.DefaultType = networkSyncData.props.DefaultType;
    if (networkSyncData.props.DefaultSpeed !== undefined)
      this._behaviorData.DefaultSpeed = networkSyncData.props.DefaultSpeed;
    if (networkSyncData.props.SpeedScale !== undefined)
      this._behaviorData.SpeedScale = networkSyncData.props.SpeedScale;
  }

  // Properties:
  
  _getAnimatable() {
    return this._behaviorData.Animatable !== undefined ? this._behaviorData.Animatable : "ABC";
  }
  _setAnimatable(newValue) {
    this._behaviorData.Animatable = newValue;
  }
  _getAnimateBackwards() {
    return this._behaviorData.AnimateBackwards !== undefined ? this._behaviorData.AnimateBackwards : true;
  }
  _setAnimateBackwards(newValue) {
    this._behaviorData.AnimateBackwards = newValue;
  }
  _toggleAnimateBackwards() {
    this._setAnimateBackwards(!this._getAnimateBackwards());
  }
  _getBackwardsType() {
    return this._behaviorData.BackwardsType !== undefined ? this._behaviorData.BackwardsType : "Linear";
  }
  _setBackwardsType(newValue) {
    this._behaviorData.BackwardsType = newValue;
  }
  _getCurrentSpeed() {
    return this._behaviorData.CurrentSpeed !== undefined ? this._behaviorData.CurrentSpeed : Number("0.08") || 0;
  }
  _setCurrentSpeed(newValue) {
    this._behaviorData.CurrentSpeed = newValue;
  }
  _getLoopAnimation() {
    return this._behaviorData.LoopAnimation !== undefined ? this._behaviorData.LoopAnimation : false;
  }
  _setLoopAnimation(newValue) {
    this._behaviorData.LoopAnimation = newValue;
  }
  _toggleLoopAnimation() {
    this._setLoopAnimation(!this._getLoopAnimation());
  }
  _getHasFinished() {
    return this._behaviorData.HasFinished !== undefined ? this._behaviorData.HasFinished : false;
  }
  _setHasFinished(newValue) {
    this._behaviorData.HasFinished = newValue;
  }
  _toggleHasFinished() {
    this._setHasFinished(!this._getHasFinished());
  }
  _getBoomerang() {
    return this._behaviorData.Boomerang !== undefined ? this._behaviorData.Boomerang : false;
  }
  _setBoomerang(newValue) {
    this._behaviorData.Boomerang = newValue;
  }
  _toggleBoomerang() {
    this._setBoomerang(!this._getBoomerang());
  }
  _getInitialAnimation() {
    return this._behaviorData.InitialAnimation !== undefined ? this._behaviorData.InitialAnimation : "";
  }
  _setInitialAnimation(newValue) {
    this._behaviorData.InitialAnimation = newValue;
  }
  _getHasChangedAnimation() {
    return this._behaviorData.HasChangedAnimation !== undefined ? this._behaviorData.HasChangedAnimation : false;
  }
  _setHasChangedAnimation(newValue) {
    this._behaviorData.HasChangedAnimation = newValue;
  }
  _toggleHasChangedAnimation() {
    this._setHasChangedAnimation(!this._getHasChangedAnimation());
  }
  _getInitialType() {
    return this._behaviorData.InitialType !== undefined ? this._behaviorData.InitialType : "";
  }
  _setInitialType(newValue) {
    this._behaviorData.InitialType = newValue;
  }
  _getHasChangedType() {
    return this._behaviorData.HasChangedType !== undefined ? this._behaviorData.HasChangedType : false;
  }
  _setHasChangedType(newValue) {
    this._behaviorData.HasChangedType = newValue;
  }
  _toggleHasChangedType() {
    this._setHasChangedType(!this._getHasChangedType());
  }
  _getDefaultType() {
    return this._behaviorData.DefaultType !== undefined ? this._behaviorData.DefaultType : "Linear";
  }
  _setDefaultType(newValue) {
    this._behaviorData.DefaultType = newValue;
  }
  _getDefaultSpeed() {
    return this._behaviorData.DefaultSpeed !== undefined ? this._behaviorData.DefaultSpeed : Number("0.08") || 0;
  }
  _setDefaultSpeed(newValue) {
    this._behaviorData.DefaultSpeed = newValue;
  }
  _getSpeedScale() {
    return this._behaviorData.SpeedScale !== undefined ? this._behaviorData.SpeedScale : Number("1") || 0;
  }
  _setSpeedScale(newValue) {
    this._behaviorData.SpeedScale = newValue;
  }
}

/**
 * Shared data generated from Animate backwards (For sprite objects)
 */
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.SharedData = class AnimateBackwards_SpriteSharedData {
  constructor(sharedData) {
    
  }
  
  // Shared properties:
  
}

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.getSharedData = function(instanceContainer, behaviorName) {
  if (!instanceContainer._AnimateBackwards_AnimateBackwards_SpriteSharedData) {
    const initialData = instanceContainer.getInitialSharedDataForBehavior(
      behaviorName
    );
    instanceContainer._AnimateBackwards_AnimateBackwards_SpriteSharedData = new ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.SharedData(
      initialData
    );
  }
  return instanceContainer._AnimateBackwards_AnimateBackwards_SpriteSharedData;
}

// Methods:
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed() < 0 ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setCurrentSpeed(0);
}
}}

}


{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDefaultType((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setInitialAnimation((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).getAnimationName()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setInitialType((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setDefaultSpeed((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setInitialType((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()));
}
}}

}


{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].setAnimationFrame((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getAnimationFrameCount()) - 1);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).pauseAnimation();
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.onCreatedContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final = [];

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects7= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedAnimation(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedType(false);
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLoopAnimation() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6[i].setAnimationFrame((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6[i].getAnimationFrameCount()) - 1);
}
}}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLoopAnimation()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i].removeTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasFinished(true);
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList2 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType() == "Linear" ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList1(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType() == "Boomerang" ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(true);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].resetTimer("__AnimateBackwards_animateBoomerang");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].removeTimer("__AnimateBackwards_animateBackwards");
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList3 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getAnimationFrame() == 0 ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getTimerElapsedTimeInSecondsOrNaN("__AnimateBackwards_animateBackwards") >= (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()) * (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getSpeedScale()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}
{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList2(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getAnimationFrame() != 0 ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getTimerElapsedTimeInSecondsOrNaN("__AnimateBackwards_animateBackwards") >= (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()) * (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getSpeedScale()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].setAnimationFrame(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getAnimationFrame() - (1));
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList4 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLoopAnimation() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].removeTimer("__AnimateBackwards_animateBoomerang");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLoopAnimation()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].removeTimer("__AnimateBackwards_animateBoomerang");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasFinished(true);
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList5 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getTimerElapsedTimeInSecondsOrNaN("__AnimateBackwards_animateBoomerang") >= (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()) * (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getSpeedScale()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getAnimationFrame() == (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getAnimationFrameCount()) - 1 ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
}
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList4(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getTimerElapsedTimeInSecondsOrNaN("__AnimateBackwards_animateBoomerang") >= (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()) * (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getSpeedScale()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrame() != (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrameCount()) - 1 ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].resetTimer("__AnimateBackwards_animateBoomerang");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].setAnimationFrame(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrame() + (1));
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList6 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBoomerang()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList3(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBoomerang() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList5(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList7 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].timerPaused("__AnimateBackwards_animateBackwards")) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList8 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2);

{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType() == "Linear" ) {
        isConditionTrue_2 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_2) {
isConditionTrue_2 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrame() != 0 ) {
        isConditionTrue_2 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final.indexOf(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[j]) === -1 )
            ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final.push(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[j]);
    }
}
}
{
ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2);

{let isConditionTrue_2 = false;
isConditionTrue_2 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType() == "Boomerang" ) {
        isConditionTrue_2 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_2) {
isConditionTrue_2 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrame() != (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getAnimationFrameCount()) - 1 ) {
        isConditionTrue_2 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
}
isConditionTrue_1 = isConditionTrue_2;
}
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final.indexOf(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[j]) === -1 )
            ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final.push(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[j]);
    }
}
}
{
ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1_1final, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1);
}
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasFinished(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(false);
}
}
{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList7(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList9 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).isAnimationPaused()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).pauseAnimation();
}
}}

}


{

ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasFinished()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList6(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasFinished() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList8(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList10 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList9(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList11 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialAnimation() != (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).getAnimationName()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setInitialAnimation((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).getAnimationName()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedAnimation(true);
}
}}

}


{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getInitialType() != (ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setInitialType((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasChangedType(true);
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList12 = function(runtimeScene, eventsFunctionContext) {

{


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList0(runtimeScene, eventsFunctionContext);
}


{


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList10(runtimeScene, eventsFunctionContext);
}


{


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList11(runtimeScene, eventsFunctionContext);
}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEvents = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects7.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.eventsList12(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects2.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects3.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects4.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects5.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects6.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPostEventsContext.GDObjectObjects7.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasChangedType() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationType = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationTypeContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasChangedAnimation() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimation = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.HasChangedAnimationContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getHasFinished() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinished = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsHasFinishedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final = [];

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1.length = 0;


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final.length = 0;
let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2);
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[i].timerPaused("__AnimateBackwards_animateBackwards") ) {
        isConditionTrue_1 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final.indexOf(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[j]) === -1 )
            ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final.push(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[j]);
    }
}
}
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2);
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[i].timerPaused("__AnimateBackwards_animateBoomerang") ) {
        isConditionTrue_1 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length = k;
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
    for (let j = 0, jLen = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length; j < jLen ; ++j) {
        if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final.indexOf(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[j]) === -1 )
            ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final.push(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2[j]);
    }
}
}
{
ByteZhenWenn.copyArray(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1_1final, ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1);
}
}
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPaused = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPausedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsActivatedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getLoopAnimation() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = true; }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivated = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsLoopActivatedContext.GDObjectObjects2.length = 0;


return !!eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Skip") : false);
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].setAnimationFrame((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getAnimationFrameCount()) - 1);
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Toggle") : false);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards()) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setAnimateBackwards(true);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasFinished(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).pauseAnimation();
}
}
{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Toggle") : false);
}
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setAnimateBackwards(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setHasFinished(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].removeTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].removeTimer("__AnimateBackwards_animateBoomerang");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Animatable")).resumeAnimation();
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggle = function(Toggle, Skip, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
if (argName === "Toggle") return Toggle;
if (argName === "Skip") return Skip;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.eventsList1(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = (typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Toggle") : false);
}
if (isConditionTrue_0) {
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLoopAnimation(true);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = !(typeof eventsFunctionContext !== 'undefined' ? !!eventsFunctionContext.getArgument("Toggle") : false);
}
if (isConditionTrue_0) {
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setLoopAnimation(false);
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoop = function(Toggle, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
if (argName === "Toggle") return Toggle;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsToggleLoopContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1[i].pauseTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1[i].pauseTimer("__AnimateBackwards_animateBoomerang");
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPause = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsPauseContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1[i].unpauseTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1[i].unpauseTimer("__AnimateBackwards_animateBoomerang");
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResume = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsResumeContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length;i<l;++i) {
    if ( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getAnimateBackwards() ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i].setAnimationFrame((ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i].getAnimationFrameCount()) - 1);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(false);
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestart = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.BackwardsRestartContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setSpeedScale((typeof eventsFunctionContext !== 'undefined' ? Number(eventsFunctionContext.getArgument("Value")) || 0 : 0));
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScale = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsSpeedScaleContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setCurrentSpeed((typeof eventsFunctionContext !== 'undefined' ? Number(eventsFunctionContext.getArgument("Value")) || 0 : 0));
}
}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsInterval = function(Value, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
if (argName === "Value") return Value;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsIntervalContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{

/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].timerPaused("__AnimateBackwards_animateBackwards")) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length;i<l;++i) {
    if ( !(ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].getTimerElapsedTimeInSecondsOrNaN("__AnimateBackwards_animateBackwards") > 0) ) {
        isConditionTrue_0 = true;
        ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[k] = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i];
        ++k;
    }
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1 */
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].resetTimer("__AnimateBackwards_animateBackwards");
}
}}

}


};ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.eventsList1 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1);
{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBackwardsType((typeof eventsFunctionContext !== 'undefined' ? "" + eventsFunctionContext.getArgument("Type") : ""));
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._setBoomerang(false);
}
}{for(var i = 0, len = ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length ;i < len;++i) {
    ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1[i].removeTimer("__AnimateBackwards_animateBoomerang");
}
}
{ //Subevents
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.eventsList0(runtimeScene, eventsFunctionContext);} //End of subevents
}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsType = function(Type, parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
if (argName === "Type") return Type;
    return "";
  },
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.eventsList1(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.ChangeBackwardsTypeContext.GDObjectObjects2.length = 0;


return;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1.length === 0 ) ? 0 :ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getSpeedScale()); }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScale = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.SpeedScaleContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1.length === 0 ) ? 0 :ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getCurrentSpeed()); }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentInterval = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentIntervalContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1.length === 0 ) ? 0 :ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getDefaultSpeed()); }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultInterval = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultIntervalContext.GDObjectObjects2.length = 0;


return Number(eventsFunctionContext.returnValue) || 0;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1.length === 0 ) ? "" :ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()); }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentType = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.CurrentTypeContext.GDObjectObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext = {};
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1= [];
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects2= [];


ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


let isConditionTrue_0 = false;
{
ByteZhenWenn.copyArray(eventsFunctionContext.getObjects("Object"), ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1);
{if (typeof eventsFunctionContext !== 'undefined') { eventsFunctionContext.returnValue = (( ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1.length === 0 ) ? "" :ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1[0].getBehavior(eventsFunctionContext.getBehaviorName("Behavior"))._getBackwardsType()); }}}

}


};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultType = function(parentEventsFunctionContext) {

var that = this;
var runtimeScene = this._runtimeScene;
var thisObjectList = [this.owner];
var Object = Hashtable.newFrom({Object: thisObjectList});
var Behavior = this.name;
var eventsFunctionContext = {
  _objectsMap: {
"Object": Object
},
  _objectArraysMap: {
"Object": thisObjectList
},
  _behaviorNamesMap: {
"Behavior": Behavior
, "Animatable": this._getAnimatable()
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("AnimateBackwards"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("AnimateBackwards"),
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
  getOnceTriggers: function() { return that._onceTriggers; }
};

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects2.length = 0;

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.eventsList0(runtimeScene, eventsFunctionContext);
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects1.length = 0;
ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.DefaultTypeContext.GDObjectObjects2.length = 0;


return "" + eventsFunctionContext.returnValue;
}

ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite.prototype.doStepPreEvents = function() {
  this._onceTriggers.startNewFrame();
};


ByteZhenWenn.registerBehavior("AnimateBackwards::AnimateBackwards_Sprite", ByteZhenWenn.evtsExt__AnimateBackwards__AnimateBackwards_Sprite.AnimateBackwards_Sprite);
