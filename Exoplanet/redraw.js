function celestialRedraw()
{
    if(StopCelestialZoom==false)
    {

        CelestialProjection.rotate(CelestialProjection.rotate()).scale(CelestialProjection.scale());

        var rot = CelestialProjection.rotate();
        projOutline.scale(CelestialProjection.scale());
        CelestialCenter =[-rot[0], -rot[1]];

        if(CelestialProjection.scale()<10000)
        {
            CelestialG.selectAll(".gridline").style("display", "block")

            CelestialG.selectAll(".gridline").attr("d", CelestialMap);

        }
        else
        {
            CelestialG.selectAll(".gridline").style("display", "none")

        }
        CelestialG.select("#celestialOutline").attr("d", CelestialOutline);

        rotationValue.value = CelestialView.r[2]

        Earth.attr("transform", CelestialPoint([0, 0]))//+"scale("+(CelestialView.k/CelestialScale)+")")
        Sun.attr("transform", CelestialPoint([sunDec, sunRA]))//+"scale("+(CelestialView.k/CelestialScale)+")")

        if(BeginStar==false)
        {
            CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);
            CelestialG.selectAll(".constname")
            .attr("transform", function(d)
                {
                    return CelestialPoint(d.geometry.coordinates);
                }
            )

            CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);
            CelestialG.selectAll(".constname")
            .attr("transform", function(d)
                {
                    return CelestialPoint(d.geometry.coordinates);
                }
            )

        }
        else
        {
            if(CelestialProjection.scale()<10000)
            {
                CelestialG.selectAll(".constname").style("display", "block")
                //CelestialG.selectAll(".boundaryline").style("display","block")
                CelestialG.selectAll(".constname")
                .attr("transform", function(d)
                    {
                        return CelestialPoint(d.geometry.coordinates);
                    }
                )

                CelestialG.selectAll(".boundaryline").attr("d", CelestialMap);

            }
            else
            {
                CelestialG.selectAll(".constname").style("display", "none")

            }

            CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
            EarthPathCelestial.attr("d", CelestialMap)
            //---added traditional stars---
            HostG.selectAll(".host")
            .attr("transform", function(d)
                {
                    return CelestialPoint([d.S_RA*15, d.S_DEC])+"scale("+(CelestialView.k/CelestialScale)+")"
                }
            )

        }
        if(ConStars)
        {
            if(ConStarsLoaded==true)
                PrimaryStarG.selectAll(".star")
                .attr("transform", CelestialPoint(PrimaryStarLL)+"scale("+(CelestialView.k/CelestialScale)+")") //;

                CentroidCelestial.attr("transform", CelestialPoint(CentroidConLL))
                EarthPathCelestial.attr("d", CelestialMap)
                if(PrimaryStarPath.attr("d"))
                PrimaryStarPath.attr("d", CelestialMap)

        }

        if(hostStarG.childNodes.length>0)
            HostStarG.selectAll(".host")
            .data([HostStar])
            .attr("transform", function(d)
                {
                    return CelestialPoint([d[2], d[3]])+"scale("+(CelestialView.k/CelestialScale)+")"
                }
            )

            //---added host stars---
            CelestialG.selectAll(".host")
            .attr("transform", function(d)
                {
                    return CelestialPoint([d.S_RA*15, d.S_DEC])
                }
            )

    }

}

function CelestialPoint(coords)
{
    if
    (coords)
    return "translate(" + CelestialProjection(coords) + ")";
}
var Mobile = false
var PrevTransX
var PrevTransY
var PrevScale
var PrevZoomInteger
var fixedVal //---changes decimal places based on zoom level---
function starRedraw()
{
    if(StopStarZoom==false)
    {
        if(d3.event)
        {
            starG.style.cursor = "default"
            StarProjection.translate(d3.event.translate).rotate(StarProjection.rotate()).scale(d3.event.scale);

            ConstellationView = false
            DefaultView = false
            ZoneView = false
            CoronaView = false
            SurfaceView = false


        }
        else //---rotateZoomStar.js ---
        {

            StarProjection.translate([PrevTransX, PrevTransY]).rotate(StarProjection.rotate()).scale(PrevScale);
            StarZoom.translate([PrevTransX, PrevTransY])
            StarZoom.scale(PrevScale)

        }

        StarView =
        {
        r: StarProjection.rotate(), k: StarProjection.scale()
        };

        if(MyStars==true)
        {
            var thisScale = (StarView.k/StarScale) //--opacity control---

            PrimaryStarZone.attr("d", StarMap)
            PrimaryStarCorona.attr("d", StarMap)
            PrimaryStarSurface.attr("d", StarMap)
            PrimaryStarGraticule.attr("d", StarMap)

            PrimaryStarZone.style("cursor", "default")
            PrimaryStarCorona.style("cursor", "default")
            PrimaryStarSurface.style("cursor", "default")

            PrimaryStarX.attr("transform", StarPoint(PrimaryStarCoords))
            if(PrevScale>10000)
                StarConBoundry.style("display", "none")
                else
                {
                    if(HostStarDoc&&!MyConBoundries)
                    {
                        var myCon = HostStarDoc.getAttribute("Constellation")

                        for(var k = 0; k<ConLocArray.length; k++)
                        {
                            var con = ConLocArray[k][0]
                            if(con==myCon)
                            {
                                for(m = 0; m<ConBoundries.features.length; m++)
                                {
                                    var id = ConBoundries.features[m].id
                                    if(id==con)
                                    {
                                        MyConBoundries = ConBoundries.features[m]
                                        StarConBoundry.datum(MyConBoundries)
                                        .attr("d", StarMap)

                                        break
                                    }
                                }
                                break
                            }
                        }
                    }

                    StarConBoundry.attr("d", StarMap)
                    StarConBoundry.style("display", "block")

                }

                if(MyExoplanet==true&&PrevZoomInteger>400)
            {

                OrbitG.selectAll(".orbit").attr("d", StarMap)
                var minZoneD = hzMinPath.getAttribute("d")
                var maxZoneD = hzMaxPath.getAttribute("d")
                var hzPathD = minZoneD+" "+maxZoneD
                hzZonePath.setAttribute("d", hzPathD)
            }

            
        }
        else
        {

            ExoplanetG.style("display", "none")
            OrbitG.style("display", "none")
            PlanetG.style("display", "none")

        }

        CoronaBG.style("display", "block")

        d3.select("#"+PrimaryStarID).attr("transform", StarPoint(PrimaryStarCoords)+"scale("+thisScale+")")

        //---remove display on +- 50 ZoomInteger----
        var zoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)

        zoomLevelDiv.innerHTML = ((200000*Math.log(StarView.k)/Math.log(200000))/1000).toFixed(0)

        PrevZoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)
        if(PrevZoomInteger<280)
            fixedVal = 5
            else if(PrevZoomInteger<400)
                fixedVal = 8
                else if(PrevZoomInteger>=400)
                    fixedVal = 10

                    if(d3.event)
                {
                    PrevScale = d3.event.scale

                    PrevTransX = d3.event.translate[0]
                    PrevTransY = d3.event.translate[1]

                }

    }

}

function StarPoint(coords)
{
    if
    (coords)
    return "translate(" + StarProjection(coords) + ")";
}
