var StopAnim=false
function viewPlanetSelected()
{

    PlanetView.k = 250
    PlanetView.r = [0,0,0]
    PlanetProjection.scale(PlanetView.k)
    PlanetProjection.rotate(PlanetView.r)
   // PlanetProjection.translate([PlanetViewWidth/2, PlanetViewHeight/2])
    PlanetZoom.scale(PlanetView.k)
    PrevPlanetTransX=PlanetViewWidth/2
    PrevPlanetTransY=PlanetViewHeight/2
    PrevPlanetScale=250
    PlanetProjection.rotate([PlanetView.r[0], PlanetView.r[1], PlanetView.r[2]]).translate([PlanetViewWidth/2, PlanetViewHeight/2])
    PlanetProjection.scale([PlanetView.k])


    planetId=viewPlanetSelect.options[viewPlanetSelect.selectedIndex].value
   var planet=document.getElementById(planetId)
   console.log(planet)
   var atmos=planet.getAttribute("atmos")  ///---atmosphere----

    var atmosStroke="gainsboro"
    if(atmos=="hydrogen-rich")atmosStroke="lime"
    if(atmos=="metals-rich")atmosStroke="red"
    if(atmos=="none")atmosStroke="grey"
    if(atmos=="unknown")atmosStroke="gainsboro"
    planetAtmos.setAttribute("stroke",atmosStroke)
   var comp=planet.getAttribute("comp")  ///---surface composition----
   var planetColor=planet.getAttribute("planetColor")

 planetComp.setAttribute("fill","url(#"+comp+")")
   planetGrid.setAttribute("stroke",planetColor)
    planetRedraw()

   var planetName= planet.getAttribute("planetName")
   planetNameSpan.innerHTML= planetName
  PlanetRadius=+planet.getAttribute("radius")//.---measure distance---
  showPlanetDia() ///---distance.js---

  habSpan.innerHTML=planet.getAttribute("hab")
  atmosSpan.innerHTML=atmos
  compSpan.innerHTML=comp

   viewPlanetDiv.style.visibility="visible"
   var height=630
    d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")





}



function closeViewPlanet()
{
    var height=1

         d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")
        setTimeout('viewPlanetDiv.style.visibility="hidden"',1000)
    viewPlanetSelect.selectedIndex=0
}

function showPlanetData()
{

  var planetName= planetNameSpan.innerHTML
for(var k=0;k<ExoPacket.length;k++)
    {
         var planet=ExoPacket[k].P_Name
         if(planet==planetName)
         {
             var exo=ExoPacket[k]
             break
         }

    }
   S_NameTDD.innerHTML = exo.S_Name
   P_NameTDD.innerHTML = exo.P_Name
  P_NameKeplerTDD.innerHTML = exo.P_NameKepler
  P_NameKOITDD.innerHTML = exo.P_NameKOI
  P_ZoneClassTDD.innerHTML = exo.P_ZoneClass
  P_MassClassTDD.innerHTML = exo.P_MassClass
  P_CompositionClassTDD.innerHTML = exo.P_CompositionClass
  P_AtmosphereClassTDD.innerHTML = exo.P_AtmosphereClass
  P_HabitableClassTDD.innerHTML = exo.P_HabitableClass
  P_MinMassTDD.innerHTML = exo.P_MinMass
  P_MassTDD.innerHTML = exo.P_Mass
  P_MaxMassTDD.innerHTML = exo.P_MaxMass
  P_RadiusTDD.innerHTML = exo.P_Radius
  P_DensityTDD.innerHTML = exo.P_Density
  P_GravityTDD.innerHTML = exo.P_Gravity
  P_EscVelTDD.innerHTML = exo.P_EscVel
  P_SFluxMinTDD.innerHTML = exo.P_SFluxMin
  P_SFluxMeanTDD.innerHTML = exo.P_SFluxMean
  P_SFluxMaxTDD.innerHTML = exo.P_SFluxMax
  P_TeqMinTDD.innerHTML = exo.P_TeqMin
  P_TeqMeanTDD.innerHTML = exo.P_TeqMean
  P_TeqMaxTDD.innerHTML = exo.P_TeqMax
  P_TsMinTDD.innerHTML = exo.P_TsMin
  P_TsMeanTDD.innerHTML = exo.P_TsMean
  P_TsMaxTDD.innerHTML = exo.P_TsMax
  P_SurfPressTDD.innerHTML = exo.P_SurfPress
  P_MagTDD.innerHTML = exo.P_Mag
  P_ApparSizeTDD.innerHTML = exo.P_ApparSize
  P_PeriodTDD.innerHTML = exo.P_Period
  P_SemMajorAxisTDD.innerHTML = exo.P_SemMajorAxis
  P_EccentricityTDD.innerHTML = exo.P_Eccentricity
  P_EccentricityTDD.innerHTML = exo.P_Eccentricity
  P_InclinationTDD.innerHTML = exo.P_Inclination
  P_MeanDistanceTDD.innerHTML = exo.P_MeanDistance
  P_OmegaTDD.innerHTML = exo.P_Omega
  P_HZDTDD.innerHTML = exo.P_HZD
  P_HZCTDD.innerHTML = exo.P_HZC
  P_HZATDD.innerHTML = exo.P_HZA
  P_HZITDD.innerHTML = exo.P_HZI
  P_SPHTDD.innerHTML = exo.P_SPH
  P_IntESITDD.innerHTML = exo.P_IntESI
  P_SurfESITDD.innerHTML = exo.P_SurfESI
  P_ESITDD.innerHTML = exo.P_ESI
  S_HabCatTDD.innerHTML = exo.S_HabCat
  P_HabitableTDD.innerHTML = exo.P_Habitable
  P_HabMoonTDD.innerHTML = exo.P_HabMoon
  P_ConfirmedTDD.innerHTML = exo.P_Confirmed
  P_Disc_MethodTDD.innerHTML = exo.P_Disc_Method
  P_Disc_YearTDD.innerHTML = exo.P_Disc_Year










myPlanetDataDiv.style.visibility="visible"
   var height=630
    d3.select("#myPlanetDataDiv").transition().duration(800).style("height",height+"px")


}

function closePlanetData()
{
    var height=1

         d3.select("#myPlanetDataDiv").transition().duration(800).style("height",height+"px")
        setTimeout('myPlanetDataDiv.style.visibility="hidden"',1000)

}