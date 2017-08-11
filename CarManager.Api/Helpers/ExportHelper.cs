using System;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;

using OfficeOpenXml;
using OfficeOpenXml.Style;
using CarManager.Shared.Models;
using CarManager.Services.Service.Planning;
using CarManager.Services.Service.State;

namespace CarManager.Api.Helpers
{
    public class ExportHelper
    {
        private readonly Color _red = Color.FromArgb(230, 43, 39);
        private readonly IPlanningService _planningService;
        private readonly IStateService _stateService;

        public ExportHelper(IPlanningService planningService, IStateService stateService)
        {
            _planningService = planningService;
            _stateService = stateService;
        }

        private void SetTemplate(ExcelWorksheet worksheet, bool isPlanning)
        {
            try
            {
                //var originalBitmap = new Bitmap(Server.MapPath("~/stadtuster.png"));
                //var image = new Bitmap(originalBitmap, 135, 50);
                //worksheet.HeaderFooter.OddHeader.InsertPicture(image, PictureAlignment.Left);
            }
            catch (ArgumentException e)
            {
                //TODO
            }
            if (isPlanning)
            {
                worksheet.HeaderFooter.OddHeader.RightAlignedText = "Fahrzeugplanung - Export";
                worksheet.Column(1).Width = 20;
                worksheet.Column(2).Width = 20;
                worksheet.Column(3).Width = 23;
                worksheet.Column(4).Width = 20;
            }
            else
            {
                worksheet.HeaderFooter.OddHeader.RightAlignedText = "Fahrzeugstatistik - Export";
                worksheet.Column(1).Width = 25;
                worksheet.Column(2).Width = 25;
                worksheet.Column(3).Width = 35;

            }
            worksheet.HeaderFooter.OddFooter.RightAlignedText = string.Format("{0} von {1}",
                ExcelHeaderFooter.PageNumber, ExcelHeaderFooter.NumberOfPages);

            worksheet.PrinterSettings.Orientation = eOrientation.Portrait;

            // Change the sheet view to show it in page layout mode
            worksheet.View.PageLayoutView = true;
        }

        /// <summary>
        ///     Create the Excel-File with all devices
        /// </summary>
        public FileInfo CreateSingleCarSheet(Statistic statistic)
        {
            bool isPlanning = false;

            var filename = "Auswertung_" + statistic.Car.Description + statistic.Car.Radio + "_" + DateTime.Now.ToString("d") + ".xlsx";


            if (string.IsNullOrWhiteSpace(statistic.Creator))
            {
                statistic.Creator = "Luca Marti";
            }
            var response = new FileInfo(filename);

            using (var package = new ExcelPackage(response))
            {
                var worksheet = package.Workbook.Worksheets.Add("Fahrzeugstatistik");

                SetTemplate(worksheet, isPlanning);

                var allEntities = _planningService.GetPlannedPlannings(statistic.StartDate, statistic.EndDate).Where(x => x.Car.Id == statistic.Car.Id).OrderByDescending(x => x.EndTime);

                var countPlannings = allEntities.Count();

                //Add the header informations
                //First row
                // COL / ROW

                worksheet.Cells[1, 1].Style.Font.Size = 18;
                worksheet.Cells[1, 1].Style.Font.Bold = true;
                worksheet.Cells[1, 1].Value = "Auswertung - " + statistic.Car.Description + " " + statistic.Car.Radio;
                worksheet.Cells[2, 1].Style.Font.Size = 14;
                worksheet.Cells[2, 1].Value = statistic.StartDate.ToString("dd.MM.yyyy") + " - " + statistic.EndDate.ToString("dd.MM.yyyy");
                worksheet.Cells[5, 1].Value = "Erstelldatum:";
                worksheet.Cells[5, 2].Value = DateTime.Now.ToString("dd.MM.yyyy H:mm");
                worksheet.Cells[6, 1].Value = "Ersteller:";
                worksheet.Cells[6, 2].Value = statistic.Creator;

                //Second row
                worksheet.Cells[8, 1].Style.Font.Bold = true;
                worksheet.Cells[8, 1].Value = "Anzahl Einträge:";
                worksheet.Cells[8, 2].Style.Font.Bold = true;
                worksheet.Cells[8, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                worksheet.Cells[8, 2].Value = countPlannings;

                var col = 9;
                foreach (var state in _stateService.GetAll())
                {
                    worksheet.Cells[col, 1].Value = state.Name + ":";
                    worksheet.Cells[col, 2].Style.HorizontalAlignment = ExcelHorizontalAlignment.Left;
                    worksheet.Cells[col, 2].Value = _planningService.GetCountPlannedPlanningsByState(allEntities, state.Name);
                    col++;
                }

                col = col + 2;
                var tableHeader = col;

                //Add the content-headers
                worksheet.Cells[tableHeader, 1].Value = "Startdatum";
                worksheet.Cells[tableHeader, 2].Value = "Enddatum";
                worksheet.Cells[tableHeader, 3].Value = "Status";

                foreach (var planning in allEntities)
                {
                    col++;
                    worksheet.Cells[col, 1].Value = planning.StartTime.ToString("dd.MM.yyyy");
                    worksheet.Cells[col, 2].Value = planning.EndTime.ToString("dd.MM.yyyy");
                    worksheet.Cells[col, 3].Value = planning.State.Name;
                }

                //Format the Header
                using (var range = worksheet.Cells[4, 1, 4, 3])
                {
                    range.Style.Border.Top.Style = ExcelBorderStyle.Medium;
                }
                var borderEnd = tableHeader - 2;
                using (var range = worksheet.Cells[borderEnd, 1, borderEnd, 3])
                {
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Medium;
                }

                // Format the List-Header 
                using (var range = worksheet.Cells[tableHeader, 1, tableHeader, 3])
                {
                    range.Style.Font.Bold = true;
                    range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(_red);
                    range.Style.Font.Color.SetColor(Color.White);
                    range.AutoFilter = true;
                }


                //Set property values
                package.Workbook.Properties.Subject = "Fahrzeugstatistik";
                package.Workbook.Properties.Title = "Fahrzeugstatistik";

                //Set extended property values
                package.Workbook.Properties.Company = "Verwaltungspolizei Stadtpolizei Uster";

                //this.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                //this.Response.AddHeader(
                //          "content-disposition",
                //          string.Format("attachment;  filename={0}", filename));
                //this.Response.BinaryWrite(package.GetAsByteArray());
            }

            return response;
        }

        /// <summary>
        ///     Create the Excel-File with all devices
        /// </summary>
        public FileInfo CreateOverviewSheet(DateTime startTime, DateTime endTime)
        {
            bool isPlanning = true;

            var filename = "Planung_" + DateTime.Now.ToString("d") + ".xlsx";

            var response = new FileInfo(filename);

            using (var package = new ExcelPackage(response))
            {
                var worksheet = package.Workbook.Worksheets.Add("Fahrzeugplanung");

                SetTemplate(worksheet, isPlanning);

                var allEntities = _planningService.GetPlannedPlannings(startTime, endTime).OrderByDescending(x => x.EndTime);

                //Add the header informations
                //First row
                // COL / ROW
                worksheet.Cells[1, 1].Style.Font.Size = 18;
                worksheet.Cells[1, 1].Style.Font.Bold = true;
                worksheet.Cells[1, 1].Value = "Fahrzeugplanung";
                worksheet.Cells[2, 1].Style.Font.Size = 14;
                worksheet.Cells[2, 1].Value = startTime.ToString("dd.MM.yyyy") + " - " + endTime.ToString("dd.MM.yyyy");
                worksheet.Cells[5, 1].Value = "Erstelldatum:";
                worksheet.Cells[5, 2].Value = DateTime.Now.ToString("dd.MM.yyyy HH:mm");
                worksheet.Cells[6, 1].Value = "Ersteller:";
                worksheet.Cells[6, 2].Value = "Luca Marti";

                var col = 7;

                col = col + 2;
                var tableHeader = col;

                //Add the content-headers
                worksheet.Cells[tableHeader, 1].Value = "Startdatum";
                worksheet.Cells[tableHeader, 2].Value = "Enddatum";
                worksheet.Cells[tableHeader, 3].Value = "Fahrzeug";
                worksheet.Cells[tableHeader, 4].Value = "Status";

                foreach (var planning in allEntities)
                {
                    col++;
                    worksheet.Cells[col, 1].Value = planning.StartTime.ToString("dd.MM.yyyy");
                    worksheet.Cells[col, 2].Value = planning.EndTime.ToString("dd.MM.yyyy");
                    worksheet.Cells[col, 3].Value = planning.Car.Description + " - " + planning.Car.Radio;
                    worksheet.Cells[col, 4].Value = planning.State.Name;
                }

                //Format the Header
                using (var range = worksheet.Cells[4, 1, 4, 4])
                {
                    range.Style.Border.Top.Style = ExcelBorderStyle.Medium;
                }
                var borderEnd = tableHeader - 2;
                using (var range = worksheet.Cells[borderEnd, 1, borderEnd, 4])
                {
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Medium;
                }

                // Format the List-Header 
                using (var range = worksheet.Cells[tableHeader, 1, tableHeader, 4])
                {
                    range.Style.Font.Bold = true;
                    range.Style.Fill.PatternType = ExcelFillStyle.Solid;
                    range.Style.Fill.BackgroundColor.SetColor(_red);
                    range.Style.Font.Color.SetColor(Color.White);
                    range.AutoFilter = true;
                }


                //Set property values
                package.Workbook.Properties.Subject = "Fahrzeugplanung";
                package.Workbook.Properties.Title = "Fahrzeugplanung";               

                //Set extended property values
                package.Workbook.Properties.Company = "Verwaltungspolizei Stadtpolizei Uster";

                //this.Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                //this.Response.AddHeader(
                //          "content-disposition",
                //          string.Format("attachment;  filename={0}", filename));
                //this.Response.BinaryWrite(package.GetAsByteArray());
            }

            return response;
        }

    }
}