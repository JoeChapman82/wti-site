!function(){var e=document.getElementById("dashboardData").innerText,t=(e=JSON.parse(e)).monthCounts,n=e.classCounts,a=e.groupCounts,s=e.zoneCounts,r=Object.values(t).map((function(e){return e.date})),i=Object.values(t).map((function(e){return e.count})),l=Object.keys(n),o=Object.values(n),u=Object.keys(a),c=Object.values(a),b=Object.keys(s),h=Object.values(s),d={labels:r.reverse(),series:[i.reverse()]};new Chartist.Line("#dashboardLineChart",d,{showArea:!0,classNames:{area:"wti-area"},axisY:{onlyInteger:!0}},[["screen and (min-width: 641px) and (max-width: 1024px)",{showPoint:!1,axisX:{labelInterpolationFnc:function(e){return e.slice(0,3)}}}],["screen and (max-width: 640px)",{showLine:!1,axisX:{labelInterpolationFnc:function(e){return e[0]}}}]]),new Chartist.Bar("#dashboardBarChart",{labels:l,series:[o]},{classNames:{bar:"wti-bar"}}),new Chartist.Pie("#dashboardPieChart",{labels:u,series:c},{labelInterpolationFnc:function(e,t){return Math.round(c[t]/c.reduce((function(e,t){return e+t}))*100)+"%"},startAngle:270,labelOffset:15,showLabel:!0,plugins:[Chartist.plugins.legend()]}),new Chartist.Pie("#dashboardPieChart2",{labels:b,series:h},{labelInterpolationFnc:function(e,t){return Math.round(h[t]/h.reduce((function(e,t){return e+t}))*100)+"%"},startAngle:270,showLabel:!0,labelOffset:15,plugins:[Chartist.plugins.legend()]})}();