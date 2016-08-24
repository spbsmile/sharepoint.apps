using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace SqlCurrencyConsole
{
    class Program
    {
        static void Main(string[] args)
        {
            var daysInterval = 3;

            using (var db = new CurrencySP2013Entities())
            {
                for (var i = daysInterval; i >= 0; i--)
                {
                    var dateStr = DateTime.Now.AddDays(-i).ToString("dd/MM/yyyy");

                    var weburl = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + dateStr;
                    var rdr = new XmlTextReader(weburl);
                    var xd = XDocument.Load(rdr);

                    WriteValuesToDB(db, xd, dateStr);
                }
                db.SaveChanges();
            }
        }

        static void WriteValuesToDB(CurrencySP2013Entities db, XDocument xDocument, string date)
        {
            foreach (var valitesCode in GetAllOurIdOfCurrency(db))
            {
                if (valitesCode.Trim() == "R01239")
                {
                    var sd = "";
                }

                var valute =
                    from el in xDocument.Root.Elements("Valute")
                    where el.Attribute("ID").Value == valitesCode.Trim()
                    select new
                    {
                        value = (string) el.Elements().ElementAt(4)
                    };

                var value = "";
                foreach (var element in valute)
                {
                    value = element.value;
                }

                if (string.IsNullOrEmpty(value))
                {
                    continue;
                }

                var values_history = new values_history()
                {
                    primkey = date + valitesCode.Trim(),
                    id = valitesCode,
                    value = Convert.ToDouble(value)
                };
                if (!db.values_history.Any(item => item.primkey == values_history.primkey))
                {
                    db.values_history.Add(values_history);
                }
            }
        }

        static IEnumerable<string> GetAllOurIdOfCurrency(CurrencySP2013Entities db)
        {
            return db.description.Select(description => description.id).ToList();
        }
    }

    public static class Utils
    {
        public static bool IsAny<T>(this IEnumerable<T> data)
        {
            return data != null && data.Any();
        }
    }

}
