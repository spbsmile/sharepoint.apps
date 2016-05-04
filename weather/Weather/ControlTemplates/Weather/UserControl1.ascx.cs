using System;
using System.Net;
using System.Text;
using System.Web.UI;
using Newtonsoft.Json.Linq;

namespace Weather.ControlTemplates.Weather
{
    //todo async/await
    public partial class UserControl1 : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var spbId = "498817";
            var mscId = "524901";
            var erevanId = "616051";
            var erdenetId = "2031405";
            var uchalyId = "479704";
            var tashkentId = "1512569";
            var magnitogorskId = "532288";

            try
            {
                using (var wc = new WebClient())
                {
                    var data =
                        wc.DownloadData(
                            "http://api.openweathermap.org/data/2.5/group?lang=ru&id=+ " + spbId + "," + mscId + "," + erevanId +
                            "," + erdenetId + "," + uchalyId + "," + tashkentId + "," + magnitogorskId +
                            "&units=metric&appid=20a2e62715e21640afbebd96e0a5972d");

                    var jResult = JObject.Parse(Encoding.UTF8.GetString(data));

                    for (var i = 0; i < 7; i++)
                    {
                        var description = jResult["list"][i]["weather"][0]["description"].ToString();
                        var degrees = Math.Floor(Convert.ToDouble(jResult["list"][i]["main"]["temp"])) + "&deg;C";
                        if (i == 0)
                        {
                            spbWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            spbWeatherDescription.Text = description;
                            spbWeatherDegrees.Text = degrees;
                            spbIconDuplicat.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            spbDescriptionDuplicat.Text = description;
                            spbDegreesDuplicat.Text = degrees;
                        }
                        else if (i == 1)
                        {
                            mscWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            mscWeatherDescription.Text = description;
                            mscWeatherDegrees.Text = degrees;
                        }
                        else if (i == 2)
                        {
                            erevanWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            erevanWeatherDescription.Text = description;
                            erevanWeatherDegrees.Text = degrees;
                        }
                        else if (i == 3)
                        {
                            erdenetWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            erdenetWeatherDescription.Text = description;
                            erdenetWeatherGegrees.Text = degrees;
                        }
                        else if (i == 4)
                        {
                            uchalyWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            uchalyWeatherDescription.Text = description;
                            uchalyWeatherDegrees.Text = degrees;
                        }
                        else if (i == 5)
                        {
                            tashkentWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            tashkentWeatherDescription.Text = description;
                            tashkentWeatherDergrees.Text = degrees;
                        }
                        else if ( i == 6)
                        {
                            magnitogorskWeatherIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            magnitogorskWeatherDescription.Text = description;
                            magnitogorskWeatherDegrees.Text = degrees;
                        }
                    }
                }
            }
            catch (WebException ex)
            {
                spbDescriptionDuplicat.Text = ex.Message;
            }
            
        }
    }
}
