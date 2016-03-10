using System;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Web.UI;
using System.Xml;
using System.Xml.Linq;

namespace Weather.ControlTemplates.Weather
{
    public partial class UserControl1 : UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            //МОСКВА
            //УЧАЛЫ
            //ЕРЕВАН
            //ЭРДЕНЕТ
            //ТАШКЕНТ
            //by ip
            var weburl =
                 "http://api.openweathermap.org/data/2.5/weather?lang=ru&q=Saint%20Petersburg&appid=44db6a862fba0b067b1930da0d769e98&mode=xml";

            var rdr = new XmlTextReader(weburl);
            var xd = XDocument.Load(rdr);

            var nodeWeather = from c in xd.Descendants("weather") select c;
            foreach (var xAttribute in nodeWeather.Attributes())
            {
                if (xAttribute.Name == "value")
                {
                    weatherDiscription.Text = xAttribute.Value;
                }else if (xAttribute.Name == "number")
                {
                    i.Attributes.Add("class", "wi wi-fw wi-owm-day-" + xAttribute.Value);
                }
            }

            var nodeTemperature = from c in xd.Descendants("temperature") select c;
            foreach (var xAttribute in nodeTemperature.Attributes())
            {
                if (xAttribute.Name == "value")
                {
                    float f;
                    float.TryParse(xAttribute.Value, NumberStyles.Any, new CultureInfo("en-US"), out f);
                    var value = Math.Round(f - 273.16);
                    degValue.Text = value > 0 ? "+" + value + "&deg;C" : value + "&deg;C";
                }
            }
        }
    }
}
