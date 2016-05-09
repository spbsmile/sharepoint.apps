using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace SqlCurrencyConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var daysInterval = 150;

            var dateForButton = DateTime.Now.AddDays(-1);

            string str = "Data Source= DEVSP; Initial Catalog=CurrencySP2013;"
            + "Integrated Security=True";
            // ReadOrderData(str);

            //using (var db = new CurrencySP2013Entities())
            //{
            //    var dateStr = DateTime.Now.ToString("dd/MM/yyyy");

            //    foreach (var valitesCode in GetAllOurIdOfCurrency(db))
            //    {
            //        var filterPrimKey = dateStr + valitesCode.Trim();
            //        ReadOrderData(filterPrimKey, str);
            //    }
            //}

            using (var db = new CurrencySP2013Entities())
            {
                var date = DateTime.Now;//.AddDays(-1);
                var dateStr = date.ToString("dd/MM/yyyy");

                var weburl = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + dateStr;
                var rdr = new XmlTextReader(weburl);
                var xd = XDocument.Load(rdr);

                //FullWriteDBDescription(db, xd);
                WriteValuesToDB(db, xd, dateStr);
                db.SaveChanges();
            }

           

            Console.WriteLine("end");
            Console.ReadKey();
        }

        private static void ReadOrderData(string filterPrimkey, string connectionString)
        {
            //select name, age, sex from employee inner join department on employee.departmentId = department.id

            //var queryString =
            //  "SELECT primkey, value, nominal, name FROM dbo.values_history inner join dbo.description on  dbo.description.id = dbo.values_history.id WHERE dbo.values_history.primkey ='" + "04.05.2016R01335" + "' ;";

            Console.WriteLine(filterPrimkey);

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
                    ReadSingleRow((IDataRecord)reader);
                }

                // Call Close when done reading.
                reader.Close();
            }
        }

        private static void ReadSingleRow(IDataRecord record)
        {
            Console.WriteLine("{0}, {1}, {2}, {3}", record[0], record[1], record[2], record[3]);
        }

        static void WriteValuesToDB(CurrencySP2013Entities db, XDocument xDocument, string date)
        {
            foreach (var valitesCode in GetAllOurIdOfCurrency(db))
            {
                var valute =
                    from el in xDocument.Root.Elements("Valute")
                    where el.Attribute("ID").Value == valitesCode.Trim()
                    select new
                    {
                        value = (string) el.Elements().ElementAt(4)
                    };

                Console.WriteLine("after set valute");
                //
               // int numcode = 0;
                var value = "";
                foreach (var element in valute)
                {
                    value = element.value;
                }

                var values_history = new values_history()
                {
                    primkey = date + valitesCode.Trim(),
                    id = valitesCode,
                    value = Convert.ToDouble(value)
                };

                db.values_history.Add(values_history);
            }
        }

        //static object FilterCurrencyOnID(XDocument xDocumentCurrency, string id)
        //{
        //    var valute =
        //           from el in xDocumentCurrency.Root.Elements("Valute")
        //           where el.Attribute("ID").Value == id.Trim()
        //           select new
        //           {
        //               numCode = (string)el.Elements().ElementAt(0),
        //               charCode = (string)el.Elements().ElementAt(1),
        //               nominal = (int)el.Elements().ElementAt(2),
        //               name = (string)el.Elements().ElementAt(3),
        //               value = (string)el.Elements().ElementAt(4)
        //           };
        //    return valute;
        //}

        static IEnumerable<string> GetAllOurIdOfCurrency(CurrencySP2013Entities db)
        {
            return db.description.Select(description => description.id).ToList();
        }

        static void FullWriteDBDescription(CurrencySP2013Entities db, XDocument xDocument)
        {
            foreach (var valitesCode in GetAllOurIdOfCurrency(db))
            {
                var valute =
                    from el in xDocument.Root.Elements("Valute")
                    where el.Attribute("ID").Value == valitesCode.Trim()
                    select new
                    {
                        numCode = (string)el.Elements().ElementAt(0),
                        charCode = (string)el.Elements().ElementAt(1),
                        nominal = (int)el.Elements().ElementAt(2),
                        name = (string)el.Elements().ElementAt(3),
                    };
                //
                var item = db.description.First(a => a.id == valitesCode);
                foreach (var element in valute)
                {
                    item.charcode = element.charCode;
                    item.numcode = element.numCode;
                    item.name = element.name;
                    item.nominal = element.nominal;
                }
            }
        }
    }
}
