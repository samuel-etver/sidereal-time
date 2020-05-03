function calculateLST(inData) {         
    var r = 1296000.0; 
    var longitudeH = inData.longitude/15;
     
    var iyear = inData.year; 
    var im = inData.month;
    var iday = inData.day;
    
    var month = [31,28,31,30,31,30,31,31,30,31,30,31];    
    
    //*--------------------------------------------------------------------*
    //*                        Calculate iday and t                        *
    //*--------------------------------------------------------------------*
    if (im != 1) {
        var i = Math.round(4*Math.floor(iyear/4));
        if (iyear == i) {
            month[1] = 29
        }
        for (i = 1; i <= im-1; i++)  {
            iday = Math.round(iday) + month[i-1]
        }
    }
    
    var iy = iyear - 1900;    
    iday = Math.floor((iday-1)+(iy-1)/4);
    var t = iday + iy*365.0;
    t = (t+0.5)/36525.0 - 1;
    let t2 = t**2;
    let t3 = t**3;
    //*--------------------------------------------------------------------*
    //*                    Calculate mean sidereal time                    *
    //*--------------------------------------------------------------------*
    var sm = 24110.548410 + 8640184.8128660*t + 0.093104*t2- 0.00000620*t3;
    while (sm <= 0) {
        sm += 86400.0;
    }
    while (sm > 86400) {
        sm -= 86400.0;
    }
    //*--------------------------------------------------------------------*
    //*             Calculate long and short periodic nutation             *
    //*--------------------------------------------------------------------*
    var p = Math.PI/180.0/3600.0;
    var e = p*(84381.448 - 46.8150*t - 0.00059*t2 + 0.0018130*t3);
    var q = p*(450160.280 -   5.0*r*t - 482890.539*t+ 7.455*t2 + 0.0080*t3);
    var d = p*(1072261.3070 + 1236.0*r*t + 1105601.328*t - 6.891*t2+ 0.0190*t3);
    var f = p*(335778.8770 + 1342.0*r*t + 295263.1370*t - 13.2570*t2+ 0.0110*t3);
    var m = p*(1287099.804 +  99.0*r*t+1292581.2240*t -  0.5770*t2 - 0.0120*t3);
    var l = p*(485866.7330+1325.0*r*t + 715922.633*t + 31.3100*t2+ 0.0640*t3);
    
    
    var pl =  -(17.19960 + 0.017420*t) * Math.sin(q);    
    pl += (0.20620 + 0.000020*t)   * Math.sin(2.0*q);
    pl += 0.00460              * Math.sin(q+2.0*f-2.0*l);
    pl += 0.00110              * Math.sin(2.0*(l-f));
    pl -= 0.00030              * Math.sin(2.0*(q+f-l));
    pl -= 0.00030              * Math.sin (l-m-d);
    pl -= 0.00020              * Math.sin (q-2.0*d+2.0*f-2.0*m);
    pl += 0.00010              * Math.sin (q-2.0*f+2.0*l);
    pl -= (1.31870+0.000160*t) * Math.sin (2.0*(q-d+f));
    pl += (0.14260-0.000340*t) * Math.sin (m);
    pl -= (0.05170-0.000120*t) * Math.sin (2.0*q-2.0*d+2.0*f+m);
    pl += (0.02170-0.000050*t) * Math.sin (2.0*q-2.0*d+2.0*f-m);
    pl += (0.01290+0.000010*t) * Math.sin (q-2.0*d+2.0*f);
    pl += 0.00480              * Math.sin (2.0*(l-d));
    pl -= 0.00220              * Math.sin (2.0*(f-d));
    pl += (0.00170-0.000010*t) * Math.sin (2.0*m);
    pl -= 0.00150              * Math.sin (q+m);
    pl -= (0.00160-0.000010*t) * Math.sin (2.0*(q-d+f+m));
    pl -= 0.00120              * Math.sin (q-m);
    pl -= 0.00060              * Math.sin (q+2.0*d-2.0*l);
    pl -= 0.00050              * Math.sin (q-2.0*d+2.0*f-m);
    pl += 0.00040              * Math.sin (q-2.0*d+2.0*l);
    pl += 0.00040              * Math.sin (q-2.0*d+2.0*f+m);
    pl -= 0.00040              * Math.sin (l-d);
    pl += 0.00010              * Math.sin (2.0*l+m-2.0*d);
    pl += 0.00010              * Math.sin (q+2.0*d-2.0*f);
    pl -= 0.00010              * Math.sin (2.0*d-2.0*f+m);
    pl += 0.00010              * Math.sin (2.0*q+m);
    pl += 0.00010              * Math.sin (q+d-l);
    pl -= 0.00010              * Math.sin (m+2.0*f-2.0*d);

    var ps  = -(  0.22740+0.000020*t) * Math.sin (2.0*(q+f));
    ps += (  0.07120+0.000010*t)  * Math.sin (l);
    ps -= (  0.03860+0.000040*t)  * Math.sin (q+2.0*f);
    ps -= 0.03010            * Math.sin (2.0*q+2.0*f+l);
    ps -= 0.01580            * Math.sin (l-2.0*d);
    ps += 0.01230            * Math.sin (2.0*q+2.0*f-l);
    ps += 0.00630            * Math.sin (2.0*d);
    ps += (  0.00630+0.000010*t) * Math.sin (q+l);
    ps -= (  0.00580+0.000010*t) * Math.sin (q-l);
    ps -= 0.00590            * Math.sin (2.0*q+2.0*d+2.0*f-l);
    ps -= 0.00510            * Math.sin (q+2.0*f+l);
    ps -= 0.00380            * Math.sin (2.0*(q+d+f));
    ps += 0.00290            * Math.sin (2.0*l);
    ps += 0.00290            * Math.sin (2.0*q-2.0*d+2.0*f+l);
    ps -= 0.00310            * Math.sin (2.0*(q+f+l));
    ps += 0.00260            * Math.sin (2.0*f);
    ps += 0.00210            * Math.sin (q+2.0*f-l);
    ps += 0.00160            * Math.sin (q+2.0*d-l);
    ps -= 0.00130            * Math.sin (q-2.0*d+l);
    ps -= 0.00100            * Math.sin (q+2.0*d+2.0*f-l);
    ps -= 0.00070            * Math.sin (l+m-2.0*d);
    ps += 0.00070            * Math.sin (2.0*q+2.0*f+m);
    ps -= 0.00070            * Math.sin (2.0*q+2.0*f-m);
    ps -= 0.00080            * Math.sin (2.0*q+2.0*d+2.0*f+l);
    ps += 0.00060            * Math.sin (2.0*d+l);
    ps += 0.00060            * Math.sin (2.0*(q-d+f+l));
    ps -= 0.00060            * Math.sin (q+2.0*d);
    ps -= 0.00070            * Math.sin (q+2.0*d+2.0*f);
    ps += 0.00060            * Math.sin (q-2.0*d+2.0*f+l);
    ps -= 0.00050            * Math.sin (q-2.0*d);
    ps += 0.00050            * Math.sin (l-m);
    ps -= 0.00050            * Math.sin (q+2.0*f+2.0*l);
    ps -= 0.00040            * Math.sin (m-2.0*d);
    ps += 0.00040            * Math.sin (l-2.0*f);
    ps -= 0.00040            * Math.sin (d);
    ps -= 0.00030            * Math.sin (l+m);
    ps += 0.00030            * Math.sin (l+2.0*f);
    ps -= 0.00030            * Math.sin (2.0*q+2.0*f-m+l);
    ps -= 0.00030            * Math.sin (2.0*q+2.0*d+2.0*f-m-l);
    ps -= 0.00020            * Math.sin (q-2.0*l);
    ps -= 0.00030            * Math.sin (2.0*q+2.0*f+3.0*l);
    ps -= 0.00030            * Math.sin (2.0*q+2.0*d+2.0*f-m);
    ps += 0.00020            * Math.sin (2.0*q+2.0*f+m+l);
    ps -= 0.00020            * Math.sin (q-2.0*d+2.0*f-l);
    ps += 0.00020            * Math.sin (q+2.0*l);
    ps -= 0.00020            * Math.sin (2.0*q+l);
    ps += 0.00020            * Math.sin (3.0*l);
    ps += 0.00020            * Math.sin (2.0*q+d+2.0*f);
    ps += 0.00010            * Math.sin (2.0*q-l);
    ps -= 0.00010            * Math.sin (l-4.0*d);
    ps += 0.00010            * Math.sin (2.0*(q+d+f-l));
    ps -= 0.00020            * Math.sin (2.0*q+4.0*d+2.0*f-l);
    ps -= 0.00010            * Math.sin (2.0*l-4.0*d);
    ps += 0.00010            * Math.sin (2.0*q-2.0*d+2.0*f+m+l);
    ps -= 0.00010            * Math.sin (q+2.0*d+2.0*f+l);
    ps -= 0.00010            * Math.sin (2.0*q+4.0*d+2.0*f-2.0*l);
    ps += 0.00010            * Math.sin (2.0*q+4.0*f-l);
    ps += 0.00010            * Math.sin (l-m-2.0*d);
    ps += 0.00010            * Math.sin (q-2.0*d+2.0*f+2.0*l);
    ps -= 0.00010            * Math.sin (2.0*(q+d+f+l));
    ps -= 0.00010            * Math.sin (q+2.0*d+l);
    ps += 0.00010            * Math.sin (2.0*q-2.0*d+4.0*f);
    ps += 0.00010            * Math.sin (2.0*q-2.0*d+2.0*f+3.0*l);
    ps -= 0.00010            * Math.sin (l+2.0*f-2.0*d);
    ps += 0.00010            * Math.sin (q+2.0*f+m);
    ps += 0.00010            * Math.sin (q+2.0*d-m-l);
    ps -= 0.00010            * Math.sin (q-2.0*f);
    ps -= 0.00010            * Math.sin (2.0*q-d+2.0*f);
    ps -= 0.00010            * Math.sin (2.0*d+m);
    ps -= 0.00010            * Math.sin (l-2.0*f-2.0*d);
    ps -= 0.00010            * Math.sin (q+2.0*f-m);
    ps -= 0.00010            * Math.sin (q-2.0*d+m+l);
    ps -= 0.00010            * Math.sin (l-2.0*f+2.0*d);
    ps += 0.00010            * Math.sin (2.0*(l+d));
    ps -= 0.00010            * Math.sin (2.0*q+4.0*d+2.0*f);
    ps += 0.00010            * Math.sin (d+m);
    //*--------------------------------------------------------------------*
    //*                    Calculate true sidereal time                    *
    //*--------------------------------------------------------------------*
    let sa = sm + (pl+ps)/15.0 * Math.cos(e);

    let toTime = function(lst) {
        let s = (lst/3600) + longitudeH + 1.002737909350795*
          (inData.hour + inData.minute/60 + inData.second/3600 + inData.timezone);
    
        if ( s < 0  ) s += 24;
        if ( s >=24 ) s -= 24;
        
        var hour = Math.floor(s);
        var min = (s - hour)*60;
        var sec = (min - Math.floor(min)) * 60;

        return {
            hour: hour,
            minute: Math.floor(min),
            second: sec
        };
    };
    
    return {
        meanSiderealTime:     toTime(sm),
        apparentSiderealTime: toTime(sa)
    };
  }
    