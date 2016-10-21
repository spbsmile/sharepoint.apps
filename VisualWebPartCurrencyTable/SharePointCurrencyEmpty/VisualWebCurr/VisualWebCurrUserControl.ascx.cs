using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace SharePointCurrencyEmpty.VisualWebCurr
{
    // this user control for page currency
    // this control read data from db CurrencySP2013, write data by console app: ConsoleSqlCurrency
    public partial class VisualWebCurrUserControl : UserControl
    {
        // entiry framework with sp2013 no default work, you need in web.config of sp2013 path data connect entiry framework
        private const string Connect = "Data Source= server-spbe; Initial Catalog=CurrencySP2013;"
                                                + "Integrated Security=True";
        // handler on load page
        protected void Page_Load(object sender, EventArgs e)
        {
            // this aps checker on no reload page
            if (!IsPostBack)
            {
                dtDatePicker.Text = DateTime.Now.ToString("dd/MM/yyyy");
                ReadDataFromSql(DateTime.Now.ToString("dd/MM/yyyy"));
            }
        }

        // click on change date of currency
        protected void BtnDatechange_Click(object sender, EventArgs e)
        {
            ReadDataFromSql(dtDatePicker.Text.Replace(@"\", "."));
        }

        private void ReadDataFromSql(string date)
        {
            var rowIndex = 0;

            foreach (var valitesCode in GetAllOurIdOfCurrency())
            {
                // in datebase primaty key is: date + valitesCode. see db 
                var filterPrimKey = date + valitesCode.Trim();
                ReadOrderData(filterPrimKey, Connect, rowIndex);
                rowIndex++;
            }
        }

        static IEnumerable<string> GetAllOurIdOfCurrency()
        {
            return new[]
            {
                "R01010    ", "R01020A   ", "R01035    ", "R01060    ", "R01090    ", "R01100    ", "R01115    ",
                "R01135    ", "R01215    ",
                "R01235    ", "R01239    ", "R01270    "
                , "R01335    ", "R01350    ", "R01370    ", "R01375    ", "R01500    ", "R01589    ", "R01625    ",
                "R01670    "
                , "R01700J    "
                , "R01717    "
                , "R01720    "
                , "R01810    "
                , "R01815    "
                , "R01820    "
            };
            //return db.description.Select(description => description.id).ToList();
        }

        private void ReadOrderData(string filterPrimkey, string connectionString, int rowIndex)
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
                        WriteCurrency(reader, rowIndex);
                    }
                    reader.Close();
                }
            }
            catch (Exception ex)
            {
                Log.Text = ex.Message;
            }
        }

        private void DisableEmptyRow(string nameCode, Label numCode, Label charCode, Label nominal, Label name, Label value)
        {
            if (string.IsNullOrEmpty(nameCode))
            {
                numCode.Attributes.Add("style", "display:none");
                charCode.Attributes.Add("style", "display:none");
                nominal.Attributes.Add("style", "display:none");
                name.Attributes.Add("style", "display:none");
                value.Attributes.Add("style", "display:none");
            }
        }

        // todo refactoring. create dynamic asp tabel, or create one label and append to this html rows
        private void WriteCurrency(IDataRecord record, int rowIndex)
        {
            if (rowIndex == 1)
            {
                DisableEmptyRow(record[0].ToString(), numCode1, charCode1, nominal1, name1, value1);
                numCode1.Text = record[0].ToString();
                charCode1.Text = record[1].ToString();
                nominal1.Text = record[2].ToString();
                name1.Text = record[3].ToString();                
                value1.Text = record[4].ToString();
            }
            else if (rowIndex == 2)
            {
                numCode2.Text = record[0].ToString();
                charCode2.Text = record[1].ToString();
                nominal2.Text = record[2].ToString();
                name2.Text = record[3].ToString();
                value2.Text = record[4].ToString();
            }
            else if (rowIndex == 3)
            {
                DisableEmptyRow(record[0].ToString(), numCode3, charCode3, nominal3, name3, value3);
                numCode3.Text = record[0].ToString();
                charCode3.Text = record[1].ToString();
                nominal3.Text = record[2].ToString();
                name3.Text = record[3].ToString();
                value3.Text = record[4].ToString();
            }
            else if (rowIndex == 4)
            {
                DisableEmptyRow(record[0].ToString(), numCode4, charCode4, nominal4, name4, value4);
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
                DisableEmptyRow(record[0].ToString(), numCode25, charCode25, nominal25, name25, value25);
                numCode25.Text = record[0].ToString();
                charCode25.Text = record[1].ToString();
                nominal25.Text = record[2].ToString();
                name25.Text = record[3].ToString();
                value25.Text = record[4].ToString();
            }
            else if (rowIndex == 26)
            {
                DisableEmptyRow(record[0].ToString(), numCode26, charCode26, nominal26, name26, value26);
                numCode26.Text = record[0].ToString();
                charCode26.Text = record[1].ToString();
                nominal26.Text = record[2].ToString();
                name26.Text = record[3].ToString();
                value26.Text = record[4].ToString();
            }
        }
    }
}
