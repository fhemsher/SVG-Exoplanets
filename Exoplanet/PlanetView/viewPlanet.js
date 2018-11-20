var StopAnim=false
function viewPlanetSelected()
{

    PlanetView.k = 200
    PlanetView.r = [0,0,0]
    PlanetProjection.scale(PlanetView.k)
    PlanetProjection.rotate(PlanetView.r)
   // PlanetProjection.translate([PlanetViewWidth/2, PlanetViewHeight/2])
    PlanetZoom.scale(PlanetView.k)
    PrevPlanetTransX=PlanetViewWidth/2
    PrevPlanetTransY=PlanetViewHeight/2
    PrevPlanetScale=200
          PlanetProjection.rotate([PlanetView.r[0], PlanetView.r[1], PlanetView.r[2]]).translate([PlanetViewWidth/2, PlanetViewHeight/2])
        PlanetProjection.scale([PlanetView.k])
      planetRedraw()

    planetId=viewPlanetSelect.options[viewPlanetSelect.selectedIndex].value
   var planet=document.getElementById(planetId)
   var planetColor=planet.getAttribute("planetColor")

  // planetGrid.setAttribute("fill",planetColor)
 //  if(planetColor!="white")
  planetGrid.setAttribute("stroke",planetColor)
   // planetOutline.setAttribute("stroke",planet.getAttribute("stroke"))
   // planetOutline.setAttribute("fill",planetColor)
    // if(planetColor!="white")
   // planetOutline.setAttribute("fill-opacity",.4)

   var planetName= planet.getAttribute("planetName")
   planetNameSpan.innerHTML= planetName

 /*
  var clonePlanet=planet.cloneNode(true)
   clonePlanet.removeAttribute("id")
   clonePlanet.removeAttribute("transform")
   clonePlanet.removeAttribute("class")
   clonePlanet.setAttribute("cx","50%")
   clonePlanet.setAttribute("stroke-width","8")
   clonePlanet.setAttribute("cy","50%")
   clonePlanet.setAttribute("r","40%")
   var planetName= clonePlanet.getAttribute("planetName")
   planetNameSpan.innerHTML= planetName


   var atmos=clonePlanet.getAttribute("atmos")
   var comp=clonePlanet.getAttribute("comp")
   var hab=clonePlanet.getAttribute("hab")
   var data="<b>Atmoshpere:</b> "+ atmos+", <b>Composition:</b> "+comp+", <b>Habitable:</b> "+hab
   planetDataSpan.innerHTML=data
   //----replace fill with non-rotating----

  var url=clonePlanet.getAttribute("hab")+"Stop"
   clonePlanet.setAttribute("fill","url(#"+url+")")

   viewSVG.appendChild(clonePlanet)
 */

   viewPlanetDiv.style.visibility="visible"
   var height=600
    d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")





}



function closeViewPlanet()
{
    var height=1

         d3.select("#viewPlanetDiv").transition().duration(800).style("height",height+"px")
        setTimeout('viewPlanetDiv.style.visibility="hidden"',1000)
    viewPlanetSelect.selectedIndex=0
}