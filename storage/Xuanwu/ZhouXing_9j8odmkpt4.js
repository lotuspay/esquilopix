
if (typeof ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start !== "undefined") {
  ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.registeredGdjsCallbacks.forEach(callback =>
    ByteZhenWenn._unregisterCallback(callback)
  );
}

ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start = {};


ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.userFunc0x9e9510 = function GDJSInlineCode(runtimeScene, eventsFunctionContext) {
"use strict";
function _openedVar()   { return runtimeScene.getGame().getVariables().get("chests_opened"); }
function _revealVar()   { return runtimeScene.getGame().getVariables().get("chests_revealing"); }

function markChestOpened(i) { _openedVar().getChild(String(i)).setBoolean(true); }

function isChestOpened(i) {
  const v = _openedVar();
  return v.hasChild(String(i)) && v.getChild(String(i)).getAsBoolean();
}

function markChestRevealing(i) { _revealVar().getChild(String(i)).setBoolean(true); }

function isChestRevealing(i) {
  const v = _revealVar();
  return v.hasChild(String(i)) && v.getChild(String(i)).getAsBoolean();
}

/** DOC: ===== Emit a short euphoria burst using existing "coin_trail" =====
 * Spawns N trail emitters at (x,y), plays briefly, fades and deletes.
 */
function emitTrailBurst(runtimeScene, x, y, layerName, options) {
  options = options || {};
  const count   = typeof options.count === "number" ? options.count : 6;
  const lifeSec = typeof options.lifeSec === "number" ? options.lifeSec : 0.45;
  const spread  = typeof options.spread === "number" ? options.spread : 28; // px radius

  for (let i = 0; i < count; i++) {
    const dx = (Math.random() * 2 - 1) * spread;
    const dy = (Math.random() * 2 - 1) * spread;

    const t = layerName
      ? runtimeScene.createObjectOnLayer(layerName, "coin_trail")
      : runtimeScene.createObject("coin_trail");
    if (!t) continue;

    t.setPosition(x + dx, y + dy);
    try { t.setZOrder(99999); } catch (e) {}
    if (typeof t.startEmission === "function") t.startEmission();

    const tween = t.getBehavior && t.getBehavior("Tween");
    if (tween && typeof tween.addObjectOpacityTween === "function") {
      tween.addObjectOpacityTween("ct_fade", 0, "linear", lifeSec * 1000, false);
    }

    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(lifeSec),
      () => {
        if (typeof t.stopEmission === "function") t.stopEmission();
        t.deleteFromScene(runtimeScene);
      }
    );
  }
}


/** DOC: ===== Read current bonus multiplier from game vars (>=1) ===== */
function getBonusMultiplier(runtimeScene) {
  try {
    const v = runtimeScene.getGame().getVariables().get("bonus_multiplier").getAsNumber();
    return (typeof v === "number" && v > 1) ? v : 1;
  } catch (e) {
    return 1;
  }
}

/** DOC: ===== Create a CoinPopUp with full control (no auto-delete) ===== */
/** DOC: ===== Controlled CoinPopUp (smooth rise + optional hold, caller cleans) ===== */
function spawnCoinPopupControlled(runtimeScene, targetObj, text, options) {
  options = options || {};
  const layerName = options.layer || "";
  const risePx    = typeof options.risePx    === "number" ? options.risePx    : 26;
  const durMs     = typeof options.durMs     === "number" ? options.durMs     : 1600; // slower
  const holdMs    = typeof options.holdMs    === "number" ? options.holdMs    : 500;  // readable hold

  const popup = layerName
    ? runtimeScene.createObjectOnLayer(layerName, "CoinPopUp")
    : runtimeScene.createObject("CoinPopUp");
  if (!popup || !targetObj) return null;

  if (typeof popup.setString === "function") popup.setString(text);
  if (typeof popup.hide === "function") popup.hide(false);
  if (typeof popup.setOpacity === "function") popup.setOpacity(255);

  const cx = (typeof targetObj.getCenterXInScene === "function") ? targetObj.getCenterXInScene() : targetObj.getX();
  const cy = (typeof targetObj.getCenterYInScene === "function") ? targetObj.getCenterYInScene() : targetObj.getY();
  popup.setPosition(cx - popup.getWidth() / 2, cy - popup.getHeight() / 2 - 6);

  try { popup.setZOrder(targetObj.getZOrder() + 1000); } catch (e) { popup.setZOrder(99999); }

  const tween = popup.getBehavior && popup.getBehavior("Tween");
  const toY = popup.getY() - risePx;

  if (tween && typeof tween.addObjectPositionTween === "function") {
    tween.addObjectPositionTween("move_ctrl", popup.getX(), toY, "easeOutCubic", durMs, false);
    // NOTE: no auto-fade here; caller will schedule fade/delete after holdMs.
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait((durMs + holdMs) / 1000),
      () => {
        if (typeof tween.addObjectOpacityTween === "function") {
          tween.addObjectOpacityTween("popup_fade_final", 0, "linear", 400, false);
          runtimeScene.getAsyncTasksManager().addTask(
            ByteZhenWenn.evtTools.runtimeScene.wait(0.40),
            () => popup.deleteFromScene(runtimeScene)
          );
        } else {
          popup.deleteFromScene(runtimeScene);
        }
      }
    );
  }
  return popup;
}


/** DOC: ===== Move "BonuseMultiplier" to popup, apply xN, burst, restore =====
 * Needs: Text object named "BonuseMultiplier" with Tween behavior.
 * Flow:
 *  - Show base (+base) on popup (slow rise).
 *  - Tween BonuseMultiplier -> above popup (380ms), punch scale (220ms).
 *  - On impact: update popup to (+total) and emit coin_trail burst.
 *  - Fade multiplier (260ms), teleport back to original, restore opacity/scale.
 */
function bonusVisualApplyToPopup(runtimeScene, chestObj, basePrize, totalPrize, multiplier) {
  // Resolve layer
  let layerName = "";
  try {
    const lyr = chestObj.getLayer && chestObj.getLayer();
    if (lyr && typeof lyr.getName === "function") layerName = lyr.getName();
  } catch (e) {}

  // Spawn popup with BASE value (slower, with small hold)
  const popup = spawnCoinPopupControlled(
    runtimeScene,
    chestObj,
    "+ " + Number(basePrize || 0).toFixed(2),
    { layer: layerName, risePx: 26, durMs: 1600, holdMs: 500 }
  );
  if (!popup) return;

  // Grab multiplier text
  const arr = runtimeScene.getObjects("BonuseMultiplier");
  if (!arr || !arr.length) return; // fallback handled by popup control timing
  const mObj  = arr[0];
  const tween = mObj.getBehavior && mObj.getBehavior("Tween");

  // Cache original transform (object variables)
  const ov = mObj.getVariables();
  if (!ov.get("origInit").getAsBoolean()) {
    ov.get("origX").setNumber(mObj.getX());
    ov.get("origY").setNumber(mObj.getY());
    ov.get("origSX").setNumber(mObj.getScaleX ? mObj.getScaleX() : 1);
    ov.get("origSY").setNumber(mObj.getScaleY ? mObj.getScaleY() : 1);
    ov.get("origInit").setBoolean(true);
  }
  const origX  = ov.get("origX").getAsNumber();
  const origY  = ov.get("origY").getAsNumber();
  const origSX = ov.get("origSX").getAsNumber() || 1;
  const origSY = ov.get("origSY").getAsNumber() || 1;

  // Prep multiplier visual
  if (typeof mObj.hide === "function") mObj.hide(false);
  if (typeof mObj.setOpacity === "function") mObj.setOpacity(255);
  if (typeof mObj.setZOrder === "function") {
    try { mObj.setZOrder(chestObj.getZOrder() + 1100); } catch (e) { mObj.setZOrder(99999); }
  }
  if (typeof mObj.setString === "function") {
    const isInt = Number.isInteger(multiplier);
    mObj.setString("x" + Number(multiplier || 1).toFixed(isInt ? 0 : 2));
  }

  // Anchor: above popup center
  const px = popup.getX() + popup.getWidth() / 2 - mObj.getWidth() / 2;
  const py = popup.getY() - mObj.getHeight() - 10;

  // Tween to popup (longer), then punch, swap text to TOTAL, burst particles, fade and restore
  if (tween && typeof tween.addObjectPositionTween === "function") {
    // slower travel for visibility
    tween.addObjectPositionTween("bm_go", px, py, "easeOutCubic", 380, false);

    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.38), // arrival
      () => {
        // punch (clear)
        if (typeof tween.addObjectScaleTween === "function") {
          tween.addObjectScaleTween("bm_punch_in", origSX * 1.22, origSY * 1.22, "easeOutBack", 220, false);
        }
        // swap popup to TOTAL at impact
        if (typeof popup.setString === "function") {
          popup.setString("+ " + Number(totalPrize || 0).toFixed(2));
        }
        // euphoria burst right on popup
        const burstX = popup.getX() + popup.getWidth() / 2;
        const burstY = popup.getY() - 6;
        emitTrailBurst(runtimeScene, burstX, burstY, layerName, { count: 8, lifeSec: 0.5, spread: 34 });

        // fade multiplier a bit later so o olho vê a aplicação
        runtimeScene.getAsyncTasksManager().addTask(
          ByteZhenWenn.evtTools.runtimeScene.wait(0.18),
          () => {
            if (typeof tween.addObjectOpacityTween === "function") {
              tween.addObjectOpacityTween("bm_fade", 0, "linear", 260, false);
            }
          }
        );

        // restore after fade
        runtimeScene.getAsyncTasksManager().addTask(
          ByteZhenWenn.evtTools.runtimeScene.wait(0.48),
          () => {
            mObj.setPosition(origX, origY);
            if (typeof mObj.setOpacity === "function") mObj.setOpacity(255);
            if (typeof tween.addObjectScaleTween === "function") {
              tween.addObjectScaleTween("bm_scale_back", origSX, origSY, "easeInOutQuad", 120, false);
            }
          }
        );
      }
    );
  }
}



/** DOC: ===== Coin popup spawn + debug on same layer, rise 0.4s, fade, delete ===== */
function spawnCoinPopup(runtimeScene, prizeObj, prizeValue, prizename) {
  /** DOC: skip for fox */
  if (prizename === "prize_fox") return;  
  const valueNum2 = Number(prizeValue || 0);
  if(valueNum2 == 0 || valueNum2 == 0.00){return;}

  /** DOC: resolve target layer name from prize object */
  let layerName = "";
  try {
    if (prizeObj && typeof prizeObj.getLayer === "function") {
      const lyr = prizeObj.getLayer();
      if (lyr && typeof lyr.getName === "function") layerName = lyr.getName();
    }
  } catch (e) {}

  /** DOC: create popup on same layer (fallback to base layer) */
  const popup = layerName
    ? runtimeScene.createObjectOnLayer(layerName, "CoinPopUp")
    : runtimeScene.createObject("CoinPopUp");

  if (!popup || !prizeObj) {
    console.warn("[CoinPopUp] create failed:", { popupExists: !!popup, prizeObjExists: !!prizeObj, layerName });
    return;
  }

  /** DOC: format "🪙 2.40" */
  const valueNum = Number(prizeValue || 0);
  const txt = "+ " + valueNum.toFixed(2);

  if (typeof popup.setString === "function") popup.setString(txt);
  if (typeof popup.hide === "function") popup.hide(false);
  if (typeof popup.setOpacity === "function") popup.setOpacity(255);

  /** DOC: place slightly above prize center */
  const cx = (typeof prizeObj.getCenterXInScene === "function") ? prizeObj.getCenterXInScene() : prizeObj.getX();
  const cy = (typeof prizeObj.getCenterYInScene === "function") ? prizeObj.getCenterYInScene() : prizeObj.getY();
  popup.setPosition(cx - popup.getWidth() / 2, cy - popup.getHeight() / 2 - 6);

  /** DOC: push above everything on that layer */
  try {
    popup.setZOrder(prizeObj.getZOrder() + 1000);
  } catch (e) {
    popup.setZOrder(99999);
  }

  /** DOC: tween up 50px and fade in 0.4s, then delete */
  const tween = popup.getBehavior && popup.getBehavior("Tween");
  const durMs = 2100;
  const toY = popup.getY() - 20;
  const tweenId = "coinpopup_" + Date.now() + "_" + Math.floor(Math.random() * 1e5);

  if (tween && typeof tween.addObjectPositionTween === "function" && typeof tween.addObjectOpacityTween === "function") {
    tween.addObjectPositionTween("move_" + tweenId, popup.getX(), toY, "easeOutQuad", durMs, false);
    tween.addObjectOpacityTween("fade_" + tweenId, 0, "linear", durMs, false);
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(durMs / 1000),
      () => popup.deleteFromScene(runtimeScene)
    );
  } else {
    // DOC: fallback without tween behavior
    popup.setY(toY);
    if (typeof popup.setOpacity === "function") popup.setOpacity(0.4);
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.01),
      () => popup.deleteFromScene(runtimeScene)
    );
  }

  /** DOC: debug log (open browser devtools → Console) */
  try {
    const opVal = (typeof popup.getOpacity === "function") ? popup.getOpacity() : "n/a";
    console.log("[CoinPopUp] created", {
      text: txt,
      layer: layerName || "(base)",
      x: popup.getX(), y: popup.getY(),
      z: popup.getZOrder ? popup.getZOrder() : "n/a",
      opacity: opVal
    });
  } catch (e) {}
}


function chestNameForIndex(i) {
  const map = {
    0: "Chest1",
    1: "Chest4",
    2: "Chest7",
    3: "Chest2",
    4: "Chest5",
    5: "Chest8",
    6: "Chest3",
    7: "Chest6",
    8: "Chest9"
  };
  return map[i] || null;
}

function tweenOutClosedChest(index, delaySec) {
  const name = chestNameForIndex(index);
  if (!name) return;

  const objs = runtimeScene.getObjects(name);
  if (!objs || !objs.length) return;

  const doTween = () => {
    for (let j = 0; j < objs.length; j++) {
      const chest = objs[j];

      if (typeof chest.setZOrder === "function") chest.setZOrder(155);

      const tween = chest.getBehavior && chest.getBehavior("Tween");
      if (tween && typeof tween.addObjectOpacityTween === "function" && typeof tween.addObjectScaleTween === "function") {
        tween.addObjectOpacityTween("fade", 0, "linear", 150, false);
        tween.addObjectScaleTween("shrink", 0.8, 0.8, "easeInQuad", 150, false);

        runtimeScene.getAsyncTasksManager().addTask(
          ByteZhenWenn.evtTools.runtimeScene.wait(0.18),
          () => chest.deleteFromScene(runtimeScene)
        );
      } else {
        if (typeof chest.setOpacity === "function") chest.setOpacity(0);
        runtimeScene.getAsyncTasksManager().addTask(
          ByteZhenWenn.evtTools.runtimeScene.wait(0.01),
          () => chest.deleteFromScene(runtimeScene)
        );
      }
    }
  };

  if (delaySec && delaySec > 0) {
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(delaySec),
      doTween
    );
  } else {
    doTween();
  }
}

/** DOC: ===== Popup micro-shake (quake) for impact feedback =====
 * Shakes the popup horizontally around its current X by small amplitude.
 * amplitudePx: peak offset in px (default 6)
 * cycles: how many left-right cycles (default 4)
 * totalMs: total duration (default 220ms)
 */
function tweenShakeObject(runtimeScene, obj, amplitudePx, cycles, totalMs) {
  amplitudePx = typeof amplitudePx === "number" ? amplitudePx : 6;
  cycles      = typeof cycles      === "number" ? cycles      : 4;
  totalMs     = typeof totalMs     === "number" ? totalMs     : 220;

  if (!obj || !obj.getBehavior) return;

  const t = obj.getBehavior("Tween");
  if (!t || typeof t.addObjectPositionTween !== "function") return;

  const baseX = obj.getX();
  const y     = obj.getY();
  const step  = Math.max(1, Math.floor(cycles * 2)); // left+right per cycle
  const each  = Math.max(10, Math.floor(totalMs / step));
  let dir = 1;

  for (let i = 0; i < step; i++) {
    const toX = baseX + dir * amplitudePx;
    t.addObjectPositionTween(
      "shake_" + i + "_" + Date.now(),
      toX, y,
      "linear",
      each,
      false
    );
    dir *= -1;
  }

  // Snap back to base at end
  runtimeScene.getAsyncTasksManager().addTask(
    ByteZhenWenn.evtTools.runtimeScene.wait(totalMs / 1000),
    () => obj.setPosition(baseX, y)
  );
}

/** DOC: ===== Emit a stronger, radial coin_trail euphoria burst on impact =====
 * Adds downward bias to some particles to feel like "falling spark".
 */
function emitImpactBurst(runtimeScene, x, y, layerName, options) {
  options = options || {};
  const count   = typeof options.count === "number" ? options.count : 10;
  const lifeSec = typeof options.lifeSec === "number" ? options.lifeSec : 0.55;
  const spread  = typeof options.spread === "number" ? options.spread : 42;

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    // Slight downward bias (more particles below)
    const r     = spread * (0.6 + Math.random() * 0.8);
    const bias  = (Math.random() < 0.55) ? 0.8 : 0.3; // more likely below
    const dx    = Math.cos(angle) * r;
    const dy    = Math.sin(angle) * r + r * bias * 0.25;

    const t = layerName
      ? runtimeScene.createObjectOnLayer(layerName, "coin_trail")
      : runtimeScene.createObject("coin_trail");
    if (!t) continue;

    t.setPosition(x + dx, y + dy);
    try { t.setZOrder(99999); } catch (e) {}
    if (typeof t.startEmission === "function") t.startEmission();

    const tw = t.getBehavior && t.getBehavior("Tween");
    if (tw && typeof tw.addObjectOpacityTween === "function") {
      tw.addObjectOpacityTween("ct_fade", 0, "linear", lifeSec * 1000, false);
    }

    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(lifeSec),
      () => {
        if (typeof t.stopEmission === "function") t.stopEmission();
        t.deleteFromScene(runtimeScene);
      }
    );
  }
}

/** DOC: ===== Controlled CoinPopUp (slower rise + brief hold; caller still controls impact) ===== */
function spawnCoinPopupControlled(runtimeScene, targetObj, text, options) {
  options = options || {};
  const layerName = options.layer || "";
  const risePx    = typeof options.risePx    === "number" ? options.risePx    : 28;
  const durMs     = typeof options.durMs     === "number" ? options.durMs     : 1500; // readable
  const holdMs    = typeof options.holdMs    === "number" ? options.holdMs    : 450;

  const popup = layerName
    ? runtimeScene.createObjectOnLayer(layerName, "CoinPopUp")
    : runtimeScene.createObject("CoinPopUp");
  if (!popup || !targetObj) return null;

  if (typeof popup.setString === "function") popup.setString(text);
  if (typeof popup.hide === "function") popup.hide(false);
  if (typeof popup.setOpacity === "function") popup.setOpacity(255);

  const cx = (typeof targetObj.getCenterXInScene === "function") ? targetObj.getCenterXInScene() : targetObj.getX();
  const cy = (typeof targetObj.getCenterYInScene === "function") ? targetObj.getCenterYInScene() : targetObj.getY();
  popup.setPosition(cx - popup.getWidth() / 2, cy - popup.getHeight() / 2 - 6);

  try { popup.setZOrder(targetObj.getZOrder() + 1000); } catch (e) { popup.setZOrder(99999); }

  const t = popup.getBehavior && popup.getBehavior("Tween");
  const toY = popup.getY() - risePx;

  if (t && typeof t.addObjectPositionTween === "function") {
    t.addObjectPositionTween("popup_rise", popup.getX(), toY, "easeOutCubic", durMs, false);
    // Fade/delete será agendado no final da sequência de impacto (não aqui).
  }
  return popup;
}

/** DOC: ===== Bonus sequence (safe for concurrency): rise popup, spawn FX multiplier, hover, quake, drop, burst, update total, cleanup =====
 * DOC: This version never moves the HUD "BonuseMultiplier". It spawns a temporary FX instance per chest,
 * DOC: so multiple chests can run simultaneously without crashes or position resets.
 */
function runBonusImpactSequence(runtimeScene, chestObj, basePrize, totalPrize, multiplier) {
  // DOC: Resolve layer name to keep visuals on the same layer as the prize
  let layerName = "";
  try {
    const lyr = chestObj.getLayer && chestObj.getLayer();
    if (lyr && typeof lyr.getName === "function") layerName = lyr.getName();
  } catch (e) {}

  // DOC: Create the popup with BASE value (slow rise, hold handled by caller later)
  const popup = spawnCoinPopupControlled(
    runtimeScene,
    chestObj,
    "+ " + Number(basePrize || 0).toFixed(2),
    { layer: layerName, risePx: 30, durMs: 1500, holdMs: 450 }
  );
  if (!popup) return;

  // DOC: Spawn a dedicated FX instance of the multiplier text (do NOT move the HUD)
  const fx = layerName
    ? runtimeScene.createObjectOnLayer(layerName, "BonuseMultiplier")
    : runtimeScene.createObject("BonuseMultiplier");
  if (!fx) return;

  // DOC: Prepare FX visuals
  if (typeof fx.setString === "function") {
    const isInt = Number.isInteger(multiplier);
    fx.setString("x" + Number(multiplier || 1).toFixed(isInt ? 0 : 2));
  }
  if (typeof fx.hide === "function") fx.hide(false);
  if (typeof fx.setOpacity === "function") fx.setOpacity(255);
  if (typeof fx.setScale === "function") fx.setScale(1);
  try { fx.setZOrder(chestObj.getZOrder() + 1100); } catch (e) { fx.setZOrder(99999); }

  // DOC: Unique tween id prefix to avoid collisions when many are running
  const uid = "bfx_" + Date.now() + "_" + Math.floor(Math.random() * 1e6);

  // DOC: Helpers to anchor relative to popup safely
  const safePopupCenterX = () => (popup && popup.getX) ? popup.getX() + popup.getWidth() / 2 : chestObj.getX();
  const safePopupY       = () => (popup && popup.getY) ? popup.getY() : chestObj.getY();

  // DOC: Compute hover and impact points relative to popup each time (popup is moving upward)
  const computeHover = () => {
    const cx = safePopupCenterX();
    const py = safePopupY();
    const x  = cx - fx.getWidth() / 2;
    const y  = py - fx.getHeight() - 12;
    return { x, y };
  };
  const computeHit = () => {
    const cx = safePopupCenterX();
    const py = safePopupY();
    const x  = cx - fx.getWidth() / 2;
    const y  = py - 4;
    return { x, y };
  };

  // DOC: Place FX above the hover point for a visible "fall-in" start
  const h0 = computeHover();
  fx.setPosition(h0.x, h0.y - 120);

  // DOC: Start hover approach
  const tw = fx.getBehavior && fx.getBehavior("Tween");
  if (tw && typeof tw.addObjectPositionTween === "function") {
    const h1 = computeHover();
    tw.addObjectPositionTween(uid + "_hover", h1.x, h1.y, "easeOutCubic", 420, false);

    // DOC: After reaching hover, shake the popup to build anticipation
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.42),
      () => {
        // Guard if popup was deleted meanwhile
        if (!popup || !popup.getBehavior) return;

        tweenShakeObject(runtimeScene, popup, 7, 4, 240);

        // DOC: Drop to impact (ease-in)
        const hit = computeHit();
        tw.addObjectPositionTween(uid + "_drop", hit.x, hit.y, "easeInQuad", 260, false);

        // DOC: Impact moment
        runtimeScene.getAsyncTasksManager().addTask(
          ByteZhenWenn.evtTools.runtimeScene.wait(0.26),
          () => {
            // Guards (objects might have been removed)
            if (!fx || !fx.getBehavior || !popup) return;

            // DOC: Punch the FX text for clarity
            if (typeof tw.addObjectScaleTween === "function") {
              const sx = fx.getScaleX ? fx.getScaleX() : 1;
              const sy = fx.getScaleY ? fx.getScaleY() : 1;
              tw.addObjectScaleTween(uid + "_punch", sx * 1.24, sy * 1.24, "easeOutBack", 220, false);
            }

            // DOC: Swap popup to TOTAL value
            if (typeof popup.setString === "function") {
              popup.setString("+ " + Number(totalPrize || 0).toFixed(2));
            }

            // DOC: Euphoria burst right at popup center
            const bx = safePopupCenterX();
            const by = safePopupY();
            emitImpactBurst(runtimeScene, bx, by, layerName, { count: 12, lifeSec: 0.6, spread: 52 });

            // DOC: Fade FX and then delete (independent of HUD)
            runtimeScene.getAsyncTasksManager().addTask(
              ByteZhenWenn.evtTools.runtimeScene.wait(0.12),
              () => {
                if (!fx || !fx.getBehavior) return;
                const tfx = fx.getBehavior("Tween");
                if (tfx && typeof tfx.addObjectOpacityTween === "function") {
                  tfx.addObjectOpacityTween(uid + "_fade", 0, "linear", 260, false);
                }
                runtimeScene.getAsyncTasksManager().addTask(
                  ByteZhenWenn.evtTools.runtimeScene.wait(0.34),
                  () => { if (fx && fx.deleteFromScene) fx.deleteFromScene(runtimeScene); }
                );
              }
            );

            // DOC: Fade & delete popup after showing TOTAL a bit
            const pt = popup.getBehavior && popup.getBehavior("Tween");
            if (pt && typeof pt.addObjectOpacityTween === "function") {
              runtimeScene.getAsyncTasksManager().addTask(
                ByteZhenWenn.evtTools.runtimeScene.wait(0.6),
                () => {
                  if (!popup || !popup.getBehavior) return;
                  pt.addObjectOpacityTween(uid + "_pofade", 0, "linear", 420, false);
                  runtimeScene.getAsyncTasksManager().addTask(
                    ByteZhenWenn.evtTools.runtimeScene.wait(0.42),
                    () => { if (popup && popup.deleteFromScene) popup.deleteFromScene(runtimeScene); }
                  );
                }
              );
            } else {
              runtimeScene.getAsyncTasksManager().addTask(
                ByteZhenWenn.evtTools.runtimeScene.wait(0.8),
                () => { if (popup && popup.deleteFromScene) popup.deleteFromScene(runtimeScene); }
              );
            }
          }
        );
      }
    );
  } else {
    // DOC: Fallback without Tween behavior: snap to hit, update total, quick burst, cleanup
    const hit = computeHit();
    fx.setPosition(hit.x, hit.y);
    if (typeof popup.setString === "function") {
      popup.setString("+ " + Number(totalPrize || 0).toFixed(2));
    }
    emitImpactBurst(runtimeScene, hit.x, hit.y, layerName, { count: 10, lifeSec: 0.5, spread: 48 });
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.6),
      () => { if (fx && fx.deleteFromScene) fx.deleteFromScene(runtimeScene); }
    );
    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.9),
      () => { if (popup && popup.deleteFromScene) popup.deleteFromScene(runtimeScene); }
    );
  }
}


/** DOC: ===== Read current bonus multiplier from game vars (>=1) ===== */
function getBonusMultiplier(runtimeScene) {
  try {
    const v = runtimeScene.getGame().getVariables().get("bonus_multiplier").getAsNumber();
    return (typeof v === "number" && v > 1) ? v : 1;
  } catch (e) {
    return 1;
  }
}


function addPrize(multiplier, prize, index, burst = false, allitems = null, chestdata = null) {
  if (isChestOpened(index)) return;

  let prizename = "prize_00";
  if (multiplier == 0.5) prizename = "prize_01";
  else if (multiplier == 0.8) prizename = "prize_02";
  else if (multiplier == 2.0 || multiplier == 2) prizename = "prize_03";
  else if (multiplier == 5.0 || multiplier == 5) prizename = "prize_04";
  else if (multiplier == 0) { prizename = "prize_fox"; burst = false; 
    runtimeScene.getGame().getVariables().get("end_game").setBoolean(true);
  } // DOC: fox disables burst

  const randomNumber = Math.floor(Math.random() * 101);
  if(randomNumber >= 85 && burst){
   runtimeScene.getGame().getVariables().get("bonus_suspense").setBoolean(true);
  }

  if(chestdata != null){
      if(chestdata.bonus_multiplier > 1 && burst){
        runtimeScene.getGame().getVariables().get("bonus_suspense").setBoolean(true);
        setTimeout(() => {
            runtimeScene.getGame().getVariables().get("bonus_multiplier").setNumber(chestdata.bonus_multiplier);
        }, 100);
      }
  }

if (multiplier === 0 && Array.isArray(allitems) && allitems.length >= 9) {
  const toReveal = [];
  for (let i = 0; i < 9; i++) {
    if (i === index) continue;          // DOC: current chest handled elsewhere
    if (isChestOpened(i)) continue;     // DOC: already opened in this round
    if (isChestRevealing(i)) continue;  // DOC: already scheduled from another call
    toReveal.push(i);
  }

  const stepSeconds = 0.1;  // 250ms between each reveal

  toReveal.forEach((i, idx) => {
    const item = allitems[i] || {};
    const m = typeof item.multiplier === "number" ? item.multiplier : 0;

    markChestRevealing(i);

    const delay = idx * stepSeconds;

    tweenOutClosedChest(i, delay);

    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(delay),
      () => { addPrize(m, 0, i, false, null); }
    );
  });

  const lastDelay = toReveal.length > 0 ? (toReveal.length - 1) * stepSeconds : 0;
  const buffer = 0.30; // DOC: small buffer so the last 'appear' tween (200ms) has begun
  runtimeScene.getAsyncTasksManager().addTask(
    ByteZhenWenn.evtTools.runtimeScene.wait(lastDelay + buffer),
    () => {
      for (let i = 0; i < 9; i++) {
        console.log("test " + String(i));
        _openedVar().getChild(String(i)).setBoolean(false);
        _revealVar().getChild(String(i)).setBoolean(false);
      }
    }
  );
}

  const obj = runtimeScene.createObject(prizename);
  if (!obj) return;

  if (multiplier === 0) {
    tweenOutClosedChest(index, 0);
  }

  if (index == 0) {
    obj.setPosition(115, 590);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(130, 600); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(124, 600); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(128, 604); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(115, 584); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 1) {
    obj.setPosition(299, 590);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(314, 600); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(306, 600); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(310, 604); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(299, 584); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 2) {
    obj.setPosition(482, 590);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(498, 600); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(490, 600); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(495, 604); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(480, 584); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 3) {
    obj.setPosition(115, 743);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(130, 754); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(124, 754); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(128, 754); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(115, 734); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 4) {
    obj.setPosition(299, 743);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(314, 754); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(306, 754); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(310, 754); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(299, 734); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 5) {
    obj.setPosition(482, 743);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(498, 754); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(490, 754); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(495, 754); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(480, 734); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 6) {
    obj.setPosition(115, 898);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(130, 909); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(124, 909); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(128, 909); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(115, 889); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 7) {
    obj.setPosition(299, 898);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(314, 909); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(306, 909); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(310, 909); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(299, 889); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }

  if (index == 8) {
    obj.setPosition(482, 898);
    obj.setZOrder(160);
    obj.setHeight(114);
    obj.setWidth(114);
    let scale = 0.54;
    if (multiplier == 0.8) { scale = 0.34; obj.setPosition(498, 909); }
    else if (multiplier == 2.0 || multiplier == 2) { obj.setPosition(490, 909); }
    else if (multiplier == 5.0 || multiplier == 5) { scale = 0.42; obj.setPosition(495, 909); }
    if (prizename == 'prize_fox') { obj.setWidth(136); scale = 0.34; obj.setPosition(480, 889); }

    obj.setScale(0);
    obj.getBehavior("Tween").addObjectScaleTween("appear", scale, scale, "easeOutBack", 200, false);
  }
   // ===== BONÚS: mostrar base e aplicar multiplicador visual =====
const bm = getBonusMultiplier(runtimeScene);
const bonusActive = bm > 1 && Number(prize || 0) > 0;

if (bonusActive) {
  const base = Number(prize) / bm; // server sends total already multiplied
  runBonusImpactSequence(runtimeScene, obj, base, Number(prize), bm);
} else {
  // Fallback: seu popup “simples”
  spawnCoinPopup(runtimeScene, obj, prize, prizename);
}
  /** DOC: Mark as opened after we started showing the prize */
  markChestOpened(index);

  /** DOC: On win, trigger burst and update win_amount inside GD loop */
  if (burst) {
    runtimeScene.getGame().getVariables().get("opening_chest").setBoolean(false);
    runtimeScene.getGame().getVariables().get("collect_play").setBoolean(true);
    coinBurst(obj, prize, { count: 7 });

    runtimeScene.getAsyncTasksManager().addTask(
      ByteZhenWenn.evtTools.runtimeScene.wait(0.95),
      () => {
        const current = runtimeScene.getGame().getVariables().get("win_amount").getAsNumber();
        const total = current + Number(prize || 0);
        runtimeScene.getGame().getVariables().get("win_amount").setNumber(Math.round(total * 100) / 100);
      }
    );
  }
}

/** DOC: ===== Utility random float in [min, max] ===== */
function _rand(min, max) { return min + Math.random() * (max - min); }

/** DOC: ===== Single coin: spawn at obj, arc to WinModal, trail follows, fade & delete ===== */
function coinFollow(obj, prize, config) {
  config = config || {};
  var escalaFinal = typeof config.scaleFinal === "number" ? config.scaleFinal : 0.5;
  var dur = typeof config.dur === "number" ? config.dur : _rand(0.7, 1.0);
  var arcMin = typeof config.arcMin === "number" ? config.arcMin : 60;
  var arcMax = typeof config.arcMax === "number" ? config.arcMax : 120;
  var layerName = typeof config.layer === "string" ? config.layer : "";

  var coin = layerName ? runtimeScene.createObjectOnLayer(layerName, "coin_particle")
                       : runtimeScene.createObject("coin_particle");
  if (!coin) return;

  var sx = (typeof obj.getCenterXInScene === "function") ? obj.getCenterXInScene() : obj.getX();
  var sy = (typeof obj.getCenterYInScene === "function") ? obj.getCenterYInScene() : obj.getY();
  coin.setPosition(sx - coin.getWidth() / 2, sy - coin.getHeight() / 2);
  coin.setZOrder(obj.getZOrder() + 1);

  if (typeof coin.setOpacity === "function") coin.setOpacity(0);
  if (typeof coin.setScale === "function") coin.setScale(0); else {
    if (typeof coin.setScaleX === "function") coin.setScaleX(0);
    if (typeof coin.setScaleY === "function") coin.setScaleY(0);
  }

  var tweenCoin = coin.getBehavior("Tween");
  if (tweenCoin) {
    tweenCoin.addObjectScaleTween("popIn", escalaFinal, escalaFinal, "easeOutBack", 180, false);
    tweenCoin.addObjectOpacityTween("fadeIn", 255, "linear", 180, false);
  }

  var list = runtimeScene.getObjects("WinModal");
  if (!list.length) {
    runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(0.25), function () {
      if (tweenCoin) tweenCoin.addObjectOpacityTween("noTargetFade", 0, "linear", 160, false);
      runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(0.18), function () {
        coin.deleteFromScene(runtimeScene);
      });
    });
    return;
  }
  var target = list[0];
  var tx = target.getCenterXInScene ? target.getCenterXInScene() : target.getX();
  var ty = target.getCenterYInScene ? target.getCenterYInScene() : target.getY();

  var dx = tx - sx, dy = ty - sy;
  var angle = Math.atan2(dy, dx);
  var nx = -Math.sin(angle), ny = Math.cos(angle);
  var arc = _rand(arcMin, arcMax) * (_rand(0, 1) < 0.5 ? -1 : 1);
  var mx = sx + dx * 0.45 + nx * arc;
  var my = sy + dy * 0.45 + ny * arc;

  var trail = layerName ? runtimeScene.createObjectOnLayer(layerName, "coin_trail")
                        : runtimeScene.createObject("coin_trail");
  if (trail) {
    trail.setZOrder(coin.getZOrder() - 1);
    trail.setPosition(coin.getX(), coin.getY());
    if (typeof trail.startEmission === "function") trail.startEmission();
  }

  var t1 = dur * 0.55, t2 = dur * 0.45; // seconds
  if (tweenCoin && typeof tweenCoin.addObjectPositionTween === "function") {
    tweenCoin.addObjectPositionTween("toMid", mx - coin.getWidth() / 2, my - coin.getHeight() / 2, "easeOutQuad", t1 * 1000, false);
  } else {
    coin.setPosition(mx - coin.getWidth() / 2, my - coin.getHeight() / 2);
  }

  if (trail) {
    var tweenTrail = trail.getBehavior && trail.getBehavior("Tween");
    if (tweenTrail && typeof tweenTrail.addObjectPositionTween === "function") {
      tweenTrail.addObjectPositionTween("follow1", mx - trail.getWidth() / 2, my - trail.getHeight() / 2, "easeOutQuad", t1 * 1000, false);
    }
  }

  runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(t1), function () {
    if (tweenCoin && typeof tweenCoin.addObjectPositionTween === "function") {
      tweenCoin.addObjectPositionTween("toTarget", tx - coin.getWidth() / 2, ty - coin.getHeight() / 2, "easeInQuad", t2 * 1000, false);
    } else {
      coin.setPosition(tx - coin.getWidth() / 2, ty - coin.getHeight() / 2);
    }

    if (trail) {
      var tweenTrail2 = trail.getBehavior && trail.getBehavior("Tween");
      if (tweenTrail2 && typeof tweenTrail2.addObjectPositionTween === "function") {
        tweenTrail2.addObjectPositionTween("follow2", tx - trail.getWidth() / 2, ty - trail.getHeight() / 2, "easeInQuad", t2 * 1000, false);
      }
    }
  });

  runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(dur), function () {
    if (tweenCoin) {
      tweenCoin.addObjectScaleTween("popOver", escalaFinal * 1.1, escalaFinal * 1.1, "easeOutQuad", 90, false);
      tweenCoin.addObjectOpacityTween("fadeOut", 0, "linear", 180, false);
    }
    if (trail) {
      if (typeof trail.stopEmission === "function") trail.stopEmission();
      runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(0.25), function () {
        trail.deleteFromScene(runtimeScene);
      });
    }
    runtimeScene.getAsyncTasksManager().addTask(ByteZhenWenn.evtTools.runtimeScene.wait(0.20), function () {
      coin.deleteFromScene(runtimeScene);
    });
  });
}

/** DOC: ===== Burst: spawn multiple coins with staggered delays ===== */
function coinBurst(obj, prize, options) {
  options = options || {};
  var count = typeof options.count === "number" ? options.count : 6;
  var delayStep = typeof options.delayStep === "number" ? options.delayStep : 0.07;
  var layerName = typeof options.layer === "string" ? options.layer : "";

  for (var i = 0; i < count; i++) {
    (function (idx) {
      var delay = idx * delayStep + _rand(0, 0.05);
      runtimeScene.getAsyncTasksManager().addTask(
        ByteZhenWenn.evtTools.runtimeScene.wait(delay),
        function () {
          coinFollow(obj, prize, {
            scaleFinal: _rand(0.42, 0.56),
            dur: _rand(0.75, 1.05),
            arcMin: 70,
            arcMax: 140,
            layer: layerName
          });
        }
      );
    })(i);
  }
}

window.ddZop = addPrize;

};
ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.eventsList0 = function(runtimeScene, eventsFunctionContext) {

{


ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.userFunc0x9e9510(runtimeScene, typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined);

}


};

ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.func = function(runtimeScene, parentEventsFunctionContext) {
var eventsFunctionContext = {
  _objectsMap: {
},
  _objectArraysMap: {
},
  _behaviorNamesMap: {
},
  globalVariablesForExtension: runtimeScene.getGame().getVariablesForExtension("WeiZhenCore_Game"),
  sceneVariablesForExtension: runtimeScene.getScene().getVariablesForExtension("WeiZhenCore_Game"),
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


ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.eventsList0(runtimeScene, eventsFunctionContext);


return;
}

ByteZhenWenn.evtsExt__WeiZhenCore_Game__Core_Start.registeredGdjsCallbacks = [];