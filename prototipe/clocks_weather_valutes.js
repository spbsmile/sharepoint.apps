$( document ).ready(function() {

	moment.tz.add("Europe/Moscow|MSK MSD MSK|-30 -40 -40|01020|1BWn0 1qM0 WM0 8Hz0|16e6");
	moment.tz.add("Asia/Yekaterinburg|LMT PMT SVET SVET SVEST SVEST YEKT YEKST YEKT|-42.x -3J.5 -40 -50 -60 -50 -50 -60 -60|0123434343434343434343435267676767676767676767676767676767676767686|-2ag42.x 7mQh.s qBvJ.5 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cN0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 8Hz0|14e5");
	moment.tz.add("Asia/Almaty|LMT +05 +06 +07|-57.M -50 -60 -70|012323232323232323232321232323232323232323232323232|-1Pc57.M eUo7.M 23CL0 1db0 1cN0 1db0 1cN0 1db0 1dd0 1cO0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 2pB0 IM0 rX0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0|15e5");

	initLocalClocks("Europe/Moscow");
	initLocalClocks("Asia/Yekaterinburg");
	initLocalClocks("Asia/Almaty");

	var timeNow = moment().format("L");
	$("#titleCurrencyToday").text("Курс ЦБ РФ на " + timeNow);
	$("#USDcurrency").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_USDcurrency").text());
	$("#EURcurrency").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_EURcurrency").text());

	$("#spbIconDuplicat_View").text();
	$("#spbDescriptionDuplicat_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_spbDescriptionDuplicat").text());
	$("#spbDegreesDuplicat_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_spbDegreesDuplicat").text());

	$("#uchalyWeatherIcon_View").text();
	$("#uchalyWeatherDescription_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_uchalyDescription").text());
	$("#uchalyWeatherDegrees_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_uchalyDegrees").text());

	$("#kenatyWeatherIcon_View").text();
	$("#kentayWeatherDescription_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_kentayDescription").text());
	$("#kentayWeatherDegrees_View").text($("#ctl00_ctl52_g_7daa8008_5f7b_474c_acbc_803095f5c8cb_ctl00_kentayDegrees").text());

	$("#tableCurrency").on('click', function () {
		window.location.href = "/Pages/currency.aspx";
	});

});

function initLocalClocks(timezone) {
	var seconds = moment().tz(timezone).format('s');
	var minutes = moment().tz(timezone).format('m');
	var hours = moment().tz(timezone).format('H');

	// Create an object with each hand and it's angle in degrees
	var hands = [
		{
			hand: 'hours',
			angle: (hours * 30) + (minutes / 2)
		},
		{
			hand: 'minutes',
			angle: (minutes * 6)
		},
		{
			hand: 'seconds',
			angle: (seconds * 6)
		}
	];

	// Loop through each of these hands to set their angle
	for (var j = 0; j < hands.length; j++) {
		var elements = document.getElementById(timezone + "_" + hands[j].hand);
		elements.style.webkitTransform = 'rotateZ(' + hands[j].angle + 'deg)';
		elements.style.transform = 'rotateZ(' + hands[j].angle + 'deg)';
		// If this is a minute hand, note the seconds position (to calculate minute position later)
		if (hands[j].hand === 'minutes') {
			elements.parentNode.setAttribute('data-second-angle', hands[j + 1].angle);
		}
	}
}

