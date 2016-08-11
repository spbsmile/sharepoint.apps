using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.UI;

namespace SharePointCurrencyEmpty.VisualWebCurr
{
    public partial class VisualWebCurrUserControl : UserControl
    {
        private const string Connect = "Data Source= server-spbe; Initial Catalog=CurrencySP2013;"
                                                + "Integrated Security=True";

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                ReadDataFromSql(DateTime.Now.ToString("dd/MM/yyyy"));
            }
        }

        protected void BtnDatechange_Click(object sender, EventArgs e)
        {
            ReadDataFromSql(dtDatePicker.Text.Replace(@"\", "."));
        }

        private void ReadDataFromSql(string date)
        {
            using (var db = new CurrencySP2013Entities())
            {
                var rowIndex = 0;
                foreach (var valitesCode in GetAllOurIdOfCurrency(db))
                {
                    var filterPrimKey = date + valitesCode.Trim();
                    ReadOrderData(filterPrimKey, Connect, rowIndex);
                    rowIndex++;
                }
            }
        }

        static IEnumerable<string> GetAllOurIdOfCurrency(CurrencySP2013Entities db)
        {
            return db.description.Select(description => description.id).ToList();
        }

        private void ReadOrderData(string filterPrimkey, string connectionString, int rowIndex)
        {
            var queryString =
              "SELECT numcode, charcode, nominal, name, value FROM dbo.values_history inner join dbo.description on  dbo.description.id = dbo.values_history.id WHERE dbo.values_history.primkey ='" + filterPrimkey + "' ;";

            using (var connection =
                       new SqlConnection(connectionString))
            {
                var command =
                    new SqlCommand(queryString, connection);
                connection.Open();

                var reader = command.ExecuteReader();

                // Call Read before accessing data.
                while (reader.Read())
                {
                    ReadSingleRow((IDataRecord)reader, rowIndex);
                }

                // Call Close when done reading.
                reader.Close();
            }
        }

        private void ReadSingleRow(IDataRecord record, int rowIndex)
        {
            if (rowIndex == 1)
            {
                numCode1.Text = record[0].ToString();
                charCode1.Text = record[1].ToString();
                nominal1.Text = record[2].ToString();
                name1.Text = record[3].ToString();
                value1.Text = "";
                value1.Text = record[4].ToString();
            }
            else if (rowIndex == 2)
            {
                numCode2.Text = record[0].ToString();
                charCode2.Text = record[1].ToString();
                nominal3.Text = record[2].ToString();
                name2.Text = record[3].ToString();
                value2.Text = record[4].ToString();
            }
            else if (rowIndex == 3)
            {
                numCode3.Text = record[0].ToString();
                charCode3.Text = record[1].ToString();
                nominal3.Text = record[2].ToString();
                name3.Text = record[3].ToString();
                value3.Text = record[4].ToString();
            }
            else if (rowIndex == 4)
            {
                numCode4.Text = record[0].ToString();
                charCode4.Text = record[1].ToString();
                nominal4.Text = record[2].ToString();
                name4.Text = record[3].ToString();
                value4.Text = record[4].ToString();
            }
            else if (rowIndex == 5)
            {
                numCode5.Text = record[0].ToString();
                charCode5.Text = record[1].ToString();
                nominal5.Text = record[2].ToString();
                name5.Text = record[3].ToString();
                value5.Text = record[4].ToString();
            }
            else if (rowIndex == 6)
            {
                numCode6.Text = record[0].ToString();
                charCode6.Text = record[1].ToString();
                nominal6.Text = record[2].ToString();
                name6.Text = record[3].ToString();
                value6.Text = record[4].ToString();
            }
            else if (rowIndex == 7)
            {
                numCode7.Text = record[0].ToString();
                charCode7.Text = record[1].ToString();
                nominal7.Text = record[2].ToString();
                name7.Text = record[3].ToString();
                value7.Text = record[4].ToString();
            }
            else if (rowIndex == 8)
            {
                numCode8.Text = record[0].ToString();
                charCode8.Text = record[1].ToString();
                nominal8.Text = record[2].ToString();
                name8.Text = record[3].ToString();
                value8.Text = record[4].ToString();
            }
            else if (rowIndex == 9)
            {
                numCode9.Text = record[0].ToString();
                charCode9.Text = record[1].ToString();
                nominal9.Text = record[2].ToString();
                name9.Text = record[3].ToString();
                value9.Text = record[4].ToString();
            }
            else if (rowIndex == 10)
            {
                numCode10.Text = record[0].ToString();
                charCode10.Text = record[1].ToString();
                nominal10.Text = record[2].ToString();
                name10.Text = record[3].ToString();
                value10.Text = record[4].ToString();
            }
            else if (rowIndex == 11)
            {
                numCode11.Text = record[0].ToString();
                charCode11.Text = record[1].ToString();
                nominal11.Text = record[2].ToString();
                name11.Text = record[3].ToString();
                value11.Text = record[4].ToString();
            }
            else if (rowIndex == 12)
            {
                numCode12.Text = record[0].ToString();
                charCode12.Text = record[1].ToString();
                nominal12.Text = record[2].ToString();
                name12.Text = record[3].ToString();
                value12.Text = record[4].ToString();
            }
            else if (rowIndex == 13)
            {
                numCode13.Text = record[0].ToString();
                charCode13.Text = record[1].ToString();
                nominal13.Text = record[2].ToString();
                name13.Text = record[3].ToString();
                value13.Text = record[4].ToString();
            }
            else if (rowIndex == 14)
            {
                numCode14.Text = record[0].ToString();
                charCode14.Text = record[1].ToString();
                nominal14.Text = record[2].ToString();
                name14.Text = record[3].ToString();
                value14.Text = record[4].ToString();
            }
            else if (rowIndex == 15)
            {
                numCode15.Text = record[0].ToString();
                charCode15.Text = record[1].ToString();
                nominal15.Text = record[2].ToString();
                name15.Text = record[3].ToString();
                value15.Text = record[4].ToString();
            }
            else if (rowIndex == 16)
            {
                numCode16.Text = record[0].ToString();
                charCode16.Text = record[1].ToString();
                nominal16.Text = record[2].ToString();
                name16.Text = record[3].ToString();
                value16.Text = record[4].ToString();
            }
            else if (rowIndex == 17)
            {
                numCode17.Text = record[0].ToString();
                charCode17.Text = record[1].ToString();
                nominal17.Text = record[2].ToString();
                name17.Text = record[3].ToString();
                value17.Text = record[4].ToString();
            }
            else if (rowIndex == 18)
            {
                numCode18.Text = record[0].ToString();
                charCode18.Text = record[1].ToString();
                nominal18.Text = record[2].ToString();
                name18.Text = record[3].ToString();
                value18.Text = record[4].ToString();
            }
            else if (rowIndex == 19)
            {
                numCode19.Text = record[0].ToString();
                charCode19.Text = record[1].ToString();
                nominal19.Text = record[2].ToString();
                name19.Text = record[3].ToString();
                value19.Text = record[4].ToString();
            }
            else if (rowIndex == 20)
            {
                numCode20.Text = record[0].ToString();
                charCode20.Text = record[1].ToString();
                nominal20.Text = record[2].ToString();
                name20.Text = record[3].ToString();
                value20.Text = record[4].ToString();
            }
            else if (rowIndex == 21)
            {
                numCode21.Text = record[0].ToString();
                charCode21.Text = record[1].ToString();
                nominal21.Text = record[2].ToString();
                name21.Text = record[3].ToString();
                value21.Text = record[4].ToString();
            }
            else if (rowIndex == 22)
            {
                numCode22.Text = record[0].ToString();
                charCode22.Text = record[1].ToString();
                nominal22.Text = record[2].ToString();
                name22.Text = record[3].ToString();
                value22.Text = record[4].ToString();
            }
            else if (rowIndex == 23)
            {
                numCode23.Text = record[0].ToString();
                charCode23.Text = record[1].ToString();
                nominal23.Text = record[2].ToString();
                name23.Text = record[3].ToString();
                value23.Text = record[4].ToString();
            }
            else if (rowIndex == 24)
            {
                numCode24.Text = record[0].ToString();
                charCode24.Text = record[1].ToString();
                nominal24.Text = record[2].ToString();
                name24.Text = record[3].ToString();
                value24.Text = record[4].ToString();
            }
            else if (rowIndex == 25)
            {
                numCode25.Text = record[0].ToString();
                charCode25.Text = record[1].ToString();
                nominal25.Text = record[2].ToString();
                name25.Text = record[3].ToString();
                value25.Text = record[4].ToString();
            }
            else if (rowIndex == 26)
            {
                numCode26.Text = record[0].ToString();
                charCode26.Text = record[1].ToString();
                nominal26.Text = record[2].ToString();
                name26.Text = record[3].ToString();
                value26.Text = record[4].ToString();
            }
        }
    }
}
