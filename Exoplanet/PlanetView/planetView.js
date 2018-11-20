var PlanetSVG
var PlanetViewG
var PlanetViewWidth
var PlanetViewHeight
function initPlanetMap()
{
    PlanetViewWidth=800
    PlanetViewHeight=600
     PlanetSVG = d3.select("#viewPlanetDiv").append("svg")
    .attr("width", "100%").attr("height", "100%")
    .attr("id", "planetSVG")
    .attr("fill", "none")
    .attr("viewBox", "0 0 "+PlanetViewWidth+" "+PlanetViewHeight)

     PlanetViewG=PlanetSVG.append("svg")
      .attr("id","planetViewG")


    beginPlanetMap()








}
var PlanetProjection
var PlanetViewMap
var PlanetView
var PlanetProjection
var PlanetGrid
var PlanetOutline
var PlanetAtmos

var StopPlanetZoom=false
function beginPlanetMap()
{

    if(!PlanetProjection)
    {

        StopPlanetZoom = false
        //---star view ditto celestial view

         PlanetView = {r:[0, 0, 0], k: 200};
        //---rotate and scale this to match celestial---
        PlanetProjection = d3.geo.orthographic().rotate([0, 0, 0]).translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([140])
        PlanetViewMap = d3.geo.path().projection(PlanetProjection);
        //projOutline = d3.geo.mollweide().translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([140]); //projected non moving outline


        //---creates a 'shadow' grid identical to celestial---
        var graticule = d3.geo.graticule().minorStep([8, 4]);
         //PlanetOutline = d3.geo.path().projection(projOutline)
       //PlanetAtmos=PlanetViewG.append("path").datum(graticule.outline).attr("id", "planetOutline").attr("stroke","lime").attr("stroke-width",4).attr("d", PlanetViewMap);

        PlanetGrid=PlanetViewG.append("path").datum(graticule).attr("id","planetGrid").attr("filter", "url(#drop-shadow)").attr("fill", "none").attr("stroke", "black").attr("stroke-width", ".5").attr("d", PlanetViewMap);

        //---restructure zoom for higher scale performance, PAN in lieu of rotation---
        PlanetZoom = d3.behavior.zoom().translate(PlanetProjection.translate()).scale(PlanetProjection.scale()).size([PlanetViewWidth, PlanetViewHeight]).scaleExtent([1, 100000]).on("zoom", planetRedraw);
        PlanetSVG.call(PlanetZoom).on("dblclick.zoom", null)
           // PlanetAtmos.attr("fill", "none")
           // PlanetAtmos.attr("stroke", "#191970")
          //  PlanetAtmos.attr("stroke-width", "6")

        PlanetView.k = 200
        PlanetView.r = [0,0,0]
        PlanetProjection.scale(PlanetView.k)
        PlanetProjection.rotate(PlanetView.r)
        PlanetProjection.translate([PlanetViewWidth/2, PlanetViewHeight/2])
        PlanetZoom.scale(PlanetView.k)
    }
    else
    {
        PlanetProjection.rotate([PlanetView.r[0], PlanetView.r[1], PlanetView.r[2]]).translate([PlanetViewWidth/2, PlanetViewHeight/2])
        PlanetProjection.scale([PlanetView.k])

    }

}
var PrevPlanetTransX=0
var PrevPlanetTransY=0
var PrevPlanetScale=200


function planetRedraw()
{
    if(StopPlanetZoom==false)
    {
        if(d3.event )
        {
            starG.style.cursor = "default"
            PlanetProjection.translate(d3.event.translate).rotate(PlanetProjection.rotate()).scale(d3.event.scale);

        }
        else
        {

            StarProjection.translate([PrevPlanetTransX, PrevPlanetTransY]).rotate(PlanetProjection.rotate()).scale(PrevPlanetScale);
            PlanetZoom.translate([PrevPlanetTransX, PrevPlanetTransY])
            PlanetZoom.scale(PrevPlanetScale)

        }

        //PlanetProjection.rotate(PlanetProjection.rotate()).scale(PlanetProjection.scale());


        PlanetView =
        {
        r: PlanetProjection.rotate(), k: PlanetProjection.scale()
        };

        PlanetGrid.attr("d", PlanetViewMap);
        d3.select("#planetOutline").attr("d", PlanetViewMap);

        if(d3.event)
        {
            PrevPlanetScale = d3.event.scale
            PrevPlanetTransX = d3.event.translate[0]
            PrevPlanetTransY = d3.event.translate[1]
        }

    }

}