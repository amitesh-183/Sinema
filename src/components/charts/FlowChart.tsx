import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

type DataPoint = {
  month: string;
  online: number;
  idle: number;
};

const data: DataPoint[] = [
  { month: "Jan", online: 10, idle: 10 },
  { month: "Feb", online: 16, idle: 10 },
  { month: "Mar", online: 24, idle: 20 },
  { month: "Apr", online: 29, idle: 11 },
  { month: "May", online: 23, idle: 8 },
  { month: "Jun", online: 12, idle: 14 },
  { month: "Jul", online: 20, idle: 9 },
  { month: "Aug", online: 22, idle: 12 },
  { month: "Sep", online: 20, idle: 10 },
  { month: "Oct", online: 20, idle: 14 },
  { month: "Nov", online: 28, idle: 10 },
  { month: "Dec", online: 25, idle: 20 },
];

const FlowChart = () => {
  useLayoutEffect(() => {
    const root = am5.Root.new("chartdiv");
    if (root._logo) {
      root._logo.dispose();
    }
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
      })
    );

    chart.set(
      "colors",
      am5.ColorSet.new(root, {
        step: 2,
        colors: [
          am5.color(0x73556e),
          am5.color(0x9fa1a6),
          am5.color(0xf2aa6b),
          am5.color(0xf28f6b),
          am5.color(0xa95a52),
          am5.color(0xe35b5d),
          am5.color(0xffa446),
        ],
      })
    );

    const cursor = chart.set(
      "cursor",
      am5xy.XYCursor.new(root, {
        behavior: "none",
      })
    );
    cursor.lineY.set("visible", false);

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: "month",
        startLocation: 0.5,
        endLocation: 0.5,
        renderer: am5xy.AxisRendererX.new(root, {
          minorGridEnabled: true,
          minGridDistance: 70,
        }),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    xAxis.data.setAll(data);

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    function createSeries(
      name: string,
      field: keyof DataPoint,
      color: am5.Color,
      strokeColor: am5.Color
    ) {
      const series = chart.series.push(
        am5xy.SmoothedXLineSeries.new(root, {
          name: name,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: field as string,
          categoryXField: "month",
          stacked: true,
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "[bold]{name}[/]\n{categoryX}: {valueY}",
          }),
        })
      );

      series.strokes.template.setAll({
        stroke: strokeColor,
        strokeWidth: 4,
        strokeOpacity: 1,
        shadowBlur: 2,
        shadowOffsetX: 2,
        shadowOffsetY: 2,
        shadowColor: am5.color(0x000000),
        shadowOpacity: 0.1,
      });

      series.fills.template.setAll({
        fillOpacity: 1,
        visible: true,
        fillGradient: am5.LinearGradient.new(root, {
          stops: [
            { color: color, offset: 0 },
            { color: am5.color(0xffffff), offset: 1 },
          ],
        }),
      });

      series.data.setAll(data);

      series.appear(1000);
    }

    createSeries("Online", "online", am5.color(0xa700ff), am5.color(0x8100ff)); // Purple-pinkish gradient for "Online"
    createSeries("Idle", "idle", am5.color(0xffcc80), am5.color(0xffb74d)); // Light orange gradient for "Idle"

    chart.appear(1000, 100);

    return () => {
      chart.dispose();
      root.dispose();
    };
  }, []);

  return (
    <div className="card-glass col-span-1 rounded-2xl px-4 py-6">
      <h1 className="mb-2 text-lg font-semibold">Watch Traffic</h1>
      <div id="chartdiv" className="h-[280px] w-full"></div>
    </div>
  );
};

export default FlowChart;
