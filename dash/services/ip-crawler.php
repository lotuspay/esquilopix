<?php
	function ip_F($str){
	//Getting Country, City, Region, Map Location and Internet Service Provider
		$useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36';

		// Helper to fetch JSON with robust timeouts
		$fetchJson = function(string $url) use ($useragent) {
			$ch  = curl_init();
			curl_setopt($ch, CURLOPT_URL, $url);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
			curl_setopt($ch, CURLOPT_IPRESOLVE, CURL_IPRESOLVE_V4);
			curl_setopt($ch, CURLOPT_ENCODING, 'gzip,deflate');
			curl_setopt($ch, CURLOPT_USERAGENT, $useragent);
			curl_setopt($ch, CURLOPT_REFERER, "https://google.com");
			// Timeouts & fail-fast
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 3); // seconds
			curl_setopt($ch, CURLOPT_TIMEOUT, 5); // total seconds
			curl_setopt($ch, CURLOPT_FAILONERROR, false);
			curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
			$body = curl_exec($ch);
			$errno = curl_errno($ch);
			$http  = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
			curl_close($ch);
			if ($errno !== 0 || $body === false || $http >= 400) {
				return null;
			}
			$decoded = @json_decode($body, false);
			return $decoded ?: null;
		};

		// Try primary provider (Extreme IP Lookup)
		$ip_data = $fetchJson('https://extreme-ip-lookup.com/json/' . rawurlencode($str));

		$country = "Unknown";
		$country_code = "XX";
		$region = "Unknown";
		$city = "Unknown";
		$latitude = "0";
		$longitude = "0";
		$isp = "Unknown";

		if ($ip_data && (isset($ip_data->status) ? $ip_data->status === 'success' : true)) {
			// Map fields if available
			$country      = $ip_data->country      ?? $country;
			$country_code = $ip_data->countryCode  ?? ($ip_data->country_code ?? $country_code);
			$region       = $ip_data->region       ?? ($ip_data->regionName ?? $region);
			$city         = $ip_data->city         ?? $city;
			$latitude     = $ip_data->lat          ?? $latitude;
			$longitude    = $ip_data->lon          ?? $longitude;
			$isp          = $ip_data->isp          ?? ($ip_data->org ?? $isp);
		} else {
			// Fallback provider: ipapi.co
			$ip2 = $fetchJson('https://ipapi.co/' . rawurlencode($str) . '/json/');
			if ($ip2 && empty($ip2->error)) {
				$country      = $ip2->country_name ?? $country;
				$country_code = $ip2->country      ?? $country_code;
				$region       = $ip2->region       ?? $region;
				$city         = $ip2->city         ?? $city;
				$latitude     = isset($ip2->latitude) ? $ip2->latitude : $latitude;
				$longitude    = isset($ip2->longitude) ? $ip2->longitude : $longitude;
				$isp          = $ip2->org ?? $isp; // organization as ISP fallback
			}
		}
		
		try {
			//$cidade  = $ip_data->{'city'};
			$ip_array = array(
				"pais" => $country,
				"codigo_pais" => $country_code,
				"regiao" => $region,
				"cidade" => $city,
				"isp" => $isp
			);
		} catch (Exception $e) {
			$ip_array = array(
				"pais" => null,
				"codigo_pais" => null,
				"regiao" => null,
				"cidade" => null,
				"isp" => null
			);
		}
		
		return $ip_array;
	}


?>