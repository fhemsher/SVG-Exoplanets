

var NewStarScale
function beginStarMap()
{

    if(!StarProjection)
    {

        StopCelestialZoom = true
        //---star view ditto celestial view
        StarView = CelestialView

        //---rotate and scale this to match celestial---
        StarProjection = d3.geo.mollweide().rotate([CelestialView.r[0], CelestialView.r[1], CelestialView.r[2]]).translate([CelestialWidth/2, CelestialHeight/2]).scale([CelestialView.k])
        StarMap = d3.geo.path().projection(StarProjection);
        //---creates a 'shadow' grid identical to celestial---
        var graticule = d3.geo.graticule().minorStep([8, 4]);
        MyStarG.append("path").datum(graticule).attr("class", "gridline").attr("d", StarMap);

        //---restructure zoom for higher scale performance, PAN in lieu of rotation---
        StarZoom = d3.behavior.zoom().translate(StarProjection.translate()).scale(StarProjection.scale()).size([CelestialWidth, CelestialHeight]).scaleExtent([450, 60000000000000]).on("zoom", starRedraw);
        StarSVG.call(StarZoom).on("dblclick.zoom", null)

        NewStarScale = CelestialView.k
        StarView.k = CelestialView.k
        StarView.r = CelestialView.r
        StarProjection.scale(StarView.k)
        StarProjection.rotate(StarView.r)
        StarZoom.scale(CelestialView.k)

        celestialContainerDiv.style.display = "none"
        starContainerDiv.style.display = "block"

        startCursorLoc()
    }
    else
    {
        StarProjection.rotate([CelestialView.r[0], CelestialView.r[1], CelestialView.r[2]]).translate([CelestialWidth/2, CelestialHeight/2])
        StarProjection.scale([CelestialView.k])

    }

}
var ConStars
var HostStarDoc
var HostXML
var ExoDoc
var ExoXML
var MyStarScale //---filled when new star map created---
var MyConBoundries
var ConVertice
var ConVerticePts
var StarsIDArray =[]
var MyStarSize
var StarCoordsArray =[]
var CentroidLL
var ExoplanetRotateArray =[]
var HZone = false

function zoomToSelectedStar()
{
    hostStarSelect.options[hostStarSelect.selectedIndex].style.fontWeight = "bold"

    MyStars = true
    StopStarZoom = false
    startCursorLoc()
    PlanetCoordsArray =[]
    StarCoordsArray =[]
    StarsIDArray =[]
    StarData =[]
    ExoplanetRotateArray =[]
    StopCelestialZoom = true
    HZone = false
    starNameDiv.innerHTML = hostStarSelect.options[hostStarSelect.selectedIndex].text

    hostStarSelect.selectedIndex = 0
    zoomToSelectedStarButton.disabled = true
    showExoDataButton.disabled = true
    //---clear Previous----
    for(var k = orbitG.childNodes.length-1; k>=0; k--)
        orbitG.removeChild(orbitG.childNodes.item(k))
        for(var k = exoplanetG.childNodes.length-1; k>=0; k--)
        exoplanetG.removeChild(exoplanetG.childNodes.item(k))
        for(var k = domPlanetG.childNodes.length-1; k>=0; k--)
        domPlanetG.removeChild(domPlanetG.childNodes.item(k))
        MyExoplanet = false
        PlanetsLoaded = false

        beginStarMap()

        PrimaryStarCoords =[SelectedStar.S_RA*15, SelectedStar.S_DEC]
        var coronaCircle = d3.geo.circle().angle(.000077).origin(PrimaryStarCoords)

        PrimaryStarCorona.datum(coronaCircle)
        .attr("d", StarMap)

        var solRad = +SelectedStar.S_Radius
        PrimaryStarSurface.attr("radius", solRad)
        if(solRad<.05)
        solRad = .05

        var solarDeg = (solRad*2)*0.000000000197 //---convert solar radius to degrees---
        var surfaceCircle = d3.geo.circle().angle(solarDeg).origin(PrimaryStarCoords)
        PrimaryStarSurface.datum(surfaceCircle)
        .attr("d", StarMap);

    PrimaryStarSurface.style("display", null)
    PrimaryStarSurface.attr("name", SelectedStar.S_Name)
    PrimaryStarCorona.style("display", null)
    PrimaryStarGraticule.datum(surfaceCircle)
    .attr("d", StarMap);
    //----habitable zone--------------
    var hzMin = +SelectedStar.S_HabZoneMin
    var hzMax = +SelectedStar.S_HabZoneMax

    var rotateOffset = 45
    //---responseText---

    //---DOMParser---
    var parser = new DOMParser();
    ExoDoc = parser.parseFromString(ExoPlanetXML, "text/xml").documentElement;

    ExoplanetRotateArray =[]
    MyExoplanet = true
    var primaryRD = PrimaryStarCoords //---y location of exos--
    var primaryRA = primaryRD[0]
    var primaryDEC = primaryRD[1]

    var starDia = parseFloat(PrimaryStarSurface.attr("radius"))*2
    var solarDeg = starDia*0.000000000197//---convert solar radius to degrees---
    // var starRadius= parseFloat(PrimaryStarSurface.attr("radius"))
    //var solarDeg = starRadius*0.000000000197//---convert solar radius to degrees---
    var exoElems = ExoDoc.childNodes
    ExoplanetG.style("display", "block")
    OrbitG.style("display", "block")

    for(var k = 0; k<exoElems.length; k++)
    {
        var exo = exoElems.item(k)
        var comp = exo.getAttribute("CompositionClass") //--fill color---
        var hab = exo.getAttribute("HabitableClass") //--fill color---
        var atmos = exo.getAttribute("AtmosphereClass") //--stroke color---
        var name = exo.getAttribute("Name") //--stroke color---
        var letterIndex = name.lastIndexOf(" ")
        var letter = name.charAt(letterIndex+1)
        //<EXOPLANETS><EXO id="exoplanet1538338800304" HostName="16 Cyg B" Name="16 Cyg B b" NameKepler="" NameKOI="" ZoneClass="Cold" MassClass="Jovian" CompositionClass="gas" AtmosphereClass="hydrogen-rich" HabitableClass="non-habitable" MinMass="534.14" Mass="534.14" MaxMass="" Radius="11.06" Density="0.39" Gravity="4.36" EscVel="6.95" SFluxMin=" 0.1183426" SFluxMean=" 0.4656991" SFluxMax="3.489002" TeqMin="149.4" TeqMean="187.6" TeqMax="348.2" TsMin="" TsMean="" TsMax="" SurfPress="210.6" Mag="-21.94" ApparSize="21.15" Period="799.50" SemMajorAxis="1.6800" Eccentricity="0.69" Inclination="" MeanDistance="1.22" Omega="83.4" HZD="1.15" HZC="7.17" HZA="7.16" HZI="0.09" SPH="" IntESI="0.00" SurfESI="0.00" ESI="0.39" HostHabCat="0" Habitable="0" HabMoon="0" Confirmed="1" Disc_Method="Radial Velocity" Disc_Year="1996.00"/></EXOPLANETS>
        //---add circle to ExoplanetG---
        var distAU = +exo.getAttribute("MeanDistance")

        var arcSecs = distAU
        var arcSecs2Deg = arcSecs* 0.000277778
        var exoRA = primaryRA-(arcSecs2Deg*4.84814e-6+solarDeg)

        var orbitDeg = arcSecs2Deg*4.84814e-6
        if(HZone==false)
        {

            //------Habitable zone---------------------
            var hzMinDeg = hzMin* 0.000277778*4.84814e-6
            var hzMaxDeg = hzMax* 0.000277778*4.84814e-6
            var hzCenterDeg = hzMinDeg+.5*hzMax
            var hzMinPath = d3.geo.circle().angle(hzMinDeg+solarDeg).origin(PrimaryStarCoords)

            var hzOrbitMin = OrbitG.append("path")
            .attr("id", "hzMinPath")
            .attr("class", "orbit")
            .attr("stroke", "#1A773F")
            .attr("stroke-width", ".5")
            .attr("fill", "none")

            hzOrbitMin.datum(hzMinPath)
            .attr("d", StarMap);

            var hzMaxPath = d3.geo.circle().angle(hzMaxDeg+solarDeg).origin(PrimaryStarCoords)
            var hzOrbitMax = OrbitG.append("path")
            .attr("id", "hzMaxPath")
            .attr("class", "orbit")
            .attr("stroke", "#1A773F")
            .attr("stroke-width", ".5")
            .attr("fill", "none")
            hzOrbitMax.datum(hzMaxPath)
            .attr("d", StarMap);

            //====hz zone================
            var minZoneD = hzOrbitMin.attr("d")
            var maxZoneD = hzOrbitMax.attr("d")
            var hzPathD = minZoneD+" "+maxZoneD

            var hzPath = OrbitG.append("path")
            .attr("id", "hzZonePath")
            .attr("class", "hzZone")
            .attr("stroke", "none")
            .attr("fill", "#1A773F")
            .attr("fill-opacity", ".1")
            .attr("fill-rule", "evenodd")
            .attr("name", "Habitable Zone")
            .attr("onmouseover", "showStarName(evt)")
            .attr("onmouseout", "hideStarName(evt)") .attr("d", hzPathD);

            HZone = true

        }

        var eccentricity = +exo.getAttribute("Eccentricity")

        var orbitPath = d3.geo.circle().angle(orbitDeg+solarDeg).origin(PrimaryStarCoords)

        var orbit = OrbitG.append("path")
        .attr("id", "orbit"+k)
        .attr("class", "orbit")
        .attr("stroke-dasharray", "4 4")
        .attr("stroke", "black")
        .attr("stroke-width", "1")
        .attr("fill", "white")
        .attr("pointer-events", "none")
        .attr("fill-opacity", "0")

        orbit.datum(orbitPath)
        .attr("d", StarMap);

        //----planet----

        var ll =[exoRA, primaryDEC]
        var xy = StarProjection(ll)
        var x = xy[0]
        var y = xy[1]

        var c = StarProjection(PrimaryStarCoords)

        setOrbitPlanet(ll, name, atmos, comp, hab, letter, k, exoElems.length)
    }

    if(MyExoplanet==true)
    {

        ExoplanetG.style("display", "block")
        ExoplanetG.selectAll(".planet")
        .data(ExoplanetCoordsArray)
        .attr("transform", function(d)
            {
                return StarPoint(d)
            }
        )
        ExoplanetG.selectAll(".orbit").attr("d", StarMap);
    }

    zoomPrimaryStarSurfaceView()

    PrevZoomInteger = Math.floor((200000*Math.log(StarView.k)/Math.log(200000))/1000)

    starRedraw()
    if(PlanetsLoaded==false)
    {
        PlanetScale = StarView.k/StarScale

        setTimeout(locatePlanets, 1800)
    }

}
var PlanetCoordsArray =[]
var rotatePlanet = 0
function setOrbitPlanet(ll, name, atmos, comp, hab, letter, k, qnty)
{

    var id = "planet"+k
    var fill = "url(#unknown)"
    var stroke = "gainsboro"

    if(atmos=="no-atmosphere")stroke = "white"
        if(atmos=="metals-rich")stroke = "red"
        if(atmos=="hydrogen-rich")stroke = "blue"

        if(hab=="mesoplanet")fill = "url(#mesoplanet)"
        if(hab=="thermoplanet")fill = "url(#thermoplanet)"
        if(hab=="psychroplanet")fill = "url(#psychroplanet)"
        if(hab=="hypopsychroplanet")fill = "url(#hypopsychroplanet)"
        if(hab=="hyperthermoplanet")fill = "url(#hyperthermoplanet)"
        if(hab=="non-habitable")fill = "url(#non-habitable)"

        var xy = StarProjection(PrimaryStarCoords)
        var x = xy[0]
        var y = xy[1]

        var radius = 60/qnty
        var strokeWidth = 12/qnty
        var exoCircle = PlanetG.append("circle")
        .attr("class", "exoCircle")
        .attr("id", id)
        .attr("r", radius)
        .attr("fill", fill)
        .attr("visibility", "hidden")
        .attr("stroke-width", strokeWidth)
        .attr("name", name+"<br><b>Atmoshpere:</b> "+atmos+"<br><b>Composition:</b> "+comp+"<br><b>Habitable:</b> "+hab)
        .attr("onmouseover", "showExoplanet(evt)")
        .attr("onmouseout", "hideExoplanet(evt)")
        .attr("stroke", stroke)

}

var PlanetsLoaded = false
function locatePlanets()
{
    PlanetCoordsArray =[]

    var planets = domPlanetG.childNodes

    var cnt = 0
    var orbitPaths = orbitG.childNodes

    for(var k = 0; k<orbitPaths.length; k++)
    {
        var path = orbitPaths.item(k)
        if(path.id.indexOf("orbit")!=-1)
        {
            var pathLength = path.getTotalLength()

            var lengthAtPoint = cnt*pathLength/8

            var Pnt = path.getPointAtLength(lengthAtPoint)

            var ll = StarProjection.invert([Pnt.x, Pnt.y])

            var planet = planets.item(cnt)
            planet.removeAttribute("visibility")
            planet.setAttribute("transform", StarPoint(ll)+"scale("+PlanetScale+")")

            PlanetCoordsArray.push(ll)
            cnt++
        }

    }

    PlanetsLoaded = true
    starRedraw()

}
var PlanetScale
function zoomPrimaryStarSurfaceView()
{

    StopCelestialZoom = true
    ConstellationView = false
    DefaultView = false
    ZoneView = false
    CoronaView = true

    SurfaceView = true
    StarConBoundry.style("display", "none")
    var solDiam = +SelectedStar.S_Radius*2
    if(solDiam<.1)
        solDiam = .1
        var scale = 800000000000*90/solDiam

        if(scale>50000000000000)
        scale = 50000000000000

        StarProjection.scale(scale);
    StarView.k = scale

    var centerDivX = CelestialWidth/2;
    var centerDivY = CelestialHeight/2;

    var coordXY = StarProjection(PrimaryStarCoords)
    var coordX = coordXY[0]
    var coordY = coordXY[1]

    var transX = centerDivX+(centerDivX-coordX)
    var transY = centerDivY+(centerDivY-coordY)

    PrevScale = scale
    PrevTransX = transX
    PrevTransY = transY

}