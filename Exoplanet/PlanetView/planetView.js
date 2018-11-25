var PlanetSVG
var PlanetViewG
var PlanetViewWidth
var PlanetViewHeight
var DistanceDot
var DistancePath
function initPlanetMap()
{
    PlanetViewWidth=800
    PlanetViewHeight=600
     PlanetSVG = d3.select("#viewPlanetDiv").append("svg")
    .attr("width", "100%").attr("height", "600")
    .attr("id", "planetSVG")
    .attr("fill", "none")
    .attr("viewBox", "0 0 "+PlanetViewWidth+" "+PlanetViewHeight)

    var defs = PlanetSVG.append("defs")
    defs.append("marker")
    .attr("id", "distanceArrow")
    .attr("viewBox", "0 0 8000 8000")
    .attr("vector-effect", "non-scaling-stroke")
    .attr("refX", "250")
    .attr("refY", "150")
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", "300")
    .attr("markerHeight", "300")
    .attr("orient", "auto")
    .attr("fill", "violet")
    .attr("stroke-linejoin", "bevel")
    .append("path")
    .attr("d", "M2 59,293 148,1 243,121 151,Z")
    .attr("stroke", "violet")

     PlanetViewG=PlanetSVG.append("svg")
      .attr("id","planetViewG")
      //---measure distange---
    DistanceDot = PlanetSVG.append("circle")
    .attr("id", "distanceDot")
    .attr("stroke", "none")
    .attr("fill", "violet")
    .attr("r", "5")
    .attr("pointer-events", "none")
    .style("display", "none")

    DistancePath = PlanetSVG.append("path")
    .attr("id", "distancePath")
    .attr("stroke", "violet")
    .attr("stroke-width", "2")
    .attr("pointer-events", "none")
    .attr("marker-end", "url(#distanceArrow)")
    .style("display", "none")


    beginPlanetMap()








}
var PlanetProjection
var PlanetViewMap
var PlanetView
var PlanetProjection
var PlanetGrid
var PlanetOutline
var PlanetAtmos
var PlanetComp
var PlanetScale=200

var StopPlanetZoom=false
function beginPlanetMap()
{

    if(!PlanetProjection)
    {
        startPlanetCursorLoc()
        StopPlanetZoom = false
        //---star view ditto celestial view

         PlanetView = {r:[0, 0, 0], k: 250};
        //---rotate and scale this to match celestial---
        PlanetProjection = d3.geo.orthographic().rotate([0, 0, 0]).translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([250])
        PlanetViewMap = d3.geo.path().projection(PlanetProjection);
        //projOutline = d3.geo.mollweide().translate([PlanetViewWidth/2, PlanetViewHeight/2]).scale([140]); //projected non moving outline


        //---creates a 'shadow' grid identical to celestial---
        var graticule = d3.geo.graticule().minorStep([8, 4]);
         //PlanetOutline = d3.geo.path().projection(projOutline)
       //PlanetAtmos=PlanetViewG.append("path").datum(graticule.outline).attr("id", "planetOutline").attr("stroke","lime").attr("stroke-width",4).attr("d", PlanetViewMap);

        PlanetGrid=PlanetViewG.append("path").datum(graticule).attr("id","planetGrid").attr("fill", "none").attr("stroke", "black").attr("stroke-width", ".5").attr("d", PlanetViewMap);
   var bb=planetGrid.getBBox()
        var r=bb.width/2
        var transX=bb.x+bb.width/2
        var transY=bb.y+bb.height/2
        var ll = PlanetProjection.invert([transX, transY])

        PlanetAtmos=PlanetViewG.append("circle")
        .attr("id","planetAtmos")
        .attr("stroke-width",20)
        .attr("filter","url(#drop-shadow)")
        .attr("stroke","gainsboro")
        .attr("pointer-events","none")
        .attr("r",r+10)
        .attr("ll0",ll[0])
        .attr("ll1",ll[1])
        .attr("fill","none")
        .attr("transform",PlanetPoint(ll))


        PlanetComp=PlanetViewG.append("circle")
        .attr("id","planetComp")
        .attr("stroke","none")
        .attr("pointer-events","none")
        .attr("r",r)
        .attr("ll0",ll[0])
        .attr("ll1",ll[1])
        .attr("fill","none")
        .attr("transform",PlanetPoint(ll))
        //.attr("fill-opacity",.3)
        planetViewG.insertBefore(planetComp,planetGrid)
        //---restructure zoom for higher scale performance, PAN in lieu of rotation---
        PlanetZoom = d3.behavior.zoom().translate(PlanetProjection.translate()).scale(PlanetProjection.scale()).size([PlanetViewWidth, PlanetViewHeight]).scaleExtent([1, 100000]).on("zoom", planetRedraw);
        PlanetSVG.call(PlanetZoom).on("dblclick.zoom", null)
           // PlanetAtmos.attr("fill", "none")
           // PlanetAtmos.attr("stroke", "#191970")
          //  PlanetAtmos.attr("stroke-width", "6")

        PlanetView.k = 250
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
var PrevPlanetScale=250


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
       // d3.select("#planetOutline").attr("d", PlanetViewMap);
        var ll0=+planetAtmos.getAttribute("ll0")
        var ll1=+planetAtmos.getAttribute("ll1")

         var ll=[ll0,ll1]


        PlanetAtmos.attr("transform",PlanetPoint(ll)+"scale("+(PlanetView.k/250)+")")
        PlanetComp.attr("transform",PlanetPoint(ll)+"scale("+(PlanetView.k/250)+")")

        if(d3.event)
        {
            PrevPlanetScale = d3.event.scale
            PrevPlanetTransX = d3.event.translate[0]
            PrevPlanetTransY = d3.event.translate[1]
        }

    }

}

function PlanetPoint(coords)
{
    if
    (coords)
    return "translate(" + PlanetProjection(coords) + ")";
}