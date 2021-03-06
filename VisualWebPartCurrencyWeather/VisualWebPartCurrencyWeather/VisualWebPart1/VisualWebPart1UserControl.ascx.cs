﻿using System;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using System.Text;
using System.Web.UI;
using Newtonsoft.Json.Linq;

namespace VisualWebPartCurrencyWeather.VisualWebPart1
{
    // this usercontrol deployed on main page of site
    public partial class VisualWebPart1UserControl : UserControl
    {
        private const string Connect = "Data Source= server-spbe; Initial Catalog=CurrencySP2013;"
                                                 + "Integrated Security=True";
        // for indicator-icon up, down(green/red)
        private enum DateCurrency
        {
            Today,
            Yesterday
        }

        private void ReadDataFromSql(string date, DateCurrency dateCurrency)
        {
            var rowIndex = 0;
            // usa, eur code
            var currencyMainPage = new[] {"R01235  ", "R01239"};
            foreach (var currencyCode in currencyMainPage)
            {
                var filterPrimKey = date + currencyCode.Trim();
                ReadOrderData(filterPrimKey, Connect, rowIndex, dateCurrency);
                rowIndex++;
            }
        }

        private void ReadOrderData(string filterPrimkey, string connectionString, int rowIndex, DateCurrency dateCurrency)
        {
            var queryString =
              "SELECT numcode, charcode, nominal, name, value FROM dbo.values_history inner join dbo.description on  dbo.description.id = dbo.values_history.id WHERE dbo.values_history.primkey ='" + filterPrimkey + "' ;";

            try
            {
                using (var connection =
                      new SqlConnection(connectionString))
                {
                    var command =
                        new SqlCommand(queryString, connection);
                    connection.Open();
                    var reader = command.ExecuteReader();
                    while (reader.Read())
                    {
                        if (dateCurrency == DateCurrency.Today)
                        {
                            WriteTodayCurrency(reader, rowIndex);
                        }
                        else
                        {
                            DiffTodayYesterdayCurrency(reader, rowIndex);
                        }

                    }
                    reader.Close();
                }
            }
            catch (Exception ex)
            {
                USDcurrency.Text = "";
                EURcurrency.Text = "";
                var log = string.Format("filterPrimkey: {0}, connectionString: {1}, rowIndex: {2}, dateCurrency: {3}",
                    filterPrimkey, connectionString, rowIndex, dateCurrency);
                USDflowCurrency.Text = log + " ex.Message: " + ex.Message;
            }
        }

        private void WriteTodayCurrency(IDataRecord record, int rowIndex)
        {
            if (rowIndex == 0)
            {
                USDcurrency.Text = record[4].ToString();
            }
            else if (rowIndex == 1)
            {
                EURcurrency.Text = record[4].ToString();
            }
        }

        private void DiffTodayYesterdayCurrency(IDataRecord record, int rowIndex)
        {
            if (rowIndex == 0)
            {
                var yesterdayUsdCurrency = Convert.ToDouble(record[4].ToString());
                var todayUsdCurrency = Convert.ToDouble(USDcurrency.Text);
                USDflowCurrency.Text = todayUsdCurrency - yesterdayUsdCurrency > 0 ? "up" : "down";
            }
            else if (rowIndex == 1)
            {
                var yesterdayEurCurrency = Convert.ToDouble(record[4].ToString());
                var todayEurCurrency = Convert.ToDouble(EURcurrency.Text);
                EURflowCurrency.Text = todayEurCurrency - yesterdayEurCurrency > 0 ? "up" : "down";
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {
            // block code for currency: USD, // order invoke important - bad code
            ReadDataFromSql(DateTime.Now.ToString("dd/MM/yyyy"), DateCurrency.Today);
            ReadDataFromSql(DateTime.Now.AddDays(-1).ToString("dd/MM/yyyy"), DateCurrency.Yesterday);

            // block code for weather
            var spbId = "498817";
            var mscId = "524901";
            var erevanId = "616051";
            var erdenetId = "2031405";
            var uchalyId = "479704";
            var tashkentId = "1512569";
            var magnitogorskId = "532288";
            var kentayId = "1522751";

            try
            {
                using (var wc = new WebClient())
                {
                    var data =
                        wc.DownloadData(
                            "http://api.openweathermap.org/data/2.5/group?lang=ru&id=+ " + spbId + "," + mscId + "," + erevanId +
                            "," + erdenetId + "," + uchalyId + "," + tashkentId + "," + magnitogorskId + "," + kentayId +
                            "&units=metric&appid=20a2e62715e21640afbebd96e0a5972d");

                    var jResult = JObject.Parse(Encoding.UTF8.GetString(data));

                    for (var i = 0; i < 8; i++)
                    {
                        var description = jResult["list"][i]["weather"][0]["description"].ToString();
                        var degrees = Math.Floor(Convert.ToDouble(jResult["list"][i]["main"]["temp"])) + "&deg;C";
                        if (i == 0)
                        {
                            spbIconDuplicat.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            spbDescriptionDuplicat.Text = description;
                            spbDegreesDuplicat.Text = degrees;
                        }
                        else if (i == 1)
                        {
                            mscIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            mscDescription.Text = description;
                            mscDegrees.Text = degrees;
                        }
                        else if (i == 2)
                        {
                            erevanIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            erevanDescription.Text = description;
                            erevanDegrees.Text = degrees;
                        }
                        else if (i == 3)
                        {
                            erdenetIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            erdenetDescription.Text = description;
                            erdenetGegrees.Text = degrees;
                        }
                        else if (i == 4)
                        {
                            uchalyIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            uchalyDescription.Text = description;
                            uchalyDegrees.Text = degrees;
                        }
                        else if (i == 5)
                        {
                            tashkentIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            tashkentDescription.Text = description;
                            tashkentDergrees.Text = degrees;
                        }
                        else if (i == 6)
                        {
                            magnitogorskIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            magnitogorskDescription.Text = description;
                            magnitogorskDegrees.Text = degrees;
                        }
                        else if (i == 7)
                        {
                            kentayIcon.Attributes.Add("class",
                                "wi wi-fw wi-owm-day-" + jResult["list"][i]["weather"][0]["id"]);
                            kentayDescription.Text = description;
                            kentayDegrees.Text = degrees;
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
