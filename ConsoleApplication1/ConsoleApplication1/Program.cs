using System;
using System.Linq;
using System.Xml;
using System.Xml.Linq;

namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            // save in db
            string[] valitesCodes =
            {
                "R01010",
                "R01020A",
                "R01035",
                "R01060",
                "R01100",
                "R01115",
                "R01135",
                "R01215",
                "R01239",
                "R01270",
                "R01335",
                "R01350",
                "R01370",
                "R01375",
                "R01720",
                "R01589",
                "R01625",
                "R01665A",
                "R01700J",
                "R01717"
            };

            var daysInterval = 150;

            var dateForButton = DateTime.Now.AddDays(-1);

            using (var db = new currencyEntities())
            {
                var date = DateTime.Now.ToString("dd/MM/yyyy");

                Console.WriteLine();

                var weburl = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=" + date;

                var rdr = new XmlTextReader(weburl);
                var xd = XDocument.Load(rdr);

                foreach (var valitesCode in valitesCodes)
                {
                    var valute =
                        from el in xd.Root.Elements("Valute")
                        where (string)el.Attribute("ID") == valitesCode
                        select new
                        {
                            numCode = (string)el.Elements().ElementAt(0),
                            charCode = (string)el.Elements().ElementAt(1),
                            nominal = (string)el.Elements().ElementAt(2),
                            name = (string)el.Elements().ElementAt(3),
                            value = (string)el.Elements().ElementAt(4)
                        };

                    foreach (var element in valute)
                    {
                        Console.WriteLine(element.numCode);
                        Console.WriteLine(element.charCode);
                        Console.WriteLine(element.nominal);
                        Console.WriteLine(element.name);
                        Console.WriteLine(element.value);
                    }
                }

               


                Console.ReadKey();

                //var test_table = new test_table
                //{
                //    id = 2,
                //    name = "insert value"
                //};

                //db.test_table.Add(test_table);
                //db.SaveChanges();

                //Console.WriteLine(db.test_table.First().name);
                //Console.WriteLine(jsonText);
                //Console.ReadLine();
            }
        }
    }
}
