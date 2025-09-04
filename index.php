<?php
// Detect HTTPS behind proxies and standardize session cookie params
$isHttps = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
    || (($_SERVER['HTTP_X_FORWARDED_SSL'] ?? '') === 'on');

// Send no-cache headers for pages that may render authenticated state
if (!headers_sent()) {
    header('Cache-Control: no-store, no-cache, must-revalidate');
    header('Pragma: no-cache');
    header('Expires: 0');
}

if (session_status() !== PHP_SESSION_ACTIVE) {
    // Unificar nome do cookie da sessão em toda a aplicação
    session_name('weizhen_gamming_session');
    session_set_cookie_params([
        'path' => '/',
        'httponly' => true,
        'samesite' => 'Lax',
        'secure' => $isHttps,
    ]);
    session_start();
}
include_once("config.php");
include_once(DASH . "/services/database.php");
include_once(DASH . "/services/funcao.php");
include_once(DASH . "/services/crud.php");
include_once(DASH . "/services/CSRF_Protect.php");
include_once(DASH . "/services/pega-ip.php");
include_once(DASH . "/services/ip-crawler.php");
$csrf = new CSRF_Protect();

// Verificar se o usuário está logado
$isAuthenticated = false;
$userData = null;

if (isset($_SESSION['user_id']) && !empty($_SESSION['user_id'])) {
    $isAuthenticated = true;
    
    // Buscar dados do usuário logado
    $userId = $_SESSION['user_id'];
    $stmt = $mysqli->prepare("SELECT id, email, usuario, celular, saldo, cpf, data_registro, codigo_convite FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result && $row = $result->fetch_assoc()) {
        // Buscar estatísticas do usuário
        $total_bet = "0.00";
        $total_win = "0.00";
        $cpa_receive = "0.00";
        $revshare_receive = "0.00";
        $chest_open = 0;
        $chest_level = 0;
        $give_chest = 0;
        $pendent_comission = "0.00";
        $by_user_id = null;
        $rollover = "100000.00";
        $cpa_lv1 = "0.00";
        $cpa_lv2 = "0.00";
        $cpa_lv3 = "0.00";
        $revshare_lv1 = "0.00";
        $revshare_lv2 = "0.00";
        $revshare_lv3 = "0.00";
        $demo_account = 0;
        
        // Buscar total de apostas (game_history)
        $stmtBet = $mysqli->prepare("SELECT COALESCE(SUM(amount), 0) FROM game_history WHERE user_id = ?");
        $stmtBet->bind_param("i", $userId);
        $stmtBet->execute();
        $stmtBet->bind_result($total_bet_decimal);
        $stmtBet->fetch();
        $total_bet = number_format($total_bet_decimal, 2, '.', '');
        $stmtBet->close();
        
        // Buscar total de vitórias (game_history)
        $stmtWin = $mysqli->prepare("SELECT COALESCE(SUM(prize_amount), 0) FROM game_history WHERE user_id = ? AND prize_amount > 0");
        $stmtWin->bind_param("i", $userId);
        $stmtWin->execute();
        $stmtWin->bind_result($total_win_decimal);
        $stmtWin->fetch();
        $total_win = @number_format($total_win_decimal, 2, '.', '');
        $stmtWin->close();
        
        // Buscar dados de afiliação se for afiliado
        if (!empty($row['codigo_convite'])) {
            $stmtAff = $mysqli->prepare("SELECT earned, available FROM afiliados WHERE user_id = ?");
            if ($stmtAff) {
                $stmtAff->bind_param("i", $userId);
                $stmtAff->execute();
                $stmtAff->bind_result($earned, $available);
                $stmtAff->fetch();
                $stmtAff->close();
                
                $cpa_receive = @number_format($earned, 2, '.', '');
                $revshare_receive = @number_format($available, 2, '.', '');
                $pendent_comission = @number_format($earned - $available, 2, '.', '');
            }
        }
        
        // Formatar dados
        $balance = number_format($row['saldo'], 2, '.', '');
        $created_at = $row['data_registro'] ? date('Y-m-d\TH:i:s.000000\Z', strtotime($row['data_registro'])) : date('Y-m-d\TH:i:s.000000\Z');
        $updated_at = $created_at;
        
        $userData = [
            "id" => (int) $row['id'],
            "name" => $row['usuario'],
            "email" => $row['email'],
            "phone" => $row['celular'],
            "email_verified_at" => null,
            "role" => "user",
            "total_bet" => $total_bet,
            "pix_document" => $row['cpf'],
            "total_win" => $total_win,
            "cpa_receive" => $cpa_receive,
            "revshare_receive" => $revshare_receive,
            "chest_open" => $chest_open,
            "chest_level" => $chest_level,
            "give_chest" => $give_chest,
            "pendent_comission" => $pendent_comission,
            "by_user_id" => $by_user_id,
            "balance" => $balance,
            "rollover" => $rollover,
            "cpa_lv1" => $cpa_lv1,
            "cpa_lv2" => $cpa_lv2,
            "cpa_lv3" => $cpa_lv3,
            "revshare_lv1" => $revshare_lv1,
            "revshare_lv2" => $revshare_lv2,
            "revshare_lv3" => $revshare_lv3,
            "created_at" => $created_at,
            "updated_at" => $updated_at,
            "demo_account" => $demo_account
        ];
    }
    $stmt->close();
}
#==================================================================#
if (isset($_GET['utm_ads']) && !empty($_GET['utm_ads'])) {
  $ads_tipo = PHP_SEGURO($_GET['utm_ads']);
} else {
  $ads_tipo = NULL;
}
#==================================================================#
$url_atual = (isset($_SERVER['HTTPS']) ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
#==================================================================#
//INSERT DE VISITAS NAS LPS
$data_hoje = date("Y-m-d");
$hora_hoje = date("H:i:s");
if (isset($_SERVER['HTTP_REFERER'])) {
  $ref = $_SERVER['HTTP_REFERER'];
} else {
  $ref = $url_atual;
}
#==================================================================#
$data_us = ip_F($ip);
#==================================================================#
if ($browser != "Unknown Browser" and $os != "Unknown OS Platform" and $data_us['pais'] == "Brazil") {
  $id_user_ret = "1";
  $sql0 = $mysqli->prepare("SELECT ip_visita FROM visita_site WHERE data_cad=? AND ip_visita=?");
  $sql0->bind_param("ss", $data_hoje, $ip);
  $sql0->execute();
  $sql0->store_result();
  if ($sql0->num_rows) { //JÁ EXISTE CAD 
  } else {
    $sql = $mysqli->prepare("INSERT INTO visita_site (nav_os,mac_os,ip_visita,refer_visita,data_cad,hora_cad,id_user,pais,cidade,estado,ads_tipo) VALUES (?,?,?,?,?,?,?,?,?,?,?)");
    $sql->bind_param("sssssssssss", $browser, $os, $ip, $ref, $data_hoje, $hora_hoje, $id_user_ret, $data_us['pais'], $data_us['cidade'], $data_us['regiao'], $ads_tipo);
    $sql->execute();
  }
}
#===============================================================================#  

?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1, viewport-fit=cover">

  <title inertia>Esquilo Fortune</title>
  <base href="/" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.bunny.net">
  <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

  <!-- Inertia + Rotas -->
  <script type="text/javascript">const Ziggy = { "url": ((window.location && window.location.protocol) ? window.location.protocol : 'http:') + "//" + window.location.hostname, "port": null, "defaults": {}, "routes": { "debugbar.openhandler": { "uri": "_debugbar\/open", "methods": ["GET", "HEAD"] }, "debugbar.clockwork": { "uri": "_debugbar\/clockwork\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "debugbar.assets.css": { "uri": "_debugbar\/assets\/stylesheets", "methods": ["GET", "HEAD"] }, "debugbar.assets.js": { "uri": "_debugbar\/assets\/javascript", "methods": ["GET", "HEAD"] }, "debugbar.cache.delete": { "uri": "_debugbar\/cache\/{key}\/{tags?}", "methods": ["DELETE"], "parameters": ["key", "tags"] }, "debugbar.queries.explain": { "uri": "_debugbar\/queries\/explain", "methods": ["POST"] }, "horizon.stats.index": { "uri": "horizon\/api\/stats", "methods": ["GET", "HEAD"] }, "horizon.workload.index": { "uri": "horizon\/api\/workload", "methods": ["GET", "HEAD"] }, "horizon.masters.index": { "uri": "horizon\/api\/masters", "methods": ["GET", "HEAD"] }, "horizon.monitoring.index": { "uri": "horizon\/api\/monitoring", "methods": ["GET", "HEAD"] }, "horizon.monitoring.store": { "uri": "horizon\/api\/monitoring", "methods": ["POST"] }, "horizon.monitoring-tag.paginate": { "uri": "horizon\/api\/monitoring\/{tag}", "methods": ["GET", "HEAD"], "parameters": ["tag"] }, "horizon.monitoring-tag.destroy": { "uri": "horizon\/api\/monitoring\/{tag}", "methods": ["DELETE"], "wheres": { "tag": ".*" }, "parameters": ["tag"] }, "horizon.jobs-metrics.index": { "uri": "horizon\/api\/metrics\/jobs", "methods": ["GET", "HEAD"] }, "horizon.jobs-metrics.show": { "uri": "horizon\/api\/metrics\/jobs\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.queues-metrics.index": { "uri": "horizon\/api\/metrics\/queues", "methods": ["GET", "HEAD"] }, "horizon.queues-metrics.show": { "uri": "horizon\/api\/metrics\/queues\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.index": { "uri": "horizon\/api\/batches", "methods": ["GET", "HEAD"] }, "horizon.jobs-batches.show": { "uri": "horizon\/api\/batches\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.jobs-batches.retry": { "uri": "horizon\/api\/batches\/retry\/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.pending-jobs.index": { "uri": "horizon\/api\/jobs\/pending", "methods": ["GET", "HEAD"] }, "horizon.completed-jobs.index": { "uri": "horizon\/api\/jobs\/completed", "methods": ["GET", "HEAD"] }, "horizon.silenced-jobs.index": { "uri": "horizon\/api\/jobs\/silenced", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.index": { "uri": "horizon\/api\/jobs\/failed", "methods": ["GET", "HEAD"] }, "horizon.failed-jobs.show": { "uri": "horizon\/api\/jobs\/failed\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.retry-jobs.show": { "uri": "horizon\/api\/jobs\/retry\/{id}", "methods": ["POST"], "parameters": ["id"] }, "horizon.jobs.show": { "uri": "horizon\/api\/jobs\/{id}", "methods": ["GET", "HEAD"], "parameters": ["id"] }, "horizon.index": { "uri": "horizon\/{view?}", "methods": ["GET", "HEAD"], "wheres": { "view": "(.*)" }, "parameters": ["view"] }, "sanctum.csrf-cookie": { "uri": "sanctum\/csrf-cookie", "methods": ["GET", "HEAD"] }, "stancl.tenancy.asset": { "uri": "tenancy\/assets\/{path?}", "methods": ["GET", "HEAD"], "wheres": { "path": "(.*)" }, "parameters": ["path"] }, "dashboard": { "uri": "dashboard", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "profile.edit": { "uri": "profile", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "profile.update": { "uri": "profile", "methods": ["PATCH"], "domain": "vc.psn.wine" }, "profile.destroy": { "uri": "profile", "methods": ["DELETE"], "domain": "vc.psn.wine" }, "tenants.create": { "uri": "tenants\/create", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "tenants.store": { "uri": "tenants", "methods": ["POST"], "domain": "vc.psn.wine" }, "tenants.update": { "uri": "tenants\/{id}", "methods": ["PUT"], "domain": "vc.psn.wine", "parameters": ["id"] }, "tenants.destroy": { "uri": "tenants\/{id}", "methods": ["DELETE"], "domain": "vc.psn.wine", "parameters": ["id"] }, "tenants.migrateAll": { "uri": "tenants\/migrate-all", "methods": ["POST"], "domain": "vc.psn.wine" }, "login": { "uri": "login", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "password.request": { "uri": "forgot-password", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "password.email": { "uri": "forgot-password", "methods": ["POST"], "domain": "vc.psn.wine" }, "password.reset": { "uri": "reset-password\/{token}", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine", "parameters": ["token"] }, "password.store": { "uri": "reset-password", "methods": ["POST"], "domain": "vc.psn.wine" }, "verification.notice": { "uri": "verify-email", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "verification.verify": { "uri": "verify-email\/{id}\/{hash}", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine", "parameters": ["id", "hash"] }, "verification.send": { "uri": "email\/verification-notification", "methods": ["POST"], "domain": "vc.psn.wine" }, "password.confirm": { "uri": "confirm-password", "methods": ["GET", "HEAD"], "domain": "vc.psn.wine" }, "password.update": { "uri": "password", "methods": ["PUT"], "domain": "vc.psn.wine" }, "logout": { "uri": "logout", "methods": ["POST"], "domain": "vc.psn.wine" }, "storage.local": { "uri": "storage\/{path}", "methods": ["GET", "HEAD"], "wheres": { "path": ".*" }, "parameters": ["path"] }, "tenant.game.launch": { "uri": "\/", "methods": ["GET", "HEAD"] }, "tenant.admin.weizhen-manager": { "uri": "admin\/weizhen-manager", "methods": ["GET", "HEAD"] }, "tenant.admin.users.index": { "uri": "admin\/users", "methods": ["GET", "HEAD"] }, "tenant.admin.users.update": { "uri": "admin\/users\/{user}", "methods": ["PUT"], "parameters": ["user"], "bindings": { "user": "id" } }, "tenant.admin.users.reset-password": { "uri": "admin\/users\/{user}\/reset-password", "methods": ["POST"], "parameters": ["user"], "bindings": { "user": "id" } }, "tenant.admin.users.details": { "uri": "admin\/users\/{user}\/details", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "tenant.admin.users.referrals": { "uri": "admin\/users\/{user}\/referrals", "methods": ["GET", "HEAD"], "parameters": ["user"], "bindings": { "user": "id" } }, "tenant.admin.deposits.index": { "uri": "admin\/deposits", "methods": ["GET", "HEAD"] }, "tenant.admin.deposits.update": { "uri": "admin\/deposits\/{transaction}", "methods": ["PUT"], "parameters": ["transaction"], "bindings": { "transaction": "id" } }, "tenant.admin.withdrawals.index": { "uri": "admin\/withdrawals", "methods": ["GET", "HEAD"] }, "tenant.admin.withdrawals.update": { "uri": "admin\/withdrawals\/{transaction}", "methods": ["PUT"], "parameters": ["transaction"], "bindings": { "transaction": "id" } }, "tenant.admin.settings.index": { "uri": "admin\/settings", "methods": ["GET", "HEAD"] }, "tenant.admin.settings.update": { "uri": "admin\/settings", "methods": ["PUT"] }, "tenant.admin.settings.unlockDeveloper": { "uri": "admin\/settings\/unlock-developer", "methods": ["POST"] }, "tenant.admin.tenant.admin.online-users": { "uri": "admin\/online-users", "methods": ["GET", "HEAD"] }, "tenant.admin.jackpot.index": { "uri": "admin\/jackpot", "methods": ["GET", "HEAD"] }, "tenant.admin.jackpot.update": { "uri": "admin\/jackpot", "methods": ["PUT"] }, "tenant.register": { "uri": "register", "methods": ["GET", "HEAD"] }, "weizhen-manager": { "uri": "weizhen-manager", "methods": ["GET", "HEAD"] }, "login-to-manager.store": { "uri": "login-to-manager", "methods": ["POST"] }, "login-to-game.store": { "uri": "login-to-game", "methods": ["POST"] }, "tenant.game.history": { "uri": "game-history", "methods": ["GET", "HEAD"] }, "tenant.profile.changePassword": { "uri": "change-password", "methods": ["PUT"] }, "tenant.withdrawal.data": { "uri": "withdrawal-data", "methods": ["GET", "HEAD"] }, "tenant.withdrawal.store": { "uri": "withdrawal", "methods": ["POST"] }, "tenant.withdrawal.updatePix": { "uri": "update-pix-document", "methods": ["POST"] }, "tenant.deposit.data": { "uri": "deposit-data", "methods": ["GET", "HEAD"] }, "tenant.deposit.store": { "uri": "deposit", "methods": ["POST"] }, "tenant.deposit.checkStatus": { "uri": "check-payment-status", "methods": ["POST"] }, "tenant.user.data": { "uri": "user-data", "methods": ["GET", "HEAD"] }, "tenant.agent.panel.data": { "uri": "agent-panel-data", "methods": ["GET", "HEAD"] }, "tenant.agent.collect": { "uri": "agent-collect-commission", "methods": ["POST"] }, "tenant.user.refresh": { "uri": "api\/user\/refresh", "methods": ["GET", "HEAD"] }, "game.start": { "uri": "game\/start", "methods": ["POST"] }, "game.openChest": { "uri": "game\/open-chest", "methods": ["POST"] }, "game.cashOut": { "uri": "game\/cash-out", "methods": ["POST"] }, "tenant.referral.link": { "uri": "referral-link", "methods": ["GET", "HEAD"] }, "tenant.logout": { "uri": "logout", "methods": ["POST"] }, "tenant.user.heartbeat": { "uri": "api\/user\/heartbeat", "methods": ["POST"] }, "tenant.horsepay.callback": { "uri": "payment\/callback\/horsepay", "methods": ["POST"] }, "tenant.api.logout": { "uri": "api\/logout", "methods": ["POST"] } } }; !function (t, r) { "object" == typeof exports && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (t || self).route = r() }(this, function () { function t(t, r) { for (var n = 0; n < r.length; n++) { var e = r[n]; e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, u(e.key), e) } } function r(r, n, e) { return n && t(r.prototype, n), e && t(r, e), Object.defineProperty(r, "prototype", { writable: !1 }), r } function n() { return n = Object.assign ? Object.assign.bind() : function (t) { for (var r = 1; r < arguments.length; r++) { var n = arguments[r]; for (var e in n) ({}).hasOwnProperty.call(n, e) && (t[e] = n[e]) } return t }, n.apply(null, arguments) } function e(t) { return e = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t) }, e(t) } function o() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () { })) } catch (t) { } return (o = function () { return !!t })() } function i(t, r) { return i = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, r) { return t.__proto__ = r, t }, i(t, r) } function u(t) { var r = function (t) { if ("object" != typeof t || !t) return t; var r = t[Symbol.toPrimitive]; if (void 0 !== r) { var n = r.call(t, "string"); if ("object" != typeof n) return n; throw new TypeError("@@toPrimitive must return a primitive value.") } return String(t) }(t); return "symbol" == typeof r ? r : r + "" } function f(t) { var r = "function" == typeof Map ? new Map : void 0; return f = function (t) { if (null === t || !function (t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]") } catch (r) { return "function" == typeof t } }(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, n) } function n() { return function (t, r, n) { if (o()) return Reflect.construct.apply(null, arguments); var e = [null]; e.push.apply(e, r); var u = new (t.bind.apply(t, e)); return n && i(u, n.prototype), u }(t, arguments, e(this).constructor) } return n.prototype = Object.create(t.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), i(n, t) }, f(t) } var a = String.prototype.replace, c = /%20/g, l = "RFC3986", s = { default: l, formatters: { RFC1738: function (t) { return a.call(t, c, "+") }, RFC3986: function (t) { return String(t) } }, RFC1738: "RFC1738", RFC3986: l }, v = Object.prototype.hasOwnProperty, p = Array.isArray, y = function () { for (var t = [], r = 0; r < 256; ++r)t.push("%" + ((r < 16 ? "0" : "") + r.toString(16)).toUpperCase()); return t }(), d = function (t, r) { for (var n = r && r.plainObjects ? Object.create(null) : {}, e = 0; e < t.length; ++e)void 0 !== t[e] && (n[e] = t[e]); return n }, b = { arrayToObject: d, assign: function (t, r) { return Object.keys(r).reduce(function (t, n) { return t[n] = r[n], t }, t) }, combine: function (t, r) { return [].concat(t, r) }, compact: function (t) { for (var r = [{ obj: { o: t }, prop: "o" }], n = [], e = 0; e < r.length; ++e)for (var o = r[e], i = o.obj[o.prop], u = Object.keys(i), f = 0; f < u.length; ++f) { var a = u[f], c = i[a]; "object" == typeof c && null !== c && -1 === n.indexOf(c) && (r.push({ obj: i, prop: a }), n.push(c)) } return function (t) { for (; t.length > 1;) { var r = t.pop(), n = r.obj[r.prop]; if (p(n)) { for (var e = [], o = 0; o < n.length; ++o)void 0 !== n[o] && e.push(n[o]); r.obj[r.prop] = e } } }(r), t }, decode: function (t, r, n) { var e = t.replace(/\+/g, " "); if ("iso-8859-1" === n) return e.replace(/%[0-9a-f]{2}/gi, unescape); try { return decodeURIComponent(e) } catch (t) { return e } }, encode: function (t, r, n, e, o) { if (0 === t.length) return t; var i = t; if ("symbol" == typeof t ? i = Symbol.prototype.toString.call(t) : "string" != typeof t && (i = String(t)), "iso-8859-1" === n) return escape(i).replace(/%u[0-9a-f]{4}/gi, function (t) { return "%26%23" + parseInt(t.slice(2), 16) + "%3B" }); for (var u = "", f = 0; f < i.length; ++f) { var a = i.charCodeAt(f); 45 === a || 46 === a || 95 === a || 126 === a || a >= 48 && a <= 57 || a >= 65 && a <= 90 || a >= 97 && a <= 122 || o === s.RFC1738 && (40 === a || 41 === a) ? u += i.charAt(f) : a < 128 ? u += y[a] : a < 2048 ? u += y[192 | a >> 6] + y[128 | 63 & a] : a < 55296 || a >= 57344 ? u += y[224 | a >> 12] + y[128 | a >> 6 & 63] + y[128 | 63 & a] : (a = 65536 + ((1023 & a) << 10 | 1023 & i.charCodeAt(f += 1)), u += y[240 | a >> 18] + y[128 | a >> 12 & 63] + y[128 | a >> 6 & 63] + y[128 | 63 & a]) } return u }, isBuffer: function (t) { return !(!t || "object" != typeof t || !(t.constructor && t.constructor.isBuffer && t.constructor.isBuffer(t))) }, isRegExp: function (t) { return "[object RegExp]" === Object.prototype.toString.call(t) }, maybeMap: function (t, r) { if (p(t)) { for (var n = [], e = 0; e < t.length; e += 1)n.push(r(t[e])); return n } return r(t) }, merge: function t(r, n, e) { if (!n) return r; if ("object" != typeof n) { if (p(r)) r.push(n); else { if (!r || "object" != typeof r) return [r, n]; (e && (e.plainObjects || e.allowPrototypes) || !v.call(Object.prototype, n)) && (r[n] = !0) } return r } if (!r || "object" != typeof r) return [r].concat(n); var o = r; return p(r) && !p(n) && (o = d(r, e)), p(r) && p(n) ? (n.forEach(function (n, o) { if (v.call(r, o)) { var i = r[o]; i && "object" == typeof i && n && "object" == typeof n ? r[o] = t(i, n, e) : r.push(n) } else r[o] = n }), r) : Object.keys(n).reduce(function (r, o) { var i = n[o]; return r[o] = v.call(r, o) ? t(r[o], i, e) : i, r }, o) } }, h = Object.prototype.hasOwnProperty, g = { brackets: function (t) { return t + "[]" }, comma: "comma", indices: function (t, r) { return t + "[" + r + "]" }, repeat: function (t) { return t } }, m = Array.isArray, j = String.prototype.split, w = Array.prototype.push, O = function (t, r) { w.apply(t, m(r) ? r : [r]) }, E = Date.prototype.toISOString, R = s.default, S = { addQueryPrefix: !1, allowDots: !1, charset: "utf-8", charsetSentinel: !1, delimiter: "&", encode: !0, encoder: b.encode, encodeValuesOnly: !1, format: R, formatter: s.formatters[R], indices: !1, serializeDate: function (t) { return E.call(t) }, skipNulls: !1, strictNullHandling: !1 }, k = function t(r, n, e, o, i, u, f, a, c, l, s, v, p, y) { var d, h = r; if ("function" == typeof f ? h = f(n, h) : h instanceof Date ? h = l(h) : "comma" === e && m(h) && (h = b.maybeMap(h, function (t) { return t instanceof Date ? l(t) : t })), null === h) { if (o) return u && !p ? u(n, S.encoder, y, "key", s) : n; h = "" } if ("string" == typeof (d = h) || "number" == typeof d || "boolean" == typeof d || "symbol" == typeof d || "bigint" == typeof d || b.isBuffer(h)) { if (u) { var g = p ? n : u(n, S.encoder, y, "key", s); if ("comma" === e && p) { for (var w = j.call(String(h), ","), E = "", R = 0; R < w.length; ++R)E += (0 === R ? "" : ",") + v(u(w[R], S.encoder, y, "value", s)); return [v(g) + "=" + E] } return [v(g) + "=" + v(u(h, S.encoder, y, "value", s))] } return [v(n) + "=" + v(String(h))] } var k, T = []; if (void 0 === h) return T; if ("comma" === e && m(h)) k = [{ value: h.length > 0 ? h.join(",") || null : void 0 }]; else if (m(f)) k = f; else { var $ = Object.keys(h); k = a ? $.sort(a) : $ } for (var x = 0; x < k.length; ++x) { var N = k[x], C = "object" == typeof N && void 0 !== N.value ? N.value : h[N]; if (!i || null !== C) { var A = m(h) ? "function" == typeof e ? e(n, N) : n : n + (c ? "." + N : "[" + N + "]"); O(T, t(C, A, e, o, i, u, f, a, c, l, s, v, p, y)) } } return T }, T = Object.prototype.hasOwnProperty, $ = Array.isArray, x = { allowDots: !1, allowPrototypes: !1, arrayLimit: 20, charset: "utf-8", charsetSentinel: !1, comma: !1, decoder: b.decode, delimiter: "&", depth: 5, ignoreQueryPrefix: !1, interpretNumericEntities: !1, parameterLimit: 1e3, parseArrays: !0, plainObjects: !1, strictNullHandling: !1 }, N = function (t) { return t.replace(/&#(\d+);/g, function (t, r) { return String.fromCharCode(parseInt(r, 10)) }) }, C = function (t, r) { return t && "string" == typeof t && r.comma && t.indexOf(",") > -1 ? t.split(",") : t }, A = function (t, r, n, e) { if (t) { var o = n.allowDots ? t.replace(/\.([^.[]+)/g, "[$1]") : t, i = /(\[[^[\]]*])/g, u = n.depth > 0 && /(\[[^[\]]*])/.exec(o), f = u ? o.slice(0, u.index) : o, a = []; if (f) { if (!n.plainObjects && T.call(Object.prototype, f) && !n.allowPrototypes) return; a.push(f) } for (var c = 0; n.depth > 0 && null !== (u = i.exec(o)) && c < n.depth;) { if (c += 1, !n.plainObjects && T.call(Object.prototype, u[1].slice(1, -1)) && !n.allowPrototypes) return; a.push(u[1]) } return u && a.push("[" + o.slice(u.index) + "]"), function (t, r, n, e) { for (var o = e ? r : C(r, n), i = t.length - 1; i >= 0; --i) { var u, f = t[i]; if ("[]" === f && n.parseArrays) u = [].concat(o); else { u = n.plainObjects ? Object.create(null) : {}; var a = "[" === f.charAt(0) && "]" === f.charAt(f.length - 1) ? f.slice(1, -1) : f, c = parseInt(a, 10); n.parseArrays || "" !== a ? !isNaN(c) && f !== a && String(c) === a && c >= 0 && n.parseArrays && c <= n.arrayLimit ? (u = [])[c] = o : "__proto__" !== a && (u[a] = o) : u = { 0: o } } o = u } return o }(a, r, n, e) } }, D = function (t, r) { var n = function (t) { if (!t) return x; if (null != t.decoder && "function" != typeof t.decoder) throw new TypeError("Decoder has to be a function."); if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined"); return { allowDots: void 0 === t.allowDots ? x.allowDots : !!t.allowDots, allowPrototypes: "boolean" == typeof t.allowPrototypes ? t.allowPrototypes : x.allowPrototypes, arrayLimit: "number" == typeof t.arrayLimit ? t.arrayLimit : x.arrayLimit, charset: void 0 === t.charset ? x.charset : t.charset, charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : x.charsetSentinel, comma: "boolean" == typeof t.comma ? t.comma : x.comma, decoder: "function" == typeof t.decoder ? t.decoder : x.decoder, delimiter: "string" == typeof t.delimiter || b.isRegExp(t.delimiter) ? t.delimiter : x.delimiter, depth: "number" == typeof t.depth || !1 === t.depth ? +t.depth : x.depth, ignoreQueryPrefix: !0 === t.ignoreQueryPrefix, interpretNumericEntities: "boolean" == typeof t.interpretNumericEntities ? t.interpretNumericEntities : x.interpretNumericEntities, parameterLimit: "number" == typeof t.parameterLimit ? t.parameterLimit : x.parameterLimit, parseArrays: !1 !== t.parseArrays, plainObjects: "boolean" == typeof t.plainObjects ? t.plainObjects : x.plainObjects, strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : x.strictNullHandling } }(r); if ("" === t || null == t) return n.plainObjects ? Object.create(null) : {}; for (var e = "string" == typeof t ? function (t, r) { var n, e = {}, o = (r.ignoreQueryPrefix ? t.replace(/^\?/, "") : t).split(r.delimiter, Infinity === r.parameterLimit ? void 0 : r.parameterLimit), i = -1, u = r.charset; if (r.charsetSentinel) for (n = 0; n < o.length; ++n)0 === o[n].indexOf("utf8=") && ("utf8=%E2%9C%93" === o[n] ? u = "utf-8" : "utf8=%26%2310003%3B" === o[n] && (u = "iso-8859-1"), i = n, n = o.length); for (n = 0; n < o.length; ++n)if (n !== i) { var f, a, c = o[n], l = c.indexOf("]="), s = -1 === l ? c.indexOf("=") : l + 1; -1 === s ? (f = r.decoder(c, x.decoder, u, "key"), a = r.strictNullHandling ? null : "") : (f = r.decoder(c.slice(0, s), x.decoder, u, "key"), a = b.maybeMap(C(c.slice(s + 1), r), function (t) { return r.decoder(t, x.decoder, u, "value") })), a && r.interpretNumericEntities && "iso-8859-1" === u && (a = N(a)), c.indexOf("[]=") > -1 && (a = $(a) ? [a] : a), e[f] = T.call(e, f) ? b.combine(e[f], a) : a } return e }(t, n) : t, o = n.plainObjects ? Object.create(null) : {}, i = Object.keys(e), u = 0; u < i.length; ++u) { var f = i[u], a = A(f, e[f], n, "string" == typeof t); o = b.merge(o, a, n) } return b.compact(o) }, P =/*#__PURE__*/function () { function t(t, r, n) { var e, o; this.name = t, this.definition = r, this.bindings = null != (e = r.bindings) ? e : {}, this.wheres = null != (o = r.wheres) ? o : {}, this.config = n } var n = t.prototype; return n.matchesUrl = function (t) { var r, n = this; if (!this.definition.methods.includes("GET")) return !1; var e = this.template.replace(/[.*+$()[\]]/g, "\\$&").replace(/(\/?){([^}?]*)(\??)}/g, function (t, r, e, o) { var i, u = "(?<" + e + ">" + ((null == (i = n.wheres[e]) ? void 0 : i.replace(/(^\^)|(\$$)/g, "")) || "[^/?]+") + ")"; return o ? "(" + r + u + ")?" : "" + r + u }).replace(/^\w+:\/\//, ""), o = t.replace(/^\w+:\/\//, "").split("?"), i = o[0], u = o[1], f = null != (r = new RegExp("^" + e + "/?$").exec(i)) ? r : new RegExp("^" + e + "/?$").exec(decodeURI(i)); if (f) { for (var a in f.groups) f.groups[a] = "string" == typeof f.groups[a] ? decodeURIComponent(f.groups[a]) : f.groups[a]; return { params: f.groups, query: D(u) } } return !1 }, n.compile = function (t) { var r = this; return this.parameterSegments.length ? this.template.replace(/{([^}?]+)(\??)}/g, function (n, e, o) { var i, u; if (!o && [null, void 0].includes(t[e])) throw new Error("Ziggy error: '" + e + "' parameter is required for route '" + r.name + "'."); if (r.wheres[e] && !new RegExp("^" + (o ? "(" + r.wheres[e] + ")?" : r.wheres[e]) + "$").test(null != (u = t[e]) ? u : "")) throw new Error("Ziggy error: '" + e + "' parameter '" + t[e] + "' does not match required format '" + r.wheres[e] + "' for route '" + r.name + "'."); return encodeURI(null != (i = t[e]) ? i : "").replace(/%7C/g, "|").replace(/%25/g, "%").replace(/\$/g, "%24") }).replace(this.config.absolute ? /(\.[^/]+?)(\/\/)/ : /(^)(\/\/)/, "$1/").replace(/\/+$/, "") : this.template }, r(t, [{ key: "template", get: function () { var t = (this.origin + "/" + this.definition.uri).replace(/\/+$/, ""); return "" === t ? "/" : t } }, { key: "origin", get: function () { return this.config.absolute ? this.definition.domain ? "" + this.config.url.match(/^\w+:\/\//)[0] + this.definition.domain + (this.config.port ? ":" + this.config.port : "") : this.config.url : "" } }, { key: "parameterSegments", get: function () { var t, r; return null != (t = null == (r = this.template.match(/{[^}?]+\??}/g)) ? void 0 : r.map(function (t) { return { name: t.replace(/{|\??}/g, ""), required: !/\?}$/.test(t) } })) ? t : [] } }]) }(), F =/*#__PURE__*/function (t) { function e(r, e, o, i) { var u; if (void 0 === o && (o = !0), (u = t.call(this) || this).t = null != i ? i : "undefined" != typeof Ziggy ? Ziggy : null == globalThis ? void 0 : globalThis.Ziggy, u.t = n({}, u.t, { absolute: o }), r) { if (!u.t.routes[r]) throw new Error("Ziggy error: route '" + r + "' is not in the route list."); u.i = new P(r, u.t.routes[r], u.t), u.u = u.l(e) } return u } var o, u; u = t, (o = e).prototype = Object.create(u.prototype), o.prototype.constructor = o, i(o, u); var f = e.prototype; return f.toString = function () { var t = this, r = Object.keys(this.u).filter(function (r) { return !t.i.parameterSegments.some(function (t) { return t.name === r }) }).filter(function (t) { return "_query" !== t }).reduce(function (r, e) { var o; return n({}, r, ((o = {})[e] = t.u[e], o)) }, {}); return this.i.compile(this.u) + function (t, r) { var n, e = t, o = function (t) { if (!t) return S; if (null != t.encoder && "function" != typeof t.encoder) throw new TypeError("Encoder has to be a function."); var r = t.charset || S.charset; if (void 0 !== t.charset && "utf-8" !== t.charset && "iso-8859-1" !== t.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined"); var n = s.default; if (void 0 !== t.format) { if (!h.call(s.formatters, t.format)) throw new TypeError("Unknown format option provided."); n = t.format } var e = s.formatters[n], o = S.filter; return ("function" == typeof t.filter || m(t.filter)) && (o = t.filter), { addQueryPrefix: "boolean" == typeof t.addQueryPrefix ? t.addQueryPrefix : S.addQueryPrefix, allowDots: void 0 === t.allowDots ? S.allowDots : !!t.allowDots, charset: r, charsetSentinel: "boolean" == typeof t.charsetSentinel ? t.charsetSentinel : S.charsetSentinel, delimiter: void 0 === t.delimiter ? S.delimiter : t.delimiter, encode: "boolean" == typeof t.encode ? t.encode : S.encode, encoder: "function" == typeof t.encoder ? t.encoder : S.encoder, encodeValuesOnly: "boolean" == typeof t.encodeValuesOnly ? t.encodeValuesOnly : S.encodeValuesOnly, filter: o, format: n, formatter: e, serializeDate: "function" == typeof t.serializeDate ? t.serializeDate : S.serializeDate, skipNulls: "boolean" == typeof t.skipNulls ? t.skipNulls : S.skipNulls, sort: "function" == typeof t.sort ? t.sort : null, strictNullHandling: "boolean" == typeof t.strictNullHandling ? t.strictNullHandling : S.strictNullHandling } }(r); "function" == typeof o.filter ? e = (0, o.filter)("", e) : m(o.filter) && (n = o.filter); var i = []; if ("object" != typeof e || null === e) return ""; var u = g[r && r.arrayFormat in g ? r.arrayFormat : r && "indices" in r ? r.indices ? "indices" : "repeat" : "indices"]; n || (n = Object.keys(e)), o.sort && n.sort(o.sort); for (var f = 0; f < n.length; ++f) { var a = n[f]; o.skipNulls && null === e[a] || O(i, k(e[a], a, u, o.strictNullHandling, o.skipNulls, o.encode ? o.encoder : null, o.filter, o.sort, o.allowDots, o.serializeDate, o.format, o.formatter, o.encodeValuesOnly, o.charset)) } var c = i.join(o.delimiter), l = !0 === o.addQueryPrefix ? "?" : ""; return o.charsetSentinel && (l += "iso-8859-1" === o.charset ? "utf8=%26%2310003%3B&" : "utf8=%E2%9C%93&"), c.length > 0 ? l + c : "" }(n({}, r, this.u._query), { addQueryPrefix: !0, arrayFormat: "indices", encodeValuesOnly: !0, skipNulls: !0, encoder: function (t, r) { return "boolean" == typeof t ? Number(t) : r(t) } }) }, f.v = function (t) { var r = this; t ? this.t.absolute && t.startsWith("/") && (t = this.p().host + t) : t = this.h(); var e = {}, o = Object.entries(this.t.routes).find(function (n) { return e = new P(n[0], n[1], r.t).matchesUrl(t) }) || [void 0, void 0]; return n({ name: o[0] }, e, { route: o[1] }) }, f.h = function () { var t = this.p(), r = t.pathname, n = t.search; return (this.t.absolute ? t.host + r : r.replace(this.t.url.replace(/^\w*:\/\/[^/]+/, ""), "").replace(/^\/+/, "/")) + n }, f.current = function (t, r) { var e = this.v(), o = e.name, i = e.params, u = e.query, f = e.route; if (!t) return o; var a = new RegExp("^" + t.replace(/\./g, "\\.").replace(/\*/g, ".*") + "$").test(o); if ([null, void 0].includes(r) || !a) return a; var c = new P(o, f, this.t); r = this.l(r, c); var l = n({}, i, u); if (Object.values(r).every(function (t) { return !t }) && !Object.values(l).some(function (t) { return void 0 !== t })) return !0; var s = function (t, r) { return Object.entries(t).every(function (t) { var n = t[0], e = t[1]; return Array.isArray(e) && Array.isArray(r[n]) ? e.every(function (t) { return r[n].includes(t) }) : "object" == typeof e && "object" == typeof r[n] && null !== e && null !== r[n] ? s(e, r[n]) : r[n] == e }) }; return s(r, l) }, f.p = function () { var t, r, n, e, o, i, u = "undefined" != typeof window ? window.location : {}, f = u.host, a = u.pathname, c = u.search; return { host: null != (t = null == (r = this.t.location) ? void 0 : r.host) ? t : void 0 === f ? "" : f, pathname: null != (n = null == (e = this.t.location) ? void 0 : e.pathname) ? n : void 0 === a ? "" : a, search: null != (o = null == (i = this.t.location) ? void 0 : i.search) ? o : void 0 === c ? "" : c } }, f.has = function (t) { return this.t.routes.hasOwnProperty(t) }, f.l = function (t, r) { var e = this; void 0 === t && (t = {}), void 0 === r && (r = this.i), null != t || (t = {}), t = ["string", "number"].includes(typeof t) ? [t] : t; var o = r.parameterSegments.filter(function (t) { return !e.t.defaults[t.name] }); if (Array.isArray(t)) t = t.reduce(function (t, r, e) { var i, u; return n({}, t, o[e] ? ((i = {})[o[e].name] = r, i) : "object" == typeof r ? r : ((u = {})[r] = "", u)) }, {}); else if (1 === o.length && !t[o[0].name] && (t.hasOwnProperty(Object.values(r.bindings)[0]) || t.hasOwnProperty("id"))) { var i; (i = {})[o[0].name] = t, t = i } return n({}, this.m(r), this.j(t, r)) }, f.m = function (t) { var r = this; return t.parameterSegments.filter(function (t) { return r.t.defaults[t.name] }).reduce(function (t, e, o) { var i, u = e.name; return n({}, t, ((i = {})[u] = r.t.defaults[u], i)) }, {}) }, f.j = function (t, r) { var e = r.bindings, o = r.parameterSegments; return Object.entries(t).reduce(function (t, r) { var i, u, f = r[0], a = r[1]; if (!a || "object" != typeof a || Array.isArray(a) || !o.some(function (t) { return t.name === f })) return n({}, t, ((u = {})[f] = a, u)); if (!a.hasOwnProperty(e[f])) { if (!a.hasOwnProperty("id")) throw new Error("Ziggy error: object passed as '" + f + "' parameter is missing route model binding key '" + e[f] + "'."); e[f] = "id" } return n({}, t, ((i = {})[f] = a[e[f]], i)) }, {}) }, f.valueOf = function () { return this.toString() }, r(e, [{ key: "params", get: function () { var t = this.v(); return n({}, t.params, t.query) } }, { key: "routeParams", get: function () { return this.v().params } }, { key: "queryParams", get: function () { return this.v().query } }]) }(/*#__PURE__*/f(String)); return function (t, r, n, e) { var o = new F(t, r, n, e); return t ? o.toString() : o } });
  </script>

  <!-- Patch Ziggy to honor the current port in development (e.g., :8000) -->
  <script>
    (function() {
      try {
        if (window.Ziggy) {
          var p = window.location && window.location.port ? String(window.location.port) : '';
          // Normalize common defaults
          if (p && p !== '80' && p !== '443') {
            window.Ziggy.port = Number(p);
          } else {
            window.Ziggy.port = null;
          }
        }
      } catch (e) { /* silent */ }
    })();
  </script>

  <link rel="stylesheet" href="/build/assets/app-B3dtaGch.css">
  
  <!-- Polling e debug desativados temporariamente -->
  <!-- <link rel="stylesheet" href="/css/payment-polling.css"> -->
  <!-- <script src="/js/PaymentPolling.js"></script> -->
  <!-- <script src="/js/PaymentIntegration.js"></script> -->
  <!-- <script src="/js/BSPayPollingLogger.js"></script> -->

    <!-- Capturar e armazenar código de referência -->
  <script>
  // Executar imediatamente, sem esperar pelo DOMContentLoaded
  (function() {
    // Capturar parâmetro ref da URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    // Se existir um código de referência, armazenar no localStorage e cookie
    if (refCode) {
      localStorage.setItem('referral_code', refCode);
      
      // Armazenar também em cookie para acesso no backend
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 30); // Cookie válido por 30 dias
      document.cookie = `referral_code=${refCode}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Lax`;
      
      // Adicionar como parâmetro oculto em todos os formulários da página
      document.addEventListener('DOMContentLoaded', function() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
          if (!form.querySelector('input[name="referral_id"]')) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'referral_id';
            input.value = refCode;
            form.appendChild(input);
          }
        });
      });
      
      console.log('Código de referência armazenado:', refCode);
    }
  })();
  </script>

  <!-- Listener leve: intercepta respostas de pagamento e atualiza saldo/fecha modal -->
  <script>
  (function () {
      if (!window.fetch) return;

      const originalFetch = window.fetch.bind(window);
      window.fetch = async function (input, init) {
        const res = await originalFetch(input, init);
        try {
          const url = (typeof input === 'string') ? input : (input && input.url) || '';
          // Reagir apenas a chamadas críticas já existentes no app
          if (/check-payment-status|\/(deposit)(\/?$|[?#])/i.test(url)) {
            const cloned = res.clone();
            const data = await cloned.json().catch(function(){ return null; });
            if (data) {
              const payload = data.data || data;
              const status = (typeof payload.status === 'string') ? payload.status : (payload.is_paid === true ? 'paid' : null);
              const balance = (payload.user_balance !== undefined) ? payload.user_balance : (payload.balance !== undefined ? payload.balance : undefined);

              if (balance !== undefined) {
                updateUserBalance(balance);
              }

              if (status === 'paid') {
                closeDepositModal();
                forceRefreshBalance();
              }
            }
          }
        } catch (e) {
          // Silencioso
        }
        return res;
      };

      function updateUserBalance(newBalance) {
        var num = parseFloat(newBalance);
        var formatted = isFinite(num) ? ('R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : newBalance;
        var selectors = ['[data-user-balance]', '.user-balance', '.balance-amount', '#user-balance'];
        selectors.forEach(function (sel) {
          document.querySelectorAll(sel).forEach(function (el) { el.textContent = formatted; });
        });
      }

      function closeDepositModal() {
        var modal = document.querySelector('.deposit-modal, .profile-modal.deposit-modal, [class*="deposit-modal"]');
        if (!modal) return;
        var btn = modal.querySelector('[data-close], .close, .modal-close, [aria-label="close"]');
        if (btn) { btn.click(); }
        else { modal.style.display = 'none'; }
        // Recarregar a página após fechar o modal para refletir saldo e estado
        setTimeout(function(){ try { window.location.reload(); } catch(_) {} }, 600);
      }

      function forceRefreshBalance() {
        var tried = false;
        var tryFetch = function (url) {
          return fetch(url, { credentials: 'same-origin' })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (j) {
              if (!j) return false;
              var d = j && (j.data || j);
              var val = (d && (d.balance ?? (d.user && d.user.balance) ?? d.wallet ?? d.saldo));
              if (val !== undefined) {
                updateUserBalance(val);
                window.dispatchEvent(new CustomEvent('balance:updated', { detail: { balance: val } }));
                return true;
              }
              return false;
            })
            .catch(function () { return false; });
        };

        // Tenta endpoint principal e fallback
        tryFetch('/api/user/refresh').then(function (ok) {
          if (ok) return;
          tryFetch('/user-data');
        });

        // Reforço em 1s e 2s
        setTimeout(function(){ tryFetch('/api/user/refresh'); }, 1000);
        setTimeout(function(){ tryFetch('/user-data'); }, 2000);
      }
    })();
  </script>

  <!-- Hook adicional: também intercepta XMLHttpRequest/axios e amplia a detecção de "pago" -->
  <script>
    (function () {
      function evaluatePayload(payload) {
        try {
          var data = payload && (payload.data || payload);
          var statusRaw = (data && data.status !== undefined) ? String(data.status).toLowerCase() : null;
          var isPaid = false;
          if (data) {
            if (data.is_paid === true || data.paid === true) isPaid = true;
            if (statusRaw === 'paid' || statusRaw === 'pago' || statusRaw === 'success' || statusRaw === 'sucesso') isPaid = true;
            if (data.status === 1 || statusRaw === '1') isPaid = true;
          }

          var balance = (data && (data.user_balance !== undefined ? data.user_balance
                                   : (data.balance !== undefined ? data.balance
                                   : (data.wallet !== undefined ? data.wallet
                                   : data.saldo))));
          if (balance !== undefined) updateUserBalance(balance);
          if (isPaid) { closeDepositModal(); forceRefreshBalance(); }
        } catch (_) { /* silencioso */ }
      }

      var OXHR = window.XMLHttpRequest;
      if (!OXHR) return;
      var P = OXHR.prototype,
          _open = P.open,
          _send = P.send;

      P.open = function (method, url) { this.__payURL = url; return _open.apply(this, arguments); };
      P.send = function (body) {
        var self = this;
        try {
          this.addEventListener('loadend', function () {
            try {
              var u = (self.__payURL || '');
              if (/check-payment-status|\/(deposit)(\b|\/|\?)/i.test(u)) {
                var txt = self.responseText || '';
                if (txt && txt.length < 200000) {
                  try { evaluatePayload(JSON.parse(txt)); } catch (_) { /* ignora */ }
                }
              }
            } catch (_) { /* ignora */ }
          });
        } catch (_) { /* ignora */ }
        return _send.apply(this, arguments);
      };

      function updateUserBalance(newBalance) {
        var num = parseFloat(newBalance);
        var formatted = isFinite(num) ? ('R$ ' + num.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })) : newBalance;
        var selectors = ['[data-user-balance]', '.user-balance', '.balance-amount', '#user-balance'];
        selectors.forEach(function (sel) {
          document.querySelectorAll(sel).forEach(function (el) { el.textContent = formatted; });
        });
      }

      function closeDepositModal() {
        var modal = document.querySelector('.deposit-modal, .profile-modal.deposit-modal, [class*="deposit-modal"]');
        if (!modal) return;
        var btn = modal.querySelector('[data-close], .close, .modal-close, [aria-label="close"]');
        if (btn) { btn.click(); }
        else { modal.style.display = 'none'; }
        // Recarregar a página após fechar o modal para refletir saldo e estado
        setTimeout(function(){ try { window.location.reload(); } catch(_) {} }, 600);
      }

      function forceRefreshBalance() {
        var tryFetch = function (url) {
          return fetch(url, { credentials: 'same-origin' })
            .then(function (r) { return r.ok ? r.json() : null; })
            .then(function (j) {
              if (!j) return false;
              var d = j && (j.data || j);
              var val = (d && (d.balance ?? (d.user && d.user.balance) ?? d.wallet ?? d.saldo));
              if (val !== undefined) {
                updateUserBalance(val);
                window.dispatchEvent(new CustomEvent('balance:updated', { detail: { balance: val } }));
                return true;
              }
              return false;
            })
            .catch(function () { return false; });
        };

        tryFetch('/api/user/refresh').then(function (ok) {
          if (ok) return;
          tryFetch('/user-data');
        });
        setTimeout(function(){ tryFetch('/api/user/refresh'); }, 1000);
        setTimeout(function(){ tryFetch('/user-data'); }, 2000);
      }
    })();
  </script>

  <script type="module" src="/build/assets/app-ISxEiS1S.js"></script>

  <style>
 /* -------------------
   Mensagem geral de erro
------------------- */
.auth-error-message {
  color: #b91c1c;             /* vermelho escuro */
  padding: 10px 15px;
  margin: 0 auto 15px auto;   /* centraliza e mantém espaço inferior */
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
  max-width: 600px;           /* limite de largura (opcional) */
  width: calc(100% - 40px);   /* ocupa toda largura com 20px de espaço de cada lado */
}

/* -------------------
   Mensagem geral de sucesso
------------------- */
.auth-success-message {
  color: #065f46;             /* verde escuro */
  padding: 10px 15px;
  margin: 0 auto 15px auto;
  border-radius: 6px;
  font-weight: 500;
  text-align: center;
  animation: fadeIn 0.3s ease-in-out;
  max-width: 600px;
  width: calc(100% - 40px);
}

/* -------------------
   Mensagem de erro por campo
------------------- */
.field-error {
  color: #ef4444;              /* vermelho forte */
  font-size: 0.875rem;         /* 14px */
  margin-top: 4px;
  display: block;
  animation: fadeIn 0.3s ease-in-out;
}

/* -------------------
   Mensagem de sucesso por campo
------------------- */
.field-success {
  color: #16a34a;              /* verde forte */
  font-size: 0.875rem;         /* 14px */
  margin-top: 4px;
  display: block;
  animation: fadeIn 0.3s ease-in-out;
}

/* -------------------
   Inputs com erro
------------------- */
input.error {
  border-color: #ef4444;
  background-color: #fff1f1;
  transition: all 0.3s ease-in-out;
}

/* -------------------
   Inputs com sucesso
------------------- */
input.success {
  border-color: #16a34a;
  background-color: #f0fdf4;
  transition: all 0.3s ease-in-out;
}

/* -------------------
   Animação simples de fadeIn
------------------- */
@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-5px); }
  100% { opacity: 1; transform: translateY(0); }
}

</style>
</head>

<body class="font-sans antialiased">
  <div id="app"
    data-page='<?php 
    $pageData = [
        "component" => "Tenant/Game/Launch",
        "props" => [
            "errors" => [],
            "auth" => [
                "user" => $userData
            ],
            "flash" => [
                "success" => null,
                "error" => null
            ],
            "user" => $userData,
            "isAuthenticated" => $isAuthenticated,
            "settings" => [
                "ui_social_link" => "https://w.app/6py0fm",
                "ui_support_link" => "https://w.app/6py0fm",
                "hide_phone_login" => "2"
            ]
        ],
        "url" => "/",
        "version" => "6b1ee3f6b70b55bacbf68ad9d92748f9",
        "clearHistory" => false,
        "encryptHistory" => false
    ];
    echo json_encode($pageData, JSON_HEX_APOS | JSON_HEX_QUOT);
    ?>'>
  </div>
  

</body>

</html>