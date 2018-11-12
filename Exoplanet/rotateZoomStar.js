var RotateOK = false
var ZoomOK = false
var ConstellationView = false
var DefaultView = true //---on login---
var ZoneView = false
var CoronaView = false
var SurfaceView = false
//---keypress---

//---Preset Zoom Levels---
function zoomConView() //---[-]---
{   ConstellationView = true
    ZoneView = false
    CoronaView = false
    SurfaceView = false


     if(MyExoplanet==true)
            {

               ExoplanetG.style("display","none")


            }
    var myCon = HostStarDoc.getAttribute("Constellation")

    for(var k = 0; k<ConLocArray.length; k++)
    {
        var con = ConLocArray[k][0]

        if(con==myCon)
        {
            var conZoom = ConLocArray[k]

            StarView.k = conZoom[1]
            break;
        }
    }

    var trans = XMLBounds.getAttribute("celestialTranslateInit")

    var tSplit = trans.split(",")
    var boundsTransX = parseFloat(tSplit[0])
    var boundsTransY = parseFloat(tSplit[1])
    var myTrans =[boundsTransX, boundsTransY]
    var conZoom = ConLocArray[k]

    StarView.k = conZoom[1]

    StarView.r = conZoom[2]

    PrevScale = StarView.k
    PrevTransX = myTrans[0]
    PrevTransY = myTrans[1]
    ConstellationView = true
    DefaultView = false

    StarConBoundry.style("display", "block")


        starRedraw()


}

function zoomDefaultView()
{
    ConstellationView = false
    DefaultView = true
    ZoneView = false
    CoronaView = false
    SurfaceView = false
    StarConBoundry.style("display", "none")
     if(MyExoplanet==true)
    ExoplanetG.style("display","none")

    var viewK = XMLDefaultBounds.getAttribute("defaultScale")
    var viewR = XMLDefaultBounds.getAttribute("defaultRotate")
    var trans = XMLDefaultBounds.getAttribute("defaultTranslate")
    var rSplit = viewR.split(",")
    var r0 = parseFloat(rSplit[0])
    var r1 = parseFloat(rSplit[1])
    var r2 = parseFloat(rSplit[2])
    var k = parseFloat(viewK)
    StarView = {r:[r0, r1, r2], k: k};

    var tSplit = trans.split(",")
    transX = parseFloat(tSplit[0])
    transY = parseFloat(tSplit[1])
    var myTrans =[transX, transY]


    PrevTransX = transX
    PrevTransY = transY
    PrevScale = StarView.k

    StarConBoundry.style("display", "none")


        starRedraw()

}

function zoomPrimaryStarZoneView()
{
    if(MyExoplanet==true)
        ExoplanetG.style("display","none")

       // saveDefaultViewSpan.innerHTML = ""
    ConstellationView = false
    DefaultView = false
    ZoneView = true
    CoronaView = false
    SurfaceView = false
    StarConBoundry.style("display", "none")
    var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
    var crd1 = parseFloat(centerSplit[0])
    var crd2 = parseFloat(centerSplit[1])
    var coordXY = StarProjection([crd1, crd2])

    var centerDivX = CelestialWidth/2;
    var centerDivY = CelestialHeight/2;

    var viewK = XMLBounds.getAttribute("celestialScaleInit")
    var viewR = XMLBounds.getAttribute("celestialRotateInit")
    var trans = XMLBounds.getAttribute("celestialTranslateInit")
    initStarDwg(viewK, viewR, trans)

    var scale = 100000

    StarProjection.scale(scale);
    var coordXY = StarProjection([crd1, crd2])
    var coordX = coordXY[0]
    var coordY = coordXY[1]

    var transX = centerDivX+(centerDivX-coordX)
    var transY = centerDivY+(centerDivY-coordY)

    PrevScale = scale
    PrevTransX = transX
    PrevTransY = transY


        starRedraw()


}

function zoomPrimaryStarCoronaView()
{
   if(MyExoplanet==true)
       ExoplanetG.style("display","none")
           saveDefaultViewSpan.innerHTML = ""
    ConstellationView = false
    DefaultView = false
    ZoneView = false
    CoronaView = true
    SurfaceView = false
    StarConBoundry.style("display", "none")
    var centerSplit = XMLBounds.getAttribute("primaryStarCoords").split(",")
    var crd1 = parseFloat(centerSplit[0])
    var crd2 = parseFloat(centerSplit[1])
    var coordXY = StarProjection([crd1, crd2])

    var centerDivX = CelestialWidth/2;
    var centerDivY = CelestialHeight/2;

    var viewK = XMLBounds.getAttribute("celestialScaleInit")
    var viewR = XMLBounds.getAttribute("celestialRotateInit")
    var trans = XMLBounds.getAttribute("celestialTranslateInit")
    initStarDwg(viewK, viewR, trans)

    var scale = 100000000
    StarProjection.scale(scale);
    var coordXY = StarProjection([crd1, crd2])
    var coordX = coordXY[0]
    var coordY = coordXY[1]

    var transX = centerDivX+(centerDivX-coordX)
    var transY = centerDivY+(centerDivY-coordY)

    PrevScale = scale
    PrevTransX = transX
    PrevTransY = transY


        starRedraw()


}


//=====================MOBILE=======================
function presetMobileZoomSelected()
{

    var selIndex = presetMobileZoomSelect.selectedIndex
    if(selIndex==1) //----constellation view---
        zoomConView()
        else if(selIndex==2) //----default view---
            zoomDefaultView()
            else if(selIndex==3) //----zone view---
                zoomPrimaryStarZoneView()
                else if(selIndex==4) //----corona view---
                    zoomPrimaryStarCoronaView()
                    else if(selIndex==5) //----surface view---
                        zoomPrimaryStarSurfaceView()

}
