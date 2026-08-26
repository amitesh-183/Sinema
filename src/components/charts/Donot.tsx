import { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5/index";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

// Define the type for the chart data
type ChartData = {
  [year: string]: { sector: string; size: number }[];
};

const Donut = () => {
  useLayoutEffect(() => {
    /* Chart code */
    // Define data for each year
    const chartData: ChartData = {
      "2020": [
        { sector: "Facebook", size: 0.6 },
        { sector: "Instagram", size: 6.6 },
        { sector: "Direct", size: 23.2 },
      ],
      "2021": [
        { sector: "Facebook", size: 0.5 },
        { sector: "Instagram", size: 6.4 },
        { sector: "Direct", size: 22.4 },
      ],
      "2022": [
        { sector: "Facebook", size: 0.2 },
        { sector: "Instagram", size: 6.1 },
        { sector: "Direct", size: 20.9 },
      ],
      "2023": [
        { sector: "Facebook", size: 0.4 },
        { sector: "Instagram", size: 6.2 },
        { sector: "Direct", size: 21.4 },
      ],
      "2024": [
        { sector: "Facebook", size: 5.7 },
        { sector: "Instagram", size: 0.2 },
        { sector: "Direct", size: 20 },
      ],
    };

    // Create root element
    const root = am5.Root.new("chartdivee");

    if (root._logo) {
      root._logo.dispose();
    }
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        innerRadius: 90,
        layout: root.verticalLayout,
      })
    );

    // Create series
    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "size",
        categoryField: "sector",
      })
    );

    // Set initial data
    series.data.setAll(chartData["2020"]);

    // Play initial series animation
    series.appear(1000, 100);

    // Add label
    const label = root.tooltipContainer.children.push(
      am5.Label.new(root, {
        x: am5.p50,
        y: am5.p50,
        centerX: am5.p50,
        centerY: am5.p50,
        fill: am5.color(0x000000),
        fontSize: 50,
      })
    );

    // Animate chart data
    let currentYear = 2020;
    function getCurrentData(): { sector: string; size: number }[] {
      const data = chartData[currentYear.toString()];
      currentYear++;
      if (currentYear > 2024) currentYear = 2020;
      return data;
    }

    series.labels.template.set("visible", false);
    series.ticks.template.set("visible", false);

    function loop() {
      label.set("text", currentYear.toString());
      const data = getCurrentData();
      series.data.setAll(data);
      chart.setTimeout(loop, 4000);
    }

    loop();

    return () => {
      root.dispose();
    };
  }, []);

  return (
    <div className="card-glass col-span-1 rounded-2xl px-4 py-6">
      <h1 className="mb-2 text-lg font-semibold">Traffic</h1>
      <div id="chartdivee" className="h-[250px] w-full sm:h-[300px]"></div>
    </div>
  );
};

export default Donut;
